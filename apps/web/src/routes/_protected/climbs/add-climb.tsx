import { createFileRoute } from '@tanstack/react-router'
import { AddClimbForm } from '../../../components/forms/addClimbForm/AddClimbForm'

export const Route = createFileRoute('/_protected/climbs/add-climb')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AddClimbForm />
}
