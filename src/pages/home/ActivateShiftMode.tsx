import { Box, Button, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import type { TableData } from "./Home";

type ActiveShiftModeProps = {
  selectedRows?: TableData[];
  shift: string;
  shiftFLag: boolean;
  handleShiftFlag: () => void;
  switchShift: (s: string) => void;
};
const ActivateShiftMode = ({
  selectedRows,
  switchShift,
  handleShiftFlag,
}: ActiveShiftModeProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  // const username = sessionStorage.getItem("userName") || "UnknownUser";
  function onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }
  // shift:"DAY"
  // const handleShiftDay = async () => {
  //   setLoading(true);
  //   try {
  //     // let temp = selected;
  //     let temp = [];
  //     temp.push("AryPL");
  //     temp = temp.filter(onlyUnique);
  //     const article = {
  //       operation: "",
  //       roster_name: "",
  //       shift: "DAY",
  //       selected_row: temp,
  //       new_name: "",
  //       user_name: "username", // from where I will fetch it
  //     };
  //     const res = await axios.post(import.meta.env.VITE_API_URL, article);
  //     console.log("res in day", res);
  //     toast.success(res.data);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Sorry !, Please Try Again");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // shift:"NIGHT"
  // const handleShiftNight = async () => {
  //   setLoading(true);
  //   try {
  //     const article = {
  //       operation: "",
  //       roster_name: "",
  //       shift: "NIGHT",
  //       selected_row: "",
  //       new_name: "",
  //       user_name: "username", // from where I will fetch it
  //     };
  //     const res = await axios.post(import.meta.env.VITE_API_URL, article);
  //     if (res.data === "NIGHT ACTIVATE") {
  //       console.log("res in day", res);
  //       toast.success("NIGHT MODE ACTIVATED");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Sorry !, Please Try Again");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleShiftClick = async (mode: "DAY" | "NIGHT") => {
    setLoading(true);
    try {
      let temp = [] as string[];
      temp = selectedRows?.map((d) => d.skill_group) as string[];
      temp.push("AryPL");
      // console.log("temp", temp);
      temp = temp.filter(onlyUnique);
      const article = {
        operation: "",
        roster_name: "",
        shift: mode,
        selected_row: mode === "NIGHT" ? "" : temp,
        new_name: "",
        user_name: "username", // from where I will fetch it
      };
      const res = await axios.post(import.meta.env.VITE_API_URL, article);
      console.log("res in activate shift", res);

      if (res.data === "NIGHT ACTIVATE") {
        console.log("res in day", res);
        toast.success("NIGHT MODE ACTIVATED");
        handleShiftFlag();
      } else {
        toast.success(res.data);
        handleShiftFlag();
      }
    } catch (error) {
      console.log(error);
      toast.error("Sorry !, Please Try Again");
    } finally {
      setLoading(false);
      switchShift(mode);
    }
  };
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
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Button
              variant={"contained"}
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
              variant={"contained"}
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
          </>
        )}
      </Box>
    </Box>
  );
};

export default ActivateShiftMode;
