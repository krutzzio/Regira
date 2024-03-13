import { ProjectContainer } from "../../../types"
import { useState } from "react";
import { Link } from "react-router-dom";


export default function ColumnContainer(props: ProjectContainer) {

  const { project } = props;

  const [columnName, setColumnName] = useState<string | undefined>(project.name)
  const [editing, setEditing] = useState<boolean>(false)


  return (
    <Link
      to={`project/${project.id}`}
      className="w-full h-44 bg-white p-4 rounded-md">
      <h1 onClick={() => setEditing(true)}>{editing ? <input type="text" autoFocus onChange={(e) => { setColumnName(e.target.value) }} onBlur={() => setEditing(false)} /> : columnName}</h1>
      <p>{project.desc}</p>
    </Link>
  )
}
