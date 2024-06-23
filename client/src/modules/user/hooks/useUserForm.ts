import { useQuery } from '@tanstack/react-query'
import useAuthorization from '~/common/hooks/useAuthorization'
import AuthService from '~/common/services/AuthService'
import { ApiResponse } from '~/common/types/api.interface'

const useRoleUserQuery = () => {
  const { isAdmin } = useAuthorization()
  const rolesQuery = useQuery<ApiResponse<object>>({
    queryKey: ['roles'],
    queryFn: async () => await AuthService.GetRoles(),
    enabled: isAdmin
  })

  const userTypesQuery = useQuery<ApiResponse<string[]>>({
    queryKey: ['user-types'],
    queryFn: async () => await AuthService.GetUserTypes(),
    enabled: isAdmin
  })

  return {
    rolesQuery,
    userTypesQuery
  }
}

export default useRoleUserQuery
