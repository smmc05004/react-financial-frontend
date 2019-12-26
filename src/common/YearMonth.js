import React from 'react';
import { Input } from 'reactstrap';
import './YearMonth.css';

const YearMonth = ({ onChangePeriod, period }) => {
  return (
    <div className="month">
      {/* {period && ( */}
      <Input
        type="month"
        name="month"
        placeholder="제목을 입력해 주세요"
        autoComplete="off"
        onChange={onChangePeriod}
        value={period}
      />
      {/* )} */}
    </div>
  );
};

export default YearMonth;
