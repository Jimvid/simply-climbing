import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/climbs/add-climb')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/climbs/add-climb"!</div>
}
