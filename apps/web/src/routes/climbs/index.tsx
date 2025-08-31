import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/climbs/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/climbs"!</div>
}
