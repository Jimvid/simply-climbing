import { useAuth } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/_protected/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { getToken } = useAuth()
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    getToken().then(setToken)
  }, [getToken])

  console.log(token)

  return (
    <div>
      <button className="btn btn-neutral">Neutral</button>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-accent">Accent</button>
      <button className="btn btn-info">Info</button>
      <button className="btn btn-success">Success</button>
      <button className="btn btn-warning">Warning</button>
      <button className="btn btn-error">Error</button>
    </div>
  )
}
