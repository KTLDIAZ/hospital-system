import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Checkbox, Dropdown, Table } from 'flowbite-react'
import { Link, NavLink } from 'react-router-dom'
import useAuthorization from '~/common/hooks/useAuthorization'
import UserService from '~/common/services/UserService'
import TableCell from '~/components/TableCell'

const UsersPage = () => {
  const queryClient = useQueryClient()
  const { isAdmin } = useAuthorization()

  const { data, isFetched } = useQuery({
    queryKey: ['users'],
    queryFn: async () => await UserService.GetAll()
  })

  const disableMutation = useMutation({
    mutationFn: (id: string) => {
      return UserService.Disable(id)
    },
    onSuccess: response => {
      if (response.ok) {
        queryClient.invalidateQueries({ queryKey: ['users'] })
      } else {
        alert(response.message)
      }
    }
  })

  const enableMutation = useMutation({
    mutationFn: (id: string) => {
      return UserService.Enable(id)
    },
    onSuccess: response => {
      if (response.ok) {
        queryClient.invalidateQueries({ queryKey: ['users'] })
      } else {
        alert(response.message)
      }
    }
  })

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>
            <Button as={NavLink} to="/admin/user/create">
              Create
            </Button>
            <span className="sr-only">Actions</span>
          </Table.HeadCell>
          <Table.HeadCell>Fullname</Table.HeadCell>
          <Table.HeadCell>Identity</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Birth Date</Table.HeadCell>
          <Table.HeadCell>Bloodtype</Table.HeadCell>
          <Table.HeadCell>Created By</Table.HeadCell>
          <Table.HeadCell>Created At</Table.HeadCell>
          <Table.HeadCell>Updated By</Table.HeadCell>
          <Table.HeadCell>Updated At</Table.HeadCell>
          {isAdmin && (
            <>
              <Table.HeadCell>User type</Table.HeadCell>
              <Table.HeadCell>Active</Table.HeadCell>
            </>
          )}
        </Table.Head>
        <Table.Body className="divide-y">
          {isFetched &&
            data?.ok &&
            data.data != null &&
            data.data.map(x => (
              <Table.Row key={x._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>
                  <Dropdown label="Actions" dismissOnClick={true}>
                    <Dropdown.Item
                      as={Link}
                      to={`/admin/user/update/${x._id}`}
                      className="font-medium text-cyan-600 dark:text-cyan-500"
                    >
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to={`/user/${x._id}`}
                      className="font-medium text-cyan-600 dark:text-cyan-500"
                    >
                      View
                    </Dropdown.Item>
                    {isAdmin && x.isDisabled && (
                      <Dropdown.Item
                        onClick={() => enableMutation.mutate(x._id)}
                        className="font-medium text-cyan-600 dark:text-cyan-500"
                      >
                        Enable
                      </Dropdown.Item>
                    )}
                    {isAdmin && !x.isDisabled && (
                      <Dropdown.Item
                        onClick={() => disableMutation.mutate(x._id)}
                        className="font-medium text-cyan-600 dark:text-cyan-500"
                      >
                        Disable
                      </Dropdown.Item>
                    )}
                  </Dropdown>
                </TableCell>
                <TableCell>{x.fullName}</TableCell>
                <TableCell>{x.identityDocument}</TableCell>
                <TableCell>{x.email}</TableCell>
                <TableCell>{new Date(x.birthDate).toLocaleDateString()}</TableCell>
                <TableCell>{x.bloodType}</TableCell>
                <TableCell>{x.audit.createdBy}</TableCell>
                <TableCell>{new Date(x.audit.createdAt).toLocaleString()}</TableCell>
                <TableCell>{x.audit.updatedBy}</TableCell>
                <TableCell>
                  {x.audit.updatedAt && new Date(x.audit.updatedAt).toLocaleString()}
                </TableCell>
                {isAdmin && (
                  <>
                    <TableCell>{x.type}</TableCell>
                    <TableCell>
                      <Checkbox checked={!x.isDisabled} disabled />
                    </TableCell>
                  </>
                )}
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default UsersPage
