import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import DataTable from "../../components/DataTable";
import type { AgentNumberType } from "./NumberRoster";

type NumberRoasterTableProps = {
  tableData: AgentNumberType[];
};
const NumberRosterTable = ({ tableData }: NumberRoasterTableProps) => {
  const data = useMemo(
    () => [
      {
        id: 1,
        agentName: "day",
        sim1: 0,
        sim2: 0,
      },
      {
        id: 2,
        agentName: "mxm",
        sim1: 4915146270977,
        sim2: 4916090695329,
      },
      {
        id: 3,
        agentName: "rck",
        sim1: 491711749205,
        sim2: 491722071540,
      },
      {
        id: 4,
        agentName: "kru",
        sim1: 491751167847,
        sim2: 0,
      },
      {
        id: 5,
        agentName: "ONLINE",
        sim1: 0,
        sim2: 0,
      },
      {
        id: 6,
        agentName: "ONLINE",
        sim1: 0,
        sim2: 0,
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "Sr. No." },
      { accessorKey: "agentName", header: "Agent Name" },
      { accessorKey: "sim1", header: "Sim-1" },
      { accessorKey: "sim2", header: "Sim-2" },
    ],
    []
  );

  return (
    <Box
      // px={4}
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
        Agent Mobile Number Rosters
      </Typography>

      <DataTable columns={columns} data={tableData} />
    </Box>
  );
};

export default NumberRosterTable;
