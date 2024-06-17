import { useQuery } from '@tanstack/react-query'
import { Button, Label, Select, Spinner } from 'flowbite-react'
import { Navigate, useParams } from 'react-router-dom'
import UserService from '~/common/services/UserService'
import InputGroup from '~/components/InputGroup'
import useUserForm from './hooks/useUserForm'
import { AppUser } from '~/common/types/user.interface'

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
  const {
    handleSubmit,
    userTypesQuery,
    register,
    errors,
    onChangeBirthDate,
    onChangeRole,
    onChangeSpecialties,
    rolesQuery
  } = useUserForm(user)

  const onSubmit = handleSubmit(data => {
    console.log(data)
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
