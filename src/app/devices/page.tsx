"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { DeleteDeviceDialog } from "@/app/devices/_components/delete-device-dialog";
import { DeviceList } from "@/app/devices/_components/device-list";
import { StatCards } from "@/app/devices/_components/stat-cards";
import type { Device } from "@/schemas/device.schema";
import { devicesResource } from "@/services/devices.resource";

export default function DevicesPage() {
  const queryClient = useQueryClient();
  const [deviceToDelete, setDeviceToDelete] = useState<Device | null>(null);

  const { data: devices, isLoading } = useQuery(devicesResource.list.toQuery());

  const deleteMutation = useMutation({
    ...devicesResource.delete.toMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: devicesResource.list.toQuery().queryKey,
      });
      setDeviceToDelete(null);
    },
  });

  const stats = useMemo(() => {
    if (!devices) return undefined;
    return {
      total: devices.length,
      online: devices.filter((d) => d.status === "Online").length,
      warning: devices.filter((d) => d.status === "Warning").length,
      offline: devices.filter((d) => d.status === "Offline").length,
    };
  }, [devices]);

  const handleDeleteConfirm = () => {
    if (!deviceToDelete) return;
    deleteMutation.mutate(deviceToDelete.id);
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <StatCards stats={stats} isLoading={isLoading} />
      <DeviceList
        devices={devices}
        isLoading={isLoading}
        onDelete={setDeviceToDelete}
      />
      <DeleteDeviceDialog
        device={deviceToDelete}
        isOpen={Boolean(deviceToDelete)}
        isDeleting={deleteMutation.isPending}
        onClose={() => setDeviceToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
