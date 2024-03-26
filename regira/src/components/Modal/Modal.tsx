import { Issue, ModalType, issueFun } from '../../types'
import { AddIssue } from './AddIssue'
import { AddProject } from './AddProject'
import { IssueView } from './IssueView'


export default function Modal(props: ModalType) {

  const { type, addProject, addIssueInfo, deleteIssue, closeModal, issue } = props

  return (
    <div className='w-screen h-screen absolute top-0 left-0 flex justify-center items-center'>
      <div onClick={closeModal} className='bg-black transition-colors bg-opacity-80 w-full h-full absolute z-10  top-0 left-0'></div>
      {
        type === "project"
          ? <AddProject closeModal={closeModal} addProject={addProject} />
          : type === "issue"
            ? <AddIssue closeModal={closeModal} issueState={addIssueInfo?.issueState} addIssue={addIssueInfo?.issueFn} />
            : <IssueView issue={issue as Issue} deletedIssue={deleteIssue as issueFun} closeModal={closeModal} />
      }
    </div>
  )
}
