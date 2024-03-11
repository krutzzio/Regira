import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { Column } from "../types"
import ColumnContainer from "./ColumnContainer"
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import Context from "../Context"
import Modal from "react-responsive-modal"

export default function Board() {

    const [columns, setColumns] = useState<Column[]>([])
    const [newProject, setNewProject] = useState<boolean>(false)
    const modalRef = useRef(null)
    const { loggedInfo } = useContext(Context)

    useEffect(() => {
        const API_PROJECTES_URL = "http://localhost:3000/api/projects"
        fetch(API_PROJECTES_URL, { credentials: 'include' })
            .then(resp => resp.json())
            .then(data => setColumns(data))
            .catch(err => console.log(err))
    }, [])

    const columnsId = useMemo(() => columns.map(col => col.id), [columns])

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10,
        },
    }))

    const addColumn = () => {
        const columnAdded: Column = {
            id: generateId(),
            name: `Project ${columns.length + 1}`,
            desc: "Description project",
            active: true,
            userid: 1,
        }
        setColumns([...columns, columnAdded]);
    }

    const generateId = () => {
        return Math.floor(Math.random() * 10001)
    }

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return
        const activeColId = active.id
        const overColId = over.id
        if (activeColId === overColId) return

        setColumns((columns) => {
            const activeColInd = columns.findIndex(col => col.id === activeColId)
            const overColInd = columns.findIndex(col => col.id === overColId)
            return arrayMove(columns, activeColInd, overColInd)
        })
    }

    const closeModal = () => {setNewProject(false)}
    return (
        <div className="h-full p-8" ref={modalRef}>
            <Modal open={newProject} onClose={closeModal} closeOnEsc center container={modalRef.current}>
                <h2>Simple centered modal</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                    pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                    hendrerit risus, sed porttitor quam.
                </p>
            </Modal>
            <DndContext sensors={sensors} onDragEnd={onDragEnd}>
                <div className="w-full grid grid-cols-4 gap-4">
                    <SortableContext items={columnsId}>
                        {
                            columns?.map(col => <ColumnContainer key={col.id} column={col} />)
                        }
                    </SortableContext>
                </div>
            </DndContext>
            <button onClick={() => setNewProject(true)}>Add Project</button>

        </div>
    )
}
