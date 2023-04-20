import { CLOSE_ICON, MENU_ICON, MOON_ICON, SEARCH_ICON, SUN_ICON } from '@/assets/icons/Icons'
import Search from "@/components/search/Search"
import { useState } from "react"
import { useRecoilState } from "recoil"
import { toggleThemeValue } from '@/recoil/atoms'
import Icon from '@/components/icon/Icon'
import "./Header.scss"

const Header = () => {
  const [isOpenSearch, setIsOpenSearch] = useState(false)
  const [darkTheme, setDarkTheme] = useRecoilState(toggleThemeValue)
  const [isShowSideNav, setIsShowSideNav] = useState(false)
  const handleClickIconLightTheme = () => {
    setDarkTheme(false)
  }
  const handleClickIconDarkTheme = () => {
    setDarkTheme(true)
  }
  const handleClickIconSearchEngine = () => {
    setIsOpenSearch(true)
  }
  const handleClickIconMenu = () => {
    setIsShowSideNav(true)
  }
  const handleClickIconClose = () => {
    setIsShowSideNav(false)
  }
  return (
    <>
      <header className={!isShowSideNav ? 'header' : "header header-responsive"}>
        <div className='header-logo'>
          <img src="https://images.unsplash.com/photo-1635320154903-fd41ef72fec9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZGNhcGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="logo image address" />
        </div>
        <ul className='header-menu'>
          <li className='header-menu-item text'>Home</li>
          <li className='header-menu-item text'>Blog</li>
          <li className='header-menu-item text'>Videos</li>
          <li className='header-menu-item text'>Pages</li>
        </ul>
        <div className="header-right">
          {darkTheme ?
            <Icon classNameAdditional='icon-svg-light sun-icon' onClick={handleClickIconLightTheme} icon={SUN_ICON} />
            :
            <Icon classNameAdditional='icon-svg-dark moon-icon' onClick={handleClickIconDarkTheme} icon={MOON_ICON} />
          }
          <Icon classNameAdditional={!darkTheme ? "icon-svg-dark" : "icon-svg-light"} onClick={handleClickIconSearchEngine} icon={SEARCH_ICON} />
          <Icon onClick={handleClickIconMenu} classNameAdditional='icon-menu' icon={MENU_ICON} />
          <Icon onClick={handleClickIconClose} classNameAdditional='icon-close' icon={CLOSE_ICON} />
        </div>
      </header>
      <Search visible={isOpenSearch} setVisible={setIsOpenSearch} />
    </>
  )
}

export default Header