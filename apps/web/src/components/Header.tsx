import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { signOut } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <header className="navbar bg-base-100 shadow-lg lg:hidden">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost text-xl font-bold">
            Simply Climbing
          </Link>
        </div>
        <div className="navbar-end">
          <button
            className="btn btn-square btn-ghost"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'} lg:hidden`}>
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={closeMenu}
        ></div>
        
        <aside className={`fixed top-0 left-0 h-full w-full max-w-sm bg-base-200 text-base-content transform transition-transform duration-300 z-50 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
            <div className="p-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">Menu</h2>
                <button 
                  className="btn btn-square btn-sm btn-ghost"
                  onClick={closeMenu}
                  aria-label="Close menu"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              
              <ul className="menu menu-lg w-full">
                <li>
                  <Link 
                    to="/" 
                    className="flex items-center gap-3 p-3"
                    onClick={closeMenu}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    </svg>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/profile" 
                    className="flex items-center gap-3 p-3"
                    onClick={closeMenu}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/climbs/add-climb" 
                    className="flex items-center gap-3 p-3"
                    onClick={closeMenu}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Route
                  </Link>
                </li>
                <div className="divider"></div>
                <li>
                  <button 
                    className="flex items-center gap-3 p-3 text-error hover:bg-error hover:text-error-content"
                    onClick={() => {
                      signOut()
                      closeMenu()
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
        </aside>
      </div>
    </>
  )
}
