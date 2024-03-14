import { Route, Routes } from 'react-router-dom'
import { Register } from './components/Welcome/Register'
import Login from './components/Welcome/Login'
import ProjectsBoard from './components/Home/Board/ProjectsBoard'
import Welcome from './components/Welcome/Welcome'
import Home from './components/Home/Home'
import Project from './components/Home/Project/Project'

export function Router() {
    return (
        <Routes>
            <Route path='/' element={<Welcome />}>
                <Route path='/register' element={<Register />} />
                <Route index element={<Login />} />
            </Route>
            <Route path='/home' element={<Home />}>
                <Route index element={<ProjectsBoard />} />
                <Route path='project/:id' element={<Project />} />
            </Route>
        </Routes>
    )
}
