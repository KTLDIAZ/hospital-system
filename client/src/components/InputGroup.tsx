import { Label, TextInput } from 'flowbite-react'
import { forwardRef, type InputHTMLAttributes } from 'react'

const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
  ({ id, label, errorMessage, type = 'text', ...rest }, ref) => {
    return (
      <div>
        <div className="mb-2 block">
          <Label htmlFor={id} value={label} />
        </div>
        <TextInput id={id} {...rest} ref={ref} type={type} />
        {errorMessage && <p className='text-black dark:text-white'>{errorMessage}</p>}
      </div>
    )
  }
)

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label: string;
  errorMessage?: string;
}

InputGroup.displayName = 'InputGroup'

export default InputGroup