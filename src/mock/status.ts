import type { DeviceStatus } from "@/schemas/device.schema";

export type StatusOption = {
  value: DeviceStatus | "All";
  label: string;
};

export const STATUS_OPTIONS: readonly StatusOption[] = [
  { value: "All", label: "همه وضعیت‌ها" },
  { value: "Online", label: "فعال" },
  { value: "Warning", label: "هشدار" },
  { value: "Offline", label: "قطع" },
];

export const DEVICE_FORM_STATUS_OPTIONS: readonly {
  value: DeviceStatus;
  label: string;
}[] = [
  { value: "Online", label: "فعال" },
  { value: "Warning", label: "هشدار" },
  { value: "Offline", label: "قطع" },
];
