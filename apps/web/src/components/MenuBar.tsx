import { House, Mountains, PlusCircle, User } from '@phosphor-icons/react'
import { Link, useLocation } from '@tanstack/react-router'

export const MenuBar = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    if (path === '/climbs') {
      return (
        location.pathname === '/climbs' ||
        (location.pathname.startsWith('/climbs') &&
          !location.pathname.startsWith('/climbs/add-climb'))
      )
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-base-200 border-t border-base-400 safe-area-inset-bottom">
      <div className="flex max-w-2xl mx-auto justify-around items-center h-16 px-2">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-lg transition-colors ${
            isActive('/')
              ? 'text-primary'
              : 'text-base-content/60 hover:text-base-content'
          }`}
        >
          <House size={22} weight={isActive('/') ? 'fill' : 'regular'} />
          <span className="text-xs mt-1 font-medium">Home</span>
        </Link>

        <Link
          to="/climbs"
          className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-lg transition-colors ${
            isActive('/climbs')
              ? 'text-primary'
              : 'text-base-content/60 hover:text-base-content'
          }`}
        >
          <Mountains
            size={22}
            weight={isActive('/climbs') ? 'fill' : 'regular'}
          />
          <span className="text-xs mt-1 font-medium">Climbs</span>
        </Link>

        <Link
          to="/profile"
          className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-lg transition-colors ${
            isActive('/profile')
              ? 'text-primary'
              : 'text-base-content/60 hover:text-base-content'
          }`}
        >
          <User size={22} weight={isActive('/profile') ? 'fill' : 'regular'} />
          <span className="text-xs mt-1 font-medium">Profile</span>
        </Link>

        <Link
          to="/climbs/add-climb"
          className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-lg transition-colors ${
            isActive('/climbs/add-climb')
              ? 'text-primary'
              : 'text-base-content/60 hover:text-base-content'
          }`}
        >
          <PlusCircle
            size={22}
            weight={isActive('/climbs/add-climb') ? 'fill' : 'regular'}
          />
          <span className="text-xs mt-1 font-medium">Add climb</span>
        </Link>
      </div>
    </div>
  )
}
