"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

import css from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
}
