import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/climbs/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/climbs"!</div>
}
