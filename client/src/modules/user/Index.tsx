import { useQuery } from "@tanstack/react-query"
import { Dropdown, Table } from "flowbite-react"
import { Link } from "react-router-dom"
import UserService from "~/common/services/UserService"

const UsersPage = () => {
  const {data, isFetched } = useQuery({
    queryKey: ['users'],
    queryFn: async () => await UserService.GetAll() 
  })

  return (
    <div className="overflow-x-auto">
      <Table hoverable striped>
        <Table.Head>
          <Table.HeadCell>Fullname</Table.HeadCell>
          <Table.HeadCell>Identity</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Birth Date</Table.HeadCell>
          <Table.HeadCell>Bloodtype</Table.HeadCell>
          <Table.HeadCell>User type</Table.HeadCell>
          <Table.HeadCell>Created By</Table.HeadCell>
          <Table.HeadCell>Created At</Table.HeadCell>
          <Table.HeadCell>Updated By</Table.HeadCell>
          <Table.HeadCell>Updated At</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {
            isFetched && data?.ok && data.data != null &&
            data.data.map(x => 
              <Table.Row key={x._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {x.fullName}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {x.identityDocument}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {x.email}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {x.birthDate.toString()}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {x.bloodType}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {x.type}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {x.audit.createdBy}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {x.audit.createdAt.toString()}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {x.audit.updatedBy}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {x.audit.updatedAt?.toString()}
                </Table.Cell>
                <Table.Cell>
                <Dropdown label="Actions" dismissOnClick={true}>
                  <Dropdown.Item as={Link} to={`/admin/user/update/${x._id}`} className="font-medium text-cyan-600 dark:text-cyan-500">
                    Edit
                  </Dropdown.Item>
                </Dropdown>
                </Table.Cell>
              </Table.Row>
            )
          }
        </Table.Body>
      </Table>
    </div>
  )
}

export default UsersPage