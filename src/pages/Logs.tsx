import { useEffect, useState } from "react";
import ApiClient from "../services/apiClient";
import DataTable from "../components/DataTable";
import { Box } from "@mui/material";
import Spinner from "../components/Spinner";

interface LogRow {
  id: number;
  Action: string;
  Response?: string;
  [key: string]: any;
}

const Logs = () => {
  const [tableData, setTableData] = useState<LogRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const columns = [
    { header: "Date/Time", accessorKey: "date_time" },
    { header: "Change Made", accessorKey: "change_made" },
    { header: "Change Type", accessorKey: "change_type" },
    { header: "User Name", accessorKey: "user_name" },
    { header: "Log ID", accessorKey: "Logs_id" },
  ];
  useEffect(() => {
    console.log("Component mounted, fetching logs...");
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const payload = { action: "fetch_logs" };
      console.log("Sending payload:", payload);

      const response = await ApiClient.post("lambda_SaltAppApi", payload);
      console.log("Raw Lambda response:", response);

      let body: LogRow[] = Array.isArray(response.body)
        ? response.body
        : response.body
        ? JSON.parse(response.body)
        : [];
      console.log("Parsed body:", body);
      setTableData(body);
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
