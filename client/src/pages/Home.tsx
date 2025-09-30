import { useState } from "react";
import UrlInput from "@/components/UrlInput";
import ScoreDashboard from "@/components/ScoreDashboard";
import GooglePreview from "@/components/GooglePreview";
import SocialPreview from "@/components/SocialPreview";
import TagAnalysis from "@/components/TagAnalysis";
import type { SeoScore, SeoIssue } from "@shared/schema";

export default function Home() {
  const [analyzing, setAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  // TODO: remove mock functionality - this will be replaced with real API calls
  const mockScore: SeoScore = {
    overall: 72,
    categories: {
      basic: 80,
      openGraph: 65,
      twitter: 60,
      technical: 85,
    },
  };

  const mockIssues: SeoIssue[] = [
    {
      type: 'success',
      category: 'Basic Meta Tags',
      message: 'Title tag is present and optimal length',
      tag: '<title>SEO Best Practices Guide - Complete Tutorial 2024</title>',
    },
    {
      type: 'warning',
      category: 'Basic Meta Tags',
      message: 'Meta description is slightly too long',
      tag: '<meta name="description" content="Learn comprehensive SEO best practices...">',
      recommendation: 'Keep meta descriptions between 120-160 characters for optimal display in search results.',
    },
    {
      type: 'success',
      category: 'Open Graph Tags',
      message: 'og:title is present',
      tag: '<meta property="og:title" content="SEO Best Practices Guide">',
    },
    {
      type: 'success',
      category: 'Open Graph Tags',
      message: 'og:description is present',
      tag: '<meta property="og:description" content="Complete guide to SEO...">',
    },
    {
      type: 'error',
      category: 'Open Graph Tags',
      message: 'og:image is missing',
      tag: '<meta property="og:image" content="https://example.com/image.jpg">',
      recommendation: 'Add an Open Graph image with recommended dimensions of 1200x630px for optimal social media sharing.',
    },
    {
      type: 'warning',
      category: 'Twitter Cards',
      message: 'twitter:card type not specified',
      tag: '<meta name="twitter:card" content="summary_large_image">',
      recommendation: 'Specify a Twitter card type. Use "summary_large_image" for articles and blog posts.',
    },
    {
      type: 'info',
      category: 'Twitter Cards',
      message: 'Using fallback Open Graph tags for Twitter',
      recommendation: 'While Twitter will use og: tags as fallback, adding dedicated twitter: tags provides better control.',
    },
    {
      type: 'success',
      category: 'Technical Tags',
      message: 'Viewport meta tag is properly configured',
      tag: '<meta name="viewport" content="width=device-width, initial-scale=1">',
    },
    {
      type: 'success',
      category: 'Technical Tags',
      message: 'Canonical URL is specified',
      tag: '<link rel="canonical" href="https://example.com/seo-guide">',
    },
  ];

  const handleAnalyze = (url: string) => {
    console.log('Analyzing URL:', url);
    setAnalyzing(true);
    
    // TODO: remove mock functionality - simulate API call
    setTimeout(() => {
      setAnalyzing(false);
      setHasAnalyzed(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3" data-testid="text-page-title">
            SEO Meta Tag Analyzer
          </h1>
          <p className="text-lg text-muted-foreground">
            Analyze your website's SEO tags and see how they appear in Google and social media
          </p>
        </div>

        <div className="mb-12">
          <UrlInput onAnalyze={handleAnalyze} isLoading={analyzing} />
        </div>

        {analyzing && (
          <div className="flex items-center justify-center py-24">
            <div className="text-center space-y-4">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
              <p className="text-muted-foreground">Fetching and analyzing meta tags...</p>
            </div>
          </div>
        )}

        {hasAnalyzed && !analyzing && (
          <div className="space-y-8">
            <ScoreDashboard score={mockScore} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <GooglePreview
                  url="https://example.com/seo-best-practices"
                  title="SEO Best Practices Guide - Complete Tutorial 2024"
                  description="Learn comprehensive SEO best practices with our step-by-step guide. Includes practical tips for beginners and advanced techniques for experienced marketers."
                />
                
                <SocialPreview
                  url="https://example.com/seo-best-practices"
                  ogTitle="SEO Best Practices Guide"
                  ogDescription="Learn comprehensive SEO best practices with our step-by-step guide for 2024"
                  ogImage="https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=1200&h=630&fit=crop"
                />
              </div>

              <div>
                <TagAnalysis issues={mockIssues} />
              </div>
            </div>
          </div>
        )}

        {!hasAnalyzed && !analyzing && (
          <div className="text-center py-24">
            <div className="inline-block p-6 rounded-full bg-muted/50 mb-6">
              <svg
                className="h-16 w-16 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Ready to analyze</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Enter a website URL above to analyze its SEO meta tags and see visual previews
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
