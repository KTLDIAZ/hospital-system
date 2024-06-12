import { Card } from 'flowbite-react'
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
  return (
    <Card className="w-full">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {fullName}
      </h5>
      <P text="Blood type" value={bloodType} />
      <P text="Email" value={email} />
      <P text="Identity" value={identityDocument} />
      <P text="Birth date" value={birthDate} />
      {specialties !== undefined && specialties.length > 0 && (
        <P text="Specialties" value={specialties.join()} />
      )}
      <P text="User type" value={type} />
      <P text="Disabled" value={String(isDisabled)} />
    </Card>
  )
}

export default UserCard
