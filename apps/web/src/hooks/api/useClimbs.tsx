import type { Climb, ClimbFormData } from '@/types/climb'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { config } from '@/config/config'
import { useAuth } from '@clerk/clerk-react'
import { notifyError, notifySuccess } from '@/lib/notify'

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
    mutationFn: async ({
      climbId,
      data,
    }: {
      climbId: string
      data: ClimbFormData
    }) => {
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
      return (await response.json()) as Climb
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['climbs'] })
      notifySuccess('Climb updated!')
    },
    onError: () => {
      console.error('Failed to update climb')
      notifyError('Could not update climb :(')
    },
  })

  return mutation
}

export const useCreateClimb = () => {
  const { getToken } = useAuth()
  const { apiUrl } = config
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: ClimbFormData) => {
      const token = await getToken()
      const response = await fetch(`${apiUrl}/climbs`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Failed to create climb')
      }
      return (await response.json()) as Climb
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['climbs'] })
      notifySuccess('Climb added!')
    },
    onError: () => {
      console.error('Failed to create climb')
      notifyError('Could not log climb :(')
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
      // Lets be optimistic and assume the delete worked
      queryClient.setQueryData(['climbs'], (oldData: Array<Climb>) => {
        return oldData.filter((climb) => climb.id !== climbId)
      })
      await fetch(`${apiUrl}/climbs/${climbId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onSuccess: () => {
      notifySuccess('Success! Climb was deleted')
    },
    onError: () => {
      console.error('Failed to delete climb')
      notifyError('Could not delete climb :(')
      // If we failed to delete the climb, we refetch the climbs
      queryClient.invalidateQueries({ queryKey: ['climbs'] })
    },
  })

  return mutation
}
