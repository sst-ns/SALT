import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DataTable from "../../components/DataTable";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import type { TableData } from "./Home";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";

type HomeTableProps = {
  loading?: boolean;
  tableData: TableData[];
  setTableData: React.Dispatch<React.SetStateAction<TableData[]>>;
};
const HomeTable = ({ loading, tableData }: HomeTableProps) => {
  const [open, setOpen] = useState(false);
  const [selectedEditRow, setSelectedEditRow] = useState<TableData | null>(
    null
  );

  const handleEditClick = (row: TableData) => {
    console.log("row", row);
    setSelectedEditRow(row);
    setOpen(true);
  };

  const handleSave = async (updatedData: TableData) => {
    // console.log("Updated Data", updatedData);

    try {
      const rowData = {
        skill_group: updatedData.skill_group,
        agent_name: updatedData.agent_name,
        R_1: updatedData.R_1,
        R_2: updatedData.R_2,
        R_3: updatedData.R_3,
        R_4: updatedData.R_4,
      };

      const article = {
        operation: "UPDATE",
        roster_name: "",
        new_name: rowData,
        shift: "",
        selected_row: "",
        user_name: "username update",
      };
      const res = await axios.post(import.meta.env.VITE_API_URL, article);
      if (res.data === "Roster Updated") {
        toast.success("Roster Updated, Thanks!!");
        // getTableData() // after update do  I reload the table ?
      } else {
        toast.error("Sorry!,User does Not Exist ,Please Try Again");
      }
      console.log("res update", res);
    } catch (error) {
      console.log("error in update", error);
      toast.error("Sorry, Something went wrong ,Please Try Again");
    }
  };

  const columns = useMemo(
    () => [
      // { accessorKey: "id", header: "Sr. No." },
      { accessorKey: "skill_group", header: "Skill Group" },
      { accessorKey: "date", header: "Date" },
      { accessorKey: "R_1", header: "R-1" },
      { accessorKey: "R_2", header: "R-2" },
      { accessorKey: "R_3", header: "R-3" },
      { accessorKey: "R_4", header: "R-4" },
      { accessorKey: "agent_name", header: "Agent Name" },
      { accessorKey: "shift", header: "Shift" },
      {
        id: "operation",
        header: "Operation",
        cell: ({ row }: { row: any }) => (
          <Button
            variant="text"
            size="small"
            color="primary"
            sx={{ textTransform: "none", fontWeight: 600 }}
            onClick={() => handleEditClick(row.original)}
          >
            <BorderColorIcon />
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      {loading ? (
        <Spinner />
      ) : (
        <DataTable<TableData, unknown>
          columns={columns}
          data={tableData}
          title={"Skill Based Call Routing Details"}
        />
      )}

      {/* Edit Modal */}
      <EditModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        rowData={selectedEditRow}
      />
    </Box>
  );
};

export default HomeTable;

type EditModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (updatedData: any) => void;
  rowData: any;
};

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  width: 400,
};

const EditModal = ({ open, onClose, onSave, rowData }: EditModalProps) => {
  const [formData, setFormData] = useState(rowData);

  useEffect(() => {
    setFormData(rowData);
  }, [rowData]);

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // console.log("form data", formData);
    onSave(formData);
    onClose();
  };

  if (!formData) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" fontWeight={700} mb={2} color="primary.main">
          Edit Record - {formData.skillGroup}
        </Typography>

        <Stack spacing={2}>
          {/* <TextField
            label="R-1"
            value={formData.r1}
            onChange={(e) => handleChange("r1", e.target.value)}
            fullWidth
          />
          <TextField
            label="R-2"
            value={formData.r2}
            onChange={(e) => handleChange("r2", e.target.value)}
            fullWidth
          />
          <TextField
            label="R-3"
            value={formData.r3}
            onChange={(e) => handleChange("r3", e.target.value)}
            fullWidth
          />
          <TextField
            label="R-4"
            value={formData.r4}
            onChange={(e) => handleChange("r4", e.target.value)}
            fullWidth
          /> */}
          <TextField
            label="Agent Name"
            value={formData.agent_name}
            onChange={(e) => handleChange("agent_name", e.target.value)}
            fullWidth
          />
        </Stack>

        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
