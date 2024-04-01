import ProjectContainer from "./ProjectContainer"
import Modal from "../../Modal/Modal"
import { useProjects } from "../../../hooks/useProjects"

export default function ProjectsBoard() {


    const { projects, addProject, createProject, setCreateProject, deleteProject } = useProjects()

    return (
        <main className="p-8">
            <h1 className="text-4xl font-light mb-4">Projects</h1>
            <div className="h-full grid grid-cols-5">
                {
                    createProject &&
                    <Modal type={"project"} addProject={addProject} closeModal={() => setCreateProject(false)} />
                }
                <div className="w-full flex flex-col gap-4 col-span-3">
                    {
                        projects?.map(project => <ProjectContainer key={project.id} project={project} deleteProject={deleteProject} />)
                    }
                    <button onClick={() => setCreateProject(true)}>Add project <span className='text-xl'>+</span></button>
                </div>
            </div>
        </main>
    )
}
