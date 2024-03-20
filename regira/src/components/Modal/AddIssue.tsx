import { useState } from "react";
import { AddIssueType, Issue, Priority, State, Type } from "../../types";
import { useParams } from "react-router-dom";
import { IoIosClose } from "react-icons/io";


export function AddIssue(props: AddIssueType) {
    const { issueState, addIssue, closeModal } = props;
    const { id } = useParams()
    const [newIssue, setNewIssue] = useState<Issue>({ title: "", desc: "", type: "bug", priority: "high", state: issueState as State, id: 0 })

    const createProject = (event: React.FormEvent) => {
        event.preventDefault()
        if (!newIssue.title) return

        const API_PROJECT_URL = `http://localhost:3000/api/issues/project/${id}`
        fetch(API_PROJECT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(newIssue)
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.error) throw new Error(data.error)
                const createdIssue = {
                    title: data.title,
                    desc: data.desc,
                    type: data.type,
                    priority: data.priority,
                    state: data.state,
                    authorId: data.UserId,
                    assigneeId: data.UserId,
                    id: data.id
                }

                if (addIssue) {
                    addIssue(createdIssue)
                }
            })
            .catch(err => console.log("ERROR EN LA SUBIDA DE PROYECTO", err))
        closeModal()
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const inputType = event.target
        if (inputType.name === "title") {
            setNewIssue({ ...newIssue, title: inputType.value })
        } else if (inputType.name === "desc") {
            setNewIssue({ ...newIssue, desc: inputType.value })
        } else if (inputType.name === "type") {
            setNewIssue({ ...newIssue, type: inputType.value as Type })
        } else if (inputType.name === "priority") {
            setNewIssue({ ...newIssue, priority: inputType.value as Priority })
        } else if (inputType.name === "state") {
            setNewIssue({ ...newIssue, state: inputType.value as State })
        }
    }

    return (
        <div className='z-20 relative p-4 h-fit w-3/12 bg-[#d9d5cf] rounded-lg'>
            <h1 className='text-4xl font-light text-center mb-8'>New Issue</h1>
            <button className='absolute top-0 right-0 text-4xl' onClick={closeModal}><IoIosClose /></button>
            <form action='POST' onSubmit={createProject}>
                <label className="block" htmlFor="title">Name</label>
                <input autoFocus className="w-full mt-1 mb-2 px-2 py-1 rounded" type="text" name='title' onChange={handleChange} />
                <label className="block" htmlFor="desc">Description</label>
                <textarea className="w-full mt-1 mb-2 px-2 py-1 rounded" rows={5} name='desc' onChange={handleChange} />
                <main className="w-full flex justify-between">
                    <section>
                        <h1>Type</h1>
                        <article>
                            <label htmlFor="bug">Bug</label>
                            <input type="radio" name="type" id="bug" value="bug" onChange={handleChange} />
                        </article>
                        <article>
                            <label htmlFor="feature">Feature</label>
                            <input type="radio" name="type" id="feature" value="feature" onChange={handleChange} />
                        </article>
                        <article>
                            <label htmlFor="task">Task</label>
                            <input type="radio" name="type" id="task" value="task" onChange={handleChange} />
                        </article>
                    </section>
                    <section>
                        <h1>Priority</h1>
                        <article>
                            <label htmlFor="low">Low</label>
                            <input type="radio" name="priority" id="low" value="low" onChange={handleChange} />
                        </article>
                        <article>
                            <label htmlFor="medium">Medium</label>
                            <input type="radio" name="priority" id="medium" value="medium" onChange={handleChange} />
                        </article>
                        <article>
                            <label htmlFor="high">High</label>
                            <input type="radio" name="priority" id="high" value="high" onChange={handleChange} />
                        </article>
                    </section>
                    <section>
                        <h1>State</h1>
                        <article>
                            <label htmlFor="open">Open</label>
                            <input type="radio" name="state" id="open" value="open" defaultChecked={issueState === "open"} onChange={handleChange} />
                        </article>
                        <article>
                            <label htmlFor="in_progress">In Progress</label>
                            <input type="radio" name="state" id="in_progress" value="in_progress" defaultChecked={issueState === "in_progress"} onChange={handleChange} />
                        </article>
                        <article>
                            <label htmlFor="resolved">Resolved</label>
                            <input type="radio" name="state" id="resolved" value="resolved" defaultChecked={issueState === "resolved"} onChange={handleChange} />
                        </article>
                        <article>
                            <label htmlFor="closed">Closed</label>
                            <input type="radio" name="state" id="closed" value="closed" defaultChecked={issueState === "closed"} onChange={handleChange} />
                        </article>
                    </section>
                </main>

                <button className="w-full text-center">Create Issue</button>
            </form>
        </div>
    )
}