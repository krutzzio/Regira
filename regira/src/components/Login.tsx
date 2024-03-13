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
        <div className="h-screen flex justify-center items-center">
            <form action="POST" onSubmit={login} className="w-64 flex flex-col gap-6 p-8 rounded bg-[#c0bbb1]">
                <section className="flex flex-col gap-2">
                    <article>
                        <label htmlFor="email">Email:</label>
                        <input className="block mt-2 px-2 py-1 w-full rounded-sm" type="email" name="email" id="emailInput" onChange={onChange} />
                    </article>
                    <article>
                        <label htmlFor="password">Password:</label>
                        <input className="block mt-2 px-2 py-1 w-full rounded-sm" type="password" name="password" id="passwordInput" onChange={onChange} />
                    </article>
                </section>
                <button className="bg-[#E4E2dd] hover:bg-[#887b6e] transition-colors py-2 rounded-sm">Log in</button>
            </form>
        </div>
    )
}
