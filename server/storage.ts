// import { db } from "./db";
import { type Download, type InsertDownload } from "@shared/schema";
// import { desc } from "drizzle-orm";

export interface IStorage {
  createDownload(download: InsertDownload): Promise<Download>;
  getDownloads(): Promise<Download[]>;
}

// export class DatabaseStorage implements IStorage {
//   async createDownload(download: InsertDownload): Promise<Download> {
//     const [newDownload] = await db
//       .insert(downloads)
//       .values(download)
//       .returning();
//     return newDownload;
//   }

//   async getDownloads(): Promise<Download[]> {
//     return await db.select().from(downloads).orderBy(desc(downloads.createdAt)).limit(10);
//   }
// }

export class MemStorage implements IStorage {
  private downloads: Download[] = [];
  private idCounter = 1;

  async createDownload(insertDownload: InsertDownload): Promise<Download> {
    const newDownload: Download = {
      ...insertDownload,
      id: this.idCounter++,
      createdAt: new Date(),
    };
    this.downloads.push(newDownload);
    return newDownload;
  }

  async getDownloads(): Promise<Download[]> {
    return this.downloads
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
      .slice(0, 10);
  }
}

export const storage = new MemStorage();
