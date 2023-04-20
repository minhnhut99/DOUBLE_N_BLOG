import "./Button.scss";
interface IButtonProps {
  text: string;
  bgColor?: "black" | "white";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean
  onClick?: () => void;
  size?: 'tiny' | 'small' | 'medium' | 'large'
  icon?: any
}
const Button = ({ text, onClick, icon, fullWidth = false, bgColor = 'black', type = 'button', disabled = false, size = 'medium', }:
  IButtonProps) => {
  const getSizeClass = (size: 'tiny' | 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'large':
        return 'btn-large'
      case 'small':
        return "btn-small"
      case 'tiny':
        return 'btn-tiny'
      default:
        return 'btn-medium'
    }
  }
  const getBgColorClass = (bgColor: "black" | "white") => {
    switch (bgColor) {
      case 'white':
        return 'btn-white'
      default:
        return 'btn-black'
    }
  }
  const addFullWidth = (fullWidth: boolean) => {
    return fullWidth ? "btn-full-width" : null
  }
  const handleClassName = () => {
    return addFullWidth(fullWidth) + " " + getBgColorClass(bgColor) + " " + getSizeClass(size)
  }
  return (
    <button className={handleClassName()} type={type} disabled={disabled}
      color={bgColor} onClick={onClick}
    >
      {text}</button>
  )
}

export default Button