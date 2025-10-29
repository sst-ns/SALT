import { Box, Typography } from "@mui/material";

const Contact = () => {
  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "#222",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontSize: { xs: "1.8rem", sm: "2.5rem" },
          textTransform: "capitalize",
          color: "#555",
          mb: 1,
        }}
      >
        Contact to
      </Typography>

      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "3rem", sm: "5rem" },
          textTransform: "uppercase",
          fontWeight: 700,
          letterSpacing: "2px",
          background: "linear-gradient(90deg, #8A2BE2, #5E2B97)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Accenture
      </Typography>
    </Box>
  );
};

export default Contact;
