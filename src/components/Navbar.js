
import { Link } from "react-router-dom"

import { useContext } from "react"

import { LoadingContext } from "../context/loading.context"
import { AuthContext } from "../context/auth.context"

const Navbar = () => {

    const getToken = () => {
        return localStorage.getItem("authToken")
      }

    const { user,} = useContext(LoadingContext)

    const { logout } = useContext(AuthContext)

    return (
        <nav>

            <Link to={'/'}>Home</Link>
            <Link to={'/games'}>Games</Link>

            {
                getToken() ? 
                <>
                    {user && <Link to={`/profile/${user._id}`}>Profile</Link>}
                   {user && <Link to={'/mylibrary'}>Library</Link>}
                    <button onClick={logout}>Logout</button>
                </>

                : 

                <>
                    <Link to={'/signup'}><>Signup</></Link>
                    <Link to={'/login'}>Login</Link>
                    
                </>
            }

        </nav>
    )
}

export default Navbar