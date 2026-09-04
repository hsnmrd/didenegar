"use client";

import { type ColumnDef, type RowData, useTable } from "@tanstack/react-table";

import {
  type DataTableFeatures,
  features,
} from "@/app/devices/_components/list/data-table-features";
import { Card } from "@/ui/components/card";
import { Skeleton } from "@/ui/components/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/components/table";

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  isLoading?: boolean;
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  isLoading = false,
}: DataTableProps<TData>) {
  const table = useTable({
    features,
    data,
    columns,
  });

  if (isLoading) {
    return (
      <Card className="border-border/70 bg-card overflow-hidden rounded-2xl border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-border/60 hover:bg-transparent">
              {columns.map((col, i) => (
                <TableHead
                  key={i}
                  className="text-muted-foreground text-right text-xs font-semibold"
                >
                  {typeof col.header === "string" ? col.header : ""}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 4 }).map((_, i) => (
              <TableRow key={i} className="border-border/50">
                <TableCell>
                  <Skeleton className="h-5 w-32 rounded-md" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-24 rounded-md" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-20 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-24 rounded-md" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="mx-auto size-8 rounded-lg" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }

  return (
    <Card className="border-border/70 bg-card overflow-hidden rounded-2xl border p-2 shadow-sm">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-border/60 hover:bg-transparent"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-muted-foreground text-right text-xs font-semibold"
                >
                  {header.isPlaceholder ? null : (
                    <table.FlexRender header={header} />
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="border-border/50 hover:bg-muted/30 transition-colors"
            >
              {row.getAllCells().map((cell) => (
                <TableCell key={cell.id}>
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
