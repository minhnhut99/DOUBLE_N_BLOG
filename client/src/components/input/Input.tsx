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
  defaultValue?: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onFocus?: () => void;
  id?: string;
  accept?: string;
  checked?: any;
}
const Input = ({
  id,
  type = 'text',
  accept,
  placeholder,
  name,
  onChange,
  onBlur,
  onFocus,
  defaultValue,
  checked,
}: IInputProps) => {
  return (
    <input
      accept={accept}
      id={id}
      onChange={onChange}
      onBlur={onBlur}
      checked={checked}
      defaultValue={defaultValue}
      type={type}
      placeholder={placeholder}
      name={name}
      onFocus={onFocus}
    />
  );
};

export default Input;
