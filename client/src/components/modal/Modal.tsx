import { ReactNode } from "react";
import ClickOutside from "../click_outside/ClickOutside";
import "./Modal.scss";

interface IModalProps {
  type?: 'confirm' | 'form';
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
const renderTitle = () => { }
const renderBody = () => { }
const renderFooter = () => { }
const Modal = ({ type = "confirm", children, isOpen, setIsOpen }: IModalProps) => {
  console.log('isOpen', isOpen)
  const handleClickOutside = () => {
    setIsOpen(false)
  }
  return (
    <div className={`modal ${isOpen ? "is-open" : ""}`}>
      <div className="modal-overlay"></div>
      <ClickOutside onClickOutside={handleClickOutside}>
        <div className="modal-content">{children}</div>
      </ClickOutside>
    </div>
  );
};

export default Modal;