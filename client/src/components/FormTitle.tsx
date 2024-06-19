import React from 'react'

const FormTitle = ({ children }: React.PropsWithChildren) => {
  return (
    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{children}</h1>
  )
}

export default FormTitle
