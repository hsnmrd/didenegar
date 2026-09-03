"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { Button } from "@/ui/components/button";
import { Skeleton } from "@/ui/components/skeleton";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return <Skeleton className="size-9 rounded-full sm:size-10" />;
  }

  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="size-9 rounded-full sm:size-10"
      aria-label={isDark ? "تغییر به حالت روشن" : "تغییر به حالت تیره"}
      title={isDark ? "حالت روشن" : "حالت تیره"}
    >
      {isDark ? (
        <Sun className="size-4 text-amber-400 sm:size-5" />
      ) : (
        <Moon className="size-4 text-slate-700 sm:size-5" />
      )}
    </Button>
  );
}
