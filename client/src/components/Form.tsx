const Form = ({ children, onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit} className="flex px-5 min-w-80 md:w-96 flex-col gap-4">
      {children}
    </form>
  )
}

interface Props extends React.PropsWithChildren {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export default Form
