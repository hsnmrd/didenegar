import { z } from "zod";

export const deviceStatusSchema = z.enum(["Online", "Offline", "Warning"]);
export type DeviceStatus = z.infer<typeof deviceStatusSchema>;

export const createDeviceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Device name is required")
    .max(50, "Device name cannot exceed 50 characters"),
  ip: z
    .string()
    .trim()
    .min(1, "IP address is required")
    .ipv4("Invalid IPv4 address format (e.g. 192.168.1.1)"),
  status: deviceStatusSchema.default("Online"),
});
export type CreateDeviceInput = z.infer<typeof createDeviceSchema>;

export const deviceSchema = createDeviceSchema.extend({
  id: z.string(),
  lastPing: z.coerce.date(),
});
export type Device = z.infer<typeof deviceSchema>;
