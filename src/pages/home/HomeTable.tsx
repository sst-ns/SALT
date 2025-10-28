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

type HomeTableProps = {
  tableData: TableData[];
  setTableData: React.Dispatch<React.SetStateAction<TableData[]>>;
};
const HomeTable = ({ tableData, setTableData }: HomeTableProps) => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TableData | null>(null);

  const handleEditClick = (row: TableData) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleSave = (updatedData: TableData) => {
    setTableData((prev) =>
      prev.map((row) => (row.id === updatedData.id ? updatedData : row))
    );
  };

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "Sr. No." },
      { accessorKey: "skillGroup", header: "Skill Group" },
      { accessorKey: "date", header: "Date" },
      { accessorKey: "r1", header: "R-1" },
      { accessorKey: "r2", header: "R-2" },
      { accessorKey: "r3", header: "R-3" },
      { accessorKey: "r4", header: "R-4" },
      { accessorKey: "agentName", header: "Agent Name" },
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
      <Typography
        variant="h6"
        fontWeight={700}
        color="primary.main"
        mb={2}
        sx={{
          textTransform: "uppercase",
          textAlign: "center",
          letterSpacing: 0.5,
        }}
      >
        Skill Based Call Routing Details
      </Typography>

      <DataTable<TableData, unknown> columns={columns} data={tableData} />

      {/* Edit Modal */}
      <EditModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        rowData={selectedRow}
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
    console.log("form data", formData);
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
            value={formData.agentName}
            onChange={(e) => handleChange("agentName", e.target.value)}
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
