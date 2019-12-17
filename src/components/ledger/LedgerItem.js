import React from 'react';

const LedgerItem = ({ ledger }) => {
  return (
    <>
      <tr>
        <td>
          <input type="checkbox" value={ledger._id} />
        </td>
        <td>{ledger.type}</td>
        <td>{ledger.category}</td>
        <td>{ledger.amount}</td>
        <td>2019-12-16</td>
      </tr>
    </>
  );
};

export default LedgerItem;
