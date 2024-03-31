import { Draggable } from 'react-beautiful-dnd'
import { IssueContainerType } from '../../../types'
import bugIcon from "../../../assets/icons/bug-svgrepo-com.svg"
import taskIcon from "../../../assets/icons/doc-svgrepo-com.svg"
import featureIcon from "../../../assets/icons/setting-2-svgrepo-com.svg"

export default function IssueContainer(props: IssueContainerType) {

    const { issue, index, issueInfo } = props

    const { id, title, type, priority } = issue

    return (
        <Draggable draggableId={`${id}`} index={index}>
            {(provided) => (
                <div onClick={() => issueInfo(issue)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                    className={` bg-[#fff7ed] w-full rounded-lg p-2 border-4 flex justify-between items-center  ${priority === "high" ? `border-red-600 bg-red-300` : priority === "medium" ? `border-amber-400 bg-amber-200` : `border-green-600 bg-green-300`}`}>
                    <h1 className='text-lg overflow-hidden'>{title}</h1>
                    <div className='w-8 min-w-8'>
                        {
                            type === "bug"
                                ? <img src={bugIcon} alt="Bug icon" />
                                : type === "feature"
                                    ? <img src={featureIcon} alt="Feature icon" />
                                    : <img src={taskIcon} alt="Task icon" />
                        }
                    </div>
                </div>

            )}
        </Draggable>
    )
}