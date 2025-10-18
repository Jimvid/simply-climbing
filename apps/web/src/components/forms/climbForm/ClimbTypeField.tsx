import type { ClimbType } from '@/types/climb'
import { climbTypes } from './climbTypes'

interface ClimbTypeFieldProps {
  field: {
    name: string
    state: { value: ClimbType }
    handleChange: (value: ClimbType) => void
  }
}

export const ClimbTypeField = ({ field }: ClimbTypeFieldProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-base-content mb-2">
        Climb Type
      </label>
      <div className="grid grid-cols-3 gap-2">
        {climbTypes.map((climbType) => (
          <label
            key={climbType.value}
            className={`relative bg-base-200 flex flex-col items-center p-2 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
              field.state.value === climbType.value
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-primary/20 bg-base-200 hover:border-base-content/20 text-base-content'
            }`}
          >
            <input
              type="radio"
              name={field.name}
              value={climbType.value}
              checked={field.state.value === climbType.value}
              onChange={(e) => field.handleChange(e.target.value as ClimbType)}
              className="sr-only"
            />
            <div className="mb-1">{climbType.icon}</div>
            <div className="text-xs font-medium text-center">
              {climbType.label}
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}
