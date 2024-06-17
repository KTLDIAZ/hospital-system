import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import AuthService from '~/common/services/AuthService'
import { ApiResponse } from '~/common/types/api.interface'
import { AppUser, CreateUser } from '~/common/types/user.interface'
import { userSchema } from '../schema'

const useUserForm = (values: Partial<AppUser>) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreateUser>({
    shouldFocusError: true,
    defaultValues: values,
    resolver: zodResolver(userSchema)
  })

  const rolesQuery = useQuery<ApiResponse<object>>({
    queryKey: ['roles'],
    queryFn: async () => await AuthService.GetRoles()
  })

  const userTypesQuery = useQuery<ApiResponse<string[]>>({
    queryKey: ['user-types'],
    queryFn: async () => await AuthService.GetUserTypes()
  })

  const onChangeRole: React.ChangeEventHandler<HTMLSelectElement> = e => {
    const roles = Array.from(e.target.selectedOptions, option => ({ name: option.value }))

    setValue('roles', roles)
  }

  const onChangeBirthDate: React.ChangeEventHandler<HTMLInputElement> = e => {
    const date = new Date(e.target.value)
    setValue('birthDate', date)
  }

  const onChangeSpecialties: React.ChangeEventHandler<HTMLInputElement> = e => {
    const specialties = e.target.value.split(',')
    setValue('specialties', specialties)
  }

  return {
    onChangeBirthDate,
    onChangeSpecialties,
    onChangeRole,
    rolesQuery,
    userTypesQuery,
    errors,
    register,
    handleSubmit
  }
}

export default useUserForm
