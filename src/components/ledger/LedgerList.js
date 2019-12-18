import React from 'react';
import CrudBtnBundle from './CrudBtnBundle';
import LedgerItems from './LedgerItems';
import LedgerModal from './LedgerModal';
import PaginationContainer from '../../containers/PaginationContainer';
import './LedgerList.css';

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
}) => {
  return (
    <>
      <div className="ledgerList">
        <CrudBtnBundle
          onInsert={onInsert}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
        <LedgerItems list={list.list} />

        <PaginationContainer
          totalCount={list.totalCount}
          tempValue={tempValue}
        />
      </div>

      <LedgerModal
        onChange={onChange}
        onCancel={onCancel}
        onSubmit={onSubmit}
        modal={modal}
        form={form}
        type={form.type}
      />
    </>
  );
};

export default LedgerList;
