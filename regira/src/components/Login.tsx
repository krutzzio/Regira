import React, { useContext, useState } from "react"
import { LogIn } from "../types"
import { useNavigate } from "react-router-dom"
import Context from "../Context"

export default function Login() {

    const { loggedInfo } = useContext(Context)

    const navigate = useNavigate()

    const [logInfo, setLogInfo] = useState<LogIn>({ email: "", password: "" })

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputType = event.target
        inputType.name === "email"
            ? (setLogInfo({ ...logInfo, email: inputType.value }))
            : (setLogInfo({ ...logInfo, password: inputType.value }))
    }

    const login = (event: React.FormEvent) => {
        event.preventDefault()

        const API_LOGIN_URL = "http://localhost:3000/api/login"

        fetch(API_LOGIN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(logInfo)
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.error) throw new Error(data.error)
                const lgInfo = { name: data.name, id: data.id }
                loggedInfo.logFn(lgInfo)
                navigate("/home")
            })
            .catch(err => console.log("ERROR EN EL LOGIN", err))
    }
    return (
        <form action="POST" onSubmit={login} className="flex flex-col gap-2 p-8 rounded-lg bg-stone-900">
            <article>
                <label htmlFor="email">Email:</label>
                <input className="block mt-2 px-2" type="email" name="email" id="emailInput" onChange={onChange} />
            </article>
            <article>
                <label htmlFor="password">Password:</label>
                <input className="block mt-2 px-2" type="password" name="password" id="passwordInput" onChange={onChange} />
            </article>
            <button className="bg-[#303030] rounded-sm">Log in</button>
        </form>

    )
}
