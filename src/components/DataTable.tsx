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
  TextField,
  Box,
  Typography,
} from "@mui/material";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowsPerPageOptions?: number[];
  title?: string;
}

const DataTable = <TData, TValue>({
  title,
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
  const [globalFilter, setGlobalFilter] = useState("");

  // with filter
  // const columnsWithIndex: ColumnDef<TData, TValue>[] = [
  //   {
  //     id: "sno",
  //     header: "S.No.",
  //     cell: ({ row, table }) => {
  //       const { pageIndex, pageSize } = table.getState().pagination;
  //       const rowNumber =
  //         pageIndex * pageSize + table.getRowModel().rows.indexOf(row) + 1;
  //       return rowNumber;
  //     },
  //   },
  //   ...columns,
  // ];

  const columnsWithIndex: ColumnDef<TData, TValue>[] = [
    {
      id: "sno",
      header: "S.No.",
      cell: ({ row, table }) => {
        const data = table.options.data; // original, unfiltered data
        const originalIndex = data.indexOf(row.original);
        return originalIndex + 1;
      },
    },
    ...columns,
  ];

  const table = useReactTable({
    data,
    columns: columnsWithIndex,
    state: {
      sorting,
      globalFilter,
      pagination: { pageIndex, pageSize },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
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
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          borderRadius: 3,
          overflowX: "auto",
          width: "100%",
          p: 1,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            px: 3,
            py: 2,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ flex: 1 }} />

          <Typography
            variant="h6"
            fontWeight={700}
            color="primary.main"
            textAlign="center"
            sx={{
              flex: 2,
              textTransform: "uppercase",
              letterSpacing: 0.7,
            }}
          >
            {title}
          </Typography>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 1,
              minWidth: 250,
            }}
          >
            <SearchOutlinedIcon color="primary" />
            <TextField
              label="Search..."
              variant="outlined"
              size="small"
              value={globalFilter ?? ""}
              onChange={(e) => table.setGlobalFilter(e.target.value)}
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                borderRadius: 1,
              }}
            />
          </Box>
        </Box>

        <Table
          sx={{
            borderCollapse: "collapse",
            "& th, & td": {
              borderRight: "1px solid rgba(224, 224, 224, 0.6)",
            },
            "& th:last-child, & td:last-child": {
              borderRight: "none",
            },
          }}
        >
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
        count={table.getFilteredRowModel().rows.length}
        page={pageIndex}
        onPageChange={(_e, newPage) => setPageIndex(newPage)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(e) => {
          setPageSize(parseInt(e.target.value, 10));
          setPageIndex(0);
        }}
        rowsPerPageOptions={rowsPerPageOptions}
        sx={{
          mt: 1,
          width: "100%",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          bgcolor: "primary.dark",
          color: "#fff",
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      />
    </>
  );
};

export default DataTable;
