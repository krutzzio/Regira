import { IssueViewType } from '../../types'
import { IoIosClose } from "react-icons/io";
import { CiTrash } from "react-icons/ci";


export function IssueView(props: IssueViewType) {

    const { issue, closeModal } = props

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
            <aside className='bg-white mt-6'>
                <ul>
                    <li>Delete Issue</li>
                    <li>
                        <h1>Tags</h1>
                        <main>{

                        }</main>
                    </li>
                </ul>

            </aside>

        </div>
    )
}
