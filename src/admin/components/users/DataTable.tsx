'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { Button } from '@/shared/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/shared/components/ui/pagination';
import { ReactNode, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import * as React from 'react';
import FilterBox from '@/admin/components/users/FilterBox';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  children: ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  children,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const [currentPage, setCurrentPage] = useState(0);

  const handleClickPage = (page: number) => {
    table.setPageIndex(page);
    setCurrentPage(page);
  };

  const handleClickPrevPage = () => {
    setCurrentPage(Math.floor(currentPage / 10) * 10 - 10);
  };
  const handleClickNextPage = () => {
    setCurrentPage(Math.floor(currentPage / 10) * 10 + 10);
  };

  return (
    <div>
      <div className="flex flex-col gap-2 justify-center py-4">
        <FilterBox label="이메일 / 유저ID">
          <Input
            placeholder="Filter emails or userIds..."
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={event =>
              table.getColumn('email')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </FilterBox>
        <FilterBox label="전체 글 수">
          <Input
            placeholder="Input number..."
            value={(table.getColumn('totalPostCount')?.getFilterValue() as number) ?? ''}
            onChange={event =>
              table.getColumn('totalPostCount')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            type="number"
          />
        </FilterBox>
        {children}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="text-center">
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                disabled={currentPage - 10 < 0}
                onClick={handleClickPrevPage}
              >
                <ChevronLeft />
              </Button>
            </PaginationItem>
            {[
              ...new Array(
                Math.floor(currentPage / 10) < Math.floor(table.getPageCount() / 10)
                  ? 10
                  : table.getPageCount() % 10,
              ),
            ].map((v, i) => (
              <PaginationItem key={Math.floor(currentPage / 10) * 10 + i + 1}>
                <Button
                  size="icon"
                  variant={
                    Math.floor(currentPage / 10) * 10 + i !== currentPage
                      ? 'outline'
                      : 'default'
                  }
                  onClick={() => handleClickPage(Math.floor(currentPage / 10) * 10 + i)}
                >
                  {Math.floor(currentPage / 10) * 10 + i + 1}
                </Button>
              </PaginationItem>
            ))}
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                onClick={handleClickNextPage}
                disabled={
                  Math.floor(currentPage / 10) >= Math.floor(table.getPageCount() / 10)
                }
              >
                <ChevronRight />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
