"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Suspense, useMemo, useState } from "react";

import { DeleteDeviceDialog } from "@/app/devices/_components/delete-device-dialog";
import { DeviceList } from "@/app/devices/_components/device-list";
import { DeviceToolbar } from "@/app/devices/_components/device-toolbar";
import { MobileAddDeviceButton } from "@/app/devices/_components/mobile-add-device-button";
import { StatCards } from "@/app/devices/_components/stat-cards";
import { useDeviceFilters } from "@/app/devices/_hooks/use-device-filter";
import type { Device } from "@/schemas/device.schema";
import { devicesResource } from "@/services/devices.resource";
import { Skeleton } from "@/ui/components/skeleton";
import { useIsMobile } from "@/ui/hooks/use-mobile";

function DevicesContent() {
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();
  const [deviceToDelete, setDeviceToDelete] = useState<Device | null>(null);

  const {
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    filterVariables,
  } = useDeviceFilters();

  const { data: allDevices, isLoading: isStatsLoading } = useQuery(
    devicesResource.list.toQuery(),
  );

  const { data: devices, isLoading: isListLoading } = useQuery(
    devicesResource.list.toQuery(filterVariables),
  );

  const deleteMutation = useMutation({
    ...devicesResource.delete.toMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: devicesResource.list.baseKey(),
      });
      setDeviceToDelete(null);
    },
  });

  const stats = useMemo(() => {
    if (!allDevices) return undefined;
    return {
      total: allDevices.length,
      online: allDevices.filter((d) => d.status === "Online").length,
      warning: allDevices.filter((d) => d.status === "Warning").length,
      offline: allDevices.filter((d) => d.status === "Offline").length,
    };
  }, [allDevices]);

  const handleDeleteConfirm = () => {
    if (!deviceToDelete) return;
    deleteMutation.mutate(deviceToDelete.id);
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <StatCards stats={stats} isLoading={isStatsLoading} />
      <DeviceToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />
      <DeviceList
        devices={devices}
        isLoading={isListLoading}
        onDelete={setDeviceToDelete}
      />
      {isMobile && <MobileAddDeviceButton />}
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

export default function DevicesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-2xl" />
            ))}
          </div>
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      }
    >
      <DevicesContent />
    </Suspense>
  );
}
