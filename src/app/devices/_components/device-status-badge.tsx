import type { DeviceStatus } from "@/schemas/device.schema";
import { Badge } from "@/ui/components/badge";

const STATUS_MAP = {
  Online: {
    label: "آنلاین",
    badgeClass:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/15",
    dotClass: "bg-emerald-500",
  },
  Warning: {
    label: "هشدار",
    badgeClass:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 hover:bg-amber-500/15",
    dotClass: "bg-amber-500",
  },
  Offline: {
    label: "آفلاین",
    badgeClass:
      "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 hover:bg-rose-500/15",
    dotClass: "bg-rose-500",
  },
} as const;

export function DeviceStatusBadge({ status }: { status: DeviceStatus }) {
  const config = STATUS_MAP[status] ?? STATUS_MAP.Online;

  return (
    <Badge
      variant="outline"
      className={`gap-1.5 rounded-full px-2.5 py-0.5 font-medium ${config.badgeClass}`}
    >
      <span className={`size-1.5 shrink-0 rounded-full ${config.dotClass}`} />
      <span>{config.label}</span>
    </Badge>
  );
}
