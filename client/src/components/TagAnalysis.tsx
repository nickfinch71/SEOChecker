import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";
import type { SeoIssue } from "@shared/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface TagAnalysisProps {
  issues: SeoIssue[];
}

export default function TagAnalysis({ issues }: TagAnalysisProps) {
  const groupedIssues = issues.reduce((acc, issue) => {
    if (!acc[issue.category]) {
      acc[issue.category] = [];
    }
    acc[issue.category].push(issue);
    return acc;
  }, {} as Record<string, SeoIssue[]>);

  const getIcon = (type: SeoIssue['type']) => {
    switch (type) {
      case 'success':
        return CheckCircle2;
      case 'error':
        return XCircle;
      case 'warning':
        return AlertTriangle;
      default:
        return Info;
    }
  };

  const getIconColor = (type: SeoIssue['type']) => {
    switch (type) {
      case 'success':
        return 'text-chart-1';
      case 'error':
        return 'text-chart-4';
      case 'warning':
        return 'text-chart-3';
      default:
        return 'text-chart-2';
    }
  };

  const getBadgeVariant = (type: SeoIssue['type']) => {
    switch (type) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="p-6" data-testid="card-tag-analysis">
      <h3 className="text-lg font-semibold mb-4">Detailed Analysis</h3>

      <Accordion type="multiple" className="w-full" defaultValue={Object.keys(groupedIssues)}>
        {Object.entries(groupedIssues).map(([category, categoryIssues]) => {
          const errorCount = categoryIssues.filter(i => i.type === 'error').length;
          const warningCount = categoryIssues.filter(i => i.type === 'warning').length;

          return (
            <AccordionItem key={category} value={category}>
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{category}</span>
                  <div className="flex gap-2">
                    {errorCount > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {errorCount} {errorCount === 1 ? 'error' : 'errors'}
                      </Badge>
                    )}
                    {warningCount > 0 && (
                      <Badge variant="default" className="text-xs">
                        {warningCount} {warningCount === 1 ? 'warning' : 'warnings'}
                      </Badge>
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  {categoryIssues.map((issue, idx) => {
                    const Icon = getIcon(issue.type);
                    return (
                      <div
                        key={idx}
                        className="flex gap-3 p-4 bg-card rounded-lg border border-card-border"
                        data-testid={`issue-${issue.type}-${idx}`}
                      >
                        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${getIconColor(issue.type)}`} />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-medium">{issue.message}</p>
                            <Badge variant={getBadgeVariant(issue.type)} className="text-xs flex-shrink-0">
                              {issue.type}
                            </Badge>
                          </div>
                          {issue.tag && (
                            <code className="text-xs bg-muted px-2 py-1 rounded font-mono block">
                              {issue.tag}
                            </code>
                          )}
                          {issue.recommendation && (
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium">Recommendation:</span> {issue.recommendation}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Card>
  );
}
