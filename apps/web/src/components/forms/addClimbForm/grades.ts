import type { AmericanGrade, EuropeanGrade } from './types'

export const americanGrades: AmericanGrade[] = [
  'V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17'
]

export const europeanGradeGroups = [
  {
    label: 'Beginner (3-5c)',
    grades: ['3', '4a', '4b', '4c', '5a', '5b', '5c'] as EuropeanGrade[]
  },
  {
    label: 'Intermediate (6a-6c+)',
    grades: ['6a', '6a+', '6b', '6b+', '6c', '6c+'] as EuropeanGrade[]
  },
  {
    label: 'Advanced (7a-7c+)',
    grades: ['7a', '7a+', '7b', '7b+', '7c', '7c+'] as EuropeanGrade[]
  },
  {
    label: 'Expert (8a+)',
    grades: ['8a', '8a+', '8b', '8b+', '8c', '8c+', '9a'] as EuropeanGrade[]
  }
]

export const europeanGrades: EuropeanGrade[] = [
  '3', '4a', '4b', '4c', '5a', '5b', '5c', '6a', '6a+', '6b', '6b+', '6c', '6c+', '7a', '7a+', '7b', '7b+', '7c', '7c+', '8a', '8a+', '8b', '8b+', '8c', '8c+', '9a'
]