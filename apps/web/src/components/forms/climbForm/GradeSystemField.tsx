import type { GradeSystem } from '@/types/climb'
import { gradeSystems } from './gradeSystems'

interface GradeSystemFieldProps {
  field: {
    name: string
    state: { value: GradeSystem }
    handleChange: (value: GradeSystem) => void
  }
  form: any
}

export const GradeSystemField = ({ field, form }: GradeSystemFieldProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-base-content mb-2">
        Grade System
      </label>
      <div className="grid grid-cols-2 gap-2">
        {gradeSystems.map((system) => (
          <label
            key={system.value}
            className={`relative flex items-center gap-2 p-2 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
              field.state.value === system.value
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-primary/20 bg-base-200 hover:border-base-content/20 text-base-content'
            }`}
          >
            <input
              type="radio"
              name={field.name}
              value={system.value}
              checked={field.state.value === system.value}
              onChange={(e) => {
                const newSystem = e.target.value as GradeSystem
                field.handleChange(newSystem)
                const newGrade = newSystem === 'american' ? 'V2' : '6a'
                form.setFieldValue('grade', newGrade)
                form.setFieldValue('perceivedDifficulty', newGrade)
              }}
              className="sr-only"
            />
            <div>{system.icon}</div>
            <div className="flex-1">
              <div className="text-sm font-medium">{system.label}</div>
              <div className="text-xs text-base-content/60">
                {system.example}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}
