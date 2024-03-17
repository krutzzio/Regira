import { StateContaierType } from '../../../types'
import IssueContainer from './IssueContainer'
import { Droppable } from 'react-beautiful-dnd'

export default function StateContainer(props: StateContaierType) {
  const { title, issues, newIssue } = props


  return (

    <Droppable droppableId={title}>
      {(provided) => (
        <div className='p-4 flex flex-col bg-white h-full rounded-lg border-[#aca498] border-2'>
          <h1 className='text-2xl text-center font-semibold'>{title}</h1>
          <section {...provided.droppableProps} ref={provided.innerRef} className='h-full flex flex-col gap-2'>
            {issues.map((issue, index) => <IssueContainer key={issue.id} issue={issue} index={index} />)}
            {provided.placeholder}
          </section>
          <button onClick={newIssue}>Add issue +</button>
        </div>
      )}
    </Droppable>
  )
}
