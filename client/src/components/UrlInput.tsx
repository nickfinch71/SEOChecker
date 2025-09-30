import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Loader2 } from "lucide-react";

interface UrlInputProps {
  onAnalyze: (url: string) => void;
  isLoading?: boolean;
}

export default function UrlInput({ onAnalyze, isLoading = false }: UrlInputProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      // Auto-prepend https:// if no protocol is specified
      let finalUrl = url.trim();
      if (!finalUrl.match(/^https?:\/\//i)) {
        finalUrl = `https://${finalUrl}`;
      }
      onAnalyze(finalUrl);
    }
  };

  // Check if user has typed their own protocol
  const hasProtocol = url.match(/^https?:\/\//i);
  const showProtocolBadge = !hasProtocol && url.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-3 w-full">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          {showProtocolBadge && (
            <Badge 
              variant="secondary" 
              className="absolute left-12 top-1/2 -translate-y-1/2 ml-2 text-xs font-mono pointer-events-none"
              data-testid="badge-protocol"
            >
              https://
            </Badge>
          )}
          <Input
            type="text"
            placeholder="example.com or https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={`text-lg h-14 bg-card border-card-border ${showProtocolBadge ? 'pl-32' : 'pl-12'}`}
            disabled={isLoading}
            data-testid="input-url"
            required
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="h-14 px-8"
          disabled={isLoading || !url.trim()}
          data-testid="button-analyze"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing
            </>
          ) : (
            "Analyze SEO"
          )}
        </Button>
      </div>
    </form>
  );
}
