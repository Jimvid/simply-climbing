import type { Grade, GradeSystem } from '@/types/climb'
import { americanGrades, europeanGrades } from './grades'

interface GradeFieldsProps {
  gradeField: {
    state: { value: Grade }
    handleChange: (value: Grade) => void
  }
  perceivedDifficultyField: {
    state: { value: Grade }
    handleChange: (value: Grade) => void
  }
  form: any
  gradeSystem: GradeSystem
}

export const GradeFields = ({
  gradeField,
  perceivedDifficultyField,
  form,
  gradeSystem,
}: GradeFieldsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-base-content mb-2">
          Difficulty
        </label>
        <select
          value={gradeField.state.value}
          onChange={(e) => {
            const newGrade = e.target.value as Grade
            gradeField.handleChange(newGrade)
            form.setFieldValue('perceivedDifficulty', newGrade)
          }}
          className="select select-lg cursor-pointer select-bordered w-full border-2 border-primary/20 focus:outline-none focus:border-primary"
        >
          {gradeSystem === 'american'
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

      <div>
        <label className="block text-sm font-medium text-base-content mb-2">
          Perceived Difficulty
        </label>
        <select
          value={perceivedDifficultyField.state.value}
          onChange={(e) =>
            perceivedDifficultyField.handleChange(e.target.value as Grade)
          }
          className="select select-lg cursor-pointer select-bordered w-full border-2 border-primary/20 focus:outline-none focus:border-primary"
        >
          {gradeSystem === 'american'
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
    </div>
  )
}
