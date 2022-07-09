import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

interface pricChangeInterface {
  dataCoin: Object[];
}

function TablePriceChange({ dataCoin }: pricChangeInterface) {
  const columns: ColumnsType<DataType> = [
    {
      title: 'Change',
      dataIndex: 'change',
      key: 'change',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '%',
      dataIndex: 'percent',
      key: 'percent',
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return (
    <div className="Table-Change">
      <Table columns={columns} dataSource={data} />;
    </div>
  );
}

export default TablePriceChange;
