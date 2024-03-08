import React, { useState } from "react"
import { LogIn } from "../types"
import { useNavigate } from "react-router-dom"

export default function Login() {

    const navigate = useNavigate()

    const [logInfo, setLogInfo] = useState<LogIn>({ email: "", password: "" })

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputType = event.target
        inputType.name === "email"
            ? (setLogInfo({ ...logInfo, email: inputType.value }))
            : (setLogInfo({ ...logInfo, password: inputType.value }))
    }

    const login = () => {
        const API_LOGIN_URL = "http://localhost:3000/api/login"
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(logInfo)
        };

        fetch(API_LOGIN_URL, requestOptions)
            .then(resp => resp.json())
            .then(data => {
                if (data.message === "LOGIN OK") {
                    console.log("asfn")
                    navigate("/")
                }
            })
            .catch(err => console.log("ERROR EN EL LOGIN", err))
    }
    return (
        <div className="flex flex-col gap-2 p-8 rounded-lg bg-stone-900">
            <article>
                <label htmlFor="email">Email:</label>
                <input className="block mt-2 px-2" type="email" name="email" id="emailInput" onChange={onChange} />
            </article>
            <article>
                <label htmlFor="password">Password:</label>
                <input className="block mt-2 px-2" type="password" name="password" id="passwordInput" onChange={onChange} />
            </article>
            <button onClick={login} className="bg-[#303030] rounded-sm">Log in</button>
        </div>
    )
}
