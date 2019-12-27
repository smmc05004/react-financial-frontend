import React from 'react';
import { Link } from 'react-router-dom';
import './LeftMenu.css';

const LeftMenu = ({ userId, period }) => {
  return (
    <div className="ledgerLeft">
      {userId && period && (
        <ul>
          <li>
            <Link
              to={`/ledger/write?pageNum=1&userId=${userId}&period=${period}`}
            >
              쓰기
            </Link>
          </li>
          <li>
            <Link to={`/ledger/analysis?userId=${userId}&period=${period}`}>
              분석
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default LeftMenu;
