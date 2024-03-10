import { createContext } from "react";
import { Logged } from "./types";

interface AuthContextType {
    loggedInfo: {
        logged: Logged,
        logFn: (logged: Logged) => void
    },
}

export default createContext<AuthContextType | undefined>(undefined)