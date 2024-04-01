import { ProjectContainer } from "../../../types"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiTrash } from "react-icons/ci";
//import { CiEdit } from "react-icons/ci";




export default function ProjectContainer(props: ProjectContainer) {

  const { project, deleteProject } = props;

  const [deleteCurrentProject, setDeleteCurrentProject] = useState<boolean>(false)

  useEffect(() => {
  }, [deleteCurrentProject])

  return (
    <div className="w-full h-36 bg-white hover:bg-gray-50 shadow-lg transition relative rounded-md">
      <Link
        to={`project/${project.id}`}
        className="block  w-full h-full p-4">
        <section>
          <h1 className="font-bold text-lg">{project.name}</h1>
          <p>{project.desc}</p>
        </section>
      </Link>
      <section className="absolute top-4 right-4 text-md flex justify-end gap-4 w-16">
        {/* <CiEdit /> */}
        {
          deleteCurrentProject
            ? <div>
              <h1 className='font-bold mb-2'>Eliminar proyecto?</h1>
              <section className='flex justify-evenly '>
                <h2 onClick={() => deleteProject(project)} className='cursor-pointer bg-red-700 w-8 text-center p-2 rounded text-white hover:bg-red-800 transition-colors'>Sí</h2>
                <h2 onClick={() => setDeleteCurrentProject(false)} className='cursor-pointer bg-green-700 w-8 text-center p-2 rounded text-white hover:bg-green-800 transition-colors'>No</h2>
              </section>
            </div>
            : <CiTrash color="red" className="cursor-pointer" size={25} onClick={() => setDeleteCurrentProject(true)} />
        }
      </section>
    </div>

  )
}
