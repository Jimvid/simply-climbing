import { useForm } from '@tanstack/react-form'
import { useAuth } from '@clerk/clerk-react'
import { climbTypes } from './climbTypes'
import { gradeSystems } from './gradeSystems'
import { americanGrades, europeanGrades } from './grades'
import type {
  ClimbFormData,
  ClimbType,
  Grade,
  GradeSystem,
} from '@/types/climb'
import { notifyError, notifySuccess } from '@/lib/notify'

export const AddClimbForm = () => {
  const { getToken } = useAuth()

  const form = useForm({
    defaultValues: {
      typeOfClimb: 'slopers' as ClimbType,
      gradeSystem: 'european' as GradeSystem,
      grade: '6a' as Grade,
      perceivedDifficulty: '6a' as Grade,
    },
    onSubmit: async ({ value }: { value: ClimbFormData }) => {
      const token = await getToken()

      await fetch('https://api.simply-climbing.com/climbs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value),
      })
        .catch(() => notifyError('Could not log climb :('))
        .finally(() => notifySuccess('Climb added!'))
    },
  })

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-base-content mb-2">
          Add New Climb
        </h1>
        <p className="text-base-content/70">
          Record your climbing session details
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="space-y-6"
      >
        <form.Field name="typeOfClimb">
          {(field) => (
            <div>
              <label className="block text-sm font-medium text-base-content mb-3">
                Climb Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {climbTypes.map((climbType) => (
                  <label
                    key={climbType.value}
                    className={`relative bg-base-200 flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
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
                      onChange={(e) =>
                        field.handleChange(e.target.value as ClimbType)
                      }
                      className="sr-only"
                    />
                    <div className="mb-2">{climbType.icon}</div>
                    <div className="text-sm font-medium text-center">
                      {climbType.label}
                    </div>
                    <div className="text-xs text-base-content/60 text-center mt-1">
                      {climbType.description}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
        </form.Field>

        <form.Field name="gradeSystem">
          {(field) => (
            <div>
              <label className="block text-sm font-medium text-base-content mb-3">
                Grade System
              </label>
              <div className="grid grid-cols-2 gap-3">
                {gradeSystems.map((system) => (
                  <label
                    key={system.value}
                    className={`relative flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
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
                        // Update grade and perceived difficulty to appropriate default for the new system
                        const newGrade = newSystem === 'american' ? 'V2' : '6a'
                        form.setFieldValue('grade', newGrade)
                        form.setFieldValue('perceivedDifficulty', newGrade)
                      }}
                      className="sr-only"
                    />
                    <div className="mb-2">{system.icon}</div>
                    <div className="text-sm font-medium text-center">
                      {system.label}
                    </div>
                    <div className="text-xs text-base-content/60 text-center mt-1">
                      {system.description}
                    </div>
                    <div className="text-xs text-primary text-center mt-1 font-mono">
                      {system.example}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
        </form.Field>

        <form.Field name="grade">
          {(field) => (
            <div>
              <label className="block text-sm font-medium text-base-content mb-3">
                Grade
              </label>
              <select
                value={field.state.value}
                onChange={(e) => {
                  const newGrade = e.target.value as Grade
                  field.handleChange(newGrade)
                  form.setFieldValue('perceivedDifficulty', newGrade)
                }}
                className="select select-lg cursor-pointer select-bordered w-full border-2 border-primary/20 focus:outline-none focus:border-primary"
              >
                {form.state.values.gradeSystem === 'american'
                  ? americanGrades.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))
                  : europeanGrades.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
              </select>
            </div>
          )}
        </form.Field>

        <form.Field name="perceivedDifficulty">
          {(field) => (
            <div>
              <label className="block text-sm font-medium text-base-content mb-3">
                Perceived Difficulty
                <span className="text-xs text-base-content/60 block mt-1">
                  How hard did this climb feel to you?
                </span>
              </label>
              <select
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value as Grade)}
                className="select select-lg cursor-pointer select-bordered w-full border-2 border-primary/20 focus:outline-none focus:border-primary"
              >
                {form.state.values.gradeSystem === 'american'
                  ? americanGrades.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))
                  : europeanGrades.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
              </select>
            </div>
          )}
        </form.Field>

        <div className="flex gap-3 pt-4">
          <button type="button" className="btn btn-outline flex-1">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary flex-1">
            Add Climb
          </button>
        </div>
      </form>
    </div>
  )
}
