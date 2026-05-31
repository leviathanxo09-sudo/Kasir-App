import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faCashRegister, faBox, faClockRotateLeft, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import './navbar.css'

export default function Sidebar() {
    const { user, logoutHandler } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logoutHandler()
        navigate('/login')
    }

    const adminLinks = (
        <>
            <NavLink to='/dashboard' className={({ isActive }) => isActive ? 'active' : ''}>
                <FontAwesomeIcon icon={faGauge} /> <span>Dashboard</span>
            </NavLink>
            <NavLink to='/kasir' className={({ isActive }) => isActive ? 'active' : ''}>
                <FontAwesomeIcon icon={faCashRegister} /> <span>Kasir</span>
            </NavLink>
            <NavLink to='/products' className={({ isActive }) => isActive ? 'active' : ''}>
                <FontAwesomeIcon icon={faBox} /> <span>Produk</span>
            </NavLink>
            <NavLink to='/history' className={({ isActive }) => isActive ? 'active' : ''}>
                <FontAwesomeIcon icon={faClockRotateLeft} /> <span>Riwayat</span>
            </NavLink>
             
        </>
    )
    const kasirLinks = (
        <NavLink to='/kasir' className={({ isActive }) => isActive ? 'active' : ''}>
            <FontAwesomeIcon icon={faCashRegister} /> <span>Kasir</span>
        </NavLink>
    )

   

    return (
        <>
            
            <div className='sidebar'>
                <div className='sidebar-logo'>
                    <h2>Kasir App</h2>
                </div>
                <nav className='sidebar-nav'>
                    {user?.role === 'admin' ? adminLinks : kasirLinks}
                </nav>
                <div className='sidebar-footer'>
                    <p>{user?.role}</p>
                    <button onClick={handleLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                    </button>
                </div>
            </div>

            
            <div className='bottom-bar'>
                {user?.role === 'admin' ? adminLinks : kasirLinks}
                <button onClick={handleLogout}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    Logout
                </button>
            </div>
        </>
    )
}