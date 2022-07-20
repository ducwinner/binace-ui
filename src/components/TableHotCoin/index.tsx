import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../styles/component/TableListCoin.less';

interface TableHotCoinInterFace {
  dataCoin: Object[];
}

interface nameInterFace {
  img: string;
  name: string;
  symbol: string;
}

interface DataType {
  key: string;
  name: nameInterFace;
  price: number;
  change: number;
  mkc: number;
}

function TableHotCoin({ dataCoin }: TableHotCoinInterFace) {
  const darkMode = useSelector((state: any) => state.theme.darkMode);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (_, { price }) => <div style={{ fontWeight: 500 }}>${price}</div>,
    },
    {
      title: <div style={{ textAlign: 'end' }}>Change 24H</div>,
      dataIndex: 'change24',
      key: 'change',
      render: (_, { change }) => (
        <div style={{ textAlign: 'end' }} className={change >= 0 ? 'changeUp' : 'changeDown'}>
          {change?.toFixed(2)}%
        </div>
      ),
    },
    {
      title: <div style={{ textAlign: 'end' }}>Maket cap</div>,
      key: 'tags',
      dataIndex: 'marketCap',
      render: (_, { mkc }) => <div style={{ textAlign: 'end' }}>{mkc}</div>,
    },
  ];

  const data: DataType[] = dataCoin.map((e: any) => {
    return {
      key: e.id,
      name: { name: e.name, img: e.image, symbol: e.symbol },
      price: e.current_price,
      change: e.price_change_percentage_24h,
      mkc: e.market_cap,
    };
  });

  return (
    // <div className={darkMode ? 'darkMode RowHeight' : 'RowHeight'}>
    <Table columns={columns} dataSource={data} size="middle" scroll={{ x: 754 }} />
    // </div>
  );
}

export default TableHotCoin;
