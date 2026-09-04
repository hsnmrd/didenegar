import type { LucideIcon } from "lucide-react";
import { AlertTriangle, CheckCircle2, Layers, XCircle } from "lucide-react";

import { Card } from "@/ui/components/card";
import { Skeleton } from "@/ui/components/skeleton";

export type DeviceStats = {
  total: number;
  online: number;
  warning: number;
  offline: number;
};

type StatCardsProps = {
  stats?: DeviceStats;
  isLoading?: boolean;
};

type StatConfig = {
  key: keyof DeviceStats;
  label: string;
  icon: LucideIcon;
  textColor: string;
  labelColor: string;
  iconColor: string;
};

const STAT_CONFIGS: readonly StatConfig[] = [
  {
    key: "total",
    label: "کل دستگاه‌ها",
    icon: Layers,
    textColor: "text-foreground",
    labelColor: "text-muted-foreground",
    iconColor: "text-sky-500 dark:text-sky-400",
  },
  {
    key: "online",
    label: "فعال",
    icon: CheckCircle2,
    textColor: "text-emerald-500 dark:text-emerald-400",
    labelColor: "text-emerald-500 dark:text-emerald-400",
    iconColor: "text-emerald-500 dark:text-emerald-400",
  },
  {
    key: "warning",
    label: "هشدار",
    icon: AlertTriangle,
    textColor: "text-amber-500 dark:text-amber-400",
    labelColor: "text-amber-500 dark:text-amber-400",
    iconColor: "text-amber-500 dark:text-amber-400",
  },
  {
    key: "offline",
    label: "قطعی",
    icon: XCircle,
    textColor: "text-rose-500 dark:text-rose-400",
    labelColor: "text-rose-500 dark:text-rose-400",
    iconColor: "text-rose-500 dark:text-rose-400",
  },
];

export function StatCards({ stats, isLoading = false }: StatCardsProps) {
  if (isLoading) {
    return (
      <section
        aria-label="آمار دستگاه‌ها"
        className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
      >
        {STAT_CONFIGS.map((config) => (
          <Card
            key={config.key}
            className="border-border/70 bg-card flex flex-col justify-between rounded-2xl border p-4 shadow-sm sm:p-5"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-16 rounded-md" />
              <Skeleton className="size-5 rounded-full" />
            </div>
            <div className="mt-4 flex justify-end">
              <Skeleton className="h-8 w-10 rounded-md" />
            </div>
          </Card>
        ))}
      </section>
    );
  }

  return (
    <section
      aria-label="آمار دستگاه‌ها"
      className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
    >
      {STAT_CONFIGS.map((config) => {
        const Icon = config.icon;
        const value = stats?.[config.key] ?? 0;

        return (
          <Card
            key={config.key}
            className="border-border/70 bg-card hover:border-border flex flex-col justify-between rounded-2xl border p-4 shadow-sm transition-all hover:shadow-md sm:p-5"
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-medium sm:text-sm ${config.labelColor}`}
              >
                {config.label}
              </span>
              <Icon className={`size-5 sm:size-6 ${config.iconColor}`} />
            </div>

            <div className="mt-4 flex justify-end">
              <span
                className={`text-2xl font-bold tracking-tight sm:text-3xl ${config.textColor}`}
              >
                {value}
              </span>
            </div>
          </Card>
        );
      })}
    </section>
  );
}
