import { createMicroApi } from "micro-rq";

export const api = createMicroApi({
  name: "didenegar",
  baseUrl: process.env.NEXT_PUBLIC_APP_URL ?? "",
});
