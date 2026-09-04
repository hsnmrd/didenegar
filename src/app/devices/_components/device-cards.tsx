import { Clock, MoreVertical } from "lucide-react";

import { DeviceStatusBadge } from "@/app/devices/_components/device-status-badge";
import { formatRelativeTime } from "@/app/devices/_lib/format-relative-time";
import type { Device } from "@/schemas/device.schema";
import { Button } from "@/ui/components/button";
import { Card } from "@/ui/components/card";
import { Skeleton } from "@/ui/components/skeleton";

type DeviceCardsProps = {
  devices?: Device[];
  isLoading?: boolean;
};

export function DeviceCards({ devices, isLoading = false }: DeviceCardsProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card
            key={i}
            className="border-border/70 bg-card flex flex-col gap-4 rounded-2xl border p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-28 rounded-md" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>
              <Skeleton className="size-8 rounded-lg" />
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              <Skeleton className="size-3.5 rounded-full" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {devices?.map((device) => (
        <Card
          key={device.id}
          className="border-border/70 bg-card flex flex-col gap-3 rounded-2xl border p-4 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-foreground text-base font-bold">
                  {device.name}
                </span>
                <DeviceStatusBadge status={device.status} />
              </div>
              <span className="text-muted-foreground font-mono text-xs">
                {device.ip}
              </span>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-muted-foreground size-8 rounded-lg"
              aria-label="گزینه‌ها"
            >
              <MoreVertical className="size-4" />
            </Button>
          </div>

          <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <Clock className="size-3.5" />
            <span>{formatRelativeTime(device.lastPing)}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
