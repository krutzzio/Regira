import { AuthContextType, IssueViewType, Tags, User } from '../../types'
import userIcon from "../../assets/icons/user.svg"
import { useContext, useEffect, useState } from 'react';
import Tag from '../Adders/Tags/Tag';
import AuthContext from '../../context/AuthContext';
import Comments from './Comments';


export function IssueView(props: IssueViewType) {

    const { loggedInfo } = useContext(AuthContext) as AuthContextType
    const { issue, closeModal, deletedIssue } = props
    const [issueTags, setIssueTags] = useState<Tags[]>([])
    const [deleteIssue, setDeleteIssue] = useState<boolean>(false)
    const [assigne, setAssignee] = useState<User>()

    //Get the issue tags
    useEffect(() => {
        fetch(`/api/issues/${issue.id}/tags`, { credentials: 'include' })
            .then(resp => resp.json())
            .then(data => {
                setIssueTags(data.tags)
                setAssignee(data.assigneeUser)
            })
            .catch(err => console.log(err))
    }, [issue.id])

    const handleDeleteIssue = () => {
        fetch(`/api/issues/${issue.id}`, { method: "DELETE", credentials: "include" })
            .then(resp => resp.json())
            .catch(err => console.log(err))
        deletedIssue(issue)
        closeModal()
    }

    const handleAssign = () => {
        const API_ISSUE_URL_PUT = `/api/issues/${issue.id}`
        fetch(API_ISSUE_URL_PUT, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ assigneeId: loggedInfo.logged.id })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.error) throw new Error(data.error)
                setDeleteIssue(false)
                setAssignee(loggedInfo.logged)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={`z-20 relative p-4 grid grid-cols-4 gap-4 w-4/6 min-w-[30rem] h-4/6 bg-[#d9d5cf] rounded-lg border-4 ${issue.priority === "high" ? `border-red-600` : issue.priority === "medium" ? `border-amber-400` : `border-green-600`}`}>
            <button className='absolute top-1 right-4 text-4xl' onClick={closeModal}>X</button>
            <main className='flex flex-col gap-4 col-span-3'>
                <section className='flex items-center gap-8'>
                    <h1 className='text-2xl font-semibold'>{issue.title}</h1>
                </section>
                <section>
                    <h2 className='text-xl font-medium italic'>Description</h2>
                    <p className=''>{issue.desc}</p>
                </section>
                <Comments issueId={issue.id} />
            </main>
            <aside className='mt-6'>
                <ul className='flex flex-col gap-4'>
                    <li className='flex flex-col gap-2 items-start'>
                        <h1 className='flex items-center gap-4 text-xl'><img className='w-6' src={userIcon} alt="User icon" /> {assigne?.name}</h1>
                        {
                            (loggedInfo.logged.id !== assigne?.id)
                                ? <button onClick={handleAssign} className='bg-white p-1 rounded-md'>Assign issue to me</button>
                                : <></>
                        }
                    </li>
                    <li>
                        <article className='flex flex-col items-start '>
                            <h2>State <span className='text-xl font-bold'>{issue.state}</span></h2>
                            <h2>Priority <span className='text-xl font-bold'>{issue.priority}</span></h2>
                        </article>
                    </li>
                    <li className='flex flex-col gap-3'>
                        <h1 className='text-xl font-medium italic'>Tags</h1>
                        <main className='flex flex-wrap gap-2'>
                            {
                                issueTags.map(tag => <Tag key={tag.id} id={tag.id} name={tag.name} />)
                            }
                        </main>
                    </li>
                    <li className='w-fit h-24'>
                        {
                            deleteIssue
                                ? <div>
                                    <h1 className='font-bold mb-2'>Seguro que quieres eliminar el Issue?</h1>
                                    <section className='flex justify-evenly'>
                                        <h2 onClick={handleDeleteIssue} className='cursor-pointer bg-red-700 w-10 text-center p-2 rounded text-white font-bold'>Sí</h2>
                                        <h2 onClick={() => setDeleteIssue(false)} className='cursor-pointer bg-green-700 w-10 text-center p-2 rounded text-white font-bold'>No</h2>
                                    </section>
                                </div>
                                : <h1 onClick={() => setDeleteIssue(true)} className='cursor-pointer flex items-center gap-4 border-4 border-red-700 bg-red-300 w-fit text-lg p-2 rounded text-red-700 font-bold'>Delete Issue </h1>
                        }
                    </li>
                </ul>
            </aside>
        </div >
    )
}
