import React, { useState } from 'react'
import { StateContaierType } from '../../../types'
import IssueContainer from './IssueContainer'
import { Droppable } from 'react-beautiful-dnd'

export default function StateContainer(props: StateContaierType) {
  const { title } = props

  const [issues, setIssues] = useState([{}])

  return (
    <Droppable droppableId={title}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className='p-4 bg-white max-h-[50rem] h-full rounded-lg border-[#aca498] border-2'>
          <h1 className='text-2xl text-center font-semibold'>{title}</h1>
          <section className='mt-4'>
            {/* <IssueContainer issue={issues}/> */}
          </section>
          {provided.placeholder}
        </div>
      )}
    </Droppable>

  )
}
