import React from 'react';
import './ConfirmModal.css'
const ConfirmModal = ({
  isVisible,
  title,
  message,
  confirmBtnText = 'Ok',
  cancelBtnText = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  if (!isVisible) return null;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <h5 className="confirm-title">{title}</h5>
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions d-flex justify-content-end gap-2 mt-4">
          <button className="btn btn-secondary" onClick={onCancel}>
            {cancelBtnText}
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            {confirmBtnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
