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

      // --- MOCK LOGIC FOR DOWNLOADER ---
      // In a real app, you would call an external API here (e.g., FastSaverAPI, RapidAPI)
      // Example: const response = await fetch(`https://api.example.com/download?url=${url}&key=${process.env.API_KEY}`);
      
      let platform = "other";
      if (url.includes("youtube.com") || url.includes("youtu.be")) platform = "youtube";
      else if (url.includes("tiktok.com")) platform = "tiktok";
      else if (url.includes("instagram.com")) platform = "instagram";

      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock success response
      const mockResult = {
        originalUrl: url,
        platform,
        status: "completed",
        title: `Video from ${platform} (${new Date().toLocaleTimeString()})`,
        thumbnailUrl: "https://placehold.co/600x400/1a1a1a/purple?text=Video+Thumbnail",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Dummy video for testing
        format: "mp4"
      };

      const download = await storage.createDownload(mockResult);
      res.json(download);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid URL provided" });
      }
      console.error("Download error:", err);
      res.status(500).json({ message: "Failed to process video" });
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
