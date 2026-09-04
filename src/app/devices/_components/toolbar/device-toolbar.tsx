"use client";

import {
  DeviceToolbarDesktop,
  type DeviceToolbarDesktopProps,
} from "@/app/devices/_components/toolbar/device-toolbar-desktop";
import {
  DeviceToolbarMobile,
  type DeviceToolbarMobileProps,
} from "@/app/devices/_components/toolbar/device-toolbar-mobile";
import { useIsMobile } from "@/ui/hooks/use-mobile";

export type DeviceToolbarProps = DeviceToolbarDesktopProps &
  DeviceToolbarMobileProps;

export function DeviceToolbar(props: DeviceToolbarProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <DeviceToolbarMobile {...props} />;
  }

  return <DeviceToolbarDesktop {...props} />;
}
