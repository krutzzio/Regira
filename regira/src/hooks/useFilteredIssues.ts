import { useEffect, useState } from "react";
import { Issue, StateContaierType } from "../types";


export function useFilteredIssues(issues: Issue[]) {
    const [stateColumns, setStateColumns] = useState<StateContaierType[]>([]) //columns for each state of the issues
    const STATES = ["open", "in_progress", "resolved", "closed"]

    useEffect(() => {
        const filteredIssues = STATES.map(state => {
            return {
                title: state,
                issues: issues.filter((issue: { state: string }) => issue.state === state)
            }
        })
        setStateColumns(filteredIssues)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [issues])

    return { stateColumns, setStateColumns }
}

