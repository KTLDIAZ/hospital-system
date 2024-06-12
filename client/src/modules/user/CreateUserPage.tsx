import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Label, Select } from 'flowbite-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import AuthService from '~/common/services/AuthService'
import UserService from '~/common/services/UserService'
import { ApiResponse } from '~/common/types/api.interface'
import { CreateUser } from '~/common/types/user.interface'
import InputGroup from '~/components/InputGroup'
import { userSchema } from './schema'

const CreateUserPage = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreateUser>({
    shouldFocusError: true,
    resolver: zodResolver(userSchema)
  })

  const { data, isFetched } = useQuery<ApiResponse<object>>({
    queryKey: ['roles'],
    queryFn: async () => await AuthService.GetRoles()
  })

  const { data: userTypes, isFetched: userTypesFetched } = useQuery<ApiResponse<string[]>>({
    queryKey: ['user-types'],
    queryFn: async () => await AuthService.GetUserTypes()
  })

  const mutation = useMutation({
    mutationFn: (data: CreateUser) => {
      return UserService.CreateUser(data)
    },
    onSuccess: response => {
      if (response.ok) {
        navigate({ pathname: '/admin/user' })
      } else {
        alert(response.message)
      }
    }
  })

  const onSubmit = handleSubmit(data => {
    mutation.mutate(data)
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

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="userTypes" value="Select the roles" />
          </div>
          <Select id="userTypes" required {...register('type')}>
            {userTypesFetched &&
              userTypes?.ok &&
              userTypes.data!.map(x => (
                <option value={x} key={x}>
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
            {isFetched &&
              data?.ok &&
              Object.values(data.data as object).map(x => (
                <option value={x} key={x}>
                  {x}
                </option>
              ))}
          </Select>
        </div>
        <InputGroup
          autoComplete="new-password"
          label="Passwrod"
          id="password"
          type="password"
          errorMessage={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit">Create</Button>
      </form>
    </div>
  )
}

export default CreateUserPage
