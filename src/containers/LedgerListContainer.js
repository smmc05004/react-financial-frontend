import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LedgerList from '../components/ledger/LedgerList';
import {
  initialField,
  changeField,
  addLedger,
  ledgerList,
  getLedger,
  emptyLedger,
  updateLedger,
  setSelectedType,
} from '../modules/ledger';
import qs from 'qs';
import { withRouter } from 'react-router-dom';

const LedgerListContainer = ({ location }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [tempValue, setTempValue] = useState(0);

  const { form, selectedType, user, list, ledger } = useSelector(
    ({ ledger, user }) => ({
      form: ledger.write,
      selectedType: ledger.write.selectedType,
      user: user.user,
      list: ledger.list,
      ledger: ledger.read,
    }),
  );

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
    dispatch(emptyLedger());
  };

  const onChange = e => {
    const { name, value } = e.target;

    if (name === 'type') {
      dispatch(setSelectedType(value));
    } else {
      dispatch(changeField({ selectedType, name, value }));
    }
  };

  const onSubmit = e => {
    e.preventDefault();

    const { id, type, category, title, place, amount, date } = form[
      selectedType
    ];

    // 입력 칸 비었는지 체크
    if ([type, category, title, place, amount, date].includes('')) {
      alert('입력칸을 모두 채워주세요');
      return;
    }

    // 아이디가 있는 경우 수정, 그렇지 않으면 새로 저장
    if (id) {
      dispatch(
        updateLedger({ id, type, category, title, place, amount, date, user }),
      );
    } else {
      dispatch(addLedger({ type, category, title, place, amount, date, user }));
    }
  };

  const onTrClick = id => {
    dispatch(getLedger({ id }));

    setModal(!modal);
  };

  // 등록시 성공하면 alert창 띄우고 modal 끔
  useEffect(() => {
    if (form.writeResult) {
      alert('저장 되었습니다.');
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

  // 리스트 클릭 시 해당 객체 가져오면 modal 오픈
  useEffect(() => {
    if (ledger.ledger) {
      setModal(true);
    }
  }, [ledger.ledger]);

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
      onTrClick={onTrClick}
      ledger={ledger}
      selectedType={form.selectedType}
    />
  );
};

export default withRouter(LedgerListContainer);
