import { useEffect, useState } from "react"
import { Project } from "../types"

//custom Hook para obtener los proyectos de la DB y para poder añadirlos
//ADVETENCIA (falta poder eliminarlos)

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        const API_PROJECTES_URL = "http://localhost:3000/api/projects"
        fetch(API_PROJECTES_URL, { credentials: 'include' })
            .then(resp => resp.json())
            .then(data => setProjects(data))
            .catch(err => console.log(err))
    }, [])

    const addProject = (newProject: Project) => {
        setProjects([...projects, newProject]);
    }

    const deleteProject = (currentProject: Project) => {
        const newProjects = projects.filter(project => project.id !== currentProject.id)
        setProjects([...newProjects])
    }

    return ({ projects, addProject, deleteProject })
}