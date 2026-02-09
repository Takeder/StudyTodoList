import { useEffect } from 'react';

import styles from './styles.module.css';

export const Modal = ({ isOpen, onClose, children }) => {
  const handlerOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const onEscapeHandler = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onEscapeHandler);

    return () => document.removeEventListener('keydown', onEscapeHandler);
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div onClick={handlerOverlayClick} className={styles.modalOverlay}>
      <div className={styles.modalContent}>{children}</div>
    </div>
  );
};
