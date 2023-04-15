import "./Input.scss"
interface IInputProps {
  type?: "text" | "number" | 'checkbox' | 'radio' | 'password' | 'date'
  placeholder?: string
  name: string
  value: string | number
  onChange: () => void
  onBlur: () => void
  id?: string
}
const Input = ({ id, type = 'text', value, placeholder, name, onChange, onBlur }: IInputProps) => {
  return (
    <input id={id} onChange={onChange} onBlur={onBlur} value={value} type={type} placeholder={placeholder} name={name} />
  )
}

export default Input