import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>{title}</h3>
        <div className="modal-content">{children}</div>
        <button className="close-btn" onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default Modal;

