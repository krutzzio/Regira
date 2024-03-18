import { useEffect, useState } from 'react'
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import StateContainer from './StateContainer'
import { Issue, State, StateContaierType } from '../../../types'
import { useParams } from 'react-router-dom'
import Modal from '../../Modal/Modal'

export default function Project() {
  const { id } = useParams()
  const API_ISSUES_URL = `http://localhost:3000/api/issues/project/${id}`

  const STATES = ["open", "in_progress", "resolved", "closed"]
  const [issues, setIssues] = useState<Issue[]>([])
  const [stateColumns, setStateColumns] = useState<StateContaierType[]>([])
  const [createIssue, setCreateIssue] = useState<State | undefined>()

  useEffect(() => {
    fetch(API_ISSUES_URL, { credentials: "include" })
      .then(resp => resp.json())
      .then(data => setIssues(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const filteredIssues = STATES.map(state => {
      return {
        title: state,
        issues: issues.filter((issue: { state: string }) => issue.state === state)
      }
    })
    setStateColumns(filteredIssues)
  }, [issues])

  const handleDragEnd = (results: DropResult) => {
    const { source, destination, draggableId } = results
    if (!destination) return
    if (source.droppableId === destination?.droppableId) return
    const sourceCol = [...stateColumns].find(state => state.title === source.droppableId)
    const destCol = [...stateColumns].find(state => state.title === destination.droppableId)

    if (!sourceCol || !destCol) return
    const itemDragged = sourceCol.issues.find(issue => issue.id == draggableId)
    if (!itemDragged) return
    const newSourceCol = { ...sourceCol, issues: sourceCol?.issues.filter((issue) => issue.id != draggableId) }
    destCol.issues.push({ ...itemDragged, state: destination.droppableId as State })

    const newStateColumns = [...stateColumns].map(val => {
      if (val.title === source.droppableId) {
        return newSourceCol
      } else if (val.title === destination.droppableId) {
        return destCol
      } else {
        return val
      }
    })
    const API_ISSUE_URL_PUT = `http://localhost:3000/api/issues/${itemDragged.id}`
    fetch(API_ISSUE_URL_PUT, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ state: destination.droppableId })
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        setStateColumns(newStateColumns)
      })
      .catch(err => console.log(err))
  }

  const newIssueState = (issueState: State | undefined) => {
    setCreateIssue(issueState)
  }

  const addedIssue = {
    issueFn: (newIssue: Issue) => {
      setIssues([...issues, newIssue])
    },
    issueState: createIssue,
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {
        createIssue &&
        <Modal type={"issue"} addIssue={addedIssue} closeModal={() => setCreateIssue(undefined)} />
      }

      <div className='p-8 grid grid-cols-4 gap-4 h-screen'>
        {
          stateColumns.map(state => <StateContainer key={state.title} createIssue={newIssueState} title={state.title} issues={state.issues} />)
        }
      </div>
    </DragDropContext>
  )
}
