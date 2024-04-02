import { useEffect, useState } from "react";
import { Id, User } from "../types";

export function useUser(props: Id) {
    const [user, setUser] = useState<User>()
    const [initials, setInitials] = useState<string>("")
    const API_USER_URL = `http://localhost:3000/api/users/${props}`

    const reducedName = (name: string) => {
        return name[0].toUpperCase() + name[1].toLowerCase()
    }

    useEffect(() => {
        fetch(API_USER_URL, { credentials: "include" })
            .then(resp => resp.json())
            .then(data => {
                setUser(data)
                setInitials(reducedName(data.name))
            })
            .catch(err => console.log(err))
    }, [])

    return { user, initials }
}