import { NavLink, Outlet, useLocation } from 'react-router-dom'

const Layout: React.FC = () => {
    let location = useLocation()
    console.log(location)
    return (
        <>
            <nav className='navbar bg-base-200 rounded-2xl text-white'>
            <div className='flex-1'><NavLink className='btn normal-case text-xl text-white' to="/">FileU</NavLink></div>

            <div className='flex-none'>

                <ul className='menu menu-horizontal p-0'>
                    {/* <li><Link to="/">Home</Link></li> */}
                    <li><NavLink className="rounded-xl" to="/dash">Dashboard</NavLink></li>
                    <li><NavLink className="rounded-xl" to="/login">Login</NavLink></li>
                    <li><NavLink className="rounded-xl" to="/register">Sign Up</NavLink></li>
                    <li><NavLink className="rounded-xl" to="/logout">Logout</NavLink></li>
                    
                </ul>
                </div>
            </nav>

            <Outlet />
        </>
    )
}

export default Layout