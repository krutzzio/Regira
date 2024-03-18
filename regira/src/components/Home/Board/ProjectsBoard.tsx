import { /*useContext,*/ useEffect, useState } from "react"
import { Project } from "../../../types"
import ColumnContainer from "./ColumnContainer"
import Modal from "../../Modal/Modal"

export default function ProjectsBoard() {

    const [columns, setColumns] = useState<Project[]>([])
    const [createProject, setCreateProject] = useState<boolean>(false)

    useEffect(() => {
        const API_PROJECTES_URL = "http://localhost:3000/api/projects"
        fetch(API_PROJECTES_URL, { credentials: 'include' })
            .then(resp => resp.json())
            .then(data => setColumns(data))
            .catch(err => console.log(err))
    }, [])

    const addColumn = (newProject: Project) => {
        setColumns([...columns, newProject]);
    }

    return (
        <main className="p-8">
            <h1 className="text-4xl font-light mb-4">Projects</h1>
            <div className="h-full  grid grid-cols-5">
                {
                    createProject &&
                    <Modal type={"project"} addProject={addColumn} closeModal={() => setCreateProject(false)} />

                }
                <div className="w-full flex flex-col gap-4 col-span-3">
                    {
                        columns?.map(col => <ColumnContainer key={col.id} project={col} />)
                    }
                    <button onClick={() => setCreateProject(true)}>Add Project</button>
                </div>
            </div>
        </main>
    )
}
