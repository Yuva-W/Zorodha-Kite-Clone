import React from "react";
import Menu from "./Menu";

const TopBar = () => {
  return (
    <header className="topbar-container">
      <div className="indices-container">
        <div className="market-index">
          <span className="index-name">NIFTY 50</span>
          <span className="index-value">25,120.45</span>
          <span className="index-change positive">+1.20%</span>
        </div>

        <div className="market-index">
          <span className="index-name">SENSEX</span>
          <span className="index-value">82,430.12</span>
          <span className="index-change positive">+0.85%</span>
        </div>
      </div>

      <Menu />
    </header>
  );
};

export default TopBar;