import { Card } from 'flowbite-react'
import useAuthorization from '~/common/hooks/useAuthorization'
import { UserByIdentity } from '~/common/types/user.interface'
import P from '~/components/P'

const UserCard = ({
  birthDate,
  bloodType,
  email,
  fullName,
  identityDocument,
  specialties,
  type,
  isDisabled
}: UserByIdentity) => {
  const ageDifMs = Date.now() - new Date(birthDate).getTime()
  const ageDate = new Date(ageDifMs)
  const age = Math.abs(ageDate.getUTCFullYear() - 1970)
  const { isAdmin } = useAuthorization()

  return (
    <Card className="w-full">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {fullName}
      </h5>
      <P text="Identity" value={identityDocument} />
      <P text="Age" value={age.toString()} />
      <P text="Birth date" value={birthDate.slice(0, 10)} />
      <P text="Email" value={email} />
      <P text="Blood type" value={bloodType} />
      {specialties !== undefined && specialties.length > 0 && (
        <P text="Specialties" value={specialties.join()} />
      )}
      <P text="User type" value={type} />
      {isAdmin && <P text="Disabled" value={String(isDisabled)} />}
    </Card>
  )
}

export default UserCard
