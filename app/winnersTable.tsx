export default function WinnersTable<TData, TValue>({
    columns,
    data,
    query,
}: WinnersTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    );

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

    // Simplified to only include batches 1 to 13
    const batchOptions = Array.from({ length: 13 }, (_, i) => (i + 1).toString());

    const pathname = usePathname();
    const handleClearSearch = () => {
        location.replace(`${pathname}?query=`);
    };

    return (
        <>
            <div className="flex items-center justify-start">
                <div className="mb-4 w-1/4 mr-8">
                    <Input
                        placeholder="Search by name..."
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>
                <div className="mb-4 w-1/4 mr-8">
                    <Select
                        onValueChange={(value) => {
                            table.getColumn("batch")?.setFilterValue(value);
                        }}
                        defaultValue={(table.getColumn("batch")?.getFilterValue() as string) ?? ""}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Choose class..." />
                        </SelectTrigger>
                        <SelectContent>
                        {batchOptions.map((option) => (
                            <SelectItem key={option} value={option}>{`Class ${option}`}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="mb-4 text-gray-500 text-sm mr-2">
                    {query !== '' && (
                        <>
                            Showing top 20 results for &ldquo;{query}&rdquo; by similarity.
                            <span className="underline cursor-pointer ml-2" onClick={handleClearSearch}>
                                Click to clear search.
                            </span>
                        </>
                    )}
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
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
