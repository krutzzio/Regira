import React, { useEffect, useState } from 'react'
import { DragDropContext } from "react-beautiful-dnd"
import StateContainer from './StateContainer'
import { Issue } from '../../../types'
import { useParams } from 'react-router-dom'

export default function Project() {

  const { id } = useParams()

  const API_ISSUES_URL = `http://localhost:3000/api/issues/project/${id}`


  const [stateColumns, setStateColumns] = useState(["open", "in_progress", "resolved", "closed"])
  const [issues, setIssues] = useState<Issue[]>()

  useEffect(() => {
    fetch(API_ISSUES_URL, { credentials: "include" })
      .then(resp => resp.json())
      .then(data => setIssues(data))
  }, [])

  useEffect(() => {
    console.log(issues)

    if (!issues) return

    const filterIssues = stateColumns.map(state => issues.filter(issue => issue.state == state))
    console.log(filterIssues)
 
  }, [issues])

  const handleDragEnd = () => {

  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className='p-8 grid grid-cols-4 gap-4 h-screen'>
        {
          stateColumns.map(state => <StateContainer key={state} title={state} />)
        }
      </div>
    </DragDropContext>
  )
}
