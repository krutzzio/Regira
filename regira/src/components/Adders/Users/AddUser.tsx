import { useState } from 'react'
import { IoIosAdd } from "react-icons/io";
import { AddNewUser } from '../../../types';


export default function AddUser(props: AddNewUser) {

    const { addUser } = props

    const [addingUser, setAddingUser] = useState<boolean>(false)

    return (
        <div onClick={() => setAddingUser(true)} >
            {
                addingUser
                    ? <input type='text' className='p-1' autoFocus onBlur={() => setAddingUser(false)}
                        onKeyDown={e => {
                            if (e.key !== "Enter") return
                            const tagInput = e.target as HTMLTextAreaElement
                            addUser(tagInput.value)
                            setAddingUser(false)
                        }} />
                    : <h1 className='flex items-center bg-white rounded w-fit p-1 cursor-pointer'>Add User <IoIosAdd size={20} /></h1>
            }
        </div>
    )
}
