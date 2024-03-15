import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { IssueContainerType } from '../../../types'

export default function IssueContainer(props: IssueContainerType) {

    const { issue, index } = props

    const {id, title, desc, type, priority, state, authorId, assigneeId} = issue

    return (
        <Draggable draggableId={`${id}`} index={index}>
            {(provided) => (
                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className='bg-[#e4e2dd] w-full min-h-24 rounded-lg p-2 border'>
                    <h1>{title}</h1>
                    <p>{desc}</p>
                </div>
            )}
        </Draggable>
    )
}
