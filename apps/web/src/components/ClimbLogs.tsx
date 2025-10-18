import type { Climb } from '../types/climb'
import { useClimbs } from '@/hooks/api/useClimbs'
import { ClimbLogItem } from './ClimbLogItem'
import { useMemo } from 'react'

export const ClimbLogs = () => {
  const query = useClimbs()

  const sortedClimbs = useMemo(() => {
    if (!query.data) return []
    return [...query.data].sort(
      (a: Climb, b: Climb) =>
        new Date(Number(b.createdAt) * 1000).getTime() - new Date(Number(a.createdAt) * 1000).getTime(),
    )
  }, [query.data])

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-base-content mb-2">
          Climb Logs
        </h1>
        <p className="text-base-content/70">Your climbing session history</p>
      </div>

      {/* Climb Cards */}
      <div className="space-y-4">
        {sortedClimbs.map((climb: Climb) => (
          <ClimbLogItem key={climb.id} climb={climb} />
        ))}
      </div>
    </div>
  )
}
