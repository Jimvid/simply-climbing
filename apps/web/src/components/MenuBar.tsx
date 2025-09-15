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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 safe-area-inset-bottom">
      <div className="flex justify-around items-center h-16 px-2">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-lg transition-colors ${
            isActive('/')
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          <House size={22} weight={isActive('/') ? 'fill' : 'regular'} />
          <span className="text-xs mt-1 font-medium">Home</span>
        </Link>

        <Link
          to="/climbs"
          className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-lg transition-colors ${
            isActive('/climbs')
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
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
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          <User size={22} weight={isActive('/profile') ? 'fill' : 'regular'} />
          <span className="text-xs mt-1 font-medium">Profile</span>
        </Link>

        <Link
          to="/climbs/add-climb"
          className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-lg transition-colors ${
            isActive('/climbs/add-climb')
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
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
