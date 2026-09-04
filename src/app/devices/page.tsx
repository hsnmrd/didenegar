"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { DeviceList } from "@/app/devices/_components/device-list";
import { StatCards } from "@/app/devices/_components/stat-cards";
import { devicesResource } from "@/services/devices.resource";

export default function DevicesPage() {
  const { data: devices, isLoading } = useQuery(devicesResource.list.toQuery());

  const stats = useMemo(() => {
    if (!devices) return undefined;
    return {
      total: devices.length,
      online: devices.filter((d) => d.status === "Online").length,
      warning: devices.filter((d) => d.status === "Warning").length,
      offline: devices.filter((d) => d.status === "Offline").length,
    };
  }, [devices]);

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <StatCards stats={stats} isLoading={isLoading} />
      <DeviceList devices={devices} isLoading={isLoading} />
    </div>
  );
}
