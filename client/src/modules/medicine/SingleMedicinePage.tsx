import { useQuery } from '@tanstack/react-query'
import { Button, Card, Spinner } from 'flowbite-react'
import { NavLink, Navigate, useParams } from 'react-router-dom'
import P from '~/components/P'
import MedicineService from '~/common/services/MedicineService'

const SingleMedicinePage = () => {
  const { id } = useParams()
  if (!id) {
    return <Navigate to="/admin/user" />
  }

  return <SingleMedicine id={id} />
}

const SingleMedicine = ({ id }: { id: string }) => {
  const { isLoading, data } = useQuery({
    queryKey: ['medicine-by-id'],
    queryFn: async () => await MedicineService.GetById(id)
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner color="info" size="xl" />
      </div>
    )
  }

  if (data === undefined || data.data === null) {
    return <Navigate to="/medicine" />
  }

  const { data: medicine } = data
  return (
    <div>
      <Card className="w-full mb-5">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {medicine.name}
        </h5>
        <P text="Brand" value={medicine.brand} />
        <P text="Availability" value={medicine.quantity.toString()} />
        <P text="Contentn" value={medicine.content} />
        <P text="Description" value={medicine.description} />
      </Card>
      <div className="flex justify-between mb-5">
        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Inventories
        </h3>
        <Button as={NavLink} to={`/medicine/${medicine._id}/create-inventory`}>
          Create Inventory
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {medicine.inventory !== undefined && medicine.inventory.length < 1 && (
          <h4>There isn't any inventory</h4>
        )}
        {medicine.inventory?.map(x => (
          <Card key={x._id}>
            <P text="Quantity" value={x.quantity.toString()} />
            <P text="Expire at" value={new Date(x.expireAt).toLocaleString()} />
            <P text="SKU" value={x.sku} />
            <P text="Created at" value={new Date(x.audit.createdAt).toLocaleString()} />
            <P text="Created by" value={x.audit.createdBy} />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default SingleMedicinePage
