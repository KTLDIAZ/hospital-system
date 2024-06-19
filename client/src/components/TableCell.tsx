import { Table } from 'flowbite-react'

const TableCell = ({ children }: React.PropsWithChildren) => {
  return (
    <Table.Cell className="px-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
      {children}
    </Table.Cell>
  )
}

export default TableCell
