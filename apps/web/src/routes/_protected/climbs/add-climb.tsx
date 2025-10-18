import { createFileRoute } from '@tanstack/react-router'
import { ClimbForm } from '../../../components/forms/climbForm/ClimbForm'

export const Route = createFileRoute('/_protected/climbs/add-climb')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ClimbForm />
}
