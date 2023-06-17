import React from "react";
import "./Icon.scss";
interface IIconProps {
  icon: React.ReactNode;
  onClick?: () => void;
  classNameAdditional?: string | "";
}
const Icon = ({ icon, onClick, classNameAdditional }: IIconProps) => {
  return (
    <div onClick={onClick} className={classNameAdditional}>
      {icon}
    </div>
  );
};

export default Icon;
