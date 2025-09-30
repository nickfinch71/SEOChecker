import { type SeoAnalysis } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // SEO analysis storage will be implemented in the backend phase
}

export class MemStorage implements IStorage {
  constructor() {
    // Storage implementation pending
  }
}

export const storage = new MemStorage();
