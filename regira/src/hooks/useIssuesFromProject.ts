import { useEffect, useState } from "react"
import { Issue, Project, State } from "../types"
import { useParams } from "react-router-dom"

export function useIssuesFromProjects() {
    const { id } = useParams()
    const API_ISSUES_URL = `/api/issues/project/${id}`

    const [project, setProject] = useState<Project>() //project info
    const [issues, setIssues] = useState<Issue[]>([]) //issues array of project
    const [createIssue, setCreateIssue] = useState<State | undefined>() //create Issue


    useEffect(() => {
        fetch(API_ISSUES_URL, { credentials: "include" })
            .then(resp => resp.json())
            .then(data => {
                setIssues(data.item)
                setProject(data.project)
            })
            .catch(err => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const newIssueState = (issueState: State | undefined) => {
        setCreateIssue(issueState)
    }

    const addIssue = {
        issueFn: (newIssue: Issue) => {
            setIssues([...issues, newIssue])
        },
        issueState: createIssue,
    }

    const deleteIssue = (currentIssue: Issue) => {
        setIssues(issues.filter(issue => issue.id !== currentIssue.id))
    }

    return { project, issues, newIssueState, createIssue, setCreateIssue, addIssue, deleteIssue }
}