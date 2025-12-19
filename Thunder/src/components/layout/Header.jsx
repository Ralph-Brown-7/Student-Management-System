import React from 'react';
import { Menu, LogOut } from 'lucide-react';


const Header = ({ onToggleSidebar, onLogout, userRole }) => (
<nav className="navbar navbar-light bg-light px-3 shadow-sm">
<div className="d-flex align-items-center">
<button className="btn btn-outline-secondary me-3 d-md-none" onClick={onToggleSidebar}>
<Menu />
</button>
<span className="navbar-brand mb-0 h1">Thunder SMS</span>
</div>


<div className="d-flex align-items-center">
<span className="me-3">Role: <strong>{userRole}</strong></span>
<button className="btn btn-outline-danger" onClick={onLogout}><LogOut className="me-1" /> Logout</button>
</div>
</nav>
);


export default Header;