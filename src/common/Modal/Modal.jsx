import React from 'react';
import close from '../../assets/svg/close.svg';
import './modal.scss';

export default function Modal({ setActiveModal, children }) {

  const closeModal = () => setActiveModal(false);

  return (
    <div className="modal">
      <div className="modal__content">
        <button onClick={closeModal} className="modal__close" type="button">
          <img src={close} alt="close-icon" />
        </button>
        {children}
      </div>
    </div>
  )
}