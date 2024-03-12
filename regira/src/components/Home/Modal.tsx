import React, { useEffect, useState } from 'react'
import { AddProjectType, ModalType, Project } from '../../types'


function AddProject(props: AddProjectType) {
  const { addProject, closeModal } = props;
  const [newProject, setNewProject] = useState<Project>({ active: true, name: "S", desc: "" })



  const createProject = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("HOLa", newProject)
    if (!newProject.name) return
    console.log("HOLa", newProject)
    addProject(newProject)
    closeModal()
  }

  return (
    <div className='relative'>

      <h1 className='text-4xl text-center'>New Project</h1>
      <button className='absolute top-0 right-0' onClick={closeModal}>X</button>

      <form action='POST' onSubmit={createProject}>
        <label className="block" htmlFor="name">Name:</label>
        <input className="w-full px-2 py-1" type="text" name='name' />
        <label className="block" htmlFor="desc">Description</label>
        <textarea className="w-full px-2 py-1" name='desc' />
        <label className="block" htmlFor="active">Active</label>
        <input className='px-2 py-1' type="checkbox" name='active' checked />
        <button className="block">Create Project</button>
      </form>
    </div>

  )
}

function AddIssue() {
  return (
    <h1>AFEGIR ISSUE</h1>
  )
}

export default function Modal(props: ModalType) {

  const { type, addProject, addIssue, closeModal } = props


  return (
    <div className='bg-black bg-opacity-35 w-screen h-screen absolute top-0 left-0 flex justify-center items-center'>
      <div className='bg-[#E4E2dd] rounded p-8 w-96 h-96'>
        {
          type === "project"
            ? <AddProject closeModal={closeModal} addProject={addProject} />
            : <AddIssue />
        }
      </div>
    </div>
  )
}
