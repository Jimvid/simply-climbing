import { useAuth } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  notifyError,
  notifyInfo,
  notifySuccess,
  notifyWarning,
} from '@/lib/notify'

export const Route = createFileRoute('/_protected/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { getToken } = useAuth()
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    getToken().then(setToken)
  }, [getToken])

  return (
    <div className="py-10 px-6">
      <button
        className="btn btn-success"
        onClick={() => notifySuccess('Success')}
      >
        Success
      </button>
      <button
        className="btn btn-warning"
        onClick={() => notifyWarning('Warning')}
      >
        Warning
      </button>
      <button className="btn btn-info" onClick={() => notifyInfo('Info')}>
        Info
      </button>
      <button className="btn btn-error" onClick={() => notifyError('Error')}>
        Error
      </button>
    </div>
  )
}
