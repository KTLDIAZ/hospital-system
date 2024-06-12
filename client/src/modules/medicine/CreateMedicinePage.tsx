import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Button } from 'flowbite-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toZod } from 'tozod'
import { z } from 'zod'
import MedicineService from '~/common/services/MedicineService'
import { CreateMedicine } from '~/common/types/medicine'
import InputGroup from '~/components/InputGroup'

const schema: toZod<CreateMedicine> = z.object({
  brand: z.string(),
  content: z.string(),
  description: z.string(),
  name: z.string()
})

const CreateMedicinePage = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateMedicine>({
    shouldFocusError: true,
    resolver: zodResolver(schema)
  })

  const mutation = useMutation({
    mutationFn: (data: CreateMedicine) => {
      return MedicineService.Create(data)
    },
    onSuccess: response => {
      if (response.ok) {
        navigate({ pathname: '/medicine' })
      } else {
        alert(response.message)
      }
    }
  })

  const onSubmit = handleSubmit(data => {
    mutation.mutate(data)
  })

  return (
    <div>
      <form onSubmit={onSubmit}>
        <InputGroup
          label="Name"
          id="name"
          errorMessage={errors.name?.message}
          {...register('name')}
        />
        <InputGroup
          label="Brand"
          id="brand"
          errorMessage={errors.brand?.message}
          {...register('brand')}
        />
        <InputGroup
          label="Content"
          id="content"
          errorMessage={errors.content?.message}
          {...register('content')}
        />
        <InputGroup
          label="Description"
          id="description"
          errorMessage={errors.description?.message}
          {...register('description')}
        />
        <Button type="submit">Create</Button>
      </form>
    </div>
  )
}

export default CreateMedicinePage
