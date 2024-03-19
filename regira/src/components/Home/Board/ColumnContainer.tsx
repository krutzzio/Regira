import { ProjectContainer } from "../../../types"
import { useState } from "react";
import { Link } from "react-router-dom";
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";




export default function ColumnContainer(props: ProjectContainer) {

  const { project } = props;

  const [columnName, setColumnName] = useState<string | undefined>(project.name)
  const [editing, setEditing] = useState<boolean>(false)
  const [deleteProject, setDeleteProject] = useState<boolean>(false)


  return (
    <div className="w-full h-44 bg-white  rounded-md">
      <Link
        to={`project/${project.id}`}
        className="block relative w-full h-full p-4">
        <section>
          <h1>{editing ? <input type="text" autoFocus onChange={(e) => { setColumnName(e.target.value) }} onBlur={() => setEditing(false)} /> : columnName}</h1>
          <p>{project.desc}</p>
        </section>
        <section className="absolute top-4 right-4 text-2xl flex justify-end gap-4 w-16">
          <CiEdit onClick={() => setEditing(true)} />
          <CiTrash color="red" onClick={() => setDeleteProject(true)} />
        </section>
      </Link>
    </div>

  )
}
