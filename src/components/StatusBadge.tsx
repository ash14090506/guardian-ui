import { cn } from "@/lib/utils";
import { CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react";

type Status = "approved" | "flagged" | "rejected" | "pending";

interface StatusBadgeProps {
  status: Status;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

const statusConfig: Record<
  Status,
  { label: string; className: string; icon: typeof CheckCircle }
> = {
  approved: {
    label: "Approved",
    className: "bg-success/10 text-success border-success/20",
    icon: CheckCircle,
  },
  flagged: {
    label: "Flagged",
    className: "bg-warning/10 text-warning border-warning/20",
    icon: AlertTriangle,
  },
  rejected: {
    label: "Rejected",
    className: "bg-destructive/10 text-destructive border-destructive/20",
    icon: XCircle,
  },
  pending: {
    label: "Pending",
    className: "bg-muted text-muted-foreground border-border",
    icon: Clock,
  },
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs gap-1",
  md: "px-3 py-1 text-sm gap-1.5",
  lg: "px-4 py-1.5 text-base gap-2",
};

const iconSizes = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export function StatusBadge({ status, size = "md", showIcon = true }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        config.className,
        sizeClasses[size]
      )}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      {config.label}
    </span>
  );
}
