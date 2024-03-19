import React from 'react'
import { IssueViewType } from '../../types'
import { IoIosClose } from "react-icons/io";


export function IssueView(props: IssueViewType) {

    const { issue } = props

    return (
        <div className={`relative p-4 flex flex-col gap-4 w-4/6 h-4/6 bg-[#d9d5cf] rounded-lg border-4 ${issue.priority === "low" ? `border-red-600` : issue.priority === "medium" ? `border-amber-400` : `border-green-600`}`}>
            <h1 className='text-2xl font-semibold'>{issue.title}</h1>
            <section>
                <h2 className='text-xl font-medium italic'>Description</h2>
                <p>{issue.desc}</p>
            </section>
            <section>
                <h1 className='text-xl font-medium italic'>Comments</h1>
            </section>
        </div>
    )
}
