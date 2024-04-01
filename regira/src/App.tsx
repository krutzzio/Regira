import './App.css'
import { useState } from 'react'
import Context from './context/AuthContext'
import { User } from './types'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
const API_URL = 'http://localhost:3000/api';

function App() {

  const [logged, setLogged] = useState<User>({ name: "", id: 0, email: "" })

  const logFn = (logged: User) => {
    setLogged(logged)
  }
  const loggedInfo = { logged: logged, logFn: logFn, API_URL }

  return (
    <Context.Provider value={{ loggedInfo }}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App
