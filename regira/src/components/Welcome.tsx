import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Welcome() {
    return (
        <div className='h-screen grid grid-cols-2'>
            <section>
                <Outlet />
            </section>
            <section className='w-full flex flex-col justify-center items-end gap-6'>
                <h1 className='text-6xl mr-8'>Welcome to <span className='font-bold'>Regira</span></h1>
                <article className='flex justify-start gap-6 mr-8'>
                    <Link className='block' to={"/login"}>Log in</Link>
                    <Link className='block' to={"/register"}>Create new profile</Link>
                </article>
            </section>

        </div>
    )
}
