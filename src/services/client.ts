import { createMicroApi, MicroApiError } from "micro-rq";

import { toast } from "@/ui/components/toast";

type ApiErrorResponse = {
  error?: string;
};

export const api = createMicroApi({
  name: "didenegar",
  baseUrl: process.env.NEXT_PUBLIC_APP_URL ?? "",
  onError: (error) => {
    if (error instanceof Error && error.name === "AbortError") return;

    if (typeof window !== "undefined") {
      const apiError =
        error instanceof MicroApiError
          ? (error.data as ApiErrorResponse)
          : null;
      const message = apiError?.error || "خطایی در برقراری ارتباط رخ داد";

      toast.add({
        title: "خطا",
        description: message,
        type: "error",
      });
    }
  },
});
