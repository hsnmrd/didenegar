"use client";

import { PlusCircle } from "lucide-react";
import * as React from "react";

import { Button } from "@/ui/components/button";

export type MobileAddDeviceButtonProps = {
  onClick?: () => void;
};

export function MobileAddDeviceButton({ onClick }: MobileAddDeviceButtonProps) {
  return (
    <div className="sticky bottom-4 z-30 mt-auto pt-2">
      <Button
        type="button"
        onClick={onClick}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 text-sm font-bold text-white shadow-lg shadow-sky-500/30 transition-all hover:bg-sky-600 active:scale-95 sm:text-base"
      >
        <span>افزودن دستگاه جدید</span>
        <PlusCircle className="size-5" />
      </Button>
    </div>
  );
}
