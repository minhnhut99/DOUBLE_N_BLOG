import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { toggleThemeValue } from '@/recoil/atoms';
import { auth } from '@/recoil/atoms/auth';
import Icon from '@/components/icon/Icon';
import Menu from '@/components/menu/Menu';
import Search from '@/components/search/Search';
import {
  CLOSE_ICON,
  MENU_ICON,
  MOON_ICON,
  NOTIFY_ICON,
  SEARCH_ICON,
  SUN_ICON,
  USER_ICON,
  WRITE_ICON,
} from '@/assets/icons/Icons';
import './Header.scss';
import { toast } from 'react-toastify';
import { getCookie, removeCookies } from '@/utils/utils';
import { Path } from '@/constant/appConstant';
const Header = () => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [darkTheme, setDarkTheme] = useRecoilState(toggleThemeValue);
  const [isShowSideNav, setIsShowSideNav] = useState(false);
  const [isShowAccountMenu, setIsShowAccountMenu] = useState(false);
  const { user } = useRecoilValue(auth);
  const resetAuth = useResetRecoilState(auth);
  const navigate = useNavigate();
  const handleClickIconLightTheme = () => {
    setDarkTheme(false);
  };

  const handleClickIconDarkTheme = () => {
    setDarkTheme(true);
  };

  const handleClickIconSearchEngine = () => {
    setIsOpenSearch(true);
  };

  const handleClickIconMenu = () => {
    setIsShowSideNav(true);
  };

  const handleClickIconClose = () => {
    setIsShowSideNav(false);
  };

  const handleClickAccountGroup = () => {
    setIsShowAccountMenu(!isShowAccountMenu);
  };
  const handleClickIconWrite = () => {
    navigate(Path.create_post);
  };
  const handleClickLogout = () => {
    removeCookies(['token', 'user']);
    resetAuth();
    toast.success('Logout successfully!');
    navigate(Path.home);
  };

  const renderListMenu = () => (
    <>
      <li>
        <NavLink to="user/profile-settings">User Settings</NavLink>
      </li>
      <li onClick={handleClickLogout}>Logout</li>
    </>
  );

  const iconData = [
    {
      className: darkTheme
        ? 'icon-svg-light sun-icon'
        : 'icon-svg-dark moon-icon',
      onClick: darkTheme ? handleClickIconLightTheme : handleClickIconDarkTheme,
      icon: darkTheme ? SUN_ICON : MOON_ICON,
    },
    {
      className: !darkTheme ? 'icon-svg-dark' : 'icon-svg-light',
      onClick: handleClickIconSearchEngine,
      icon: SEARCH_ICON,
    },
    {
      className: 'icon-menu',
      onClick: handleClickIconMenu,
      icon: MENU_ICON,
    },
    {
      className: 'icon-close',
      onClick: handleClickIconClose,
      icon: CLOSE_ICON,
    },
  ];

  const menuItems = [
    { path: Path.home, label: 'Home' },
    { path: Path.posts, label: 'Blog' },
    { path: Path.videos, label: 'Videos' },
    { path: Path.pages, label: 'Pages' },
  ];

  const renderMenuItems = () => {
    return menuItems.map((item) => (
      <li className="header-menu-item text" key={item.path}>
        <NavLink
          to={item.path}
          className={({ isActive, isPending }) =>
            isPending ? 'menu-pending' : isActive ? 'menu-active' : ''
          }
        >
          {item.label}
        </NavLink>
      </li>
    ));
  };

  const renderIcons = () => {
    return iconData.map((icon, index) => (
      <Icon
        key={index}
        classNameAdditional={icon.className}
        onClick={icon.onClick}
        icon={icon.icon}
      />
    ));
  };
  return (
    <>
      <header className={`header ${isShowSideNav ? 'header-responsive' : ''}`}>
        <div className="header-logo">
          <h1>
            <Link to={Path.root}>DoubleNBlog</Link>
          </h1>
        </div>
        <ul className="header-menu">{renderMenuItems()}</ul>
        <div className="header-right">{renderIcons()}</div>
        <div className="noti-writter">
          <Icon icon={NOTIFY_ICON} />
          <Icon onClick={handleClickIconWrite} icon={WRITE_ICON} />
        </div>
        <div className="account-group" onClick={handleClickAccountGroup}>
          {user?.u_name ? (
            <>
              <Icon icon={USER_ICON} />
              <p>{user.u_name}</p>
            </>
          ) : (
            <ul className="account-text">
              <li>
                <NavLink to={Path.login}>Login</NavLink>
              </li>
            </ul>
          )}
          <Menu
            list={renderListMenu()}
            isShow={isShowAccountMenu}
            setIsShow={setIsShowAccountMenu}
            maxWidth={200}
          />
        </div>
      </header>
      <Search visible={isOpenSearch} setVisible={setIsOpenSearch} />
    </>
  );
};

export default Header;
