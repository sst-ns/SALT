import { Box } from "@mui/material";
import UploadFiles from "./UploadFiles";
import ActivateShiftMode from "./ActivateShiftMode";
import HomeTable from "./HomeTable";
import { useEffect, useState } from "react";
import { API_MAP, apiClient } from "../../services/api";
import { sampleSkillRouting } from "../../constants/constant";

export type TableData = {
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

const Home = () => {
  const [shift, setShift] = useState<string>("DAY");
  const [tableData, setTableData] = useState<TableData[]>(sampleSkillRouting);
  const [selectedRows, setSelectedRows] = useState([]);
  // here, selected rows implies those rows, whose shift has been changed to "NoChange"
  console.log("selected rows", selectedRows);
  const handleShiftClick = (s: string) => {
    setShift(s);
    alert(s);
  };

  useEffect(() => {
    if (tableData.length > 0) {
      const filterNoChangeRows = tableData.filter(
        (d) => d.agentName === "NOCHANGE"
      );
      setSelectedRows(filterNoChangeRows as any);
    }
    const getTableData = async () => {
      try {
        const res = await apiClient.request({
          ...API_MAP.skillrouting,
          data: {
            ...API_MAP.skillrouting.data,
            shift,
            selectedRows,
          },
        });
        console.log("res in home", res);
        setTableData(res.data);
      } catch (error) {
        console.log("Error in get table data", error);
      }
    };

    getTableData();
  }, [shift]);

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
        <ActivateShiftMode shift={shift} handleShiftClick={handleShiftClick} />
      </Box>

      <HomeTable tableData={tableData} setTableData={setTableData} />
    </Box>
  );
};

export default Home;
