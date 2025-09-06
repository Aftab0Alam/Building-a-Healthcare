import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/auth';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <div>
      <nav style={{ padding: 20, backgroundColor: '#f0f0f0'}}>
        <Link to="/dashboard" style={{ marginRight: 20 }}>Dashboard</Link>
        <Link to="/patients" style={{ marginRight: 20 }}>Patients</Link>
        <Link to="/doctors" style={{ marginRight: 20 }}>Doctors</Link>
        <Link to="/mappings" style={{ marginRight: 20 }}>Mappings</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div style={{ padding: '20px' }}>{children}</div>
    </div>
  );
};

export default Layout;
