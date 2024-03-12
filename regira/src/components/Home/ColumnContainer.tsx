import { useSortable } from "@dnd-kit/sortable";
import { Column } from "../../types"
import { CSS } from "@dnd-kit/utilities"
import { useState } from "react";

interface Props {
  column: Column;
}


export default function ColumnContainer(props: Props) {

  const { column } = props;

  const [columnName, setColumnName] = useState<string>(column.name)
  const [editing, setEditing] = useState<boolean>(false)

  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }


  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      className="w-44 h-44 bg-stone-800">
      <h1 onClick={() => setEditing(true)}>{editing ? <input type="text" autoFocus onBlur={() => setEditing(false)} /> : columnName}</h1>
      <p>{column.desc}</p>
    </div>
  )
}
