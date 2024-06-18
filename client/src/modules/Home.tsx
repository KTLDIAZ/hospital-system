import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import UserService from '~/common/services/UserService'
import { ApiResponse } from '~/common/types/api.interface'
import { UserByIdentity } from '~/common/types/user.interface'
import InputGroup from '~/components/InputGroup'
import UserCard from './components/UserCard'

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
          label="Search identity"
          type="text"
          placeholder="0000-0000-00000"
          errorMessage={errors.identity?.message}
          {...register('identity')}
        />
      </form>
      {isFetched && data?.ok && data.data !== null && (
        <UserCard {...data.data} birthDate={data.data.birthDate} />
      )}
    </div>
  )
}

export default Home
