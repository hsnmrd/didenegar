"use client";

import { ServerOff } from "lucide-react";

import { DeviceCards } from "@/app/devices/_components/list/device-cards";
import { DeviceTable } from "@/app/devices/_components/list/device-table";
import type { Device } from "@/schemas/device.schema";
import { Card } from "@/ui/components/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/ui/components/empty";
import { useIsMobile } from "@/ui/hooks/use-mobile";

type DeviceListProps = {
  devices?: Device[];
  isLoading?: boolean;
  onDelete?: (device: Device) => void;
};

export function DeviceList({
  devices,
  isLoading = false,
  onDelete,
}: DeviceListProps) {
  const isMobile = useIsMobile();

  if (!isLoading && (!devices || devices.length === 0)) {
    return (
      <Card className="border-border/70 bg-card rounded-2xl border p-8 shadow-sm">
        <Empty>
          <EmptyMedia variant="icon">
            <ServerOff className="text-muted-foreground size-5" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>دستگاهی یافت نشد</EmptyTitle>
            <EmptyDescription>
              هیچ دستگاهی با مشخصات مورد نظر پیدا نشد یا لیست خالی است.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Card>
    );
  }

  if (isMobile) {
    return (
      <DeviceCards
        devices={devices}
        isLoading={isLoading}
        onDelete={onDelete}
      />
    );
  }

  return (
    <DeviceTable devices={devices} isLoading={isLoading} onDelete={onDelete} />
  );
}
