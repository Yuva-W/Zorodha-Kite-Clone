import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const menus = [
    { name: "Dashboard", path: "/" },
    { name: "Orders", path: "/orders" },
    { name: "Holdings", path: "/holdings" },
    { name: "Positions", path: "/positions" },
    { name: "Funds", path: "/funds" },
    { name: "Apps", path: "/apps" },
  ];

  return (
    <div className="menu-container">
      {/* Logo */}
      <Link to="/" className="brand">
        <img src="/logo.png" alt="TradePro logo" />
        <span>TradePro</span>
      </Link>

      {/* Navigation */}
      <nav className="menus">
        <ul>
          {menus.map((menu) => {
            const isActive =
              menu.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(menu.path);

            return (
              <li key={menu.path}>
                <Link
                  to={menu.path}
                  className={`menu-link ${isActive ? "active" : ""}`}
                >
                  {menu.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Right side */}
      <div className="menu-right">
        <button className="notification-btn" title="Notifications">
          🔔
        </button>

        <div
          className="profile"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <div className="avatar">ZU</div>

          <div className="profile-info">
            <span className="username">USERID</span>
            <span className="profile-arrow">
              {isProfileOpen ? "▲" : "▼"}
            </span>
          </div>

          {isProfileOpen && (
            <div className="profile-dropdown">
              <Link to="/apps">Profile</Link>
              <Link to="/funds">Funds</Link>
              <Link to="/apps">Settings</Link>
              <button>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
