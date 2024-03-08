import './App.css'
import Board from './components/Board'
import { useState } from 'react'
import Context from './Context'
import { Logged } from './types'
import { Outlet } from 'react-router-dom'


function App() {

  const [logged, setLogged] = useState<Logged>()

  const loggedInfo = {logged, setLogged}

  return (
    <Context.Provider value={loggedInfo}>
      <div className=''>
        <Board />
        <Outlet />
      </div>
    </Context.Provider>
  )
}

export default App
