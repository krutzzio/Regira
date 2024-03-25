import { useState } from 'react'
import { IoIosAdd } from "react-icons/io";
import { CreateNewTag } from '../../types';


export default function CreateTag(props: CreateNewTag) {

    const { tags, addTag } = props

    const [creatingTag, setCreatingTag] = useState<boolean>(false)

    return (
        <div onClick={() => setCreatingTag(true)} >
            {
                creatingTag
                    ? <input type='text' className='p-1' autoFocus onBlur={() => setCreatingTag(false)}
                        onKeyDown={e => {
                            if (e.key !== "Enter") return
                            const tagInput = e.target as HTMLTextAreaElement
                            fetch("http://localhost:3000/api/tags", {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                credentials: 'include',
                                body: JSON.stringify({ name: tagInput.value })
                            })
                                .then(resp => resp.json())
                                .then(data => {
                                    if (tags.find(tag => tag.name === data.name)) return
                                    addTag(data)
                                })

                            setCreatingTag(false)
                        }} />
                    : <h1 className='flex items-center bg-white rounded w-fit p-1 cursor-pointer'>Add Tag <IoIosAdd size={20} /></h1>
            }
        </div>
    )
}
