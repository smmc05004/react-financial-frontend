import React from 'react';

const LedgerItem = ({ ledger, onTrClick }) => {
  return (
    <>
      <tr onClick={onTrClick}>
        <td>
          <input type="checkbox" value={ledger._id} />
        </td>
        <td>{ledger.type}</td>
        <td>{ledger.category}</td>
        <td>{ledger.amount}</td>
        <td>{ledger.date}</td>
      </tr>
    </>
  );
};

export default LedgerItem;
