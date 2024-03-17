import { useEffect, useState } from 'react'
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import StateContainer from './StateContainer'
import { State, StateContaierType } from '../../../types'
import { useParams } from 'react-router-dom'
import Modal from '../../Modal/Modal'

export default function Project() {
  const { id } = useParams()
  const API_ISSUES_URL = `http://localhost:3000/api/issues/project/${id}`

  const STATES = ["open", "in_progress", "resolved", "closed"]

  const [stateColumns, setStateColumns] = useState<StateContaierType[]>([])
  const [newIssue, setNewIssue] = useState<boolean>(false)

  useEffect(() => {
    fetch(API_ISSUES_URL, { credentials: "include" })
      .then(resp => resp.json())
      .then(data => {
        const filteredIssues = STATES.map(state => {
          return {
            title: state,
            issues: data.filter((issue: { state: string }) => issue.state === state)
          }
        })
        setStateColumns(filteredIssues)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    destCol.issues.push({ ...itemDragged, state: destination.droppableId as State }) //{ ...destCol, issues: [...destCol.issues, { ...itemDragged, state: destination.droppableId }] }

    const newStateColumns = [...stateColumns].map(val => {
      if (val.title === source.droppableId) {
        return newSourceCol
      } else if (val.title === destination.droppableId) {
        return destCol
      } else {
        return val
      }
    })

    setStateColumns(newStateColumns)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {
        newIssue &&
        <Modal type={"issue"} closeModal={() => setNewIssue(false)} />

      }
      <div className='p-8 grid grid-cols-4 gap-4 h-screen'>
        {
          stateColumns.map(state => <StateContainer key={state.title} newIssue={() => setNewIssue(true)} title={state.title} issues={state.issues} />)
        }
      </div>
    </DragDropContext>
  )
}
