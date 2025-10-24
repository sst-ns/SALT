import { Box, Button, TextField, Typography } from "@mui/material";

const UploadFiles = () => {
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
        Upload Roster / Numbers File
      </Typography>

      <Box display="flex" alignItems="center" gap={2}>
        <TextField
          type="file"
          variant="outlined"
          fullWidth
          size="small"
          sx={{
            bgcolor: "#fafafa",
            borderRadius: 1,
          }}
        />
        <Button variant="contained" size="medium">
          Upload
        </Button>
      </Box>
    </Box>
  );
};

export default UploadFiles;

/**
 * 
 * import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const UploadFiles = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event: any) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one file before uploading.");
      return;
    }
    console.log("Uploading files:", selectedFiles);
    // TODO: handle upload to backend
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
        Upload Roster / Numbers Files
      </Typography>

      <Box display="flex" alignItems="center" gap={2}>
        <Box
          component="label"
          htmlFor="file-upload"
          flex={1}
          sx={{
            bgcolor: "#fafafa",
            border: "1px solid #ccc",
            borderRadius: 1,
            padding: "8px 12px",
            cursor: "pointer",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            "&:hover": { borderColor: "primary.main" },
          }}
        >
          {selectedFiles.length > 0
            ? `${selectedFiles.length} file(s) selected`
            : "Choose files..."}
          <input
            id="file-upload"
            type="file"
            multiple
            hidden
            onChange={handleFileChange}
          />
        </Box>

        <Button variant="contained" size="medium" onClick={handleUpload}>
          Upload
        </Button>
      </Box>

      {selectedFiles.length > 0 && (
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Selected Files:
          </Typography>
          {selectedFiles.map((file, idx) => (
            <Typography
              key={idx}
              variant="body2"
              sx={{ fontStyle: "italic", color: "text.primary" }}
            >
              • {file.name}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default UploadFiles;

 */
