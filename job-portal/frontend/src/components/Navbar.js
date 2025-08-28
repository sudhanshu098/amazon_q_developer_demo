import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav style={{ padding: '1rem', backgroundColor: '#2563eb', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
        Job Portal
      </Link>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            {user.role === 'jobseeker' && (
              <>
                <Link to="/jobs" style={{ color: 'white', textDecoration: 'none' }}>Browse Jobs</Link>
                <Link to="/applications" style={{ color: 'white', textDecoration: 'none' }}>My Applications</Link>
              </>
            )}
            {user.role === 'employer' && (
              <>
                <Link to="/post-job" style={{ color: 'white', textDecoration: 'none' }}>Post Job</Link>
                <Link to="/my-jobs" style={{ color: 'white', textDecoration: 'none' }}>My Jobs</Link>
              </>
            )}
            <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;