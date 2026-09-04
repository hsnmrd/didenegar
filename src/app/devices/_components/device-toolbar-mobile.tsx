"use client";

import { CheckIcon, Filter, Search } from "lucide-react";
import * as React from "react";

import { STATUS_OPTIONS } from "@/mock/status";
import { Button } from "@/ui/components/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/ui/components/input-group";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/components/popover";
import { cn } from "@/ui/lib/utils";

export type DeviceToolbarMobileProps = {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedStatus?: string;
  onStatusChange?: (status: string) => void;
};

export function DeviceToolbarMobile({
  searchQuery = "",
  onSearchChange,
  selectedStatus = "All",
  onStatusChange,
}: DeviceToolbarMobileProps) {
  return (
    <div className="flex items-center gap-2">
      <InputGroup className="bg-card border-border/70 h-10 flex-1 rounded-xl px-3.5 shadow-xs transition-colors focus-within:border-sky-500/50">
        <InputGroupInput
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="جستجو..."
          className="placeholder:text-muted-foreground/60 ps-1 pe-2.5 text-xs sm:text-sm"
        />
        <InputGroupAddon
          align="inline-end"
          className="text-muted-foreground/60 pr-0.5 pl-0"
        >
          <Search className="size-4.5" />
        </InputGroupAddon>
      </InputGroup>

      <Popover>
        <PopoverTrigger
          render={
            <Button
              type="button"
              variant="outline"
              size="icon"
              className={cn(
                "border-border/70 bg-card hover:bg-muted/40 size-10 shrink-0 rounded-xl shadow-xs transition-colors",
                selectedStatus !== "All"
                  ? "border-sky-500/50 bg-sky-500/10 text-sky-500 dark:bg-sky-500/20"
                  : "text-muted-foreground",
              )}
              aria-label="فیلتر وضعیت"
            >
              <Filter className="size-4.5" />
            </Button>
          }
        />
        <PopoverContent
          align="start"
          side="bottom"
          sideOffset={6}
          className="border-border/70 bg-popover w-44 rounded-xl p-1.5 shadow-md"
        >
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground px-2 py-1 text-xs font-semibold">
              فیلتر وضعیت
            </span>
            {STATUS_OPTIONS.map((status) => {
              const isSelected = selectedStatus === status.value;
              return (
                <PopoverClose
                  key={status.value}
                  render={
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onStatusChange?.(status.value)}
                      className={cn(
                        "h-8 w-full justify-between rounded-lg px-2.5 text-xs font-medium",
                        isSelected
                          ? "bg-accent text-accent-foreground font-bold"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <span>{status.label}</span>
                      {isSelected && (
                        <CheckIcon className="size-3.5 text-sky-500" />
                      )}
                    </Button>
                  }
                />
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
