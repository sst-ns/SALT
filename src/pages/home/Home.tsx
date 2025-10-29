import { Box } from "@mui/material";
import UploadFiles from "./UploadFiles";
import ActivateShiftMode from "./ActivateShiftMode";
import HomeTable from "./HomeTable";
import { useEffect, useState } from "react";
import ApiClient from "../../services/apiClient";

export type TableData = {
  // id: number;
  R_1: string;
  R_2: string;
  R_3: string;
  R_4: string;
  agent_name: string;
  date: string;
  shift: string;
  skill_group: string;
};

const Home = () => {
  const [shift, setShift] = useState<string>("NIGHT");
  const [shiftFlag, setShiftFlag] = useState<boolean>(false);

  const [tableData, setTableData] = useState<TableData[]>([]);
  const [selectedRows, setSelectedRows] = useState<TableData[]>([]);
  // here, selected rows implies those rows, whose agent_name has been changed to "NOCHANGE", so their shift won't be changing
  const [loading, setLoading] = useState<boolean>(true);

  // console.log("selected rows", selectedRows);

  const handleShiftClick = (s: string) => {
    setShift(s);
  };
  const handleShiftFlag = () => {
    setShiftFlag((prev) => !prev);
  };

  const getTableData = async () => {
    setLoading(true);

    try {
      const payload = {
        action: "fetch_skill_routing",
        shift: shift.toUpperCase(),
        // selectedRows,
      };
      // console.log("Sending payload:", payload);

      const response = await ApiClient.post("lambda_SaltAppApi", payload);
      // console.log("Raw Lambda response:", response);
      let body: TableData[] = Array.isArray(response.body)
        ? response.body
        : response.body
        ? JSON.parse(response.body)
        : [];

      // console.log("body in home", body);
      setTableData(body);
    } catch (error) {
      console.log("Error in get table data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tableData.length > 0) {
      const filterNoChangeRows = tableData.filter(
        (d) => d.agent_name.toUpperCase() === "NOCHANGE"
      );

      setSelectedRows(filterNoChangeRows);
    }

    getTableData();
  }, [shift, shiftFlag]);

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      gap={4}
      px={4}
      py={3}
    >
      <Box
        display="flex"
        flexWrap="wrap"
        gap={3}
        justifyContent="space-between"
      >
        <UploadFiles />
        <ActivateShiftMode
          selectedRows={selectedRows}
          shift={shift}
          shiftFLag={shiftFlag}
          handleShiftFlag={handleShiftFlag}
          switchShift={handleShiftClick}
        />
      </Box>

      <HomeTable
        loading={loading}
        tableData={tableData}
        setTableData={setTableData}
      />
    </Box>
  );
};

export default Home;
