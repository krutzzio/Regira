import React from 'react'
import { Link } from 'react-router-dom'

export default function Welcome() {
    return (
        <div className=''>
            <h1 className='text-6xl'>Welcome to Regira</h1>
            <Link to={"/login"}>Log in</Link>
            <Link to={"/register"}>Create new profile</Link>
        </div>
    )
}
