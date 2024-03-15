import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Welcome() {
    return (
        <div className='relative h-screen grid grid-cols-3 overflow-hidden'>
            <section className='col-span-2 flex justify-center items-center'>
                <div className='w-1/2 '>
                    <Outlet />
                </div>
            </section>
            <section className='w-full flex flex-col justify-center items-start gap-6'>
                <h1 className='text-7xl mr-8'>Welcome to <span className='font-bold'>Regira</span></h1>
            </section>
            {/* <div className='absolute -top-10 left-[65rem] rotate-12 border-[#887b6e] bg-[#887b6e] border-4 h-[75rem] rounded-full '></div> */}
        </div>
    )
}