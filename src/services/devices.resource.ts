import {
  type CreateDeviceInput,
  deleteDeviceResponseSchema,
  type Device,
  deviceListResponseSchema,
  singleDeviceResponseSchema,
} from "@/schemas/device.schema";
import { api } from "@/services/client";

export type DeviceListFilter = {
  q?: string;
  status?: string;
};

export const devicesResource = api.resource("devices", {
  list: api.get<Device[], DeviceListFilter | void>("/api/devices", {
    query: (vars) => {
      if (!vars) return {};
      const params: Record<string, string> = {};
      if (vars.q) params.q = vars.q;
      if (vars.status && vars.status !== "All") params.status = vars.status;
      return params;
    },
    parse: (res) => deviceListResponseSchema.parse(res).data,
  }),

  create: api.post<Device, CreateDeviceInput>("/api/devices", {
    parse: (res) => singleDeviceResponseSchema.parse(res).data,
  }),

  delete: api.delete<{ success: boolean; message: string }, string>(
    (id) => `/api/devices?id=${id}`,
    {
      parse: (res) => deleteDeviceResponseSchema.parse(res),
    },
  ),
});
