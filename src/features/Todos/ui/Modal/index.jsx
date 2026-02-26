import { useState } from 'react';
import style from './style.module.css';
import { Button } from '../../../../shared/ui/Button';

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
          <Button variant="outline" onClick={onClose}>
            CANCEL
          </Button>
          <Button variant="primary" onClick={() => onApply(inputValue)}>
            APPLY
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
