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

      // --- REAL RAPIDAPI INTEGRATION ---
      const rapidApiKey = process.env.RAPIDAPI_KEY;
      if (!rapidApiKey) {
        throw new Error("RAPIDAPI_KEY is not configured");
      }

      const response = await fetch("https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink", {
        method: "POST",
        headers: {
          "x-rapidapi-host": "social-download-all-in-one.p.rapidapi.com",
          "x-rapidapi-key": rapidApiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("RapidAPI Error:", errorData);
        throw new Error(`RapidAPI responded with status: ${response.status}`);
      }

      const data = await response.json();
      
      // The API typically returns a list of media options or a direct link
      // Structure: { result: { title, thumbnail, duration, mediator: [ { link, quality, type } ] } }
      // Adjusting based on common RapidAPI social downloader responses
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
      res.json(download);
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

  // Seed some initial history if empty
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

  return httpServer;
}
