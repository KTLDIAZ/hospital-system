import { useMutation } from '@tanstack/react-query'
import { Button, Label, Select } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import UserService from '~/common/services/UserService'
import { CreateUser } from '~/common/types/user.interface'
import InputGroup from '~/components/InputGroup'
import useRoleUserQuery from './hooks/useUserForm'
import { useForm } from 'react-hook-form'
import { getUTCDate } from '~/common/utils/date'

const CreateUserPage = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreateUser>()

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
    mutationFn: (data: CreateUser) => {
      return UserService.CreateUser(data)
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
    if (data.type === '') {
      setValue('type', 'patient')
    }

    mutation.mutate(data)
  })

  return (
    <div className="flex items-center justify-center flex-col">
      <form onSubmit={onSubmit} className="flex px-5 min-w-80 md:w-96 flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="userTypes" value="Select the user type:" />
          </div>
          <Select id="userTypes" required {...register('type')}>
            <option value="">Select a user type</option>
            {userTypesQuery.isFetched &&
              userTypesQuery?.data?.ok &&
              userTypesQuery.data.data!.map(x => (
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
            <Label htmlFor="roles" value="Select the roles:" />
          </div>
          <Select id="roles" multiple required onChange={onChangeRole}>
            {rolesQuery.isFetched &&
              rolesQuery.data?.ok &&
              Object.values(rolesQuery.data.data as object).map(x => (
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
