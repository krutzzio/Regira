import { Draggable } from 'react-beautiful-dnd'
import { IssueContainerType } from '../../../types'

export default function IssueContainer(props: IssueContainerType) {

    const { issue, index, issueInfo } = props


    const { id, title, desc, type, priority } = issue


    return (
        <Draggable draggableId={`${id}`} index={index}>
            {(provided) => (
                <div onClick={() => issueInfo(issue)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                    className={`bg-[#e4e2dd] min-h-28 w-full rounded-lg p-2 border-4 ${priority === "low" ? `border-red-600` : priority === "medium" ? `border-amber-400` : `border-green-600`}`}>
                    <div className='w-full h-full relative'>
                        <div className='absolute top-2 right-2 w-8'>
                            {
                                type === "bug"
                                    ? <img src="/images/types/bug.png" alt="Bug icon" />
                                    : type === "feature"
                                        ? <img src="/images/types/feature.png" alt="Feature icon" />
                                        : <img src="/images/types/task.png" alt="Task icon" />
                            }
                        </div>
                        <h1 className='text-lg font-semibold'>{title}</h1>
                        <p className=' font-light'>{desc}</p>

                    </div>
                </div>

            )}
        </Draggable>
    )
}