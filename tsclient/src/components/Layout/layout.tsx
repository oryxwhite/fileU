import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/context/context'

const Layout: React.FC = () => {
    const authorized = useAuth().authenticated
    return (
        <>
            <nav className='navbar bg-base-200 rounded-2xl text-white'>
            <div className='flex-1'><NavLink className='btn normal-case text-xl text-white' to="/">FileU</NavLink></div>

            <div className='flex-none'>

                <ul className='menu menu-horizontal p-0 text-xs sm:text-sm'>
                    {/* <li><Link to="/">Home</Link></li> */}
                    {authorized? <li><NavLink className="rounded-xl sm:mx-[2px]" to="/dash">Dashboard</NavLink></li> : null }
                    {authorized ? null : <li><NavLink className="rounded-xl sm:mx-[2px]" to="/login">Login</NavLink></li> }
                    {authorized ? null : <li><NavLink className="rounded-xl sm:mx-[2px]" to="/register">Sign Up</NavLink></li>}
                    {authorized ? <li><NavLink className="rounded-xl sm:mx-[2px]" to="/logout">Logout</NavLink></li> : null}
                    
                </ul>
                </div>
            </nav>

            <Outlet />
        </>
    )
}

export default Layout