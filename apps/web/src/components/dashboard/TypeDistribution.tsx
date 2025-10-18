import { Target } from '@phosphor-icons/react'
import type { ClimbType } from '@/types/climb'
import { Icon } from '../Icon'

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

interface TypeStat {
  type: ClimbType
  count: number
  percentage: string
}

interface TypeDistributionProps {
  typeStats: TypeStat[]
}

export const TypeDistribution = ({ typeStats }: TypeDistributionProps) => {
  return (
    <div className="card bg-base-200 shadow-lg">
      <div className="card-body p-6 min-h-[312px]">
        <h2 className="text-xl font-bold text-base-content mb-4 flex items-center gap-2">
          <Target size={24} />
          Climb Distribution
        </h2>
        <div className="space-y-3">
          {typeStats.map(({ type, count, percentage }) => (
            <div key={type} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Icon type={type} />
                  <span className="font-medium text-base-content">
                    {getTypeLabel(type)}
                  </span>
                </div>
                <span className="text-base-content/70">
                  {count} ({percentage}%)
                </span>
              </div>
              <div className="w-full bg-base-300 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
