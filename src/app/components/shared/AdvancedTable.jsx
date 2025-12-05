'use client';
import { Box, Divider, IconButton, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { IconArrowsSort, IconSortAscending2, IconSortDescending2 } from '@tabler/icons-react';
import * as React from 'react';

import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from '@tabler/icons-react';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

const AdvancedTable = ({ tableData, columns, searchQuery, globalFilterFn: customGlobalFilterFn }) => {

    const basics = tableData;

    const [data, _setData] = React.useState(() => [...basics]);
    const [columnFilters, setColumnFilters] = React.useState([])
    const [globalFilter, setGlobalFilter] = React.useState('');

    const [showPage, setShowPage] = React.useState(1);
    const [tablePageIndex, setTablePageIndex] = React.useState(0);
    const [tableItemPerPage, setTableItemPerPage] = React.useState(10);

    // Agar custom function aaye to use karo, warna default simple search
    const defaultGlobalFilterFn = (row, columnId, filterValue) => {
        const value = (filterValue || '').toLowerCase().trim();
        if (!value) return true;

        // Default: saare fields ko flat string bana do, check karo
        return Object.values(row.original)
            .filter(v => typeof v === "string" && v)
            .some(field => field.toLowerCase().includes(value));
    };

    const globalFilterFn = customGlobalFilterFn || defaultGlobalFilterFn;

    const table = useReactTable({
        data,
        columns,
        filterFns: {},
        state: {
            columnFilters,
            pagination: {
                pageIndex: tablePageIndex,
                pageSize: tableItemPerPage,
            },
            globalFilter,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        globalFilterFn,
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    });

    const handleInputChange = (event) => {
        const value = Number(event.target.value);
        setShowPage(value);

        if (value === '') {
            setTablePageIndex(0);
        }
        if (value < 0) {
            setShowPage(1);
            setTablePageIndex(0);
        }
        else {
            const numberValue = parseInt(value, 10) - 1;
            setTablePageIndex(isNaN(numberValue) ? 0 : numberValue);
        }
    };


    React.useEffect(() => {
        setGlobalFilter(searchQuery);
    }, [searchQuery]);

    return (
        <>
            <TableContainer >
                <Table sx={{ whiteSpace: 'nowrap' }}>
                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableCell key={header.id} sx={{ p: 1 }}>
                                        <Typography
                                            variant="subtitle1"
                                            {...{
                                                className: header.column.getCanSort()
                                                    ? 'cursor-pointer select-none'
                                                    : '',
                                                onClick: header.column.getToggleSortingHandler(),
                                            }}
                                            sx={{ mb: 0, p: 0, fontWeight: 700, fontSize: "11px", textTransform: 'uppercase' }}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {
                                                        header.column.id !== 'sno' && header.column.id !== 'actions' && header.column.id !== 'result' && header.column.id !== 'gst' && (
                                                            header.column.getIsSorted() === 'asc' ? (
                                                                <IconSortAscending2 size={12} style={{ marginLeft: 8 }} />
                                                            ) : header.column.getIsSorted() === 'desc' ? (
                                                                <IconSortDescending2 size={12} style={{ marginLeft: 8 }} />
                                                            ) : (
                                                                <IconArrowsSort size={12} style={{ marginLeft: 8 }} />
                                                            )
                                                        )
                                                    }
                                                </div>
                                            )}
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} sx={{ px: 1, py: 0.5 }}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    <Typography variant="body1" color="textSecondary">
                                        No Data Available
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Divider />
            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 1, px: 1, py: 0.6, alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body1">{table.getPrePaginationRowModel().rows.length} Rows</Typography>
                </Box>
                <Box
                    sx={{ alignItems: "center", gap: 1, display: { xs: 'block', sm: 'flex' } }}>

                    <Stack
                        direction="row"
                        sx={{ alignItems: "center", gap: 1, }}>
                        <Typography variant="body1">Page</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {table.getState().pagination.pageIndex + 1} of{' '}
                            {table.getPageCount()}
                        </Typography>
                    </Stack>
                    <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
                        <Typography variant="body1">| Go to page:</Typography>
                        <TextField
                            type="number"
                            value={showPage === 0 ? "" : showPage}
                            onChange={handleInputChange}
                            sx={{
                                width: '40px',
                                '& .MuiOutlinedInput-root': {
                                    padding: '2px 0 2px 5px',
                                    borderRadius: '3px'
                                },
                                '& .MuiOutlinedInput-input': {
                                    padding: '2px 5px'
                                },
                            }}
                        />
                    </Stack>
                    <Select
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            setTableItemPerPage(Number(e.target.value));
                        }}
                        sx={{
                            width: '65px',
                            padding: '2px 0 2px 5px',
                            borderRadius: '3px',
                            '& .MuiOutlinedInput-root': {
                                padding: '2px 0 2px 5px',
                            },
                            '& .MuiSelect-select': {
                                padding: '2px 0 2px 5px',
                            },
                        }}
                    >
                        {[3, 5, 10, 20, 25].map(pageSize => (
                            <MenuItem key={pageSize} value={pageSize}>
                                {pageSize}
                            </MenuItem>
                        ))}
                    </Select>
                    <IconButton size='small'
                        onClick={() => setTablePageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <IconChevronsLeft size={15} />
                    </IconButton>
                    <IconButton size='small'
                        onClick={() => setTablePageIndex(tablePageIndex - 1)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <IconChevronLeft size={15} />
                    </IconButton>
                    <IconButton size='small'
                        onClick={() => setTablePageIndex(tablePageIndex + 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <IconChevronRight size={15} />
                    </IconButton>
                    <IconButton size='small'
                        onClick={() => setTablePageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <IconChevronsRight size={15} />
                    </IconButton>
                </Box>

            </Stack>
        </>
    );
};

export default AdvancedTable;