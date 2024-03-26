import { IssueViewType, Tags } from '../../types'
import { IoIosClose } from "react-icons/io";
import { CiTrash } from "react-icons/ci";
import { useEffect, useState } from 'react';
import Tag from '../Tags/Tag';


export function IssueView(props: IssueViewType) {

    const { issue, closeModal, deletedIssue } = props
    const [issueTags, setIssueTags] = useState<Tags[]>([])
    const [deleteIssue, setDeleteIssue] = useState<boolean>(false)

    useEffect(() => {
        fetch(`http://localhost:3000/api/issues/${issue.id}/tags`, { credentials: 'include' })
            .then(resp => resp.json())
            .then(data => setIssueTags(data))
            .catch(err => console.log(err))
    }, [])

    const handleDeleteIssue = () => {
        fetch(`http://localhost:3000/api/issues/${issue.id}`, { method: "DELETE", credentials: "include" })
            .then(resp => resp.json())
            .catch(err => console.log(err))
        deletedIssue(issue)
        closeModal()
    }


    return (
        <div className={`z-20 relative p-4 grid grid-cols-4 gap-4 w-4/6 h-4/6 bg-[#d9d5cf] rounded-lg border-4 ${issue.priority === "low" ? `border-red-600` : issue.priority === "medium" ? `border-amber-400` : `border-green-600`}`}>
            <button className='absolute top-0 right-0 text-4xl' onClick={closeModal}><IoIosClose /></button>
            <main className='flex flex-col gap-4 col-span-3'>
                <h1 className='text-2xl font-semibold'>{issue.title}</h1>
                <section>
                    <h2 className='text-xl font-medium italic'>Description</h2>
                    <p>{issue.desc}</p>
                </section>
                <section>
                    <h1 className='text-xl font-medium italic'>Comments</h1>
                </section>
            </main>
            <aside className='mt-6'>
                <ul className='flex flex-col gap-4'>
                    <li className='w-fit h-24'>
                        {
                            deleteIssue
                                ? (<div>
                                    <h1 className='font-bold mb-2'>Seguro que quieres eliminar el Issue?</h1>
                                    <section className='flex justify-evenly'>
                                        <h2 onClick={handleDeleteIssue} className='cursor-pointer bg-red-700 w-10 text-center p-2 rounded text-white font-bold'>Sí</h2>
                                        <h2 onClick={() => setDeleteIssue(false)} className='cursor-pointer bg-green-700 w-10 text-center p-2 rounded text-white font-bold'>No</h2>
                                    </section>
                                </div>)
                                : <h1 onClick={() => setDeleteIssue(true)} className='cursor-pointer flex items-center gap-4 bg-red-700 w-fit p-2 rounded text-white font-bold'>Delete Issue <span className='text-lg'><CiTrash /></span></h1>
                        }
                    </li>
                    <li className='flex flex-col gap-3'>
                        <h1 className='text-xl font-medium italic'>Tags</h1>
                        <main className='flex flex-wrap gap-2'>
                            {
                                issueTags.map(tag => <Tag key={tag.id} id={tag.id} name={tag.name} />)
                            }
                        </main>
                    </li>
                </ul>
            </aside>
        </div >
    )
}
