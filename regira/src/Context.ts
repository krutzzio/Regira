import { createContext } from "react";
import { Logged } from "./types";

type AuthContextType = {
    loggedInfo: {
        logged: Logged | undefined,
        logFn: (logged: Logged) => void,
        API_URL: string
    },
}

export default createContext<AuthContextType | undefined>(undefined)