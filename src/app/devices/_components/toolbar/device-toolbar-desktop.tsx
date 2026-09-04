"use client";

import { PlusCircle, Search } from "lucide-react";
import * as React from "react";

import { STATUS_OPTIONS } from "@/mock/status";
import { Button } from "@/ui/components/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/ui/components/combobox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/ui/components/input-group";

export type DeviceToolbarDesktopProps = {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedStatus?: string;
  onStatusChange?: (status: string) => void;
  onAddDevice?: () => void;
};

export function DeviceToolbarDesktop({
  searchQuery = "",
  onSearchChange,
  selectedStatus = "All",
  onStatusChange,
  onAddDevice,
}: DeviceToolbarDesktopProps) {
  const currentStatus =
    STATUS_OPTIONS.find((s) => s.value === selectedStatus) ?? STATUS_OPTIONS[0];

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Search Input and Status Combobox (right side in RTL) */}
      <div className="flex items-center gap-3">
        <InputGroup className="bg-card border-border/70 h-10 w-72 rounded-xl px-3.5 shadow-xs transition-colors focus-within:border-sky-500/50">
          <InputGroupInput
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="جستجوی دستگاه (نام یا IP)..."
            className="placeholder:text-muted-foreground/60 ps-1 pe-2.5 text-xs sm:text-sm"
          />
          <InputGroupAddon
            align="inline-end"
            className="text-muted-foreground/60 pr-0.5 pl-0"
          >
            <Search className="size-4.5" />
          </InputGroupAddon>
        </InputGroup>

        <Combobox
          items={STATUS_OPTIONS}
          value={currentStatus}
          onValueChange={(val) => {
            if (val) onStatusChange?.(val.value);
          }}
        >
          <ComboboxTrigger
            render={
              <Button
                type="button"
                variant="outline"
                className="border-border/70 bg-card hover:bg-muted/40 text-foreground h-10 min-w-[130px] justify-between gap-2 rounded-xl px-3.5 text-xs font-normal shadow-xs transition-colors sm:text-sm"
              />
            }
          >
            <ComboboxValue>
              {(val) => (val ? val.label : currentStatus.label)}
            </ComboboxValue>
          </ComboboxTrigger>
          <ComboboxContent
            align="start"
            className="border-border/70 bg-popover w-36 rounded-xl p-1 shadow-md"
          >
            <ComboboxList>
              {STATUS_OPTIONS.map((status) => (
                <ComboboxItem
                  key={status.value}
                  value={status}
                  className="rounded-lg text-xs font-medium sm:text-sm"
                >
                  {status.label}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>

      <Button
        type="button"
        onClick={onAddDevice}
        className="h-10 gap-2 rounded-xl bg-sky-500 px-4 text-xs font-semibold text-white shadow-sm shadow-sky-500/25 transition-all hover:bg-sky-600 active:scale-95 sm:text-sm"
      >
        <span>افزودن دستگاه جدید</span>
        <PlusCircle className="size-4.5" />
      </Button>
    </div>
  );
}
