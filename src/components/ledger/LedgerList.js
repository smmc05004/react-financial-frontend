import React from 'react';
import CrudBtnBundle from './CrudBtnBundle';
import LedgerItems from './LedgerItems';
import LedgerModal from './LedgerModal';
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
  type,
}) => {
  return (
    <>
      <div className="ledgerList">
        <CrudBtnBundle
          onInsert={onInsert}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
        <LedgerItems />
      </div>

      <LedgerModal
        onChange={onChange}
        onCancel={onCancel}
        onSubmit={onSubmit}
        modal={modal}
        form={form}
        type={type}
      />
    </>
  );
};

export default LedgerList;
