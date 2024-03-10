import './App.css'
import { useState } from 'react'
import Context from './Context'
import { Logged } from './types'
import { Link } from 'react-router-dom'


function App() {

  const [logged, setLogged] = useState<Logged>()

  const logFn = (logged: Logged) => {
    setLogged(logged)
  }
  const loggedInfo = { logged, logFn }


  return (
    <Context.Provider value={{ loggedInfo }}>
      <div className=''>
        <h1 className='text-6xl'>Welcome to Regira</h1>
        <Link to={"/login"}>Log in</Link>
        <Link to={"/register"}>Create new profile</Link>
      </div>
    </Context.Provider>
  )
}

export default App
