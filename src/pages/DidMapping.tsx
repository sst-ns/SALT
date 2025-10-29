import { useEffect, useState } from "react";
import Select from "react-select";
import swal from "sweetalert";
import { toast } from "react-toastify";
import ApiClient from "../services/apiClient";
import Spinner from "../components/Spinner";
import DataTable from "../components/DataTable";
import "react-toastify/dist/ReactToastify.css";

interface DropdownOption {
  label: string;
  value: string;
  id?: number;
}

const customSelectStyles = {
  container: (base: any) => ({
    ...base,
    marginLeft: "5px",
  }),
  control: (base: any, state: any) => ({
    ...base,
    width: "180px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    borderColor: state.isFocused ? "#a855f7" : base.borderColor,
    boxShadow: state.isFocused ? "0 0 0 1px #a855f7" : "none",
    "&:hover": { borderColor: "#a855f7" },
  }),
  menu: (base: any) => ({
    ...base,
    zIndex: 9999,
  }),
  option: (base: any, state: any) => ({
    ...base,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    backgroundColor: state.isSelected
      ? "#d8b4fe"
      : state.isFocused
      ? "#f3e8ff"
      : "white",
    color: state.isSelected ? "#4b0082" : "#333",
    "&:active": { backgroundColor: "#d8b4fe" },
    "&:focus": { outline: "none" },
  }),
};

export default function DidMapping() {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);

  const [didList, setDidList] = useState<DropdownOption[]>([]);
  const [companyList, setCompanyList] = useState<DropdownOption[]>([]);
  const [cfList, setCfList] = useState<DropdownOption[]>([]);
  const [queueList, setQueueList] = useState<DropdownOption[]>([]);
  const [userRole, setUserRole] = useState<string>("");

  const [state, setState] = useState({
    didnumber: "",
    companyName: "",
    CFName: "",
    QueueName: "",
  });

  const [didTemp, setDidTemp] = useState<DropdownOption | null>(null);
  const [companyTemp, setCompanyTemp] = useState<DropdownOption | null>(null);
  const [cfTemp, setCfTemp] = useState<DropdownOption | null>(null);
  const [queueTemp, setQueueTemp] = useState<DropdownOption | null>(null);

  const fetchUserRole = async () => {
    try {
      const enterpriseId = "p.yuvraj.suryawanshi";

      if (!enterpriseId) {
        console.warn("No enterprise_id found");
        return;
      }

      const res = await ApiClient.post("lambda_SaltAppApi", {
        action: "fetch_role",
        enterprise_id: enterpriseId,
      });
      console.log("userRole", res.body.Role);

      const role = res?.body?.Role || "";
      setUserRole(role);
    } catch (error) {
      console.error("Error fetching user role:", error);
      toast.error("Failed to fetch user role");
    }
  };

  // Fetch dropdowns + mappings + role on mount
  useEffect(() => {
    fetchDropdownData();
    fetchDidMappings();
    fetchUserRole();
  }, []);

  // Fetch Dropdowns
  const fetchDropdownData = async () => {
    try {
      setLoading(true);

      const [didRes, companyRes, cfRes, queueRes] = await Promise.all([
        ApiClient.post("lambda_SaltAppApi", { action: "fetch_did_numbers" }),
        ApiClient.post("lambda_SaltAppApi", { action: "fetch_company_names" }),
        ApiClient.post("lambda_SaltAppApi", { action: "fetch_contact_flows" }),
        ApiClient.post("lambda_SaltAppApi", { action: "fetch_queues" }),
      ]);

      setDidList(
        (didRes?.body?.did_numbers || []).map((d: any, i: number) => ({
          label: d.PhoneNumber,
          value: d.PhoneNumber,
          id: i,
        }))
      );

      setCompanyList(
        (companyRes?.body?.company_names || []).map((c: string, i: number) => ({
          label: c,
          value: c,
          id: i,
        }))
      );

      setCfList(
        (cfRes?.body?.contact_flows || []).map((c: string, i: number) => ({
          label: c,
          value: c,
          id: i,
        }))
      );

      setQueueList(
        (queueRes?.body?.queues || []).map((q: string, i: number) => ({
          label: q,
          value: q,
          id: i,
        }))
      );
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
      toast.error("Failed to load dropdown data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch existing mappings
  const fetchDidMappings = async () => {
    try {
      setLoading(true);
      const res = await ApiClient.post("lambda_SaltAppApi", {
        action: "fetch_did_mappings",
      });

      const body = Array.isArray(res.body)
        ? res.body
        : typeof res.body === "string"
        ? JSON.parse(res.body)
        : [];

      const processed = body.map((item: any, i: number) => ({
        id: i + 1,
        didnumber: item.didnumber || "",
        companyName: item.companyName || "",
        CFName: item.CFName || "",
        contactFlow: item.contactFlow || item.contact_flow_arn || "",
        queueName: item.queue || "",
        queueArn: item.Qname || item.queue_arn || "",
      }));

      setTableData(processed);
    } catch (error) {
      console.error("Error fetching DID mappings:", error);
      toast.error("Failed to fetch DID mappings");
    } finally {
      setLoading(false);
    }
  };

  // Handle Dropdown Changes
  const handleChange = (field: string, selected: DropdownOption | null) => {
    if (!selected) return;
    if (field === "didnumber") setDidTemp(selected);
    else if (field === "companyName") setCompanyTemp(selected);
    else if (field === "CFName") setCfTemp(selected);
    else if (field === "QueueName") setQueueTemp(selected);
    setState({ ...state, [field]: selected.value });
  };

  // Handle Submit
  const handleSubmit = async () => {
    if (
      !state.didnumber ||
      !state.companyName ||
      !state.CFName ||
      !state.QueueName
    ) {
      swal("Error", "Please select all dropdowns before submitting", "error");
      return;
    }

    swal({
      title: "Are you sure?",
      text: "Do you want to update the DID mapping?",
      icon: "warning",
      buttons: ["Cancel", "Yes, update!"],
    }).then(async (isConfirm) => {
      if (!isConfirm) return;

      try {
        setLoading(true);

        // Fetch Contact Flow Details
        const cfDetailRes = await ApiClient.post("lambda_SaltAppApi", {
          action: "fetch_contact_flow_details",
          contact_flow_name: state.CFName,
        });
        const contactFlowArn = cfDetailRes?.body?.contact_flow_arn;

        // Fetch Queue Details
        const queueDetailRes = await ApiClient.post("lambda_SaltAppApi", {
          action: "fetch_queue_details",
          queue_name: state.QueueName,
        });
        const queueArn = queueDetailRes?.body?.queue_arn;

        // Update Mapping
        await ApiClient.post("lambda_SaltAppApi", {
          action: "update_mapping",
          didnumber: state.didnumber,
          companyName: state.companyName,
          CFName: state.CFName,
          contactFlow: contactFlowArn,
          Qname: state.QueueName,
          queue: queueArn,
        });

        toast.success("DID mapping updated successfully!", {
          position: "top-right",
        });

        // Reset dropdowns
        setDidTemp(null);
        setCompanyTemp(null);
        setCfTemp(null);
        setQueueTemp(null);
        setState({
          didnumber: "",
          companyName: "",
          CFName: "",
          QueueName: "",
        });

        // Refresh table
        await fetchDidMappings();
      } catch (error) {
        console.error("Error updating DID mapping:", error);
        toast.error("Failed to update DID mapping");
      } finally {
        setLoading(false);
      }
    });
  };

  const columns = [
    { header: "DID-Number", accessorKey: "didnumber" },
    { header: "Company-Name", accessorKey: "companyName" },
    { header: "CF-Name", accessorKey: "CFName" },
    { header: "Contact-Flow", accessorKey: "contactFlow" },
    { header: "Queue-ARN", accessorKey: "queueName" },
    { header: "Queue-Name", accessorKey: "queueArn" },
  ];

  return (
    <div>
      {userRole === "Admin" && (
        <div className="border-horizontal">
          <div className="filterForm">
            <label>DID Number:</label>
            <Select
              options={didList}
              value={didTemp}
              onChange={(sel) => handleChange("didnumber", sel)}
              isDisabled={loading}
              styles={customSelectStyles}
            />
          </div>

          <div className="filterForm">
            <label>Company Name:</label>
            <Select
              options={companyList}
              value={companyTemp}
              onChange={(sel) => handleChange("companyName", sel)}
              isDisabled={loading}
              styles={customSelectStyles}
            />
          </div>

          <div className="filterForm">
            <label>CF Name:</label>
            <Select
              options={cfList}
              value={cfTemp}
              onChange={(sel) => handleChange("CFName", sel)}
              isDisabled={loading}
              styles={customSelectStyles}
            />
          </div>

          <div className="filterForm">
            <label>Queue Name:</label>
            <Select
              options={queueList}
              value={queueTemp}
              onChange={(sel) => handleChange("QueueName", sel)}
              isDisabled={loading}
              styles={customSelectStyles}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="filterSubmit"
            disabled={loading}
          >
            {loading ? "Loading..." : "SUBMIT"}
          </button>
        </div>
      )}

      <div className="tabledata" style={{ marginTop: "20px" }}>
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Spinner />
          </div>
        ) : (
          <DataTable data={tableData} columns={columns} />
        )}
      </div>
    </div>
  );
}
