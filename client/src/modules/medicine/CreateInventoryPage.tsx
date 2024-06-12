import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Button } from 'flowbite-react'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { toZod } from 'tozod'
import { z } from 'zod'
import MedicineService from '~/common/services/MedicineService'
import { CreateMedicineInventory } from '~/common/types/medicine'
import InputGroup from '~/components/InputGroup'

const schema: toZod<CreateMedicineInventory> = z.object({
  expireAt: z.date(),
  sku: z.string(),
  quantity: z.number()
})

const CreateInventoryPage = () => {
  const { id } = useParams()
  if (!id) {
    return <Navigate to="/medicine" />
  }

  return <CreateInventoryForm id={id} />
}

const CreateInventoryForm = ({ id }: { id: string }) => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreateMedicineInventory>({
    shouldFocusError: true,
    resolver: zodResolver(schema)
  })

  const mutation = useMutation({
    mutationFn: (data: CreateMedicineInventory) => {
      return MedicineService.CreateInventory(data, id)
    },
    onSuccess: response => {
      if (response.ok) {
        navigate({ pathname: `/medicine/${id}` })
      } else {
        alert(response.message)
      }
    }
  })

  const onSubmit = handleSubmit(data => {
    mutation.mutate(data)
  })

  const onChangeExpireAt: React.ChangeEventHandler<HTMLInputElement> = e => {
    const date = new Date(e.target.value)
    setValue('expireAt', date)
  }

  const onChangeQuantity: React.ChangeEventHandler<HTMLInputElement> = e => {
    const quantity = Number(e.target.value)
    setValue('quantity', quantity)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <InputGroup
          label="Quantity"
          id="quantity"
          type="number"
          errorMessage={errors.quantity?.message}
          onChange={onChangeQuantity}
        />
        <InputGroup label="SKU" id="sku" errorMessage={errors.sku?.message} {...register('sku')} />
        <InputGroup
          label="Expire At"
          id="expire"
          type="datetime-local"
          errorMessage={errors.expireAt?.message}
          onChange={onChangeExpireAt}
        />
        <Button type="submit">Create</Button>
      </form>
    </div>
  )
}

export default CreateInventoryPage
