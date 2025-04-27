import { Modal, Table, TableColumnsType } from "antd"
import { useState } from "react";

interface DataType {
  seller: string;
  date: string;
  total: number;
  category: string;
}

export const SpendTable = (props: {data: DataType[]}) => {
  const columns: TableColumnsType<DataType> = [
    {
      dataIndex: 'seller',
    },
    {
      dataIndex: 'total',
    },
    {
      dataIndex: 'category',
    },
    {
      dataIndex: 'date'
    }
  ];
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);

  const handleRowDoubleClick = (record: DataType) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  return (
    <>
      <Table<DataType> 
        columns={columns} 
        dataSource={props.data}
        showHeader={false}
        onRow={(record) => ({
          onClick: () => handleRowDoubleClick(record),
        })} 
      />
      <Modal title="Детали записи" open={isModalOpen} onCancel={handleModalClose} footer={false}>
        {selectedRecord && (
          <div>
            <p>Продавец: {selectedRecord.seller}</p>
            <p>Сумма: {selectedRecord.total}</p>
            <p>Категория: {selectedRecord.category}</p>
            <p>Дата: {selectedRecord.date}</p>
          </div>
        )}
      </Modal>
    </>
  )
}
