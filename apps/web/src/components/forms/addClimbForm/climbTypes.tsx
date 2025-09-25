import {
  Circle,
  Dot,
  Hand,
  HandGrabbing,
  SquaresFour,
} from '@phosphor-icons/react'
import type { ClimbTypes } from '../../../types/climb'

export const climbTypes: ClimbTypes = [
  {
    value: 'slopers',
    label: 'Slopers',
    icon: <Hand size={24} />,
    description: 'Large, rounded holds',
  },
  {
    value: 'jugs',
    label: 'Jugs',
    icon: <HandGrabbing size={24} />,
    description: 'Deep, positive holds',
  },
  {
    value: 'crimps',
    label: 'Crimps',
    icon: <Dot size={24} />,
    description: 'Small, fingertip holds',
  },
  {
    value: 'pockets',
    label: 'Pockets',
    icon: <Circle size={24} />,
    description: 'Finger pockets',
  },
  {
    value: 'pinches',
    label: 'Pinches',
    icon: <Hand size={24} />,
    description: 'Thumb and finger holds',
  },
  {
    value: 'mixed',
    label: 'Mixed',
    icon: <SquaresFour size={24} />,
    description: 'Various hold types',
  },
]
