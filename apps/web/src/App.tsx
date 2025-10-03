import { RouterProvider } from '@tanstack/react-router'
import { useAuth } from '@clerk/clerk-react'
import { QueryClientProvider } from '@tanstack/react-query'
import { router } from './router'
import { queryClient } from './queryClient'

export default function App() {
  const auth = useAuth()

  if (!auth.isLoaded) return null

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ auth }} />
    </QueryClientProvider>
  )
}
