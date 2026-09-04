import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

import { type DataTableFeatures } from "@/app/devices/_components/list/data-table";
import { DeviceStatusBadge } from "@/app/devices/_components/list/device-status-badge";
import type { Device } from "@/schemas/device.schema";
import { Button } from "@/ui/components/button";
import { formatRelativeTime } from "@/utils/format-relative-time";

const columnHelper = createColumnHelper<DataTableFeatures, Device>();

export function getDeviceColumns(
  onDelete?: (device: Device) => void,
): ColumnDef<DataTableFeatures, Device>[] {
  return columnHelper.columns([
    columnHelper.accessor("name", {
      header: "نام دستگاه",
      cell: ({ row }) => (
        <span className="text-foreground font-bold">
          {row.getValue("name")}
        </span>
      ),
    }),
    columnHelper.accessor("ip", {
      header: "آدرس IP",
      cell: ({ row }) => (
        <span className="text-muted-foreground font-mono text-xs sm:text-sm">
          {row.getValue("ip")}
        </span>
      ),
    }),
    columnHelper.accessor("status", {
      header: "وضعیت",
      cell: ({ row }) => <DeviceStatusBadge status={row.getValue("status")} />,
    }),
    columnHelper.accessor("lastPing", {
      header: "آخرین پینگ",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-xs sm:text-sm">
          {formatRelativeTime(row.getValue("lastPing"))}
        </span>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: () => <div className="text-center">عملیات</div>,
      cell: ({ row }) => {
        const device = row.original;
        return (
          <div className="text-center">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onDelete?.(device)}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 size-8 rounded-lg transition-colors"
              aria-label={`حذف دستگاه ${device.name}`}
              title="حذف دستگاه"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        );
      },
    }),
  ]);
}
