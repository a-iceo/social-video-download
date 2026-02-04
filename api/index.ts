import { registerRoutes } from "../server/routes";
import express, { type Request, Response } from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let routesRegistered = false;

export default async function (req: Request, res: Response) {
  if (!routesRegistered) {
    // Pass null as httpServer since we are in a serverless environment
    await registerRoutes(null as any, app);
    routesRegistered = true;
  }
  app(req, res);
}
