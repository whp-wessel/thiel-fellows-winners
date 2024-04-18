"use client";

import { TableHeader, TableCell, TableRow, TableBody, Table, TableHead } from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface WinnersTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  query: string;
}

export default function WinnersTable<TData, TValue>({
  columns,
  data,
  query,
}: WinnersTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  // ... rest of your existing functions ...

  const toggleDescription = (rowId: string) => {
    setExpanded(prev => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  return (
    <>
      {/* ... rest of your existing JSX ... */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {/* ... */}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  if (cell.column.id === 'description') {
                    const isExpanded = expanded[row.id];
                    const description = cell.render('Cell') as string;
                    return (
                      <TableCell key={cell.id}>
                        <div className={`description ${isExpanded ? 'expanded' : ''}`}>
                          {isExpanded || description.length < 100
                            ? description
                            : `${description.substring(0, 100)}...`}
                          <button
                            onClick={() => toggleDescription(row.id)}
                            className={`read-more ${isExpanded ? 'hidden' : ''}`}
                          >
                            Read more
                          </button>
                        </div>
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
