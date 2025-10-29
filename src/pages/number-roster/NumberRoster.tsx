import { Box } from "@mui/material";
import NumberRosterTable from "./NumberRosterTable";
import { useEffect, useState } from "react";
import ApiClient from "../../services/apiClient";

export type AgentNumberType = {
  // id: number;
  user_name: string;
  SIM_1: string;
  SIM_2: string;
};
const NumberRoster = () => {
  const [agentNumber, setAgentNumber] = useState<AgentNumberType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getAgentNumber = async () => {
      setLoading(true);
      try {
        const payload = {
          action: "fetch_agent_number",
        };
        console.log("Sending payload in number:", payload);

        const response = await ApiClient.post("lambda_SaltAppApi", payload);
        console.log("Raw Lambda response:", response);

        let body: AgentNumberType[] = Array.isArray(response.body)
          ? response.body
          : response.body
          ? JSON.parse(response.body)
          : [];
        console.log("Parsed body in number:", body);

        setAgentNumber(body);
      } catch (error) {
        console.log("Error in number roster data", error);
      } finally {
        setLoading(false);
      }
    };
    getAgentNumber();
  }, []);

  return (
    <Box width="100%" display="flex" flexDirection="column" px={4}>
      <NumberRosterTable loading={loading} tableData={agentNumber} />
    </Box>
  );
};

export default NumberRoster;
