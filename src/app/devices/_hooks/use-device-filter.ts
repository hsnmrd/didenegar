"use client";

import { useSearchParams } from "next/navigation";
import { debounce, parseAsString, useQueryState } from "nuqs";
import { useMemo } from "react";

export function useDeviceFilters() {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({
      shallow: true,
      limitUrlUpdates: debounce(300),
    }),
  );

  const [selectedStatus, setSelectedStatus] = useQueryState(
    "status",
    parseAsString.withDefault("All").withOptions({
      shallow: true,
    }),
  );

  const committedQ = searchParams.get("q") ?? "";
  const committedStatus = searchParams.get("status") ?? "All";

  const filterVariables = useMemo(() => {
    const trimmed = committedQ.trim();
    return {
      q: trimmed || undefined,
      status: committedStatus !== "All" ? committedStatus : undefined,
    };
  }, [committedQ, committedStatus]);

  return {
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    filterVariables,
  };
}
