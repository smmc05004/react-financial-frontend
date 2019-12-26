import React from 'react';
import { Link } from 'react-router-dom';
import './LeftMenu.css';

const LeftMenu = () => {
  return (
    <div className="ledgerLeft">
      <ul>
        <li>
          <Link to={'/ledger/write?pageNum=1&userId=hong&period=2019-12'}>
            쓰기
          </Link>
        </li>
        <li>
          <Link to={`/ledger/analysis`}>분석</Link>
        </li>
      </ul>
    </div>
  );
};

export default LeftMenu;
