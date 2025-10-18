import { Link } from '@tanstack/react-router'
import { Calendar, CaretDown, CaretUp, Trash } from '@phosphor-icons/react'
import type { Climb, ClimbType } from '../types/climb'
import { useDeleteClimb } from '@/hooks/api/useClimbs'
import { Icon } from './Icon'

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

const getDifficultyIndicator = (grade: string, perceived: string) => {
  if (perceived > grade) {
    return {
      icon: <CaretUp size={16} />,
      color: 'text-error',
    }
  } else if (perceived < grade) {
    return {
      icon: <CaretDown size={16} />,
      color: 'text-success',
    }
  }
  return { icon: null, color: '' }
}

interface ClimbLogItemProps {
  climb: Climb
}

export const ClimbLogItem = ({ climb }: ClimbLogItemProps) => {
  const deleteClimb = useDeleteClimb()

  const handleDelete = (e: React.MouseEvent, climbId: string) => {
    e.preventDefault()
    e.stopPropagation()
    deleteClimb.mutate(climbId)
  }

  const difficultyIndicator = getDifficultyIndicator(
    climb.grade,
    climb.perceivedDifficulty,
  )

  return (
    <Link to="/climbs/$id" params={{ id: climb.id }} className="block">
      <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow cursor-pointer hover:bg-base-300/50">
        <div className="card-body p-3">
          <div className="flex justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <Icon type={climb.typeOfClimb} />
              <span className="font-mono text-lg flex gap-1 font-bold ">
                {climb.grade}
                {difficultyIndicator.icon && (
                  <div
                    className={`flex items-center gap-1 scale-90 ${difficultyIndicator.color}`}
                  >
                    {difficultyIndicator.icon}
                  </div>
                )}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1 text-xs text-base-content/60">
                <Calendar size={14} />
                <span>
                  {new Date(Number(climb.createdAt) * 1000).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                  })}
                </span>
              </div>
              <button
                onClick={(e) => handleDelete(e, climb.id)}
                className="btn btn-ghost btn-xs btn-circle text-error hover:bg-error/10"
                aria-label="Delete climb"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>

          {climb.notes && (
            <p className="text-sm text-base-content/70 mt-2">{climb.notes}</p>
          )}
        </div>
      </div>
    </Link>
  )
}
