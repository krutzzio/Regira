import { State, StateContaierType } from '../../../types'
import IssueContainer from './IssueContainer'
import { Droppable } from 'react-beautiful-dnd'

export default function StateContainer(props: StateContaierType) {
  const { title, issues, createIssue } = props


  return (

    <Droppable droppableId={title}>
      {(provided) => (
        <div className=' p-4 flex flex-col gap-4 bg-white h-full max-h-[48rem] rounded-lg border-[#aca498] border-2'>
          <h1 className='text-2xl text-center font-light'>{title}</h1>
          <section {...provided.droppableProps} ref={provided.innerRef} className='overflow-auto h-full flex flex-col gap-2'>
            {issues.map((issue, index) => <IssueContainer key={issue.id} issue={issue} index={index} />)}
            {provided.placeholder}
          </section>
          {
            createIssue &&
            <button className=' bottom-0' onClick={() => createIssue(title as State)}>Add issue +</button>
          }
        </div>
      )}
    </Droppable>
  )
}
