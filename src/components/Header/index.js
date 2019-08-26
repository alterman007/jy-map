import React from 'react';
import './index.styl';
import police from './police.png'
function Header() {
  return (
    <h1 className="header-wrapper">
      <img src={police}/>智慧街面巡防治安管控信息系统（1.0版）
    </h1>
  );
}

export default Header;