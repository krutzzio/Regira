import React, { useState } from "react"
import { RegisterIn } from "../../types"
import { useNavigate } from "react-router-dom"

export function Register() {

    const navigate = useNavigate()

    const [registerInfo, setRegisterInfo] = useState<RegisterIn>({ name: "", email: "", password: "" })

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputType = event.target
        inputType.name === "name"
            ? (setRegisterInfo({ ...registerInfo, name: inputType.value }))
            : inputType.name === "email"
                ? (setRegisterInfo({ ...registerInfo, email: inputType.value }))
                : (setRegisterInfo({ ...registerInfo, password: inputType.value }))
    }

    const register = (event: React.FormEvent) => {
        event.preventDefault()

        const API_REGISTER_URL = "http://localhost:3000/api/register"
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registerInfo)
        };

        fetch(API_REGISTER_URL, requestOptions)
            .then(resp => resp.json())
            .then(data => {
                if (data.error) throw new Error(data.error)
                navigate("/")
            })
            .catch(err => console.log("ERROR EN EL LOGIN", err))
    }


    return (
        <form action="POST" onSubmit={register} className="flex flex-col gap-2 p-8 rounded-lg bg-stone-900">
            <article>
                <label htmlFor="name">Name:</label>
                <input className="block mt-2 px-2" type="name" name="name" id="nameInput" onChange={onChange} />
            </article>
            <article>
                <label htmlFor="email">Email:</label>
                <input className="block mt-2 px-2" type="email" name="email" id="emailInput" onChange={onChange} />
            </article>
            <article>
                <label htmlFor="password">Password:</label>
                <input className="block mt-2 px-2" type="password" name="password" id="passwordInput" onChange={onChange} />
            </article>
            <button className="bg-[#303030] rounded-sm">Register</button>
        </form>
    )
}
