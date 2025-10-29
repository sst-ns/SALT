import { useMemo } from "react";
import { Box } from "@mui/material";
import DataTable from "../../components/DataTable";
import type { AgentNumberType } from "./NumberRoster";
import Spinner from "../../components/Spinner";

type NumberRoasterTableProps = {
  loading?: boolean;
  tableData: AgentNumberType[];
};
const NumberRosterTable = ({ loading, tableData }: NumberRoasterTableProps) => {
  const columns = useMemo(
    () => [
      // { accessorKey: "id", header: "Sr. No." },
      { accessorKey: "user_name", header: "Agent Name" },
      { accessorKey: "SIM_1", header: "Sim-1" },
      { accessorKey: "SIM_2", header: "Sim-2" },
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
      {loading ? (
        <Spinner />
      ) : (
        <DataTable
          columns={columns}
          data={tableData}
          title={"Agent Mobile Number Rosters"}
        />
      )}
    </Box>
  );
};

export default NumberRosterTable;
