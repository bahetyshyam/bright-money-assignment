import { Table, Space, Button, Select, Input } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { budgetUpdated, deleteBill } from "../../redux/bills/bills.actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import AddEditBillModal from "../AddEditBillModal";
const { Option } = Select;

export enum ModalActionType {
  Add,
  Edit,
}

const BillsTable = () => {
  const billsData = useAppSelector((state) => state.billsReducer.activeBills);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentActionBillData, setCurrentActionBillData] = useState<
    Bill | undefined
  >(undefined);
  const [currentActionType, setCurrentActionType] = useState<
    ModalActionType | undefined
  >(undefined);
  const [filterList, setFilterList] = useState<string[]>([]);
  const reduxDispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categoriesReducer);
  const billsToPay = useAppSelector((state) => state.billsReducer.billsToPay);

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
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const onChangeFilterSelect = (filterList: any) => {
    setFilterList(filterList);
  };
  const onBudgetChange = (
    ev: React.ChangeEvent<HTMLInputElement> | undefined
  ) => {
    if (ev) {
      let budget = 0;
      if (ev.target.value !== "") {
        budget = parseInt(ev.target.value);
      }
      reduxDispatch(budgetUpdated(budget));
    }
  };

  const filteredTableData =
    filterList.length === 0
      ? billsData
      : billsData.filter((billItem) => filterList.includes(billItem.category));
  return (
    <>
      <Button onClick={handleAdd} style={{ marginBottom: 10 }} type="primary">
        Add New Bill
      </Button>
      <br></br>
      <div>Filter</div>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select"
        defaultValue={[]}
        value={filterList}
        onChange={onChangeFilterSelect}
      >
        {categories.map((caetgoryItem) => (
          <Option key={caetgoryItem} value={caetgoryItem}>
            {caetgoryItem}
          </Option>
        ))}
      </Select>
      <br></br>
      <div>Budget</div>
      <Input type="number" defaultValue="" onChange={onBudgetChange} />
      <Table
        columns={columns}
        dataSource={filteredTableData}
        pagination={false}
        rowClassName={(record) => {
          if (billsToPay.includes(record)) {
            return "dark-grey";
          } else {
            return "";
          }
        }}
        summary={() => {
          const totalBillValue = billsData.reduce(function (a, b) {
            return a + b.amount;
          }, 0);
          return (
            <>
              <Table.Summary>
                <Table.Summary.Row className="dark-grey">
                  <Table.Summary.Cell
                    colSpan={2}
                    index={1}
                  ></Table.Summary.Cell>
                  <Table.Summary.Cell index={2}>Total</Table.Summary.Cell>
                  <Table.Summary.Cell index={3}>
                    {totalBillValue}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    colSpan={1}
                    index={4}
                  ></Table.Summary.Cell>
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
