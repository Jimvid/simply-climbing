import { createFileRoute } from '@tanstack/react-router'
import { Dashboard } from '@/components/dashboard'

export const Route = createFileRoute('/_protected/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Dashboard />
}
