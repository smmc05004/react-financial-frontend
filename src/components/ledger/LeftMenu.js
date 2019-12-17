import React from 'react';
import './LeftMenu.css';

const LeftMenu = () => {
  return (
    <div className="ledgerLeft">
      <ul>
        <li>
          <a href="#">쓰기</a>
        </li>
        <li>
          <a href="#">분석</a>
        </li>
      </ul>
    </div>
  );
};

export default LeftMenu;
