import type { Climb, ClimbFormData } from '@/types/climb'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
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

export const useUpdateClimb = () => {
  const { getToken } = useAuth()
  const { apiUrl } = config
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ climbId, data }: { climbId: string; data: ClimbFormData }) => {
      const token = await getToken()
      const response = await fetch(`${apiUrl}/climbs/${climbId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Failed to update climb')
      }
      return await response.json() as Climb
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['climbs'] })
    },
  })

  return mutation
}

export const useDeleteClimb = () => {
  const { getToken } = useAuth()
  const { apiUrl } = config
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (climbId: string) => {
      const token = await getToken()
      const response = await fetch(`${apiUrl}/climbs/${climbId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error('Failed to delete climb')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['climbs'] })
    },
  })

  return mutation
}
