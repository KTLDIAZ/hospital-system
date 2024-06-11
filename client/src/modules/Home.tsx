import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { Card } from 'flowbite-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import UserService from '~/common/services/UserService'
import { ApiResponse } from '~/common/types/api.interface'
import { UserByIdentity } from '~/common/types/user.interface'
import InputGroup from '~/components/InputGroup'
import P from '~/components/P'

const schema = z.object({
  identity: z.string()
})

type Idenitty = z.infer<typeof schema>

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues
  } = useForm<Idenitty>({
    shouldFocusError: true,
    resolver: zodResolver(schema)
  })

  const { data, isFetched, refetch } = useQuery<ApiResponse<UserByIdentity>>({
    queryKey: ['GetByIdentity'],
    queryFn: () => UserService.GetByIdentity(getValues('identity')),
    enabled: false
  })

  const onSubmit = handleSubmit(async data => {
    if (data.identity === '') return

    const response = await refetch()
    if (response.data && !response.data.ok) {
      setError('identity', { message: response.data.message })
    }
  })

  return (
    <div>
      <form onSubmit={onSubmit} className="mb-5">
        <InputGroup
          autoFocus
          label="Search identity:"
          type="text"
          placeholder="0000-0000-00000"
          errorMessage={errors.identity?.message}
          {...register('identity')}
        />
      </form>
      {isFetched && data?.ok && data.data !== null && <UserByIdentityCard {...data.data} />}
    </div>
  )
}

const UserByIdentityCard = ({
  birthDate,
  bloodType,
  email,
  fullName,
  identityDocument,
  specialties,
  type,
  isDisabled
}: UserByIdentity) => {
  return (
    <Card className="w-full">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {fullName}
      </h5>
      <P text="Blood type" value={bloodType} />
      <P text="Email" value={email} />
      <P text="Identity" value={identityDocument} />
      <P text="Birth date" value={birthDate} />
      {specialties.length > 0 && <P text="Specialties" value={specialties.join()} />}
      <P text="User type" value={type} />
      <P text="Disabled" value={String(isDisabled)} />
    </Card>
  )
}

export default Home
