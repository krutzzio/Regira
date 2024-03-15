import React, { useState } from 'react'
import { DragDropContext } from "react-beautiful-dnd"
import StateContainer from './StateContainer'

export default function Project() {

  const [stateColumns, setStateColumns] = useState(["OPEN", "IN PROGESS", "RESOLVED", "CLOSED"])

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
