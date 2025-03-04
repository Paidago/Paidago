import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import paidago from "../static/paidago-logo.png"

function NavBar() {
    const { signout, isAuthenticated } = useAuth()
    const [menuOpen, setMenuOpen] = useState(false);
    const [plannerOpen, setPlannerOpen] = useState(false);
    const [resourcesOpen, setResourcesOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const onClick = () => {
        signout()
        setActiveProfile(false)
    }

    return (
        <nav className="bg-gray-900 w-full z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <button
                            className="sm:hidden p-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            )}
                        </button>
                        <Link to="/" className="flex items-center ml-2">
                            <img className="h-10" src={paidago} alt="Paidago" />
                        </Link>
                    </div>
                    <div className="hidden sm:flex space-x-4">
                        <Link to="/" className="nav-link text-white">Inicio</Link>
                        <div className="relative">
                            <button className="nav-link text-white" onClick={() => setPlannerOpen(!plannerOpen)}>Herramientas</button>
                            {plannerOpen && (
                                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                    <ul className="py-2 text-gray">
                                        <Link to='/planeador'><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Planeador</li></Link>
                                        <Link to='/historial-clases'><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Historial de clases</li></Link>
                                        <Link to='/crear-examen'><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Crear examen</li></Link>
                                        <Link to='/crear-icfes'><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Crear ICFES</li></Link>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <Link to="/blog" className="nav-link text-white">Blog</Link>
                        <Link to="/about" className="nav-link text-white">Sobre Nosotros</Link>
                    </div>
                    <div className="relative">
                        <button className="nav-link p-2 rounded-full bg-gray-700" onClick={() => setProfileOpen(!profileOpen)}>
                            <img className="h-8 w-8 rounded-full" src="https://source.unsplash.com/256x256/?person" alt="Perfil" />
                        </button>
                        {profileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                <ul className="py-2 text-gray">
                                    <Link to="/settings"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Configuracion</li></Link>
                                    {isAuthenticated ? (
                                        <>
                                            <Link to="/profile"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Perfil</li></Link>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><button onClick={onClick}>Cerrar sesión</button></li>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/login"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Iniciar sesión</li></Link>
                                            <Link to="/register"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Registrarse</li></Link>
                                        </>
                                    )}

                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {menuOpen && (
                <div className="sm:hidden bg-gray-900 p-4 space-y-2">
                    <Link to="/" className="mobile-nav-link">Inicio</Link>
                    <Link to="/planeador" className="mobile-nav-link">Planeador</Link>
                    <Link to="/recursos" className="mobile-nav-link">Recursos</Link>
                    <Link to="/blog" className="mobile-nav-link">Blog</Link>
                    <Link to="/about" className="mobile-nav-link">Sobre Nosotros</Link>
                </div>
            )}
        </nav>
    );
}

export default NavBar