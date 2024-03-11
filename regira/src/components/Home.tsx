import React, { useContext, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Context from '../Context';
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const navigate = useNavigate()
    const { loggedInfo } = useContext(Context)


    const { logged, logFn, API_URL } = loggedInfo

    const logout = () => {
        // Clear the authentication token cookie
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Set the expiration date to a past date
        logFn({ name: "", id: 0 })
        window.location.href = "/login";
        window.history.replaceState(null, "", "/")
    };

    useEffect(() => {
        if (document.cookie.includes("token")) {
            fetch(API_URL + "/refresh", { credentials: "include" })
                .then(e => e.json())
                .then(data => {
                    if (data.error) {
                        // api rebutja la cookie local, l'esborrem per mitjà de la funció logout()
                        logout();
                    } else {
                        // api accepta la cookie, simulem login desant les dades rebudes a "loguejat"
                        logFn(data)
                    }
                })
        }
    }, [])


    return (
        <div className='flex flex-col justify-start h-screen'>
            <header className='h-1/4 p-8 flex justify-between items-center'>
                <Link to="/home">Home</Link>
                <h1>{logged.name}</h1>
                <button onClick={logout}>Log out</button>
            </header>
            <Outlet />
        </div>
    )
}
