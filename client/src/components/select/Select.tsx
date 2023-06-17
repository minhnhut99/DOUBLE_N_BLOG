import { CARET_DOWN_ICON, CARET_UP_ICON } from '@/assets/icons/Icons';
import { RefObject, useEffect, useRef, useState } from 'react';
import Icon from '../icon/Icon';
import './Select.scss';

interface ISelectProps {
  options: any;
  placeholder?: string;
  setValue: (newValue: number) => void;
}

const Select = ({ options, placeholder, setValue }: ISelectProps) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [toggleCaret, setToggleCaret] = useState(false);
  const [valueSelect, setValueSelect] = useState<string | null>(null);
  const [posDropdown, setPosDropdown] = useState('down');
  const menuRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleWindowResize = () => {
      if (menuRef.current) {
        const element = menuRef.current;
        let elementHeight = element.offsetHeight;
        const rect = element.getBoundingClientRect();
        const elementToBottom = window.innerHeight - rect.bottom;
        if (elementHeight > elementToBottom) {
          setPosDropdown('up');
        } else {
          setPosDropdown('down');
        }
      }
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [window.innerHeight]);

  // truong hop the parent bi gioi han height
  // useEffect(() => {
  //   const elementSelect = selectRef.current;
  //   const elementMenu = menuRef.current;
  //   if (elementSelect && elementMenu) {
  //     const elementHeightSelect = elementSelect.offsetHeight;
  //     const elementHeightMenu = elementMenu.offsetHeight;
  //     const elementHeightParent = elementSelect?.parentElement?.offsetHeight;
  //     if (elementHeightParent) {
  //       if (elementHeightParent < elementHeightMenu) {
  //         console.log('chay vao truong hop nay');
  //         elementMenu.style.overflow = 'auto !important';
  //         elementSelect.parentElement.style.overflow = 'auto !important';
  //       }
  //     }
  //   }
  //   return () => {};
  // }, []);

  const handleClickOutsideMenu = (ref: RefObject<HTMLElement>) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setIsOpenDropdown(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };
  handleClickOutsideMenu(selectRef);
  const handleClickHeader = () => {
    setToggleCaret(!toggleCaret);
    setIsOpenDropdown(!isOpenDropdown);
  };
  const handleOptionSelect = (c_id: number, c_name: string) => {
    setValueSelect(c_name);
    setValue(c_id);
    setIsOpenDropdown(false);
    setToggleCaret(!toggleCaret);
  };
  const handleClassMenu = () => {
    if (isOpenDropdown && posDropdown === 'down') {
      return 'select-menu select-is-show';
    } else if (isOpenDropdown && posDropdown === 'up') {
      return 'select-menu select-is-show select-menu-up';
    } else {
      return 'select-menu ';
    }
  };
  const renderMenu = () => (
    <div className={handleClassMenu()} ref={menuRef}>
      {options?.map(({ c_id, c_name }: any) => (
        <div
          key={c_id}
          className="select-menu-item"
          onClick={() => handleOptionSelect(c_id, c_name)}
        >
          <span>{c_name}</span>
        </div>
      ))}
    </div>
  );
  return (
    <div className="select-custom" ref={selectRef}>
      <div className="select-wrapper">
        <div className="select-value" onClick={handleClickHeader}>
          <p className="select-placeholder">{!valueSelect && placeholder}</p>
          <p>{valueSelect}</p>
          <Icon
            icon={!toggleCaret ? CARET_DOWN_ICON : CARET_UP_ICON}
            classNameAdditional="wrapper-icon-select"
          />
        </div>
        {renderMenu()}
      </div>
    </div>
  );
};

export default Select;
