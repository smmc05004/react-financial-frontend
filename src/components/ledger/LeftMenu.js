import React from 'react';
import { Link } from 'react-router-dom';
import './LeftMenu.css';

const LeftMenu = ({ user, period }) => {
  return (
    <div className="ledgerLeft">
      {user && period && (
        <ul className="leftUl">
          <li className="leftLi">
            <Link
              to={`/ledger/write?pageNum=1&userId=${user.userId}&period=${period}`}
            >
              쓰기
            </Link>
          </li>
          <li className="leftLi">
            <Link
              to={`/ledger/analysis?userId=${user.userId}&period=${period}`}
            >
              분석
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default LeftMenu;
