import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LedgerList from '../components/ledger/LedgerList';
import { initialField, changeField, addLedger } from '../modules/ledger';

const LedgerListContainer = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const { type, form, user, ledger } = useSelector(({ ledger, user }) => ({
    type: ledger.type,
    form: ledger,
    user: user.user,
    ledger: ledger.ledger,
  }));
  //   console.log('ledgerForm: ', form);

  const onInsert = () => {
    dispatch(initialField());
    setModal(!modal);
  };

  const onUpdate = () => {
    console.log('수정 클릭');
    setModal(!modal);
  };

  const onDelete = () => {
    console.log('삭제 클릭');
    setModal(!modal);
  };

  const onCancel = e => {
    setModal(!modal);
  };

  const onChange = e => {
    const { name, value } = e.target;
    dispatch(changeField({ name, value }));
  };

  const onSubmit = e => {
    e.preventDefault();

    const { type, category, title, place, amount } = form;
    dispatch(addLedger({ type, category, title, place, amount, user }));
  };

  useEffect(() => {
    if (ledger) {
      alert('등록되었습니다.');
      setModal(!modal);
    }
  }, [ledger]);

  return (
    <LedgerList
      onInsert={onInsert}
      onUpdate={onUpdate}
      onDelete={onDelete}
      onCancel={onCancel}
      onChange={onChange}
      onSubmit={onSubmit}
      modal={modal}
      form={form}
      type={type}
    />
  );
};

export default LedgerListContainer;
