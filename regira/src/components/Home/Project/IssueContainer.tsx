import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

export default function IssueContainer() {
    return (
        <Draggable draggableId='2' index={2}>
            {(provided) => (
                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className='bg-[#e4e2dd] w-full min-h-24 rounded-lg p-2 border'>
                    <h1>Issue</h1>
                </div>
            )}
        </Draggable>
    )
}
