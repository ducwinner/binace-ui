import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface nameInterFace {
  name: string;
  symbol: string;
  img: string;
}

interface DataType {
  key: number;
  name: nameInterFace;
  price: number;
  change24: number;
  volum24: number;
  marketCap: number;
}

interface TableListCoinInterFace {
  dataCoin: any[];
}

function TableListCoin({ dataCoin }: TableListCoinInterFace) {
  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'duc',
      render: (_, { name }) => (
        <Link to="/">
          <img
            style={{ width: '25px', height: '25px', transform: 'translateY(-2px)' }}
            src={name.img}
            alt="img"
          />
          <span style={{ fontSize: '1.5rem', fontWeight: '600', margin: '0 10px' }}>
            {name.symbol?.toUpperCase()}
          </span>
          <span style={{ color: '#707A8A' }}>{name.name}</span>
        </Link>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => <div style={{ fontWeight: 500 }}>${record.price}</div>,
    },
    {
      title: <div style={{ textAlign: 'end' }}>Biên động 24H</div>,
      dataIndex: 'change24',
      key: 'change',
      render: (_, record) => (
        <div
          style={{ textAlign: 'end' }}
          className={record.change24 >= 0 ? 'changeUp' : 'changeDown'}
        >
          {record.change24}%
        </div>
      ),
    },
    {
      title: <div style={{ textAlign: 'end' }}>KL 24H</div>,
      key: 'tags',
      dataIndex: 'volum24',
      render: (_, record) => <div style={{ textAlign: 'end' }}>{record.volum24}</div>,
    },
    {
      title: <div style={{ textAlign: 'end' }}>Vốn hoá thị trường</div>,
      key: 'tags',
      dataIndex: 'marketCap',
      render: (_, record) => <div style={{ textAlign: 'end' }}>{record.marketCap}</div>,
    },
    {
      title: '',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Link to="/">Chi Tiết</Link>
          <Link to="/">Follow</Link>
        </Space>
      ),
    },
  ];

  const data: DataType[] = dataCoin.map((e: any, index: any) => {
    return {
      key: index,
      name: { name: e.name, symbol: e.symbol, img: e.image },
      price: e.current_price?.toLocaleString(),
      change24: e.price_change_percentage_24h?.toFixed(2),
      volum24: e.total_volume?.toLocaleString(),
      marketCap: e.market_cap?.toLocaleString(),
    };
  });
  return (
    <div className="TableListCoin">
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default memo(TableListCoin);
