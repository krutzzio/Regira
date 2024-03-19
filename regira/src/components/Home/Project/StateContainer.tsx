import { Issue, State, StateContaierType } from '../../../types'
import IssueContainer from './IssueContainer'
import { Droppable } from 'react-beautiful-dnd'

export default function StateContainer(props: StateContaierType) {
  const { title, issues, createIssue, issueInfo } = props

  function compareByPriority(issueA: Issue, issueB: Issue): number {
    const priorityOrder = { "low": 1, "medium": 2, "high": 3 };
    return priorityOrder[issueA.priority] - priorityOrder[issueB.priority];
  }
  const sortedIssues = issues.slice().sort(compareByPriority);

  return (
    <Droppable droppableId={title}>
      {(provided) => (
        <div className='p-1 flex flex-col justify-between gap-4 bg-white rounded-lg h-[72vh] '>
          <article className='h-[90%] flex flex-col'>
            <h1 className='text-2xl text-start font-semibold p-2'>{title}</h1>
            <section {...provided.droppableProps} ref={provided.innerRef} className='h-[100%] p-1 flex flex-col gap-2 overflow-auto '>
              {sortedIssues.map((issue, index) => <IssueContainer key={issue.id} issue={issue} index={index} issueInfo={issueInfo} />)}
              {provided.placeholder}
            </section>
          </article>
          {
            createIssue &&
            <button className='' onClick={() => createIssue(title as State)}>Add issue +</button>
          }
        </div>
      )}
    </Droppable>
  )
}