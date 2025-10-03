import type { Climb } from '@/types/climb'
import { useQuery } from '@tanstack/react-query'
import { config } from '@/config/config'
import { useAuth } from '@clerk/clerk-react'

export const useClimbs = () => {
  const { getToken } = useAuth()
  const { apiUrl } = config
  const query = useQuery<Array<Climb>>({
    queryKey: ['climbs'],
    queryFn: async () => {
      const token = await getToken()
      const response = await fetch(`${apiUrl}/climbs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error('Failed to fetch climbs')
      }
      const data = await response.json()
      return data as Array<Climb>
    },
  })

  return query
}
