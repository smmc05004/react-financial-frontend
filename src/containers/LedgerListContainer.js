import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LedgerList from '../components/ledger/LedgerList';
import {
  initialField,
  changeField,
  addLedger,
  ledgerList,
} from '../modules/ledger';
import qs from 'qs';
import { withRouter } from 'react-router-dom';

const LedgerListContainer = ({ location }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [tempValue, setTempValue] = useState(0);

  const { form, user, list } = useSelector(({ ledger, user }) => ({
    form: ledger.write,
    user: user.user,
    list: ledger.list,
  }));

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

  // 등록시 성공하면 alert창 띄우고 modal 끔
  useEffect(() => {
    if (form.writeResult) {
      alert('등록되었습니다.');
      setModal(!modal);
    }
  }, [form.writeResult]);

  // 쿼리스트링 요청시
  useEffect(() => {
    const { pageNum, userId } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(ledgerList({ pageNum, userId }));
    setTempValue(parseInt(pageNum));
  }, [dispatch, location.search]);

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
      list={list}
      tempValue={tempValue}
    />
  );
};

export default withRouter(LedgerListContainer);
