import React, { useContext, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Context from '../../Context';
import Header from './Header';

export default function Home() {

    const { loggedInfo } = useContext(Context)


    const { logged, logFn, API_URL } = loggedInfo

    const logout = () => {
        // Clear the authentication token cookie
        window.location.href = "/login";
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Set the expiration date to a past date
        logFn({ name: "", id: 0 })
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
            <Header logged={logged} logout={logout} />
            <Outlet />
        </div>
    )
}
