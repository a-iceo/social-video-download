import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // POST /api/downloads/process
  app.post(api.downloads.process.path, async (req, res) => {
    try {
      const { url } = api.downloads.process.input.parse(req.body);

      // --- COBALT API INTEGRATION (Primary for EVERYTHING) ---
      try {
        console.log(`Attempting Cobalt for URL: ${url}`);
        const cobaltResponse = await fetch("https://api.cobalt.tools/api/json", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
          },
          body: JSON.stringify({
            url,
            vQuality: "720",
            filenamePattern: "basic",
          }),
        });

        if (cobaltResponse.ok) {
          const data = await cobaltResponse.json();
          console.log("Cobalt response:", JSON.stringify(data).slice(0, 200)); // Log first 200 chars

          if (data.status !== "error" && (data.url || data.picker)) {
             // Handle picker (multiple streams) or direct url
             const videoUrl = data.url || (data.picker && data.picker[0]?.url);
             
             if (videoUrl) {
                const processedResult = {
                  originalUrl: url,
                  platform: "social",
                  status: "completed",
                  title: data.filename || `Video (${new Date().toLocaleTimeString()})`,
                  thumbnailUrl: "https://placehold.co/600x400/1a1a1a/purple?text=Video+Found", 
                  videoUrl: videoUrl,
                  format: "mp4"
                };
                const download = await storage.createDownload(processedResult);
                return res.json(download);
             }
          }
        } else {
          console.error(`Cobalt HTTP Error: ${cobaltResponse.status}`);
        }
      } catch (e) {
        console.error("Cobalt API failed, falling back...", e);
      }

      // --- YOUTUBE INTEGRATION (Fallback for YT) ---
      // Lazy load ytdl to prevent startup crashes in serverless
      try {
        const ytdlModule = await import("@distube/ytdl-core");
        const ytdl = ytdlModule.default || ytdlModule;
        
        if (ytdl.validateURL(url)) {
          try {
            console.log("Attempting YTDL fallback...");
            const info = await ytdl.getInfo(url);
            const format = ytdl.chooseFormat(info.formats, { quality: 'highest', filter: 'audioandvideo' });
            
            if (format && format.url) {
              const processedResult = {
                originalUrl: url,
                platform: "youtube",
                status: "completed",
                title: info.videoDetails.title || `Video (${new Date().toLocaleTimeString()})`,
                thumbnailUrl: info.videoDetails.thumbnails[0]?.url || "https://placehold.co/600x400/1a1a1a/purple?text=Video+Found",
                videoUrl: format.url,
                format: "mp4"
              };
              const download = await storage.createDownload(processedResult);
              return res.json(download);
            }
          } catch (e) {
            console.error("YTDL failed as well...", e);
          }
        }
      } catch (importErr) {
        console.error("Failed to lazy load ytdl-core:", importErr);
      }

      // --- REAL RAPIDAPI INTEGRATION (Fallback) ---
      const rapidApiKey = process.env.RAPIDAPI_KEY;
      if (rapidApiKey) {
        const response = await fetch("https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink", {
          method: "POST",
          headers: {
            "x-rapidapi-host": "social-download-all-in-one.p.rapidapi.com",
            "x-rapidapi-key": rapidApiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        });

        if (response.ok) {
          const data = await response.json();
          const result = data.result || data;
          const media = result.mediator?.[0] || {};

          const processedResult = {
            originalUrl: url,
            platform: result.platform || "social",
            status: "completed",
            title: result.title || `Video (${new Date().toLocaleTimeString()})`,
            thumbnailUrl: result.thumbnail || "https://placehold.co/600x400/1a1a1a/purple?text=Video+Thumbnail",
            videoUrl: media.link || result.url || url,
            format: media.type || "mp4"
          };

          const download = await storage.createDownload(processedResult);
          return res.json(download);
        }
      } else {
         console.warn("RAPIDAPI_KEY not configured, skipping fallback.");
      }
      
      throw new Error("Could not process video. Service might be busy or URL not supported.");

    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid URL provided" });
      }
      console.error("Download error:", err);
      res.status(500).json({ message: "Failed to process video with real API" });
    }
  });

  // GET /api/downloads
  app.get(api.downloads.list.path, async (req, res) => {
    const history = await storage.getDownloads();
    res.json(history);
  });

  // Seed some initial history if empty - Wrapped in try/catch for safety
  try {
    const existing = await storage.getDownloads();
    if (existing.length === 0) {
      await storage.createDownload({
        originalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        platform: "youtube",
        status: "completed",
        title: "Rick Astley - Never Gonna Give You Up",
        thumbnailUrl: "https://placehold.co/600x400/1a1a1a/purple?text=Rick+Roll",
        videoUrl: "#",
        format: "mp4"
      });
    }
  } catch (err) {
    console.warn("Failed to seed initial history (non-fatal):", err);
  }

  return httpServer;
}
