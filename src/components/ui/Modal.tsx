import CrossIcon from "@/app/assets/icons/cross.svg?react";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  classNameContent?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, classNameContent }) => {
  const [visible, setVisible] = useState(isOpen);

  const onKeyClose = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", onKeyClose);
      setVisible(true);
      document.documentElement.style.overflowY = "scroll";
      document.body.style.height = `100vh`;
      document.body.style.overflowY = "hidden";
    } else {
      document.removeEventListener("keydown", onKeyClose);
      document.documentElement.style.overflowY = "auto";
      document.body.style.height = `auto`;
      document.body.style.overflowY = "auto";
      setTimeout(() => setVisible(false), 300);
    }
    return () => {
      document.removeEventListener("keydown", onKeyClose);
      document.documentElement.style.overflowY = "auto";
      document.body.style.height = `auto`;
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]);

  if (!visible) return null;

  return createPortal(
    <div
      className={`bg-black/50 fixed inset-0 w-full h-full flex items-center justify-center z-50 ${
        isOpen ? "modal-appear" : "modal-disappear"
      }`}
      onClick={onClose}
    >
      <div className={`relative z-50 min-w-96 ${classNameContent || ""}`} onClick={(e) => e.stopPropagation()}>
        {children}
        <CrossIcon
          onClick={onClose}
          className="absolute top-3 right-3 fill-black w-4 h-4 cursor-pointer hover:fill-black/50"
        />
      </div>
    </div>,
    document.body
  );
};

export default Modal;
