import React from 'react';

const NavItem = ({ icon: Icon, label, currentPage, pageId, onClick }) => {
  const activeClass = currentPage === pageId ? 'active btn-primary' : 'btn-outline-light';
  return (
    <li className="nav-item mb-2">
      <button className={`btn w-100 d-flex align-items-center ${activeClass}`} onClick={() => onClick(pageId)}>
        {Icon && <Icon className="me-2" />}
        {label}
      </button>
    </li>
  );
};

export default NavItem;
