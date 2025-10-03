import type { ClimbType } from '@/types/climb'
import {
  Circle,
  Dot,
  Hand,
  HandGrabbing,
  SquaresFour,
  Mountains,
} from '@phosphor-icons/react'

interface IconProps {
  type: ClimbType
  iconProps?: {
    size?: number
    className?: string
  }
}

export const Icon = ({
  type,
  iconProps = { size: 20, className: 'text-primary' },
}: IconProps) => {
  switch (type) {
    case 'crimps':
      return <Dot {...iconProps} />
    case 'pockets':
      return <Circle {...iconProps} />
    case 'pinches':
      return <Hand {...iconProps} />
    case 'jugs':
      return <HandGrabbing {...iconProps} />
    case 'slopers':
      return <Hand {...iconProps} />
    case 'mixed':
      return <SquaresFour {...iconProps} />
    default:
      return <Mountains {...iconProps} />
  }
}
