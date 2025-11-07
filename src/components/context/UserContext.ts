import { createContext } from "react";

interface User {
  enterpriseId: string;
}

export const UserContext = createContext<User | null>(null);
