import React from 'react';
import CrudBtnBundle from './CrudBtnBundle';
import LedgerItems from './LedgerItems';
import LedgerModal from './LedgerModal';
import PaginationContainer from '../../containers/PaginationContainer';
import './LedgerList.css';
import YearMonth from '../../common/YearMonth';

const LedgerList = ({
  onInsert,
  onUpdate,
  onDelete,
  onCancel,
  onChange,
  onSubmit,
  modal,
  form,
  list,
  tempValue,
  onTrClick,
  ledger,
  selectedType,
  onChangePeriod,
  period,
  onCheckBoxChange,
}) => {
  return (
    <>
      <div className="ledgerList">
        <YearMonth onChangePeriod={onChangePeriod} period={period} />

        <CrudBtnBundle
          onInsert={onInsert}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
        <LedgerItems
          list={list.list}
          onTrClick={onTrClick}
          onCheckBoxChange={onCheckBoxChange}
        />

        <PaginationContainer
          totalCount={list.totalCount}
          tempValue={tempValue}
          period={period}
        />
      </div>

      <LedgerModal
        onChange={onChange}
        onCancel={onCancel}
        onSubmit={onSubmit}
        modal={modal}
        form={form}
        ledger={ledger}
        selectedType={selectedType}
      />
    </>
  );
};

export default LedgerList;
