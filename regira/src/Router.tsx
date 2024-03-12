import { Route, Routes } from 'react-router-dom'
import { Register } from './components/Register'
import Login from './components/Login'
import Board from './components/Home/Board'
import Welcome from './components/Welcome'
import Home from './components/Home/Home'

export function Router() {
    return (
        <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />}>
                <Route index element={<Board />} />
            </Route>
        </Routes>
    )
}
