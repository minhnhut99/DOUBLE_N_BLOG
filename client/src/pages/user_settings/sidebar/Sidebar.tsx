import React from 'react';
import './Sidebar.scss';
import Icon from '@/components/icon/Icon';
import { BOOK_ICON, KEY_ICON, USER_ICON } from '@/assets/icons/Icons';
import { NavLink } from 'react-router-dom';
interface IListMenuProps {
  icon: React.ReactNode;
  text: string;
  path: string;
}
const Sidebar = () => {
  const listMenu = [
    { icon: USER_ICON, text: 'Personal', path: 'profile-settings' },
    { icon: KEY_ICON, text: 'Change Password', path: 'password' },
    { icon: BOOK_ICON, text: 'My Posts', path: 'posts' },
  ];
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <ul className="sidebar-list">
          {listMenu.map(({ icon, text, path }: IListMenuProps, idx) => (
            <NavLink
              key={text}
              to={path}
              className={({ isActive, isPending }) =>
                isPending ? 'sidebar-pending' : isActive ? 'sidebar-active' : ''
              }
            >
              <li className="sidebar-item">
                <Icon icon={icon} />
                <p>{text}</p>
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
