import { Box, Button, Typography, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const headerItems = [
  { title: "Home", href: "/" },
  { title: "Number-Roster", href: "/roster" },
  { title: "Logs", href: "/logs" },
  { title: "Did-Mapping", href: "/did-mapping" },
  { title: "Contact", href: "/contact" },
];

const Header = () => {
  const theme = useTheme();
  const user = useContext(UserContext);

  const signOut = () => {
    // sessionStorage.clear();
    // window.location.href = import.meta.env.VITE_REACT_SAML_LOGIN_URL;

    sessionStorage.removeItem("tkn_frm_saml");
    sessionStorage.removeItem("enterpriseId_frm_tkn");
    sessionStorage.clear();

    const cognitoLogout = `${import.meta.env.VITE_REACT_COGNITO_DOMAIN}/logout?client_id=${
      import.meta.env.VITE_REACT_COGNITO_CLIENT_ID
    }&logout_uri=${import.meta.env.VITE_REACT_REDIRECT_URI}`;

    const microsoftLogout = `https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(cognitoLogout)}`;

    window.location.href = microsoftLogout;
  };

  return (
    <Box
      component="header"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      // px={4}
      // py={1.5}
      width="100%"
      sx={{
        bgcolor: "background.paper",
        position: "sticky",
        top: 0,
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
        zIndex: 1100,
        transition: "background-color 0.3s ease",
        height: "75px",
      }}
    >
      {/* Left: App Logo */}
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        px={2}
      >
        <Box
          component="img"
          src="/salt-logo.png"
          alt="Salt Application"
          sx={{
            height: 50,
            // width: "auto",
            width: 90,
            objectFit: "contain",
            display: "block",
            // border: "1px solid red",
          }}
        />
      </Box>

      {/* Center: Navigation */}
      <Box
        display="flex"
        justifyContent="center"
        flex="2"
        gap={4}
        sx={{
          "& > *": {
            cursor: "pointer",
            fontWeight: 500,
            textTransform: "uppercase",
            color: "#333",
            transition: "color 0.2s ease, transform 0.2s ease",
            "&:hover": {
              color: theme.palette.primary.main,
            },
          },
        }}
      >
        {headerItems.map((val, idx) => (
          <NavLink
            key={idx}
            to={val.href}
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? theme.palette.primary.main : "#333",
              fontWeight: isActive ? 600 : 400,
              borderBottom: isActive
                ? `2px solid ${theme.palette.primary.main}`
                : "2px solid transparent",
              paddingBottom: 2,
              transition: "all 0.25s ease-in-out",
            })}
          >
            <Typography variant="body1">{val.title}</Typography>
          </NavLink>
        ))}
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        flex="1"
        justifyContent="flex-end"
      >
        <Box
          component="img"
          src="/logo-black-purple-full.png"
          alt="Company Logo"
          sx={{
            height: 30,
            width: "auto",
            objectFit: "contain",
            display: "block",
          }}
        />
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              boxShadow: "none",
              borderRadius: 1,
              px: 2.5,
              py: 0.5,
              "&:hover": {
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              },
            }}
            onClick={signOut}
          >
            Sign Out
          </Button>
          {user?.enterpriseId && (
            <Typography
              variant="body2"
              sx={{
                mt: 0.5,
                fontWeight: 500,
              }}
            >
              {user.enterpriseId}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
