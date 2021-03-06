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
  removeLedger,
} from '../modules/ledger';
import qs from 'qs';
import { withRouter } from 'react-router-dom';

const LedgerListContainer = ({ location, history }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [tempValue, setTempValue] = useState(0);

  // 삭제위해 클릭한 id array
  const idArr = [];

  const {
    form,
    selectedType,
    user,
    list,
    ledger,
    period,
    removed,
  } = useSelector(({ ledger, user }) => ({
    form: ledger.write,
    selectedType: ledger.write.selectedType,
    user: user.user,
    list: ledger.list,
    ledger: ledger.read,
    // period: ledger.list.period,
    period: ledger.period,
    removed: ledger.remove,
  }));

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
    dispatch(removeLedger({ idArr }));
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

    const { id, type, category, title, place, amount, date, use } = form[
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
        updateLedger({
          id,
          type,
          category,
          title,
          place,
          amount,
          date,
          use,
          user,
        }),
      );
    } else {
      dispatch(
        addLedger({ type, category, title, place, amount, date, use, user }),
      );
    }
  };

  // 리스트 클릭 이벤트
  const onTrClick = id => {
    dispatch(getLedger({ id }));

    setModal(!modal);
  };

  // 등록, 수정, 삭제시 성공하면 alert창 띄우고 modal 끔
  useEffect(() => {
    if (form.writeResult) {
      alert('저장 되었습니다.');

      setModal(!modal);

      // 성공시 리스트 다시 불러옴
      history.push(
        `/ledger/write?pageNum=${tempValue}&userId=${user.userId}&period=${period}&writeResult=${form.writeResult._id}`,
      );
    }

    if (form.updateResult) {
      alert('수정 되었습니다.');

      setModal(!modal);

      // 성공시 리스트 다시 불러옴
      history.push(
        `/ledger/write?pageNum=${tempValue}&userId=${
          user.userId
        }&period=${period}&updateResult=${form.updateResult._id +
          form.updateResult.type +
          form.updateResult.category +
          form.updateResult.title +
          form.updateResult.place +
          form.updateResult.amount +
          form.updateResult.date}`,
      );
    }

    if (removed.removeResult) {
      history.push(
        `/ledger/write?pageNum=${tempValue}&userId=${user.userId}&period=${period}&removeResult=${removed.removeResult}`,
      );
    }
  }, [form.writeResult, form.updateResult, removed.removeResult]);

  // 요청 url에서 쿼리스트링 가져와서 period, list 세팅
  useEffect(() => {
    const { pageNum, userId, period } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    if (pageNum && userId && period) {
      dispatch(setPeriod({ period }));
      dispatch(ledgerList({ pageNum, userId, period }));
    } else {
      alert('요청이 올바르지 않습니다.');
    }

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
      idArr.push(value);
    } else {
      const checkedIndex = idArr.indexOf(value);
      idArr.splice(checkedIndex, 1);
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
