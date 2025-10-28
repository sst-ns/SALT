import axios from "axios";
import toast from "react-hot-toast";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_MAP = {
  skillrouting: {
    method: "GET",
    data: {
      action: "fetch_skill_routing",
    },
  },
  agentNumber: {
    method: "GET",
    data: {
      action: "fetch_agent_number",
    },
  },
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => {
    console.log("response in api Client", response);
    const body = response.data.body
      ? JSON.parse(response.data.body)
      : response.data;

    return {
      ...response,
      data: body,
    };
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          toast.error("Unauthorized");
          break;
        case 403:
          toast.error("Forbidden");
          break;
        case 404:
          toast.error("Not Found");
          break;
        case 500:
          toast.error("Internal Server Error");
          break;
        default:
          toast.error("Something went wrong");
      }
    } else if (error.request) {
      toast.error("No response received");
    } else {
      toast.error("Something went wrong");
    }
    return Promise.reject(error);
  }
);
