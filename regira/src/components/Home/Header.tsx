import React from 'react'
import { Link } from 'react-router-dom'
import { HeaderType } from '../../types'

export default function Header(props: HeaderType) {


    const { logged, logout } = props;

    return (
        <header className='text-4xl  flex justify-between items-center bg-[#A9D6E5]'>
            <Link to="/home" className=' bg-[#19747E] p-4 h-full'>Home</Link>
            <h1>{logged.name}</h1>
            <button onClick={logout}>Log out</button>
        </header>
    )
}
