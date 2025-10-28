import { Box } from "@mui/material";
import NumberRosterTable from "./NumberRosterTable";
import { useEffect, useState } from "react";
import { API_MAP, apiClient } from "../../services/api";

export type AgentNumberType = {
  // id: number;
  user_name: string;
  SIM_1: string;
  SIM_2: string;
};
const NumberRoster = () => {
  const [agentNumber, setAgentNumber] = useState([]);
  useEffect(() => {
    const getAgentNumber = async () => {
      try {
        const res = await apiClient.request({
          ...API_MAP.agentNumber,
        });
        console.log("res agent number", res);
        setAgentNumber(res.data);
      } catch (error) {
        console.log("Error in number roster data", error);
      }
    };
    getAgentNumber();
  }, []);

  return (
    <Box width="100%" display="flex" flexDirection="column" px={4}>
      <NumberRosterTable tableData={agentNumber} />
    </Box>
  );
};

export default NumberRoster;
