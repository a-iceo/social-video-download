
import { z } from "zod";

// Mock schema to avoid drizzle dependency
export const downloads = {
  id: "id",
  originalUrl: "original_url",
  platform: "platform",
  videoUrl: "video_url",
  thumbnailUrl: "thumbnail_url",
  title: "title",
  format: "format",
  status: "status",
  createdAt: "created_at",
};

export const insertDownloadSchema = z.object({
  originalUrl: z.string().url(),
  platform: z.string(),
  status: z.string().default("pending"),
  title: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  format: z.string().optional()
});

export type Download = {
  id: number;
  originalUrl: string;
  platform: string;
  videoUrl?: string | null;
  thumbnailUrl?: string | null;
  title?: string | null;
  format?: string | null;
  status: string;
  createdAt?: Date | null;
};

export type InsertDownload = z.infer<typeof insertDownloadSchema>;

export type CreateDownloadRequest = { url: string }; 
export type DownloadResponse = Download;
