import { Bell } from "lucide-react";
import Image from "next/image";

import { ThemeToggle } from "@/app/_components/theme-toggle";
import { Avatar, AvatarFallback } from "@/ui/components/avatar";
import { Button } from "@/ui/components/button";

export function Header() {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="border-border relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-white shadow-sm sm:size-12">
            <Image
              src="/logo.jpg"
              alt="لوگوی دیده‌نگار"
              fill
              sizes="(max-width: 640px) 40px, 48px"
              className="object-contain p-1"
              priority
            />
          </div>
          <h1 className="text-foreground text-base leading-tight font-bold sm:text-lg">
            پنل مانیتورینگ
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Avatar size="lg" className="size-6">
            <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
              م س
            </AvatarFallback>
          </Avatar>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-9 rounded-full sm:size-10"
            aria-label="اعلان‌ها"
          >
            <Bell className="size-4 sm:size-5" />
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
