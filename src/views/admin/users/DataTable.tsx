'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
