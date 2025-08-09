import CrossIcon from '@/app/assets/icons/cross.svg?react';
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  classNameContent?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  classNameContent
}) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.position = "fixed";
    } else {
      document.body.style.position = "static";
    }
    return () => {
      document.body.style.position = "static";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className='    bg-black/50 fixed inset-0 w-full h-full flex items-center justify-center z-50' onClick={onClose}>
      <div
        className={'absolute z-50 min-w-96' + (classNameContent ? classNameContent : '')}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <CrossIcon onClick={onClose} className="absolute top-3 right-3 fill-black w-4 h-4 cursor-pointer hover:fill-black/50"/>
      </div>
    </div>,
    document.getElementsByTagName("body")[0]
  );
};

export default Modal;
