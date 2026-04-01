import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { startPkceLogin } from "../../auth/pkce";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await startPkceLogin();
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        maxHeight: "100vh",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #1e3139e2 0%, #203a43 30%, #2c5364 100%)",
          color: "white",
          textAlign: "center",
          px: 6,
          py: 2,
        }}
      >
        <Box
          sx={{
            px: 2,
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.1)",
            fontSize: 12,
            letterSpacing: 1,
          }}
        >
          NEXT GEN WORKFORCE AUTOMATION
        </Box>

        <Box
          component="img"
          src="/call_center_1.png"
          alt="Automation"
          sx={{
            width: "70%",
            maxWidth: 500,
            my: 1.5,
            filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.4))",
          }}
        />

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            lineHeight: 1.3,
          }}
        >
          Intelligent Shift &{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #8A2BE2, #00C6FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Routing Control
          </span>
        </Typography>

        <Typography
          variant="body1"
          sx={{
            opacity: 0.8,
            maxWidth: 520,
            mb: 2,
          }}
        >
          Manage agent rosters, automate shift transitions, and optimize contact
          center performance with real-time control.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
            maxWidth: 520,
            textAlign: "left",
          }}
        >
          {[
            "Secure SAML Authentication",
            "Skill-Based Routing",
            "Dynamic Shift Switching",
            "Auto-Updating Rosters",
            "Manual Agent Control",
            "Audit Logging",
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                p: 1.5,
                borderRadius: 2,
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(6px)",
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#8A2BE2",
                }}
              />
              {item}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Right side */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `
    radial-gradient(
      1200px 700px at -15% -25%,
      rgba(139, 92, 246, 0.45),
      transparent 65%
    ),
    radial-gradient(
      1000px 600px at 115% 0%,
      rgba(244, 114, 182, 0.40),
      transparent 65%
    ),
    radial-gradient(
      900px 500px at 50% 120%,
      rgba(56, 189, 248, 0.25),
      transparent 70%
    ),
    linear-gradient(180deg, #f9fafb 0%, #eef2ff 100%)
  `,
          p: 2,
        }}
      >
        <Card
          elevation={3}
          sx={{
            width: 420,
            borderRadius: 2,
            backdropFilter: "blur(12px)",
            background: "rgba(255,255,255,0.92)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
          }}
        >
          <CardContent sx={{ textAlign: "center", px: 4, py: 2 }}>
            <Box
              sx={{
                background: "linear-gradient(135deg, #8A2BE2, #7C3AED)",
                color: "white",
                width: 60,
                height: 60,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                boxShadow: "0 6px 20px rgba(138,43,226,0.4)",
              }}
            >
              <LockOutlinedIcon />
            </Box>

            <Typography variant="h6" fontWeight="bold" gutterBottom>
              SALT Login
            </Typography>

            <Typography variant="body2" color="primary.main" mb={3}>
              Smart Workforce & Roster Management Platform
            </Typography>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleLogin}
              disabled={loading}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                py: 1.3,
                borderRadius: 2,
                background: "linear-gradient(135deg, #8A2BE2, #7C3AED)",
                boxShadow: "0 6px 20px rgba(138,43,226,0.4)",
                "&:hover": {
                  background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                },
              }}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "#fff",
                  }}
                />
              ) : (
                "Login with SSO"
              )}
            </Button>

            <Box mt={3}>
              <img
                src="/logo-black-purple-full.png"
                alt="Company Logo"
                style={{ height: 36, opacity: 0.9 }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default LoginPage;
