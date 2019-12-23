import React from 'react';
import { Link } from 'react-router-dom';
import './LeftMenu.css';

const LeftMenu = () => {
  return (
    <div className="ledgerLeft">
      <ul>
        <li>
          {/* <a href="#">쓰기</a> */}
          <Link to={'/ledger?pageNum=1&userId=undefined&yearMonth=2019-12'}>
            쓰기
          </Link>
        </li>
        <li>
          {/* <a href="#">분석</a> */}
          <Link to="">분석</Link>
        </li>
      </ul>
    </div>
  );
};

export default LeftMenu;
