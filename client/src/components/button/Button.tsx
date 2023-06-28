import './Button.scss';
interface IButtonProps {
  text: string;
  bgColor?: 'black' | 'white';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  spac?: 'ml10' | 'mr10';
  onClick?: () => void;
  size?: 'tiny' | 'small' | 'medium' | 'large';
  icon?: any;
  className?: string;
}
const Button = ({
  text,
  onClick,
  icon,
  spac,
  fullWidth = false,
  bgColor = 'black',
  type = 'button',
  disabled = false,
  size = 'medium',
}: IButtonProps) => {
  const getSizeClass = (size: 'tiny' | 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'large':
        return 'btn-large';
      case 'small':
        return 'btn-small';
      case 'tiny':
        return 'btn-tiny';
      default:
        return 'btn-medium';
    }
  };
  const getSpacing = (spac: 'ml10' | 'mr10') => {
    switch (spac) {
      case 'ml10':
        return 'space-ml10';
      case 'mr10':
        return 'space-mr10';
    }
  };
  const getBgColorClass = (bgColor: 'black' | 'white') => {
    switch (bgColor) {
      case 'white':
        return 'btn-white';
      default:
        return 'btn-black';
    }
  };
  const addFullWidth = (fullWidth: boolean) => {
    return fullWidth ? 'btn-full-width' : '';
  };
  const handleClassName = () => {
    return (
      addFullWidth(fullWidth) +
      ' ' +
      getBgColorClass(bgColor) +
      ' ' +
      getSizeClass(size) +
      ' ' +
      (spac ? ' ' + getSpacing(spac) : '')
    );
  };
  return (
    <button
      className={handleClassName()}
      type={type}
      disabled={disabled}
      color={bgColor}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
