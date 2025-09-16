import { createFileRoute } from '@tanstack/react-router'
import { ClimbLogs } from '@/components/ClimbLogs'

export const Route = createFileRoute('/_protected/climbs/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ClimbLogs />
}
