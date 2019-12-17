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

const LedgerModal = ({ onChange, onCancel, onSubmit, modal, form, type }) => {
  return (
    <Modal isOpen={modal} toggle={onCancel}>
      <ModalHeader toggle={onCancel}>가계부 입력</ModalHeader>
      <ModalBody>
        {/* <Form onSubmit={onSubmit}> */}
        <Form>
          <FormGroup tag="fieldset">
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="type"
                  onChange={onChange}
                  value="expense"
                  defaultChecked
                />{' '}
                지출
              </Label>

              <Label check>
                <Input
                  type="radio"
                  name="type"
                  onChange={onChange}
                  value="income"
                />{' '}
                수입
              </Label>
            </FormGroup>
          </FormGroup>
          {type === 'income' ? (
            <>
              <FormGroup>
                <Label for="category">분류</Label>
                <Input
                  type="select"
                  name="category"
                  onChange={onChange}
                  multiple
                >
                  <option value="salary">급여</option>
                  <option value="bonus">보너스</option>
                  <option value="finance">금융소득</option>
                  <option value="else">기타</option>
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
                  value={form.title}
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
                  value={form.place}
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
                  value={form.amount}
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
                >
                  <option value="food">음식</option>
                  <option value="supplies">생홀용품</option>
                  <option value="communication">통신</option>
                  <option value="transportation">교통</option>
                  <option value="else">기타</option>
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
                  value={form.title}
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
                  value={form.place}
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
                  value={form.amount}
                />
              </FormGroup>
            </>
          )}
        </Form>
      </ModalBody>

      <ModalFooter>
        {/* <Button color="primary" type="submit"> */}
        <Button color="primary" onClick={onSubmit}>
          저장
        </Button>{' '}
        <Button color="secondary" onClick={onCancel}>
          취소
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LedgerModal;
