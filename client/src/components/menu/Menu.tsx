import React from 'react';
import './Menu.scss';
import ClickOutside from '@/components/click_outside/ClickOutside';

interface IMenuProps {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  maxWidth: number;
  list: any;
}

const Menu = ({ isShow, setIsShow, maxWidth, list }: IMenuProps) => {
  const handleClickOutside = () => {
    setIsShow(false);
  };
  return isShow ? (
    <ClickOutside onClickOutside={handleClickOutside}>
      <div className="menu">
        <ul className="menu-container" style={{ maxWidth: `${maxWidth}px` }}>
          {list}
        </ul>
      </div>
    </ClickOutside>
  ) : null;
};

export default Menu;
