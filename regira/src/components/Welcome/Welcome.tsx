import { Outlet } from 'react-router-dom'

export default function Welcome() {
    return (
        <div className='relative h-screen grid grid-cols-3 overflow-hidden'>
            <section className='col-span-2 flex justify-center items-center'>
                <div className='w-1/2 '>
                    <Outlet />
                </div>
            </section>
            <section className='w-full flex flex-col justify-center items-start gap-6'>
                <h1 className='text-7xl mr-8'>Welcome to <span className='font-bold text-8xl'>Regira</span></h1>
            </section>
        </div>
    )
}
