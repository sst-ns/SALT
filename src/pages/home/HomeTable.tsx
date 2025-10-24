import { useMemo } from "react";
import { Box, Button, Typography } from "@mui/material";
import DataTable from "../../components/DataTable";
import BorderColorIcon from "@mui/icons-material/BorderColor";

type TableData = {
  id: number;
  skillGroup: string;
  date: string;
  r1: number | string;
  r2: number | string;
  r3: number | string;
  r4: number | string;
  agentName: string;
  shift: string;
};

const HomeTable = () => {
  const data = useMemo(
    () => [
      {
        id: 1,
        skillGroup: "ERP",
        date: "23.10.2025",
        r1: 0,
        r2: 0,
        r3: 0,
        r4: 0,
        agentName: "ONLINE",
        shift: "DAY",
      },
      {
        id: 2,
        skillGroup: "EWM",
        date: "23.10.2025",
        r1: 0,
        r2: 0,
        r3: 0,
        r4: 0,
        agentName: "ONLINE",
        shift: "DAY",
      },
      {
        id: 3,
        skillGroup: "SWH",
        date: "23.10.2025",
        r1: 0,
        r2: 0,
        r3: 0,
        r4: 0,
        agentName: "ONLINE",
        shift: "DAY",
      },
      {
        id: 4,
        skillGroup: "BRL",
        date: "23.10.2025",
        r1: 0,
        r2: 0,
        r3: 0,
        r4: 0,
        agentName: "ONLINE",
        shift: "DAY",
      },
      {
        id: 5,
        skillGroup: "AryPL",
        date: "13.02.2025",
        r1: 0,
        r2: 0,
        r3: "NA",
        r4: "NA",
        agentName: "day",
        shift: "DAY",
      },
      {
        id: 6,
        skillGroup: "Spare1",
        date: "23.10.2025",
        r1: 0,
        r2: 0,
        r3: 0,
        r4: 0,
        agentName: "ONLINE",
        shift: "DAY",
      },
      {
        id: 7,
        skillGroup: "Spare2",
        date: "23.10.2025",
        r1: 0,
        r2: 0,
        r3: 0,
        r4: 0,
        agentName: "ONLINE",
        shift: "DAY",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "Sr. No." },
      { accessorKey: "skillGroup", header: "Skill Group" },
      { accessorKey: "date", header: "Date" },
      { accessorKey: "r1", header: "R-1" },
      { accessorKey: "r2", header: "R-2" },
      { accessorKey: "r3", header: "R-3" },
      { accessorKey: "r4", header: "R-4" },
      { accessorKey: "agentName", header: "Agent Name" },
      { accessorKey: "shift", header: "Shift" },
      {
        id: "operation",
        header: "Operation",
        cell: ({ row }: { row: any }) => (
          <Button
            variant="text"
            size="small"
            color="primary"
            sx={{ textTransform: "none", fontWeight: 600 }}
            onClick={() =>
              alert(`Clicked on update ${row.original.skillGroup}`)
            }
          >
            {/* UPDATE */}
            <BorderColorIcon />
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <Box
      //   mt={4}
      //   px={4}
      //   pb={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
    >
      <Typography
        variant="h6"
        fontWeight={700}
        color="primary.main"
        mb={2}
        sx={{
          textTransform: "uppercase",
          textAlign: "center",
          letterSpacing: 0.5,
        }}
      >
        Skill Based Call Routing Details
      </Typography>

      <DataTable<TableData, unknown> columns={columns} data={data} />
    </Box>
  );
};

export default HomeTable;
