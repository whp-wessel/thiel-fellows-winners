"use client"

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
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

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

    function toggleRowExpansion(rowId: string) {
        setExpandedRows((prevExpandedRows) => {
            const newExpandedRows = new Set(prevExpandedRows);
            if (newExpandedRows.has(rowId)) {
                newExpandedRows.delete(rowId);
            } else {
                newExpandedRows.add(rowId);
            }
            return newExpandedRows;
        });
    }

    return (
        <>
            {/* ... rest of your component */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {/* ... table header rendering */}
                    </TableHeader>
                    <TableBody>
                    <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => {
                            // Use cell.getValue() to access the cell's value
                            const cellValue = cell.getValue();
                            if (cell.column.id === 'description') {
                                const isExpanded = expandedRows.has(row.id);
                                return (
                                <TableCell key={cell.id}>
                                    <div className={`description ${isExpanded ? 'expanded' : ''}`}>
                                    {isExpanded ? cellValue : `${String(cellValue).substring(0, 100)}...`}
                                    <span
                                        className={`read-more ${isExpanded ? 'hidden' : ''}`}
                                        onClick={() => toggleRowExpansion(row.id)}
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
                        ))
                    ) : (
                        <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
