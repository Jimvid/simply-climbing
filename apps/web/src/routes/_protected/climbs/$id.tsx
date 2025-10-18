import { createFileRoute } from '@tanstack/react-router'
import { useClimbs } from '@/hooks/api/useClimbs'
import { ClimbForm } from '@/components/forms/climbForm/ClimbForm'

export const Route = createFileRoute('/_protected/climbs/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: climbs } = useClimbs()
  const climb = climbs?.find((c) => c.id === id)

  if (!climb) {
    return <div>Loading...</div>
  }

  return <ClimbForm climb={climb} />
}
