import { /*useContext,*/ useEffect, useState } from "react"
import { Project } from "../../../types"
import ColumnContainer from "./ColumnContainer"
//import Context from "../../Context"
import Modal from "../../Modal/Modal"

export default function ProjectsBoard() {

    const [columns, setColumns] = useState<Project[]>([])
    const [newProject, setNewProject] = useState<boolean>(false)
    // const { loggedInfo } = useContext(Context)

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
        <div className="h-full p-8 grid grid-cols-5">
            {
                newProject
                    ? <Modal type={"project"} addProject={addColumn} closeModal={() => setNewProject(false)} />
                    : <></>
            }
            <div className="w-full flex flex-col gap-4 col-span-3">
                {
                    columns?.map(col => <ColumnContainer key={col.id} project={col} />)
                }
                <button onClick={() => setNewProject(true)}>Add Project</button>
            </div>
        </div>
    )
}
