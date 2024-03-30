import { useState } from "react";
import { AddIssueType, Issue, Priority, State, Tags, Type } from "../../types";
import { useParams } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import CreateTag from "../Adders/Tags/CreateTag";
import Tag from "../Adders/Tags/Tag";


export function AddIssue(props: AddIssueType) {
    const { issueState, addIssue, closeModal } = props;
    const { id } = useParams()
    const [newIssue, setNewIssue] = useState<Issue>({ title: "", desc: "", type: "bug", priority: "high", state: issueState as State, id: 0 })
    const [selectedTags, setSelectedTags] = useState<Tags[]>([])

    const createProject = (event: React.FormEvent) => {
        event.preventDefault()
        if (!newIssue.title) return

        const API_PROJECT_URL = `http://localhost:3000/api/issues/project/${id}`
        fetch(API_PROJECT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ ...newIssue, tags: selectedTags })
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

    const addNewTag = (tag: Tags) => {
        setSelectedTags([...selectedTags, tag])
    }

    return (
        <div className='z-20 relative p-4 h-fit w-3/12 bg-[#d9d5cf] rounded-lg'>
            <h1 className='text-4xl text-center mb-8'>New Issue</h1>
            <button className='absolute top-0 right-0 text-4xl' onClick={closeModal}><IoIosClose /></button>
            <form action='POST' className="flex flex-col gap-3" onSubmit={createProject}>
                <article>
                    <label className="block" htmlFor="title">Name</label>
                    <input autoFocus className="w-full px-2 py-1 rounded" type="text" name='title' id="title" onChange={handleChange} />
                </article>
                <article>
                    <label className="block" htmlFor="desc">Description</label>
                    <textarea className="w-full px-2 py-1 rounded" rows={5} name='desc' id="desc" onChange={handleChange} />
                </article>
                <main className="w-full flex gap-4 justify-between">
                    <section>
                        <h1>Type</h1>
                        <select name="type" id="type" value={newIssue.type} onChange={handleChange}>
                            <option value="bug">Bug</option>
                            <option value="feature">Feature</option>
                            <option value="task">Task</option>
                        </select>
                    </section>
                    <section>
                        <h1>Priority</h1>
                        <select name="priority" id="priority" value={newIssue.priority} onChange={handleChange}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </section>
                    <section>
                        <h1>State</h1>
                        <select name="state" id="state" value={newIssue.state} onChange={handleChange}>
                            <option value="open">Open</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                        </select>
                    </section>
                </main>
                <section>
                    <h1>Tags </h1>
                    <article className="flex flex-wrap gap-2">
                        {
                            selectedTags.map(tag => <Tag key={tag.id} id={tag.id} name={tag.name} />)
                        }
                        <CreateTag tags={selectedTags} addTag={addNewTag} />
                    </article>
                </section>
                <button className="w-fit m-auto bg-white rounded p-2 text-center">Create Issue</button>
            </form>
        </div>
    )
}