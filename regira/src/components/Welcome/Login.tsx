import React, { useContext, useState } from "react"
import { LogIn } from "../../types"
import { Link, useNavigate } from "react-router-dom"
import Context from "../../context/AuthContext"

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
        <div className="w-full min-w-96 max-w-[35rem]">
            <h1 className="text-center text-6xl font-light ">Login</h1>
            <form action="POST" onSubmit={login} className="flex flex-col gap-6 p-8 rounded">
                <section className="flex flex-col gap-8">
                    <article>
                        <input className="block w-full text-2xl mt-2 px-0 py-1 border-b-4 border-[#887b6e] bg-transparent outline-0 placeholder:text-black" type="email" name="email" id="emailInput" placeholder="Email" onChange={onChange} autoComplete="off" />
                    </article>
                    <article>
                        <input className="block w-full text-2xl mt-2 px-2 py-1 border-b-4 border-[#887b6e] bg-transparent outline-0 placeholder:text-black" type="password" name="password" id="passwordInput" placeholder="Password" onChange={onChange} />
                    </article>
                </section>
                <button className="w-full hover:border-[#5d514b] hover:text-[#5d514b] text-[#887b6e] text-2xl border-[#887b6e] border-2 transition-colors py-2 rounded-sm">Log in</button>
                <h1 className="text-center text-2xl">or <Link className="font-bold text-[#5d514b] underline" to={"/register"}>Create a new profile</Link></h1>
            </form>
        </div>
    )
}
