import { Link } from 'react-router-dom'
import { HeaderType } from '../../types'
import homeIcon from "../../assets/icons/home.svg"

export default function Header(props: HeaderType) {

    const { logged, logout } = props;

    return (
        <header className='text-2xl px-8 py-4 flex justify-between items-center'>
            <Link to="/home" className=''><img className='w-10' src={homeIcon} alt="Home icon" /></Link>
            <h1 className='text-center'>Welcome <span className='font-bold'>{logged.name}</span></h1>
            <button onClick={logout}>Log out</button>
        </header>
    )
}
