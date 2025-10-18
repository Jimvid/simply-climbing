import { Link } from '@tanstack/react-router'
import type { Climb } from '@/types/climb'
import { ClimbLogItem } from '../ClimbLogItem'

interface RecentClimbsProps {
  climbs: Climb[]
}

export const RecentClimbs = ({ climbs }: RecentClimbsProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-base-content">Recent Climbs</h2>
        <Link
          to="/climbs"
          className="text-primary hover:text-primary/80 text-sm font-medium"
        >
          View all →
        </Link>
      </div>
      {climbs.length > 0 ? (
        <div className="space-y-4">
          {climbs.map((climb: Climb) => (
            <ClimbLogItem key={climb.id} climb={climb} />
          ))}
        </div>
      ) : (
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body p-6 text-center">
            <p className="text-base-content/60">
              No climbs logged yet. Start tracking your climbs!
            </p>
            <Link to="/climbs/add-climb" className="btn btn-primary mt-4">
              Log Your First Climb
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
