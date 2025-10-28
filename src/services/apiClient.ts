import axios from "axios";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

// AWS Lambda client setup
const lambdaClient = new LambdaClient({
  region: import.meta.env.VITE_REACT_AWS_REGION as string,
  credentials: {
    accessKeyId: import.meta.env.VITE_REACT_AWS_ACCESS_KEY as string,
    secretAccessKey: import.meta.env.VITE_REACT_AWS_SECRET_KEY as string,
  },
});

const LAMBDA_ENDPOINTS = {
  lambda_SaltAppApi: "Salt_App_Api",
  default: "",
};

type EndpointKey = keyof typeof LAMBDA_ENDPOINTS;

const ApiClient = {
  get: async (endpoint: EndpointKey, params: any = {}, headers: any = {}) => {
    try {
      const URL = LAMBDA_ENDPOINTS[endpoint] || "";
      const response = await axios.get(URL, { params, headers });
      console.log(`[GET Response] ${URL}:`, response.data);
      return response.data;
    } catch (error: any) {
      console.error("GET request error:", error);
      throw error.response ? error.response.data : error;
    }
  },

  post: async (
    endpoint: EndpointKey,
    data: any,
    headers: Record<string, string> = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    }
  ) => {
    const functionName = LAMBDA_ENDPOINTS[endpoint];

    if (functionName) {
      // Lambda POST
      const command = new InvokeCommand({
        FunctionName: functionName,
        Payload: JSON.stringify(data),
      });

      const response = await lambdaClient.send(command);

      if (!response.Payload) return null;
      const decoded = new TextDecoder().decode(response.Payload);
      console.log(`[Lambda Response] ${functionName}:`, decoded);
      return JSON.parse(decoded);
    } else {
      // Normal HTTP POST
      const response = await axios.post(endpoint, data, { headers });
      console.log(`[POST Response] ${endpoint}:`, response.data);
      return response.data;
    }
  },
};
export default ApiClient;
