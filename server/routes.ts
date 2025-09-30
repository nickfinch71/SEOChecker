import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { fetchAndAnalyze } from "./seo-analyzer";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // SEO Analysis endpoint
  app.post("/api/analyze", async (req, res) => {
    try {
      const schema = z.object({
        url: z.string().url(),
      });

      const { url } = schema.parse(req.body);

      const result = await fetchAndAnalyze(url);
      res.json(result);
    } catch (error) {
      console.error("Analysis error:", error);
      
      // Differentiate error types for proper status codes
      if (error instanceof z.ZodError) {
        return res.status(422).json({
          error: "Invalid URL format",
        });
      }
      
      if (error instanceof Error) {
        // Network/fetch errors
        if (error.message.includes('Unable to reach') || error.message.includes('timeout')) {
          return res.status(502).json({
            error: error.message,
          });
        }
        // Validation errors (including content type issues)
        if (error.message.includes('not allowed') || 
            error.message.includes('not supported') ||
            error.message.includes('does not return HTML')) {
          return res.status(400).json({
            error: error.message,
          });
        }
      }
      
      res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to analyze URL",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
