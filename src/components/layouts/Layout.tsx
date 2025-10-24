import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "./Header";
// import Footer from "./Footer";

const Layout = () => {
  return (
    <Box display="flex">
      <Box flex={1} display="flex" flexDirection="column">
        <Header />
        <Box minHeight={"80vh"} px={2} py={2}>
          <Outlet />
        </Box>
        {/* <Footer /> */}
      </Box>
    </Box>
  );
};

export default Layout;
