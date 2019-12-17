import React from 'react';
import LedgerItem from './LedgerItem';

const LedgerItems = () => {
  return (
    <>
      <div className="ledgerTable">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>분류</th>
              <th>제목</th>
              <th>금액</th>
              <th>날짜</th>
            </tr>
          </thead>
          <LedgerItem />
        </table>
      </div>
    </>
  );
};

export default LedgerItems;
