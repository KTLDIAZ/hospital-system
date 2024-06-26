const P = ({ text, value }: Props) => {
  return (
    <p className="font-normal text-gray-700 dark:text-gray-400">
      {text}: {value}
    </p>
  )
}

interface Props {
  text: string
  value: string
}

// eslint-disable-next-line react-refresh/only-export-components
export default P
