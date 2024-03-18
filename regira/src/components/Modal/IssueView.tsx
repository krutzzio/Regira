import React from 'react'
import { IssueViewType } from '../../types'

export function IssueView(props: IssueViewType) {

    const { issue } = props

    return (
        <div>
            <section>
                <h1 className='text-2xl'>{issue.title}</h1>
                <p>{issue.desc}</p>
            </section>
            <section>
                <h1>Comments</h1>
            </section>

        </div>
    )
}
