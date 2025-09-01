import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/climbs/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/climbs/$Id"!</div>
}
