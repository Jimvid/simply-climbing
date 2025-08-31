import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/climbs/add-climb')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/climbs/add-climb"!</div>
}
