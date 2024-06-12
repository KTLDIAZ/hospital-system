import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Button } from 'flowbite-react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { toZod } from 'tozod'
import { z } from 'zod'
import UserService from '~/common/services/UserService'
import { CreateMedicalHistory } from '~/common/types/user.interface'
import InputGroup from '~/components/InputGroup'
import P from '~/components/P'

const schema: toZod<CreateMedicalHistory> = z.object({
  diagnosis: z.string().min(3),
  observation: z.string().min(3),
  prescription: z.array(
    z.object({
      dose: z.string().min(3),
      name: z.string().min(3)
    })
  )
})

const CreateMedicalHistoryPage = () => {
  const { id } = useParams()
  if (!id) {
    return <Navigate to="/" />
  }

  return <CreateMedicalHistoryForm id={id} />
}

const CreateMedicalHistoryForm = ({ id }: { id: string }) => {
  const navigate = useNavigate()
  const [state, setState] = useState(true)

  const medicineRef = useRef<HTMLInputElement>(null)
  const doseRef = useRef<HTMLInputElement>(null)
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<CreateMedicalHistory>({
    shouldFocusError: true,
    resolver: zodResolver(schema)
  })

  const mutation = useMutation({
    mutationFn: (data: CreateMedicalHistory) => {
      return UserService.CreateMedicalHistory(data, id)
    },
    onSuccess: response => {
      if (response.ok) {
        navigate({ pathname: `/user/${id}` })
      } else {
        alert(response.message)
      }
    }
  })

  const addPrescription = () => {
    const newPrescription = {
      name: medicineRef.current!.value,
      dose: doseRef.current!.value
    }
    doseRef.current!.value = ''
    medicineRef.current!.value = ''
    const prevPresciption = getValues('prescription')
    setState(!state)
    if (prevPresciption === undefined) {
      setValue('prescription', [newPrescription])
      return
    }
    setValue('prescription', [...getValues('prescription'), newPrescription])
  }

  const onSubmit = handleSubmit(data => {
    mutation.mutate(data)
  })

  return (
    <div>
      <form onSubmit={onSubmit}>
        <InputGroup
          label="Diagnosis"
          id="diagnosis"
          errorMessage={errors.diagnosis?.message}
          {...register('diagnosis')}
        />
        <InputGroup
          label="Observation"
          id="observation"
          errorMessage={errors.observation?.message}
          {...register('observation')}
        />
        <hr />

        <InputGroup label="Medicine" id="medicine" ref={medicineRef} />
        <InputGroup label="Dose" id="dose" ref={doseRef} />
        <Button onClick={addPrescription} type="button" color="dark">
          Add prescription
        </Button>
        {getValues('prescription')?.map(x => (
          <div key={x.name}>
            <P text="name" value={x.name} />
            <P text="dose" value={x.dose} />
          </div>
        ))}

        <hr />
        <Button type="submit">Create</Button>
      </form>
    </div>
  )
}

export default CreateMedicalHistoryPage
