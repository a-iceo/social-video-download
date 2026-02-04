import { registerRoutes } from "../server/routes";
import express, { type Request, Response } from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let routesRegistered = false;

export default async function (req: Request, res: Response) {
  try {
    if (!routesRegistered) {
      // Pass null as httpServer since we are in a serverless environment
      await registerRoutes(null as any, app);
      
      // Global error handler for JSON responses
      app.use((err: any, _req: Request, res: Response, _next: any) => {
        console.error("Global API Error:", err);
        res.status(500).json({ message: "Internal Server Error", details: err.message || String(err) });
      });
      
      routesRegistered = true;
    }
    app(req, res);
  } catch (err) {
    console.error("Serverless Initialization Error:", err);
    res.status(500).json({ message: "Server Initialization Failed", details: err instanceof Error ? err.message : String(err) });
  }
}
