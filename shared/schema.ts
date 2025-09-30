import { z } from "zod";

// SEO Analysis Types
export const seoAnalysisSchema = z.object({
  url: z.string().url(),
  title: z.string().optional(),
  description: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
  ogType: z.string().optional(),
  twitterCard: z.string().optional(),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  twitterImage: z.string().optional(),
  canonical: z.string().optional(),
  robots: z.string().optional(),
  viewport: z.string().optional(),
});

export type SeoAnalysis = z.infer<typeof seoAnalysisSchema>;

export interface SeoScore {
  overall: number;
  categories: {
    basic: number;
    openGraph: number;
    twitter: number;
    technical: number;
  };
}

export interface SeoIssue {
  type: 'error' | 'warning' | 'success' | 'info';
  category: string;
  message: string;
  tag?: string;
  recommendation?: string;
}
