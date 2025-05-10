import type { Express } from "express";
import { createServer, type Server } from "http";
import sendEmail from "./sendEmail";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/sendEmail", sendEmail);
  const httpServer = createServer(app);

  return httpServer;
}
