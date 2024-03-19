import { useState } from "react";
import { AddProjectType, Project } from "../../types";


export function AddProject(props: AddProjectType) {
    const { addProject, closeModal } = props;
    const [newProject, setNewProject] = useState<Project>({ active: true, name: "S", desc: "", id: 0 })

    const createProject = (event: React.FormEvent) => {
        event.preventDefault()
        if (!newProject.name) return

        const API_PROJECT_URL = "http://localhost:3000/api/projects"
        fetch(API_PROJECT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(newProject)
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.error) throw new Error(data.error)
                console.log("CORRECT PROJECT", data)
                const createdProject = {
                    name: data.name,
                    active: data.active,
                    desc: data.desc,
                    userid: data.UserId,
                    id: data.id
                }

                if (addProject) {
                    addProject(createdProject)
                }
            })
            .catch(err => console.log("ERROR EN LA SUBIDA DE PROYECTO", err))
        closeModal()
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const inputType = event.target
        inputType.name === "name"
            ? setNewProject({ ...newProject, name: inputType.value })
            : setNewProject({ ...newProject, desc: inputType.value })
        console.log(newProject, event)
    }

    const handleChangeBoolean = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputType = event.target
        setNewProject({ ...newProject, active: inputType.checked })
    }

    return (
        <div>
            <div className='relative'>
                <h1 className='text-4xl text-center mb-8'>New Project</h1>
                <button className='absolute top-0 right-0' onClick={closeModal}>X</button>
                <form action='POST' onSubmit={createProject}>
                    <label className="block" htmlFor="name">Name</label>
                    <input className="w-full mt-1 mb-2 px-2 py-1 rounded" type="text" name='name' onChange={handleChange} />
                    <label className="block" htmlFor="desc">Description</label>
                    <textarea className="w-full mt-1 mb-2 px-2 py-1 rounded" rows={5} name='desc' onChange={handleChange} />
                    <article className="w-fit flex flex-col items-center">
                        <label className="block" htmlFor="active">Active</label>
                        <input className='px-2 py-1 inline-block' type="checkbox" id="active" name='active' defaultChecked onChange={handleChangeBoolean} />
                    </article>
                    <button className="w-full text-center">Create Project</button>
                </form>
            </div>
        </div>

    )
}