"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Suspense, useMemo, useState } from "react";

import { CreateDeviceDialog } from "@/app/devices/_components/dialogs/create-device-dialog";
import { DeleteDeviceDialog } from "@/app/devices/_components/dialogs/delete-device-dialog";
import { DeviceList } from "@/app/devices/_components/list/device-list";
import { StatCards } from "@/app/devices/_components/stats/stat-cards";
import { DeviceToolbar } from "@/app/devices/_components/toolbar/device-toolbar";
import { MobileAddDeviceButton } from "@/app/devices/_components/toolbar/mobile-add-device-button";
import { useDeviceFilters } from "@/app/devices/_hooks/use-device-filter";
import type { Device } from "@/schemas/device.schema";
import { devicesResource } from "@/services/devices.resource";
import { Skeleton } from "@/ui/components/skeleton";
import { toast } from "@/ui/components/toast";
import { useIsMobile } from "@/ui/hooks/use-mobile";

function DevicesContent() {
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();
  const [deviceToDelete, setDeviceToDelete] = useState<Device | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const {
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    filterVariables,
  } = useDeviceFilters();

  const hasFilter = Boolean(filterVariables.q || filterVariables.status);

  const { data: allDevices, isLoading: isStatsLoading } = useQuery(
    devicesResource.list.toQuery(),
  );

  const { data: filteredDevices, isLoading: isFilteredLoading } = useQuery({
    ...devicesResource.list.toQuery(filterVariables),
    enabled: hasFilter,
  });

  const devices = hasFilter ? filteredDevices : allDevices;
  const isListLoading = hasFilter ? isFilteredLoading : isStatsLoading;

  const deleteMutation = useMutation({
    ...devicesResource.delete.toMutation(),
    onSuccess: (_, deletedId) => {
      queryClient.setQueriesData<Device[]>(
        { queryKey: devicesResource.list.baseKey() },
        (old) => (old ? old.filter((d) => d.id !== deletedId) : []),
      );
      queryClient.invalidateQueries({
        queryKey: devicesResource.list.baseKey(),
      });
      toast.add({
        description: "دستگاه با موفقیت حذف شد",
        type: "success",
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
        onAddDevice={() => setIsCreateOpen(true)}
      />
      <DeviceList
        devices={devices}
        isLoading={isListLoading}
        onDelete={setDeviceToDelete}
      />
      {isMobile && (
        <MobileAddDeviceButton onClick={() => setIsCreateOpen(true)} />
      )}
      <CreateDeviceDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
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
