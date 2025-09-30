import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
      onAnalyze(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-3 w-full">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="url"
            placeholder="Enter website URL (e.g., https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pl-12 text-lg h-14 bg-card border-card-border"
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
