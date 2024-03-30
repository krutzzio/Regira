import { useContext, useState } from "react";
import { AddProjectType, AuthContextType, Logged, Project } from "../../types";
import { IoIosClose } from "react-icons/io";
import AuthContext from "../../context/AuthContext";
import { useUsers } from "../../hooks/useUsers";
import AddUser from "../Adders/Users/AddUser";


export function AddProject(props: AddProjectType) {
    const { loggedInfo } = useContext(AuthContext) as AuthContextType
    const { logged } = loggedInfo
    const { users } = useUsers(logged as Logged)
    const { addProject, closeModal } = props;
    const [newProject, setNewProject] = useState<Project>({ active: true, name: "", desc: "", id: 0 })
    const [selectedUsers, setSelectedUsers] = useState<string[]>([logged.email])

    const createProject = (event: React.FormEvent) => {
        event.preventDefault()
        if (!newProject.name) return

        const API_PROJECT_URL = "http://localhost:3000/api/projects"

        fetch(API_PROJECT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ ...newProject, users: selectedUsers })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.error) throw new Error(data.error)
                const createdProject = {
                    name: data.name,
                    active: data.active,
                    desc: data.desc,
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
    }

    const addUser = (email: string) => {
        if (!users.find(user => user.email === email)) return console.log("User not found")
        const newUsers = [...selectedUsers, email]
        setSelectedUsers(newUsers)
    }

    return (
        <div className='z-20 overflow-auto flex justify-center items-center relative p-4 h-fit w-3/12 min-w-72  bg-[#d9d5cf] rounded-lg'>
            <div className="flex flex-col w-full">
                <h1 className='text-4xl text-center mb-8'>New Project</h1>
                <button className='absolute top-2 right-2 text-4xl' onClick={closeModal}><IoIosClose /></button>
                <form action='POST' className="flex flex-col gap-4" onSubmit={createProject}>
                    <article>
                        <label className="block" htmlFor="name">Name</label>
                        <input className="w-full px-2 py-1 rounded" type="text" name='name' onChange={handleChange} />
                    </article>
                    <article>
                        <label className="block" htmlFor="desc">Description</label>
                        <textarea className="w-full px-2 py-1 rounded" rows={5} name='desc' onChange={handleChange} />
                    </article>
                    <article className="flex flex-wrap gap-4">
                        {
                            selectedUsers.map(user => <div className="bg-white p-1 rounded" key={user}>{user}</div>)
                        }
                        <AddUser addUser={addUser} />
                    </article>
                    <button className="w-full text-center">Create Project</button>
                </form>
            </div>
        </div>

    )
}