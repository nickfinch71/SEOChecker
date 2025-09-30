import { Card } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, XCircle, FileText, Share2, Twitter, Settings } from "lucide-react";
import type { SeoScore } from "@shared/schema";

interface ScoreDashboardProps {
  score: SeoScore;
}

export default function ScoreDashboard({ score }: ScoreDashboardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-chart-1";
    if (score >= 60) return "text-chart-3";
    return "text-chart-4";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return CheckCircle2;
    if (score >= 60) return AlertTriangle;
    return XCircle;
  };

  const categories = [
    { name: "Basic Meta", score: score.categories.basic, icon: FileText },
    { name: "Open Graph", score: score.categories.openGraph, icon: Share2 },
    { name: "Twitter Cards", score: score.categories.twitter, icon: Twitter },
    { name: "Technical", score: score.categories.technical, icon: Settings },
  ];

  const OverallIcon = getScoreIcon(score.overall);

  return (
    <div className="space-y-6">
      <Card className="p-8 hover-elevate">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className={`text-6xl font-bold ${getScoreColor(score.overall)}`}>
              {score.overall}
            </div>
            <div className="text-sm text-muted-foreground mt-1">/ 100</div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <OverallIcon className={`h-6 w-6 ${getScoreColor(score.overall)}`} />
              <h2 className="text-2xl font-semibold" data-testid="text-overall-score">
                Overall SEO Score
              </h2>
            </div>
            <p className="text-muted-foreground">
              {score.overall >= 80 && "Excellent! Your SEO tags are well optimized."}
              {score.overall >= 60 && score.overall < 80 && "Good, but there's room for improvement."}
              {score.overall < 60 && "Needs attention. Several SEO issues detected."}
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.name} className="p-6 hover-elevate" data-testid={`card-category-${category.name.toLowerCase().replace(' ', '-')}`}>
              <div className="flex items-center gap-3 mb-3">
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">{category.name}</h3>
              </div>
              <div className={`text-3xl font-bold ${getScoreColor(category.score)}`}>
                {category.score}
              </div>
              <div className="text-xs text-muted-foreground mt-1">/ 100</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
