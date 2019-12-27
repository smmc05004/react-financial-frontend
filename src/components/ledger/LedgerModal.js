import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import './LedgerModal.css';

const LedgerModal = ({
  onChange,
  onCancel,
  onSubmit,
  modal,
  form,
  ledger,
  selectedType,
}) => {
  return (
    <Modal isOpen={modal} toggle={onCancel}>
      <ModalHeader toggle={onCancel}>가계부 입력</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup tag="fieldset">
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="type"
                  onChange={onChange}
                  value="expense"
                  defaultChecked={
                    ledger !== null
                      ? form.selectedType === 'expense'
                        ? true
                        : false
                      : false
                  }
                />{' '}
                지출
              </Label>

              <Label check>
                <Input
                  type="radio"
                  name="type"
                  onChange={onChange}
                  value="income"
                  defaultChecked={
                    ledger !== null
                      ? form.selectedType === 'income'
                        ? true
                        : false
                      : false
                  }
                />{' '}
                수입
              </Label>
            </FormGroup>
          </FormGroup>
          {selectedType === 'expense' ? (
            <>
              <FormGroup>
                <Label for="category">분류</Label>
                <Input
                  type="select"
                  name="category"
                  onChange={onChange}
                  // defaultValue={form.expense.category}
                  multiple
                >
                  <option value="음식">음식</option>
                  <option value="생활용품">생활용품</option>
                  <option value="통신">통신</option>
                  <option value="교통">교통</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="title">용건</Label>
                <Input
                  type="text"
                  name="title"
                  placeholder="제목을 입력해 주세요"
                  autoComplete="off"
                  onChange={onChange}
                  value={form.expense.title}
                />
              </FormGroup>
              <FormGroup>
                <Label for="place">사용처</Label>
                <Input
                  type="text"
                  name="place"
                  placeholder="사용처를 입력해 주세요"
                  autoComplete="off"
                  onChange={onChange}
                  value={form.expense.place}
                />
              </FormGroup>
              <FormGroup>
                <Label for="amount">금액</Label>
                <Input
                  type="number"
                  name="amount"
                  placeholder="금액을 입력해 주세요"
                  autoComplete="off"
                  onChange={onChange}
                  value={form.expense.amount}
                />
              </FormGroup>
              <FormGroup>
                <Label for="date">날짜</Label>
                <Input
                  type="date"
                  name="date"
                  onChange={onChange}
                  value={form.expense.date}
                />
              </FormGroup>
            </>
          ) : (
            <>
              <FormGroup>
                <Label for="category">분류</Label>
                <Input
                  type="select"
                  name="category"
                  onChange={onChange}
                  multiple
                  // defaultValue={form.income.category}
                >
                  <option value="급여">급여</option>
                  <option value="보너스">보너스</option>
                  <option value="금융소득">금융소득</option>
                  <option value="기타">기타</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="title">용건</Label>
                <Input
                  type="text"
                  name="title"
                  placeholder="제목을 입력해 주세요"
                  autoComplete="off"
                  onChange={onChange}
                  value={form.income.title}
                />
              </FormGroup>
              <FormGroup>
                <Label for="place">발생처</Label>
                <Input
                  type="text"
                  name="place"
                  placeholder="발생처를 입력해 주세요"
                  autoComplete="off"
                  onChange={onChange}
                  value={form.income.place}
                />
              </FormGroup>
              <FormGroup>
                <Label for="amount">금액</Label>
                <Input
                  type="number"
                  name="amount"
                  placeholder="금액을 입력해 주세요"
                  autoComplete="off"
                  onChange={onChange}
                  value={form.income.amount}
                />
              </FormGroup>
              <FormGroup>
                <Label for="date">날짜</Label>
                <Input
                  type="date"
                  name="date"
                  onChange={onChange}
                  value={form.income.date}
                />
              </FormGroup>
            </>
          )}
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button color="primary" onClick={onSubmit}>
          {ledger.ledger ? '수정' : '저장'}
        </Button>{' '}
        <Button color="secondary" onClick={onCancel}>
          취소
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LedgerModal;
