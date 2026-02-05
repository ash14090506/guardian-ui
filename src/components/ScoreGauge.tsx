import { cn } from "@/lib/utils";

interface ScoreGaugeProps {
  label: string;
  score: number;
  description?: string;
}

export function ScoreGauge({ label, score, description }: ScoreGaugeProps) {
  const percentage = Math.round(score * 100);
  
  const getColor = (score: number) => {
    if (score < 0.3) return "bg-success";
    if (score < 0.7) return "bg-warning";
    return "bg-destructive";
  };

  const getTextColor = (score: number) => {
    if (score < 0.3) return "text-success";
    if (score < 0.7) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className={cn("text-sm font-bold", getTextColor(score))}>
          {percentage}%
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all duration-500", getColor(score))}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
