import { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import AuthContext from '../../context/AuthContext';
import Header from './Header';
import { AuthContextType, Logged } from '../../types';

export default function Home() {

    const { loggedInfo } = useContext(AuthContext) as AuthContextType

    const { logged, logFn, API_URL } = loggedInfo

    const logout = () => {
        // Clear the authentication token cookie
        window.location.href = "/";
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Set the expiration date to a past date
        logFn({ name: "", id: 0, email: "" })
        window.history.replaceState(null, "", "/")
    };

    useEffect(() => {
        if (document.cookie.includes("token")) {
            fetch(API_URL + "/refresh", { credentials: "include" })
                .then(e => e.json())
                .then(data => {
                    if (data.error) {
                        logout();
                    } else {
                        logFn(data)
                    }
                })
                .catch(err => console.log(err))
        } else {
            logout()
        }
    }, [])


    return (
        <div className='flex flex-col justify-start h-screen'>
            <Header logged={logged as Logged} logout={logout} />
            <Outlet />
        </div>
    )
}
