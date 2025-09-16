import { Flag, FlagBanner } from '@phosphor-icons/react'
import type { GradeSystem } from '@/types/climb'

export const gradeSystems: Array<{
  value: GradeSystem
  label: string
  icon: React.ReactNode
  description: string
  example: string
}> = [
  {
    value: 'european',
    label: 'European',
    icon: <Flag size={24} />,
    description: 'French grading system',
    example: '6a, 7b+, 8c',
  },
  {
    value: 'american',
    label: 'American',
    icon: <FlagBanner size={24} />,
    description: 'V-scale system',
    example: 'V0, V5, V12',
  },
]

