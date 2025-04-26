import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = contactMessageSchema.parse(req.body);
      const savedMessage = await storage.saveContactMessage(validatedData);
      res.status(200).json({ success: true, message: 'Message received successfully', id: savedMessage.id });
    } catch (error) {
      console.error('Error processing contact form:', error);
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Invalid form data'
      });
    }
  });

  // Newsletter subscription endpoint
  app.post('/api/subscribe', async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ success: false, message: 'Email is required' });
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format' });
      }
      
      const subscriber = await storage.addSubscriber({ email });
      res.status(200).json({ success: true, message: 'Subscribed successfully', id: subscriber.id });
    } catch (error) {
      console.error('Error processing subscription:', error);
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Invalid subscription data'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
