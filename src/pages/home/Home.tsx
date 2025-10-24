import { Box } from "@mui/material";
import UploadFiles from "./UploadFiles";
import ActivateShiftMode from "./ActivateShiftMode";
import HomeTable from "./HomeTable";

const Home = () => {
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
        <ActivateShiftMode />
      </Box>

      <HomeTable />
    </Box>
  );
};

export default Home;
