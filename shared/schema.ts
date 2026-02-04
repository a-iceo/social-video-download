import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const downloads = pgTable("downloads", {
  id: serial("id").primaryKey(),
  originalUrl: text("original_url").notNull(),
  platform: text("platform").notNull(), // 'youtube', 'tiktok', 'instagram', 'other'
  videoUrl: text("video_url"), // The direct download link (if available/cached)
  thumbnailUrl: text("thumbnail_url"),
  title: text("title"),
  format: text("format"), // 'mp4', 'mp3', etc.
  status: text("status").notNull().default("pending"), // 'pending', 'completed', 'failed'
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertDownloadSchema = createInsertSchema(downloads).pick({
  originalUrl: true,
  platform: true,
  status: true,
  title: true,
  thumbnailUrl: true,
  videoUrl: true,
  format: true
});

export type Download = typeof downloads.$inferSelect;
export type InsertDownload = z.infer<typeof insertDownloadSchema>;

export type CreateDownloadRequest = { url: string }; // Simplified request
export type DownloadResponse = Download;
