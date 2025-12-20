import React from "react";

const Sidebar = ({ navItems, currentPage, onNavigate, userRole }) => {
  return (
    <nav>
      <ul className="list-unstyled">
        {navItems
          .filter((item) => {
            // If the item has a roles array, only show if userRole is included
            if (item.roles) return item.roles.includes(userRole);
            return true; // no roles means everyone can see
          })
          .map((item) => (
            <li
              key={item.id}
              className={`mb-2 p-2 rounded ${
                currentPage === item.id ? "bg-secondary text-white" : ""
              }}
              `}
              style={{ cursor: "pointer" }}
              onClick={() => onNavigate(item.id)}
            >
              {item.icon && <item.icon className="me-2" size={16} />}
              {item.label}
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
