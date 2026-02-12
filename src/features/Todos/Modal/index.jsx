import { useState } from 'react';
import style from './style.module.css';

const Modal = ({ isOpen, onClose, onApply }) => {
  const [inputValue, setInputValue] = useState('');

  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContainer}>
        <h2 className={style.modalTitle}>NEW NOTE</h2>
        <input
          type="text"
          className={style.modalInput}
          placeholder="Input your note..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className={style.modalActions}>
          <button className={style.btnCancel} onClick={onClose}>
            CANCEL
          </button>
          <button
            className={style.btnApply}
            onClick={() => onApply(inputValue)}
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
