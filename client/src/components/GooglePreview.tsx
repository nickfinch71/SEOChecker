import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface GooglePreviewProps {
  url: string;
  title?: string;
  description?: string;
}

export default function GooglePreview({ url, title, description }: GooglePreviewProps) {
  const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const parts = displayUrl.split('/');
  const domain = parts[0];
  const path = parts.slice(1).join(' › ');

  const titleLength = title?.length || 0;
  const descriptionLength = description?.length || 0;

  const getTitleStatus = () => {
    if (titleLength === 0) return { color: 'destructive', text: 'Missing' };
    if (titleLength < 30) return { color: 'default', text: 'Too Short' };
    if (titleLength > 60) return { color: 'default', text: 'Too Long' };
    return { color: 'default', text: 'Optimal', variant: 'success' };
  };

  const getDescStatus = () => {
    if (descriptionLength === 0) return { color: 'destructive', text: 'Missing' };
    if (descriptionLength < 120) return { color: 'default', text: 'Too Short' };
    if (descriptionLength > 160) return { color: 'default', text: 'Too Long' };
    return { color: 'default', text: 'Optimal', variant: 'success' };
  };

  const titleStatus = getTitleStatus();
  const descStatus = getDescStatus();

  return (
    <Card className="p-6" data-testid="card-google-preview">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <ExternalLink className="h-5 w-5" />
          Google Search Preview
        </h3>
      </div>

      <div className="bg-background rounded-lg p-6 border border-border">
        <div className="mb-2 flex items-baseline gap-2">
          <div className="text-sm text-muted-foreground font-mono">{domain}</div>
          {path && <div className="text-xs text-muted-foreground">› {path}</div>}
        </div>
        
        <div className="mb-2">
          <div className="flex items-start justify-between gap-4 mb-1">
            <h4 className="text-xl text-primary font-normal leading-tight" data-testid="text-google-title">
              {title || "No title tag found"}
            </h4>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={titleStatus.variant as any || titleStatus.color as any} className="text-xs">
              {titleStatus.text}
            </Badge>
            <span className="text-xs text-muted-foreground font-mono">
              {titleLength} / 60 chars
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-google-description">
            {description || "No meta description found. Google will generate one from your page content."}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={descStatus.variant as any || descStatus.color as any} className="text-xs">
              {descStatus.text}
            </Badge>
            <span className="text-xs text-muted-foreground font-mono">
              {descriptionLength} / 160 chars
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        <p><span className="font-semibold">Optimal title:</span> 30-60 characters</p>
        <p><span className="font-semibold">Optimal description:</span> 120-160 characters</p>
      </div>
    </Card>
  );
}
