import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Label, Select, Spinner } from 'flowbite-react'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import UserService from '~/common/services/UserService'
import InputGroup from '~/components/InputGroup'
import useRoleUserQuery from './hooks/useUserForm'
import { AppUser, UpdateUser } from '~/common/types/user.interface'
import { useForm } from 'react-hook-form'
import { getUTCDate } from '~/common/utils/date'

const UpdateUserPage = () => {
  const { id } = useParams()
  const { isLoading, data } = useQuery({
    queryKey: ['user-by-id'],
    queryFn: async () => await UserService.GetById(id!)
  })
  if (!id) {
    return <Navigate to="/admin/user" />
  }

  if (isLoading) {
    return <Spinner color="info" size="xl" className="flex items-center justify-center" />
  }

  if (data === undefined || data.data === null) {
    return <Navigate to="/admin/user" />
  }

  return <UpdateUserForm {...data?.data} />
}

const UpdateUserForm = (user: AppUser) => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<UpdateUser>({
    defaultValues: {...user}
  })

  const { rolesQuery, userTypesQuery } = useRoleUserQuery()

  const onChangeRole: React.ChangeEventHandler<HTMLSelectElement> = e => {
    const roles = Array.from(e.target.selectedOptions, option => ({ name: option.value }))

    setValue('roles', roles)
  }

  const onChangeBirthDate: React.ChangeEventHandler<HTMLInputElement> = e => {
    setValue('birthDate', getUTCDate(e.target.value))
  }

  const onChangeSpecialties: React.ChangeEventHandler<HTMLInputElement> = e => {
    const specialties = e.target.value.split(',')
    setValue('specialties', specialties)
  }

  const mutation = useMutation({
    mutationFn: (data: UpdateUser) => {
      return UserService.Update(data, user._id)
    },
    onSuccess: response => {
      if (response.ok) {
        navigate({ pathname: '/user' })
      } else {
        alert(response.message)
      }
    }
  })

  const onSubmit = handleSubmit(data => {
    mutation.mutate(data)
  })

  return (
    <div className="flex items-center justify-center flex-col">
      <form onSubmit={onSubmit} className="flex px-5 min-w-80 md:w-96 flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="userTypes" value="Select the roles" />
          </div>
          <Select id="userTypes" required {...register('type')}>
            {userTypesQuery.isFetched &&
              userTypesQuery?.data?.ok &&
              userTypesQuery.data.data!.map(x => (
                <option value={x} key={x} 
                selected={user.roles.find(r => r.name == x) !== undefined}
                >
                  {x}
                </option>
              ))}
          </Select>
        </div>
        <InputGroup
          label="Fullname"
          id="fullName"
          errorMessage={errors.fullName?.message}
          {...register('fullName')}
        />
        <InputGroup
          label="Identity document"
          id="identity"
          errorMessage={errors.identityDocument?.message}
          {...register('identityDocument')}
        />
        <InputGroup
          label="Email"
          id="email"
          errorMessage={errors.email?.message}
          {...register('email')}
        />
        <InputGroup
          label="Birth date"
          id="birthDate"
          type="date"
          onChange={onChangeBirthDate}
          errorMessage={errors.birthDate?.message}
        />
        <InputGroup
          label="Blood type"
          id="bloodType"
          errorMessage={errors.bloodType?.message}
          {...register('bloodType')}
        />
        <InputGroup
          label="Specialties"
          id="specialties"
          onChange={onChangeSpecialties}
          errorMessage={errors.specialties?.message}
        />
        <div>
          <div className="mb-2 block">
            <Label htmlFor="roles" value="Select the roles" />
          </div>
          <Select id="roles" multiple required onChange={onChangeRole}>
            {rolesQuery.isFetched &&
              rolesQuery.data?.ok &&
              Object.values(rolesQuery.data.data as object).map(x => (
                <option
                  value={x}
                  key={x}
                  selected={user.roles.find(r => r.name == x) !== undefined}
                >
                  {x}
                </option>
              ))}
          </Select>
        </div>
        <Button type="submit">Edit</Button>
      </form>
    </div>
  )
}

export default UpdateUserPage
