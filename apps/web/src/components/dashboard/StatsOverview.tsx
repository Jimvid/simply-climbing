import {
  ChartBar,
  TrendUp,
  Fire,
  CalendarBlank,
} from '@phosphor-icons/react'
import type { ClimbType } from '@/types/climb'

const getTypeLabel = (type: ClimbType) => {
  const labels = {
    slopers: 'Slopers',
    jugs: 'Jugs',
    crimps: 'Crimps',
    pockets: 'Pockets',
    pinches: 'Pinches',
    mixed: 'Mixed',
  }
  return labels[type]
}

interface StatsOverviewProps {
  totalClimbs: number
  climbsThisWeek: number
  climbsThisMonth: number
  mostCommonType: {
    type: ClimbType
    count: number
  }
}

export const StatsOverview = ({
  totalClimbs,
  climbsThisWeek,
  climbsThisMonth,
  mostCommonType,
}: StatsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Climbs */}
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <ChartBar size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-base-content/60">Total Climbs</p>
              <p className="text-2xl font-bold text-base-content">
                {totalClimbs}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* This Week */}
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-success/10 rounded-lg">
              <CalendarBlank size={24} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-base-content/60">This Week</p>
              <p className="text-2xl font-bold text-base-content">
                {climbsThisWeek}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* This Month */}
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-info/10 rounded-lg">
              <TrendUp size={24} className="text-info" />
            </div>
            <div>
              <p className="text-sm text-base-content/60">This Month</p>
              <p className="text-2xl font-bold text-base-content">
                {climbsThisMonth}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Favorite Type */}
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-warning/10 rounded-lg">
              <Fire size={24} className="text-warning" />
            </div>
            <div>
              <p className="text-sm text-base-content/60">Favorite Type</p>
              <p className="text-lg font-bold text-base-content">
                {mostCommonType.count > 0
                  ? getTypeLabel(mostCommonType.type)
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
