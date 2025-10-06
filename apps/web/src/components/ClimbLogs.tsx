import { Link } from '@tanstack/react-router'
import { Calendar, CaretDown, CaretUp, Mountains, Trash } from '@phosphor-icons/react'
import type { Climb, ClimbType } from '../types/climb'
import { useClimbs, useDeleteClimb } from '@/hooks/api/useClimbs'
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
      icon: <CaretUp size={16} className="text-error" />,
      label: 'Harder',
    }
  } else if (perceived < grade) {
    return {
      icon: <CaretDown size={16} className="text-success" />,
      label: 'Easier',
    }
  }
  return { icon: null, label: 'As expected' }
}

export const ClimbLogs = () => {
  const query = useClimbs()
  const deleteClimb = useDeleteClimb()

  const handleDelete = (e: React.MouseEvent, climbId: string) => {
    e.preventDefault()
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this climb log?')) {
      deleteClimb.mutate(climbId)
    }
  }

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
        {query.data?.map((climb: Climb) => {
          const difficultyIndicator = getDifficultyIndicator(
            climb.grade,
            climb.perceivedDifficulty,
          )

          return (
            <Link
              key={climb.id}
              to="/climbs/$id"
              params={{ id: climb.id }}
              className="block"
            >
              <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow cursor-pointer hover:bg-base-300/50">
                <div className="card-body p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon type={climb.typeOfClimb} />
                        <h3 className="card-title text-lg text-base-content">
                          {climb.grade}
                        </h3>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-base-content/70 mb-2">
                        <span className="badge badge-outline">
                          {getTypeLabel(climb.typeOfClimb)}
                        </span>
                        <span className="font-mono font-semibold text-primary">
                          {climb.grade}
                        </span>
                        {difficultyIndicator.icon && (
                          <div className="flex items-center gap-1">
                            {difficultyIndicator.icon}
                            <span className="text-xs">
                              {difficultyIndicator.label}
                            </span>
                          </div>
                        )}
                      </div>

                      {climb.notes && (
                        <p className="text-sm text-base-content/80 mb-2">
                          {climb.notes}
                        </p>
                      )}
                    </div>

                    <div className="text-right flex flex-col items-end gap-2">
                      <button
                        onClick={(e) => handleDelete(e, climb.id)}
                        className="btn btn-ghost btn-xs btn-circle text-error hover:bg-error/10"
                        aria-label="Delete climb"
                      >
                        <Trash size={16} />
                      </button>
                      <div className="flex items-center gap-1 text-xs text-base-content/60">
                        <Calendar size={14} />
                        <span>
                          {new Date(climb.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-xs text-base-content/50">
                        Felt: {climb.perceivedDifficulty}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
