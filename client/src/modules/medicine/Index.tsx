import { useQuery } from '@tanstack/react-query'
import { Button, Dropdown, Table } from 'flowbite-react'
import { Link, NavLink } from 'react-router-dom'
import MedicineService from '~/common/services/MedicineService'
import TableCell from '~/components/TableCell'

const MedicinesPage = () => {
  const { data, isFetched } = useQuery({
    queryKey: ['medicine'],
    queryFn: async () => await MedicineService.GetAll()
  })

  return (
    <div className="overflow-x-auto">
      <Table hoverable striped>
        <Table.Head>
          <Table.HeadCell>
            <Button as={NavLink} to="/medicine/create">
              Create
            </Button>
            <span className="sr-only">Actions</span>
          </Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Brand</Table.HeadCell>
          <Table.HeadCell>Content</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Quantity</Table.HeadCell>
          <Table.HeadCell>Created By</Table.HeadCell>
          <Table.HeadCell>Created At</Table.HeadCell>
          <Table.HeadCell>Updated By</Table.HeadCell>
          <Table.HeadCell>Updated At</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {isFetched &&
            data?.ok &&
            data.data != null &&
            data.data.map(x => (
              <Table.Row key={x._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  <Dropdown label="Actions" dismissOnClick={true}>
                    <Dropdown.Item
                      as={Link}
                      to={`/medicine/${x._id}`}
                      className="font-medium text-cyan-600 dark:text-cyan-500"
                    >
                      View
                    </Dropdown.Item>
                  </Dropdown>
                </Table.Cell>
                <TableCell>{x.name}</TableCell>
                <TableCell>{x.brand}</TableCell>
                <TableCell>{x.content}</TableCell>
                <TableCell>{x.description}</TableCell>
                <TableCell>{x.quantity}</TableCell>
                <TableCell>{x.audit.createdBy}</TableCell>
                <TableCell>{new Date(x.audit.createdAt).toLocaleString()}</TableCell>
                <TableCell>{x.audit.updatedBy}</TableCell>
                <TableCell>
                  {x.audit.updatedAt && new Date(x.audit.updatedAt).toLocaleString()}
                </TableCell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default MedicinesPage
