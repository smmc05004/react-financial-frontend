import React from 'react';
import LedgerItem from './LedgerItem';
import { Table } from 'reactstrap';

const LedgerItems = ({ ledgers }) => {
  //   console.log('가계부 리스트: ', ledgers);

  return (
    <>
      <div className="ledgerTable">
        <Table size="sm">
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
          <tbody>
            {ledgers &&
              ledgers.map(ledger => (
                <LedgerItem ledger={ledger} key={ledger._id} />
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default LedgerItems;
