export type ClimbType =
  | 'slopers'
  | 'jugs'
  | 'crimps'
  | 'pockets'
  | 'pinches'
  | 'mixed'

export type GradeSystem = 'american' | 'european'

export type AmericanGrade =
  | 'V0'
  | 'V1'
  | 'V2'
  | 'V3'
  | 'V4'
  | 'V5'
  | 'V6'
  | 'V7'
  | 'V8'
  | 'V9'
  | 'V10'
  | 'V11'
  | 'V12'
  | 'V13'
  | 'V14'
  | 'V15'
  | 'V16'
  | 'V17'

export type EuropeanGrade =
  | '4'
  | '5'
  | '5b'
  | '5b+'
  | '6a'
  | '6a+'
  | '6b'
  | '6b+'
  | '6c'
  | '6c+'
  | '7a'
  | '7a+'
  | '7b'
  | '7b+'
  | '7c'
  | '7c+'
  | '8a'
  | '8a+'
  | '8b'
  | '8b+'
  | '8c'
  | '8c+'
  | '9a'

export type Grade = AmericanGrade | EuropeanGrade

export interface ClimbFormData {
  typeOfClimb: ClimbType
  gradeSystem: GradeSystem
  grade: Grade
  perceivedDifficulty: Grade
}

export interface Climb {
  id: string
  color?: string
  typeOfClimb: ClimbType
  gradeSystem: GradeSystem
  grade: Grade
  perceivedDifficulty: Grade
  createdAt: string
  notes?: string
}

export type ClimbTypes = Array<{
  value: ClimbType
  label: string
  icon: React.ReactNode
  description: string
}>

export type ClimbGrades = Array<{
  value: Grade
  label: string
  system: 'american' | 'european'
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}>
