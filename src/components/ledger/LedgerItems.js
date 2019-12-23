import React from 'react';
import LedgerItem from './LedgerItem';
import { Table } from 'reactstrap';

const LedgerItems = ({ list, onTrClick, onCheckBoxChange }) => {
  return (
    <>
      <div className="ledgerTable">
        <Table size="sm">
          <thead>
            <tr>
              <th>
                <input type="checkbox" onChange={onCheckBoxChange} />
              </th>
              <th>분류</th>
              <th>제목</th>
              <th>금액</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list.map(ledger => (
                <LedgerItem
                  ledger={ledger}
                  key={ledger._id}
                  // onTrClick={() => onTrClick(ledger._id)}
                  onTrClick={onTrClick}
                  onCheckBoxChange={onCheckBoxChange}
                />
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default LedgerItems;
