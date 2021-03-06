import React from 'react';

const LedgerItem = ({ ledger, onTrClick, onCheckBoxChange }) => {
  return (
    <>
      <tr>
        <td onClick={onCheckBoxChange}>
          <input type="checkbox" value={ledger._id} />
        </td>
        <td onClick={() => onTrClick(ledger._id)}>
          {ledger.type === 'expense' ? '지출' : '수입'}
        </td>
        <td onClick={() => onTrClick(ledger._id)}>{ledger.title}</td>
        <td
          onClick={() => onTrClick(ledger._id)}
          className={ledger.type === 'expense' ? 'red' : 'blue'}
        >
          {ledger.amount}
        </td>
        <td onClick={() => onTrClick(ledger._id)}>
          {ledger.date.substring(0, 10)}
        </td>
      </tr>
    </>
  );
};

export default LedgerItem;
