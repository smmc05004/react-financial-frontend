import React from 'react';
import { Button } from 'reactstrap';

const CrudBtnBundle = ({ onInsert, onUpdate, onDelete }) => {
  return (
    <div className="btnBundle">
      <Button onClick={onInsert} color="success" size="sm">
        입력
      </Button>
      <Button onClick={onUpdate} color="primary" size="sm">
        수정
      </Button>
      <Button onClick={onDelete} color="warning" size="sm">
        삭제
      </Button>
    </div>
  );
};

export default CrudBtnBundle;
