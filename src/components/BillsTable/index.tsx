import { Table, Space, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { deleteBill } from "../../redux/bills/bills.actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import AddEditBillModal from "../AddEditBillModal";

export enum ModalActionType {
  Add,
  Edit,
}

const BillsTable = () => {
  const billsData = useAppSelector((state) => state.billsReducer.bills);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentActionBillData, setCurrentActionBillData] = useState<
    Bill | undefined
  >(undefined);
  const [currentActionType, setCurrentActionType] = useState<
    ModalActionType | undefined
  >(undefined);
  const reduxDispatch = useAppDispatch();

  const handleAdd = () => {
    showModal();
    setCurrentActionType(ModalActionType.Add);
  };
  const handleEdit = (billItem: Bill) => {
    showModal();
    setCurrentActionType(ModalActionType.Edit);
    setCurrentActionBillData(billItem);
  };
  const handleDelete = (billId: string | number) => {
    reduxDispatch(deleteBill(billId));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const columns: ColumnsType<Bill> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Edit</a>
          <a onClick={() => handleDelete(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Button onClick={handleAdd} style={{ marginBottom: 10 }} type="primary">
        Add New Bill
      </Button>
      <Table
        columns={columns}
        dataSource={billsData}
        pagination={false}
        rowClassName="row-class"
        summary={(pageData) => {
          let totalBillValue = 0;
          pageData.forEach((item) => {
            totalBillValue += item.amount;
          });
          return (
            <>
              <Table.Summary>
                <Table.Summary.Row>
                  <Table.Summary.Cell
                    colSpan={2}
                    index={2}
                  ></Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>Balance</Table.Summary.Cell>
                  <Table.Summary.Cell index={3}>
                    {totalBillValue}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            </>
          );
        }}
      />
      {isModalVisible && (
        <AddEditBillModal
          setIsModalVisible={setIsModalVisible}
          modalActionType={currentActionType}
          billData={currentActionBillData}
          setCurrentActionBillData={setCurrentActionBillData}
        />
      )}
    </>
  );
};

export default BillsTable;
