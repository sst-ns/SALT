import { Box, Button, Typography, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";

const headerItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Number-Roster",
    href: "/roster",
  },
  {
    title: "Logs",
    href: "/logs",
  },
  {
    title: "Did-Mapping",
    href: "/did-mapping",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];
const Header = () => {
  const theme = useTheme();

  return (
    <Box
      component="header"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={4}
      py={2}
      width="100%"
      sx={{
        bgcolor: "background.paper",
        position: "sticky",
        top: 0,
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1100,
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Left: App Name / Logo */}
      <Box flex="1">
        <Typography
          variant="h6"
          fontWeight={600}
          color="primary.main"
          sx={{ letterSpacing: 0.5 }}
        >
          Salt Application
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        flex="2"
        gap={4}
        sx={{
          "& > *": {
            cursor: "pointer",
            color: "#000",
            fontWeight: 500,
            textTransform: "uppercase",
            transition: "color 0.2s, transform 0.2s",
            "&:hover": {
              color: theme.palette.primary.main,
              // transform: "translateY(-1px)",
            },
          },
        }}
      >
        {headerItems.map((val, idx) => (
          <NavLink
            to={val.href}
            key={idx}
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? theme.palette.primary.main : "#000",
              fontWeight: isActive ? 600 : 400,
              borderBottom: isActive
                ? `2px solid ${theme.palette.primary.main}`
                : "2px solid transparent",
              transition: "all 0.2s ease-in-out",
            })}
          >
            <Typography variant="body1">{val.title}</Typography>
          </NavLink>
        ))}
      </Box>

      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        gap={2}
      >
        <Box
          component="img"
          src="/logo-black-purple-full.png"
          alt="Company Logo"
          sx={{
            width: "auto",
            height: 28,
            objectFit: "contain",
          }}
        />

        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{
            textTransform: "none",
            fontWeight: 500,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            },
          }}
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
