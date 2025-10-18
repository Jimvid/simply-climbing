import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import type {
  Climb,
  ClimbFormData,
  ClimbType,
  Grade,
  GradeSystem,
} from '@/types/climb'
import { useCreateClimb, useUpdateClimb } from '@/hooks/api/useClimbs'
import { ClimbTypeField } from './ClimbTypeField'
import { GradeSystemField } from './GradeSystemField'
import { GradeFields } from './GradeFields'

interface ClimbFormProps {
  climb?: Climb
}

export const ClimbForm = ({ climb }: ClimbFormProps) => {
  const navigate = useNavigate()
  const createClimb = useCreateClimb()
  const updateClimb = useUpdateClimb()
  const isEditMode = !!climb

  const form = useForm({
    defaultValues: {
      typeOfClimb:
        (climb?.typeOfClimb as ClimbType) || ('slopers' as ClimbType),
      gradeSystem:
        (climb?.gradeSystem as GradeSystem) || ('european' as GradeSystem),
      grade: (climb?.grade as Grade) || ('6a' as Grade),
      perceivedDifficulty:
        (climb?.perceivedDifficulty as Grade) || ('6a' as Grade),
    },
    onSubmit: async ({ value }: { value: ClimbFormData }) => {
      if (isEditMode) {
        updateClimb.mutate(
          { climbId: climb.id, data: value },
          {
            onSuccess: () => {
              navigate({ to: '/climbs' })
            },
          },
        )
      } else {
        createClimb.mutate(value)
      }
    },
  })

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-base-content mb-2">
          {isEditMode ? 'Edit Climb' : 'Add New Climb'}
        </h1>
        <p className="text-base-content/70">
          {isEditMode
            ? 'Update your climbing session details'
            : 'Record your climbing session details'}
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
          {(field) => <ClimbTypeField field={field} />}
        </form.Field>

        <form.Field name="gradeSystem">
          {(field) => <GradeSystemField field={field} form={form} />}
        </form.Field>

        <form.Field name="grade">
          {(gradeField) => (
            <form.Field name="perceivedDifficulty">
              {(perceivedDifficultyField) => (
                <GradeFields
                  gradeField={gradeField}
                  perceivedDifficultyField={perceivedDifficultyField}
                  form={form}
                  gradeSystem={form.state.values.gradeSystem}
                />
              )}
            </form.Field>
          )}
        </form.Field>

        <div className="flex gap-3 pt-4">
          {isEditMode && (
            <button
              type="button"
              onClick={() => navigate({ to: '/climbs' })}
              className="btn btn-outline flex-1"
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary flex-1">
            {isEditMode ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  )
}
