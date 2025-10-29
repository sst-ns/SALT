import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

import ApiClient from "../../services/apiClient";
import toast from "react-hot-toast";

const Number_BUCKET = "agent-numbers";
const Roster_BUCKET = "uploadexcelfile";

const UploadFiles = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [s3Client, setS3Client] = useState<S3Client | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  console.log("s3 client", s3Client);
  useEffect(() => {
    const client = new S3Client({
      region: import.meta.env.VITE_REACT_AWS_REGION,
      credentials: {
        accessKeyId: import.meta.env.VITE_REACT_AWS_ACCESS_KEY,
        secretAccessKey: import.meta.env.VITE_REACT_AWS_SECRET_KEY,
      },
    });
    setS3Client(client);
  }, []);

  const handleFileInput = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file before uploading.");
      return;
    }
    if (!s3Client) {
      toast.error("S3 client not initialized yet. Please wait.");
      return;
    }

    setLoading(true);
    const file = selectedFile;
    const isRoster = file.name === "SALT-Roster.csv";
    const isAgentNumbers = file.name === "Agent-Numbers-List.csv";
    let bucket = "";

    if (isRoster) bucket = Roster_BUCKET;
    else if (isAgentNumbers) bucket = Number_BUCKET;
    else {
      toast.error("Invalid file name.");
      return;
    }

    try {
      const upload = new Upload({
        client: s3Client,
        params: {
          Bucket: bucket,
          Key: file.name,
          Body: file,
          ContentType: file.type,
        },
      });

      // upload.on("httpUploadProgress", (progress: any) => {
      //   console.log("Progress:", progress);
      // });

      await upload.done();
      // console.log("upload Res", uploadRes);

      toast.success(`${file.name} uploaded successfully!`);

      if (isAgentNumbers) {
        const payload = { agent_number_file: file.name };

        const lambdaResponse = await ApiClient.post(
          "lambda_MobileNumbersUpdate",
          payload
        );

        // console.log("Lambda response for numberUpdate:", lambdaResponse);

        if (lambdaResponse?.statusCode === 200) {
          toast.success(
            lambdaResponse.body || "Mobile numbers updated successfully!"
          );
        } else {
          toast.error(lambdaResponse?.error || "Lambda processing failed.");
        }
      }
    } catch (err) {
      console.error("S3 upload error:", err);
      toast.error("Upload failed. Please try again.");
    } finally {
      setLoading(false);
      // setSelectedFile(null);
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
        Upload Roster / Numbers File
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
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
            {selectedFile ? selectedFile.name : "Choose file..."}
            <input
              id="file-upload"
              type="file"
              hidden
              onChange={handleFileInput}
            />
          </Box>

          <Button variant="contained" size="medium" onClick={handleUpload}>
            Upload
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default UploadFiles;
