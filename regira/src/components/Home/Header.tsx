import { Link } from 'react-router-dom'
import { HeaderType } from '../../types'

export default function Header(props: HeaderType) {


    const { logged, logout } = props;

    return (
        <header className='text-4xl p-8 flex justify-between items-center'>
            <Link to="/home" className=''>Home</Link>
            <h1>Welcome <span className='font-bold'>{logged.name}</span></h1>
            <button onClick={logout}>Log out</button>
        </header>
    )
}
