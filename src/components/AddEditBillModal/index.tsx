import React, { useState } from "react";
import { Modal, Form, Input, DatePicker, Select, Button } from "antd";
import moment from "moment";
import { ModalActionType } from "../BillsTable";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addBill, editBill } from "../../redux/bills/bills.actions";
const { Option } = Select;

interface IProps {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalActionType: ModalActionType | undefined;
  billData?: Bill | undefined;
  setCurrentActionBillData: React.Dispatch<
    React.SetStateAction<Bill | undefined>
  >;
}
const AddEditBillModal: React.FunctionComponent<IProps> = ({
  setIsModalVisible,
  modalActionType,
  billData,
  setCurrentActionBillData,
}) => {
  const categories = useAppSelector((state) => state.categoriesReducer);
  const reduxDispatch = useAppDispatch();
  const [dateValue, setDateValue] = useState<moment.Moment | null>(
    billData && billData.date ? moment(billData?.date) : moment()
  );
  const [descriptionValue, setDescriptionValue] = useState<string>(
    billData?.description || ""
  );
  const [categoryValue, setCategoryValue] = useState<string>(
    billData?.category || categories[0]
  );
  const [amountValue, setAmountValue] = useState<string>(
    billData?.amount.toString() || ""
  );

  function onDateChange(date: moment.Moment | null) {
    setDateValue(date);
  }

  function handleCategoryChange(category: string) {
    setCategoryValue(category);
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDescriptionValue(event.target.value);
  }
  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAmountValue(event.target.value);
  }

  const isFormDataValid = () => {
    if (
      descriptionValue === "" ||
      categoryValue === "" ||
      amountValue === "" ||
      dateValue === null
    )
      return false;
    else return true;
  };

  const handleSubmit = () => {
    if (isFormDataValid()) {
      if (modalActionType === ModalActionType.Add) {
        reduxDispatch(
          addBill({
            id: uuidv4(),
            date: moment(dateValue).format("MM-DD-YYYY"),
            description: descriptionValue,
            category: categoryValue,
            amount: parseInt(amountValue),
          })
        );
      } else {
        reduxDispatch(
          editBill({
            id: billData?.id!,
            date: moment(dateValue).format("MM-DD-YYYY"),
            description: descriptionValue,
            category: categoryValue,
            amount: parseInt(amountValue),
          })
        );
      }
      setCurrentActionBillData(undefined);
      setIsModalVisible(false);
    } else alert("Please fill in the required fields");
  };

  const handleCancel = () => {
    setCurrentActionBillData(undefined);
    setIsModalVisible(false);
  };

  return (
    <Modal
      title={
        modalActionType === ModalActionType.Add ? "Add new bill" : "Edit bill"
      }
      visible={true}
      onCancel={handleCancel}
      footer={false}
    >
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
        <Form.Item
          name="Date"
          label="Date"
          rules={[{ required: true, message: "Date is required" }]}
        >
          <DatePicker
            onChange={onDateChange}
            defaultValue={
              billData && billData.date ? moment(billData?.date) : moment()
            }
            value={dateValue}
            format="MM-DD-YYYY"
          />
        </Form.Item>
        <Form.Item
          name="Description"
          label="Description"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <Input
            defaultValue={descriptionValue}
            value={descriptionValue}
            onChange={handleDescriptionChange}
          />
        </Form.Item>
        <Form.Item
          name="Category"
          label="Category"
          rules={[{ required: true, message: "Category is required" }]}
        >
          <Select
            defaultValue={categoryValue}
            value={categoryValue}
            onChange={handleCategoryChange}
          >
            {categories.map((categoryItem, index) => (
              <Option key={index} value={categoryItem}>
                {categoryItem}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: "Amount is required" }]}
        >
          <Input
            defaultValue={amountValue}
            value={amountValue}
            onChange={handleAmountChange}
            type="number"
          />
        </Form.Item>

        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button style={{ marginRight: 10 }} onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} type="primary">
            {modalActionType === ModalActionType.Add ? "Add" : "Edit"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditBillModal;
