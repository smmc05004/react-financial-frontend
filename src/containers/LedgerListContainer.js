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
  setPeriod,
} from '../modules/ledger';
import qs from 'qs';
import { withRouter } from 'react-router-dom';

function getDefaultPeriod() {
  const today = new Date();
  const yy = today.getFullYear();
  const mm = today.getMonth() + 1;

  return `${yy}-${mm}`;
}

const LedgerListContainer = ({ location, history }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [tempValue, setTempValue] = useState(0);

  const checkBoxArr = [];

  const { form, selectedType, user, list, ledger, period } = useSelector(
    ({ ledger, user }) => ({
      form: ledger.write,
      selectedType: ledger.write.selectedType,
      user: user.user,
      list: ledger.list,
      ledger: ledger.read,
      period: ledger.list.period,
    }),
  );

  // 입력 버튼 함수
  const onInsert = () => {
    dispatch(initialField());
    setModal(!modal);
  };

  // 가계부 수정 버튼 함수
  const onUpdate = () => {
    console.log('수정 클릭');
    setModal(!modal);
  };

  // 가계부 삭제 버튼 함수
  const onDelete = () => {
    console.log('삭제 클릭');
  };

  // 가계부 취소 버튼 함수
  const onCancel = e => {
    setModal(!modal);
    dispatch(emptyLedger());
  };

  // 가계부 폼 입력 함수
  const onChange = e => {
    const { name, value } = e.target;

    if (name === 'type') {
      dispatch(setSelectedType(value));
    } else {
      dispatch(changeField({ selectedType, name, value }));
    }
  };

  // 가계부 폼 제출 이벤트
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

  // 리스트 클릭 이벤트
  const onTrClick = id => {
    dispatch(getLedger({ id }));

    setModal(!modal);
  };

  // default 기간 세팅
  useEffect(() => {
    const defaultPeriod = getDefaultPeriod();
    dispatch(setPeriod({ period: defaultPeriod }));
  }, [dispatch]);

  // 등록시 성공하면 alert창 띄우고 modal 끔
  useEffect(() => {
    if (form.writeResult) {
      alert('저장 되었습니다.');

      setModal(!modal);

      // 성공시 리스트 다시 불러옴
      history.push(
        `/ledger/write?pageNum=${tempValue}&userId=${user.userId}&period=${period}&result=${form.writeResult._id}`,
      );
    }
  }, [form.writeResult]);

  // 쿼리스트링 요청시
  useEffect(() => {
    const { pageNum, userId, period } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    dispatch(ledgerList({ pageNum, userId, period }));
    setTempValue(parseInt(pageNum));
  }, [dispatch, location.search]);

  // 리스트 클릭 시 해당 객체 가져오면 modal 오픈
  useEffect(() => {
    if (ledger.ledger) {
      setModal(true);
    }
  }, [ledger.ledger]);

  // 기간 변경 이벤트
  const onChangePeriod = e => {
    const { value } = e.target;
    dispatch(setPeriod({ period: value }));
    history.push(
      `/ledger/write?pageNum=1&userId=${user.userId}&period=${value}`,
    );
  };

  // 체크박스 클릭 이벤트
  const onCheckBoxChange = e => {
    const { value, checked } = e.target;

    if (checked) {
      checkBoxArr.push(value);
    } else {
      const checkedIndex = checkBoxArr.indexOf(value);
      checkBoxArr.splice(checkedIndex, 1);
    }
  };

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
      onChangePeriod={onChangePeriod}
      period={period}
      onCheckBoxChange={onCheckBoxChange}
    />
  );
};

export default withRouter(LedgerListContainer);
