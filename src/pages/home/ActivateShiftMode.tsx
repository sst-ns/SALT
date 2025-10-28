import { Box, Button, Typography } from "@mui/material";

type ActiveShiftModeProps = {
  shift: string;
  handleShiftClick: (s: string) => void;
};
const ActivateShiftMode = ({
  shift,
  handleShiftClick,
}: ActiveShiftModeProps) => {
  return (
    <Box
      flex="1"
      minWidth={300}
      p={3}
      borderRadius={2}
      boxShadow="0 2px 8px rgba(0,0,0,0.1)"
      bgcolor="white"
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <Typography
        variant="h6"
        textAlign="center"
        color="primary.main"
        fontWeight={600}
      >
        Activate Shift Mode
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        mt={1}
      >
        <Button
          variant={shift == "DAY" ? "contained" : "outlined"}
          color="primary"
          sx={{
            minWidth: 100,
            textTransform: "none",
            "&:hover": { backgroundColor: "primary.main", color: "#fff" },
          }}
          onClick={() => handleShiftClick("DAY")}
        >
          Day
        </Button>
        <Button
          variant={shift == "NIGHT" ? "contained" : "outlined"}
          color="primary"
          sx={{
            minWidth: 100,
            textTransform: "none",
            "&:hover": { backgroundColor: "primary.main", color: "#fff" },
          }}
          onClick={() => handleShiftClick("NIGHT")}
        >
          Night
        </Button>
      </Box>
    </Box>
  );
};

export default ActivateShiftMode;
