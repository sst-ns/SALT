import { useEffect, useState } from "react";
import ApiClient from "../services/apiClient";
import DataTable from "../components/DataTable";
import { Box } from "@mui/material";
import Spinner from "../components/Spinner";
import moment from "moment";

interface LogRow {
  id: number;
  Logs_id: number;
  user_name: string;
  change_type: string;
  change_made: string;
  date_time: string;
  [key: string]: any;
}

const Logs = () => {
  const [tableData, setTableData] = useState<LogRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const columns = [
    { header: "Logs-Id", accessorKey: "Logs_id" },
    { header: "Agent-Name", accessorKey: "user_name" },
    { header: "Change-Type", accessorKey: "change_type" },
    { header: "Change-Made", accessorKey: "change_made" },
    {
      header: "Date-Time - Europe/Berlin",
      accessorKey: "date_time",
      sorter: (a: LogRow, b: LogRow) =>
        moment(a.date_time, "MM-DD-YYYY HH:mm:ss").valueOf() -
        moment(b.date_time, "MM-DD-YYYY HH:mm:ss").valueOf(),
      defaultSortOrder: "descend",
    },
  ];
  useEffect(() => {
    console.log("Component mounted, fetching logs...");
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const payload = { action: "fetch_logs" };

      const response = await ApiClient.post("lambda_SaltAppApi", payload);
      console.log("Raw Lambda response:", response);

      let body: LogRow[] = Array.isArray(response.body)
        ? response.body
        : response.body
        ? JSON.parse(response.body)
        : [];
      // Format date
      const formattedBody = body.map((row) => ({
        ...row,
        date_time: moment(row.date_time, "MM-DD-YYYY HH:mm:ss").format(
          "MMMM D, YYYY h:mm A"
        ),
      }));
      setTableData(formattedBody);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ pl: 4, pr: 4 }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </Box>
      ) : (
        <DataTable data={tableData} columns={columns} title={"Agent Logs"} />
      )}
    </Box>
  );
};

export default Logs;
