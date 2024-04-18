"use client";

import { useState } from "react";
import { TableHeader, TableCell, TableRow, TableBody, Table, TableHead } from "@/components/ui/table";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, ColumnFiltersState, getFilteredRowModel, } from "@tanstack/react-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
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
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

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

  const getBatchOptions = () => {
    return Array.from(new Set(data.map((winner: any) => winner.batch)));
  };
  
  const batchOptions = getBatchOptions();
  const pathname = usePathname();
  const handleClearSearch = () => {
    location.replace(`${pathname}?query=`);
  };

  // ... your existing helper functions ...

  const toggleDescription = (id: string) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      {/* ... your existing JSX ... */}
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
                    const description = cell.getValue() as string; // Use getValue() for cell value
                    return (
                      <TableCell key={cell.id}>
                        <div className={`description ${isExpanded ? 'expanded' : ''}`}>
                          {isExpanded || description.length < 100
                            ? description
                            : `${description.substring(0, 100)}...`}
                          <span
                            onClick={() => toggleDescription(row.id)}
                            className={`read-more ${isExpanded ? 'hidden' : ''}`}
                            style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                          >
                            Read more
                          </span>
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
