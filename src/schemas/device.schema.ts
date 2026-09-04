import { z } from "zod";

export const deviceStatusSchema = z.enum(["Online", "Offline", "Warning"]);
export type DeviceStatus = z.infer<typeof deviceStatusSchema>;

export const createDeviceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "نام دستگاه الزامی است")
    .max(50, "نام دستگاه نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"),
  ip: z
    .string()
    .trim()
    .min(1, "آدرس IP الزامی است")
    .ipv4("فرمت آدرس IPv4 نامعتبر است (مثال: 192.168.1.1)"),
  status: deviceStatusSchema,
});
export type CreateDeviceInput = z.infer<typeof createDeviceSchema>;

export const deviceSchema = createDeviceSchema.extend({
  id: z.string(),
  lastPing: z.coerce.date(),
});
export type Device = z.infer<typeof deviceSchema>;

export const deviceListResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(deviceSchema),
  total: z.number().optional(),
});

export const singleDeviceResponseSchema = z.object({
  success: z.boolean(),
  data: deviceSchema,
});

export const deleteDeviceResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
