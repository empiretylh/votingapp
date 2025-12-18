import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/main', label: 'Main', icon: '/assets/positive-vote.png' },
    { path: '/king', label: 'King', icon: '/assets/crown.png' },
    { path: '/queen', label: 'Queen', icon: '/assets/queen_crown.png' },
    { path: '/developer', label: 'Developer', icon: '/assets/love.png' },
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item) => (
        <div
          key={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <img src={item.icon} alt={item.label} className="nav-icon" />
          <span className="nav-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomNav;
