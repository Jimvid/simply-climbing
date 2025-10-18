import { useMemo } from 'react'
import type { Climb, ClimbType } from '@/types/climb'
import { useClimbs } from '@/hooks/api/useClimbs'
import { StatsOverview } from './StatsOverview'
import { TypeDistribution } from './TypeDistribution'
import { RecentClimbs } from './RecentClimbs'

export const Dashboard = () => {
  const query = useClimbs()
  const climbs = query.data || []

  const stats = useMemo(() => {
    const totalClimbs = climbs.length

    // Count by type
    const typeCount: Record<ClimbType, number> = {
      slopers: 0,
      jugs: 0,
      crimps: 0,
      pockets: 0,
      pinches: 0,
      mixed: 0,
    }

    climbs.forEach((climb: Climb) => {
      typeCount[climb.typeOfClimb]++
    })

    // Count climbs this week
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const climbsThisWeek = climbs.filter(
      (climb: Climb) => new Date(Number(climb.createdAt) * 1000) >= oneWeekAgo,
    ).length

    // Count climbs this month
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const climbsThisMonth = climbs.filter(
      (climb: Climb) => new Date(Number(climb.createdAt) * 1000) >= oneMonthAgo,
    ).length

    // Find most common type
    const mostCommonType = Object.entries(typeCount).reduce(
      (max, [type, count]) => {
        return count > max.count ? { type: type as ClimbType, count } : max
      },
      { type: 'mixed' as ClimbType, count: 0 },
    )

    return {
      totalClimbs,
      typeCount,
      climbsThisWeek,
      climbsThisMonth,
      mostCommonType,
    }
  }, [climbs])

  const recentClimbs = useMemo(() => {
    return [...climbs]
      .sort(
        (a: Climb, b: Climb) =>
          new Date(Number(b.createdAt) * 1000).getTime() -
          new Date(Number(a.createdAt) * 1000).getTime(),
      )
      .slice(0, 5)
  }, [climbs])

  const typeStats = useMemo(() => {
    return Object.entries(stats.typeCount)
      .filter(([, count]) => count > 0)
      .sort(([, a], [, b]) => b - a)
      .map(([type, count]) => ({
        type: type as ClimbType,
        count,
        percentage: ((count / stats.totalClimbs) * 100).toFixed(0),
      }))
  }, [stats])

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-base-content mb-2">Dashboard</h1>
        <p className="text-base-content/70">Track your progress.</p>
      </div>
      <StatsOverview
        totalClimbs={stats.totalClimbs}
        climbsThisWeek={stats.climbsThisWeek}
        climbsThisMonth={stats.climbsThisMonth}
        mostCommonType={stats.mostCommonType}
      />
      <TypeDistribution typeStats={typeStats} />
      <RecentClimbs climbs={recentClimbs} />
    </div>
  )
}
