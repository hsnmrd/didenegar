"use client";

import { useMemo } from "react";

import { getDeviceColumns } from "@/app/devices/_components/columns";
import { DataTable } from "@/app/devices/_components/data-table";
import type { Device } from "@/schemas/device.schema";

type DeviceTableProps = {
  devices?: Device[];
  isLoading?: boolean;
  onDelete?: (device: Device) => void;
};

export function DeviceTable({
  devices,
  isLoading = false,
  onDelete,
}: DeviceTableProps) {
  const columns = useMemo(() => getDeviceColumns(onDelete), [onDelete]);

  return (
    <DataTable columns={columns} data={devices ?? []} isLoading={isLoading} />
  );
}
