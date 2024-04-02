import { useState } from 'react'
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import StateContainer from './StateContainer'
import { Issue, Project, State } from '../../../types'
import Modal from '../../Modal/Modal'
import { useIssuesFromProjects } from '../../../hooks/useIssuesFromProject'
import { useFilteredIssues } from '../../../hooks/useFilteredIssues'

export default function Project() {

  const { project, issues, newIssueState, createIssue, setCreateIssue, addIssue, deleteIssue } = useIssuesFromProjects()
  const { stateColumns, setStateColumns } = useFilteredIssues(issues)
  const [issueView, setIssueView] = useState<Issue | undefined>() //see issue info

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
    const API_ISSUE_URL_PUT = `/api/issues/${itemDragged.id}`
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

  const issueViewInfo = (issue: Issue) => {
    setIssueView(issue)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {
        createIssue &&
        <Modal type={"issue"} addIssueInfo={addIssue} closeModal={() => setCreateIssue(undefined)} />
      }
      {
        issueView &&
        <Modal type="issueView" closeModal={() => setIssueView(undefined)} deleteIssue={deleteIssue} issue={issueView} />
      }
      <div className='h-full p-8 pt-0 flex flex-col gap-2 justify-start'>
        <h1 className=' text-4xl'>{project?.name}</h1>
        <p className='text-xl'>{project?.desc}</p>
        <div className='grid grid-cols-4 gap-4'>
          {
            stateColumns.map(state => <StateContainer key={state.title} createIssue={newIssueState} title={state.title} issues={state.issues} issueInfo={issueViewInfo} />)
          }
        </div>
      </div>
    </DragDropContext>
  )
}
