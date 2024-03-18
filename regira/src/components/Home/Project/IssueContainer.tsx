import { Draggable } from 'react-beautiful-dnd'
import { IssueContainerType } from '../../../types'

export default function IssueContainer(props: IssueContainerType) {

    const { issue, index, issueInfo } = props


    const { id, title, desc, type, priority, state, authorId, assigneeId } = issue


    return (
        <Draggable draggableId={`${id}`} index={index}>
            {(provided) => (
                <div onClick={() => issueInfo(issue)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={`bg-[#e4e2dd] w-full min-h-24 rounded-lg p-2 border border-4 ${priority === "low" ? `border-red-600` : priority === "medium" ? `border-amber-400` : `border-green-600`}`}>
                    <h1>{title}</h1>
                    <p>{desc}</p>
                    {
                        type === "bug"
                            ? <img className='w-8' src="/images/types/bug.png" alt="Bug icon" />
                            : type === "feature"
                                ? <img className='w-8' src="/images/types/feature.png" alt="Feature icon" />
                                : <img className='w-8' src="/images/types/task.png" alt="Task icon" />
                    }
                </div>
            )}
        </Draggable>
    )
}