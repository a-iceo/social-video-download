import { db } from "./db";
import { downloads, type Download, type InsertDownload } from "@shared/schema";
import { desc } from "drizzle-orm";

export interface IStorage {
  createDownload(download: InsertDownload): Promise<Download>;
  getDownloads(): Promise<Download[]>;
}

export class DatabaseStorage implements IStorage {
  async createDownload(download: InsertDownload): Promise<Download> {
    const [newDownload] = await db
      .insert(downloads)
      .values(download)
      .returning();
    return newDownload;
  }

  async getDownloads(): Promise<Download[]> {
    return await db.select().from(downloads).orderBy(desc(downloads.createdAt)).limit(10);
  }
}

export const storage = new DatabaseStorage();
