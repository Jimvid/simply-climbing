import { RouterProvider } from '@tanstack/react-router'
import { useAuth } from '@clerk/clerk-react'
import { router } from './router'

export default function App() {
  const auth = useAuth()

  if (!auth.isLoaded) return null

  return <RouterProvider router={router} context={{ auth }} />
}
