import { useQuery } from '@tanstack/react-query'
import AuthService from '~/common/services/AuthService'
import { ApiResponse } from '~/common/types/api.interface'

const useRoleUserQuery = () => {
  const rolesQuery = useQuery<ApiResponse<object>>({
    queryKey: ['roles'],
    queryFn: async () => await AuthService.GetRoles()
  })

  const userTypesQuery = useQuery<ApiResponse<string[]>>({
    queryKey: ['user-types'],
    queryFn: async () => await AuthService.GetUserTypes()
  })

  return {
    rolesQuery,
    userTypesQuery
  }
}

export default useRoleUserQuery
