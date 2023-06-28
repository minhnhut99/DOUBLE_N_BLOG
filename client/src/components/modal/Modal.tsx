import { ReactNode } from 'react';
import ClickOutside from '@/components/click_outside/ClickOutside';
import { CLOSE_ICON } from '@/assets/icons/Icons';
import Button from '@/components/button/Button';
import Icon from '@/components/icon/Icon';
import './Modal.scss';

interface IModalProps {
  type?: 'confirm' | 'form' | 'preview';
  children: ReactNode;
  isOpen: boolean;
  onSubmit: () => void;
  setIsOpen: (value: boolean) => void;
  title: string;
}

const Modal = ({
  type = 'form',
  children,
  isOpen,
  setIsOpen,
  title,
  onSubmit,
}: IModalProps) => {
  const handleClickOutside = () => {
    setIsOpen(false);
    console.log('click outside');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={`modal ${isOpen ? 'is-open' : ''}`}>
      <div className={`modal-overlay ${isOpen ? 'is-open' : ''}`} />
      <ClickOutside onClickOutside={handleClickOutside}>
        <div className={`modal-content ${isOpen ? 'is-open' : ''}`}>
          <Icon
            icon={CLOSE_ICON}
            classNameAdditional="close-icon"
            onClick={handleClose}
          />
          <h3 className="modal-title">{title}</h3>
          <div className="modal-children">{children}</div>
          <footer className="modal-footer">
            {type == 'form' && (
              <Button text="cancel" bgColor="white" onClick={handleClose} />
            )}
            <Button
              text={type === 'form' ? 'submit' : 'OK'}
              onClick={onSubmit}
            />
          </footer>
        </div>
      </ClickOutside>
    </div>
  );
};

export default Modal;
