import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { memo } from 'react';
import { StarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { dataCoinsFollow } from '../../Data/CoinFollow';
import IconFllow from '../IconFollow';
import { useSelector } from 'react-redux';
import '../../styles/component/TableListCoin.less';

interface nameInterFace {
  name: string;
  symbol: string;
  img: string;
}

interface DataType {
  key: number;
  idCoin: string;
  name: nameInterFace;
  price: number;
  change24: number;
  volum24: number;
  marketCap: number;
}

interface TableListCoinInterFace {
  dataCoin: any[];
  TableType: 'all-coin' | 'fortfolio';
}

function TableListCoin({ dataCoin, TableType }: TableListCoinInterFace) {
  // Redux Theme
  const { priceUp, priceDown } = useSelector((state: any) => state.theme.colors);
  const darkMode = useSelector((state: any) => state.theme.darkMode);

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
      render: (_, { price }) => <div style={{ fontWeight: 500 }}>${price}</div>,
    },
    {
      title: <div style={{ textAlign: 'end' }}>Biên động 24H</div>,
      dataIndex: 'change24',
      key: 'change',
      render: (_, { change24 }) => (
        <div style={{ color: change24 > 0 ? priceUp : priceDown, textAlign: 'end' }}>
          {change24}%
        </div>
      ),
    },
    {
      title: <div style={{ textAlign: 'end' }}>KL 24H</div>,
      key: 'tags',
      dataIndex: 'volum24',
      render: (_, { volum24 }) => <div style={{ textAlign: 'end' }}>{volum24}</div>,
    },
    {
      title: <div style={{ textAlign: 'end' }}>Vốn hoá thị trường</div>,
      key: 'tags',
      dataIndex: 'marketCap',
      render: (_, { marketCap }) => <div style={{ textAlign: 'end' }}>{marketCap}</div>,
    },
    {
      title: '',
      key: 'action',
      render: (_, { idCoin }) => (
        <Space size="middle" style={{ color: '#C99400' }}>
          <Link style={{ color: '#C99400' }} to="/">
            Chi Tiết
          </Link>
          {TableType === 'all-coin' ? (
            <div style={{ color: '#C99400', cursor: 'pointer' }}>
              <IconFllow idCoin={idCoin} title="Follow" state={dataCoinsFollow.includes(idCoin)} />
            </div>
          ) : (
            <div style={{ color: '#C99400', cursor: 'pointer' }}>
              <StarOutlined />
              Thêm vào Fortfolio
            </div>
          )}
        </Space>
      ),
    },
  ];

  const data: DataType[] = dataCoin.map((e: any, index: any) => {
    return {
      key: index,
      idCoin: e?.id,
      name: { name: e?.name, symbol: e?.symbol, img: e?.image },
      price: e?.current_price.toLocaleString(),
      change24: e?.price_change_percentage_24h.toFixed(2),
      volum24: e?.total_volume.toLocaleString(),
      marketCap: e?.market_cap.toLocaleString(),
    };
  });
  return (
    <div>
      <Table
        className={darkMode ? 'darkMode RowHeight' : 'RowHeight'}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 15, position: ['topRight'] }}
        scroll={{ x: 830 }}
      />
    </div>
  );
}

export default memo(TableListCoin);
