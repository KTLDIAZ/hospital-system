import { useQuery } from '@tanstack/react-query'
import { Button, Card, Spinner } from 'flowbite-react'
import { NavLink, Navigate, useParams } from 'react-router-dom'
import UserService from '~/common/services/UserService'
import UserCard from '../components/UserCard'
import P from '~/components/P'
import useAuthorization from '~/common/hooks/useAuthorization'

const SingleUserPage = () => {
  const { id } = useParams()
  if (!id) {
    return <Navigate to="/admin/user" />
  }

  return <SingleUser id={id} />
}

const SingleUser = ({ id }: { id: string }) => {
  const { isInRole } = useAuthorization()

  const { isLoading, data } = useQuery({
    queryKey: ['user-by-id'],
    queryFn: async () => await UserService.GetById(id)
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner color="info" size="xl" />
      </div>
    )
  }

  if (data === undefined || data.data === null) {
    return <Navigate to="/admin/user" />
  }

  const { data: user } = data
  return (
    <div>
      <UserCard {...user} birthDate={user.birthDate.toString()} />
      <div className="flex justify-between mt-5 mb-5">
        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Medical hisotry
        </h3>
        {isInRole(['admin', 'doctor']) && (
          <Button as={NavLink} to={`/user/${user._id}/create-medical-history`}>
            Create medical history
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {user.medicalHistory !== undefined && user.medicalHistory.length < 1 && (
          <h4>There isn't any medical history</h4>
        )}
        {user.medicalHistory?.map(x => (
          <Card key={x._id}>
            <P text="diagnosis" value={x.diagnosis} />
            <P text="date" value={x.date.toString()} />
            <P text="doctor name" value={x.doctor.name} />
            <P text="doctor specialties" value={x.doctor.specialties.join()} />
            <P text="observation" value={x.observation} />
            <div>
              <h4 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                Prescription
              </h4>
              {x.prescription.map(p => (
                <div key={p.name}>
                  <P text="medicine" value={p.name} />
                  <P text="dose" value={p.dose} />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default SingleUserPage
