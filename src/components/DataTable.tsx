import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowsPerPageOptions?: number[];
}
const DataTable = <TData, TValue>({
  columns,
  data,
  rowsPerPageOptions = [5, 10, 25],
}: DataTableProps<TData, TValue>) => {
  type ColumnSort = {
    id: string;
    desc: boolean;
  };
  type SortingState = ColumnSort[];
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(rowsPerPageOptions[0] ?? 5);
  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination: { pageIndex, pageSize } },
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newState.pageIndex ?? 0);
      setPageSize(newState.pageSize ?? 5);
    },

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          borderRadius: 2,
          overflowX: "auto",
          width: "100%",
        }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "primary.dark" }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    align="center"
                    sx={{
                      fontWeight: 600,
                      cursor: header.column.getCanSort()
                        ? "pointer"
                        : "default",
                      color: "#fff",
                      // "&:hover": {
                      //   color: header.column.getCanSort()
                      //     ? "primary.main"
                      //     : "inherit",
                      // },
                    }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted()
                      ? header.column.getIsSorted() === "asc"
                        ? " 🔼"
                        : " 🔽"
                      : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{
                    "&:nth-of-type(odd)": { bgcolor: "#fafafa" },
                    "&:hover": { bgcolor: "#f1f7ff" },
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} align="center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{ py: 3 }}
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data.length}
        page={pageIndex}
        onPageChange={(_e, newPage) => setPageIndex(newPage)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(e) => {
          setPageSize(parseInt(e.target.value, 10));
          setPageIndex(0);
        }}
        rowsPerPageOptions={rowsPerPageOptions}
        sx={{
          color: "#fff",
          mt: 1,
          alignSelf: "flex-end",
          width: "100%",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          bgcolor: "primary.dark",
        }}
      />
    </>
  );
};

export default DataTable;
