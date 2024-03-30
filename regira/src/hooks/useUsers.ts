import { useEffect, useState } from "react";
import { Logged, User } from "../types";

export function useUsers(logged: Logged) {
    const [users, setUsers] = useState<User[]>([])
    const API_USERS_URL = "http://localhost:3000/api/users"

    useEffect(() => {
        fetch(API_USERS_URL, { credentials: "include" })
            .then(resp => resp.json())
            .then(data => {
                const usersList = data.map((info: User) => {
                    return {
                        id: info.id,
                        email: info.email,
                        name: info.name
                    }
                })
                setUsers(usersList.filter((info: User) => info.id !== logged.id))
            }
            )
            .catch(err => console.log(err))
    }, [])

    return { users }
}