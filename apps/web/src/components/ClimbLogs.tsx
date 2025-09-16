import { Link } from '@tanstack/react-router'
import { Calendar, Mountains, CaretUp, CaretDown } from '@phosphor-icons/react'
import type { Climb, ClimbType } from '../types/climb'

const dummyClimbs: Array<Climb> = [
  {
    id: '1',
    color: 'Red',
    type: 'crimps',
    gradeSystem: 'european',
    grade: '7a',
    perceivedDifficulty: '7a+',
    date: '2024-01-15',
    notes: 'Technical crimps throughout, good flow',
  },
  {
    id: '2',
    color: 'Blue',
    type: 'jugs',
    gradeSystem: 'american',
    grade: 'V5',
    perceivedDifficulty: 'V4',
    date: '2024-01-14',
    notes: 'Powerful moves, felt easier than expected',
  },
  {
    id: '3',
    color: 'Green',
    type: 'pockets',
    gradeSystem: 'european',
    grade: '6c+',
    perceivedDifficulty: '7a',
    date: '2024-01-13',
    notes: 'Finger strength required, 2-finger pockets',
  },
  {
    id: '4',
    color: 'Yellow',
    type: 'slopers',
    gradeSystem: 'american',
    grade: 'V7',
    perceivedDifficulty: 'V7',
    date: '2024-01-12',
  },
  {
    id: '5',
    color: 'Purple',
    type: 'pinches',
    gradeSystem: 'european',
    grade: '6b+',
    perceivedDifficulty: '6b',
    date: '2024-01-11',
    notes: 'Thumb compression moves',
  },
  {
    id: '6',
    color: 'Orange',
    type: 'mixed',
    gradeSystem: 'american',
    grade: 'V6',
    perceivedDifficulty: 'V6',
    date: '2024-01-10',
  },
  {
    id: '7',
    color: 'Black',
    type: 'crimps',
    gradeSystem: 'european',
    grade: '7b',
    perceivedDifficulty: '7a+',
    date: '2024-01-09',
    notes: 'Sequential crimping, core intensive',
  },
  {
    id: '8',
    color: 'White',
    type: 'jugs',
    gradeSystem: 'american',
    grade: 'V3',
    perceivedDifficulty: 'V3',
    date: '2024-01-08',
  },
  {
    id: '9',
    color: 'Pink',
    type: 'pockets',
    gradeSystem: 'european',
    grade: '6a+',
    perceivedDifficulty: '6b',
    date: '2024-01-07',
    notes: 'Fun route with good rests',
  },
  {
    id: '10',
    color: 'Teal',
    type: 'slopers',
    gradeSystem: 'american',
    grade: 'V8',
    perceivedDifficulty: 'V9',
    date: '2024-01-06',
    notes: 'Humid day made holds slippery',
  },
]

const getTypeIcon = (type: ClimbType) => {
  const iconProps = { size: 20, className: 'text-primary' }

  switch (type) {
    case 'crimps':
    case 'pockets':
    case 'pinches':
      return <Mountains {...iconProps} />
    case 'jugs':
    case 'slopers':
    case 'mixed':
    default:
      return <Mountains {...iconProps} />
  }
}

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
        {dummyClimbs.map((climb) => {
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
                        {getTypeIcon(climb.type)}
                        <h3 className="card-title text-lg text-base-content">
                          {climb.color ? `${climb.color} ${climb.grade}` : climb.grade}
                        </h3>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-base-content/70 mb-2">
                        <span className="badge badge-outline">
                          {getTypeLabel(climb.type)}
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

                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs text-base-content/60">
                        <Calendar size={14} />
                        <span>{new Date(climb.date).toLocaleDateString()}</span>
                      </div>
                      <div className="text-xs text-base-content/50 mt-1">
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
