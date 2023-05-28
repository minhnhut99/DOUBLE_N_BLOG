import { ChangeEvent } from 'react';
import './Input.scss';
interface IInputProps {
  type?:
    | 'text'
    | 'number'
    | 'checkbox'
    | 'radio'
    | 'password'
    | 'date'
    | 'file';
  placeholder?: string;
  name: string;
  value: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onFocus?: () => void;
  id?: string;
  accept?: string;
}
const Input = ({
  id,
  type = 'text',
  value,
  accept,
  placeholder,
  name,
  onChange,
  onBlur,
  onFocus,
}: IInputProps) => {
  return (
    <input
      accept={accept}
      id={id}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      type={type}
      placeholder={placeholder}
      name={name}
      onFocus={onFocus}
    />
  );
};

export default Input;
