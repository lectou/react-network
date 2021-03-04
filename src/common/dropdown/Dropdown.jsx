import React, { useRef } from 'react';
import './dropdown.scss';

const Dropdown = ({ setActiveDropdown, children }) => {

  const dropdownRef = useRef();

  const handleOutsideClick = (event) => {
    const modalButton = document.querySelector('.btn__dropdown')
    if (event.path.includes(modalButton)) {
      return
    } else {
      setActiveDropdown(false);
    }
  };

  React.useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
  }, [handleOutsideClick]);

  return (
    <div ref={dropdownRef} className="dropdown">
      {children}
    </div>
  )
}

export default React.memo(Dropdown);