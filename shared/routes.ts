import { z } from "zod";
import { insertDownloadSchema, type Download } from "./schema";

export const api = {
  downloads: {
    process: {
      method: "POST" as const,
      path: "/api/downloads/process",
      input: z.object({
        url: z.string().url(),
      }),
      responses: {
        200: z.custom<Download>(), // Returns the processed download entry
        400: z.object({ message: z.string() }),
      },
    },
    list: {
      method: "GET" as const,
      path: "/api/downloads",
      responses: {
        200: z.array(z.custom<Download>()),
      },
    },
  },
};
