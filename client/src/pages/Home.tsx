import { useState } from "react";
import UrlInput from "@/components/UrlInput";
import ScoreDashboard from "@/components/ScoreDashboard";
import GooglePreview from "@/components/GooglePreview";
import SocialPreview from "@/components/SocialPreview";
import TagAnalysis from "@/components/TagAnalysis";
import { useToast } from "@/hooks/use-toast";
import type { SeoScore, SeoIssue, SeoAnalysis } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function Home() {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SeoAnalysis | null>(null);
  const [score, setScore] = useState<SeoScore | null>(null);
  const [issues, setIssues] = useState<SeoIssue[]>([]);
  const { toast } = useToast();

  const handleAnalyze = async (url: string) => {
    setAnalyzing(true);
    
    try {
      const response = await apiRequest('POST', '/api/analyze', { url });
      const result = await response.json();

      setAnalysis(result.analysis);
      setScore(result.score);
      setIssues(result.issues);
      
      toast({
        title: "Analysis Complete",
        description: "SEO meta tags have been analyzed successfully.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze URL. Please try again.",
        variant: "destructive",
      });
      console.error('Analysis error:', error);
    } finally {
      setAnalyzing(false);
    }
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

        {analysis && score && !analyzing && (
          <div className="space-y-8">
            <ScoreDashboard score={score} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <GooglePreview
                  url={analysis.url}
                  title={analysis.title}
                  description={analysis.description}
                />
                
                <SocialPreview
                  url={analysis.url}
                  ogTitle={analysis.ogTitle}
                  ogDescription={analysis.ogDescription}
                  ogImage={analysis.ogImage}
                  twitterTitle={analysis.twitterTitle}
                  twitterDescription={analysis.twitterDescription}
                  twitterImage={analysis.twitterImage}
                />
              </div>

              <div>
                <TagAnalysis issues={issues} />
              </div>
            </div>
          </div>
        )}

        {!analysis && !analyzing && (
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
