import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { memo } from 'react';
import { StarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { dataCoinsFollow } from '../../Data/CoinFollow';
import IconFllow from '../IconFollow';
import { useSelector } from 'react-redux';
import '../../styles/component/TableListCoin.less';
import useWindowSize from '../../CustomHook/useWindowSize';
import ConvertPrice from '../../GlobalFunction/ConvertPrice';

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
  const size = useWindowSize();
  // Redux Theme
  const { priceUp, priceDown } = useSelector((state: any) => state.theme.colors);
  const darkMode = useSelector((state: any) => state.theme.darkMode);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'duc',
      render: (_, { name, idCoin }) => (
        <Link style={{ display: 'inline' }} to={'/detail/' + idCoin} replace>
          <img
            style={{ width: '25px', height: '25px', transform: 'translateY(-2px)' }}
            src={name.img}
            alt="img"
          />
          <span style={{ fontSize: '1.5rem', fontWeight: '600', margin: '0 10px' }}>
            {name.symbol?.toUpperCase()}
          </span>
          {size.width > 830 ? <span style={{ color: '#707A8A' }}>{name.name}</span> : ''}
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
      title: <div style={{ textAlign: 'end' }}>24H Change</div>,
      dataIndex: 'change24',
      key: 'change',
      render: (_, { change24 }) => (
        <div style={{ color: change24 > 0 ? priceUp : priceDown, textAlign: 'end' }}>
          {change24}%
        </div>
      ),
    },
    {
      title: <div style={{ textAlign: 'end' }}>24H Volume</div>,
      key: 'tags',
      dataIndex: 'volum24',
      render: (_, { volum24 }) => <div style={{ textAlign: 'end' }}>{volum24}</div>,
      responsive: ['md'],
    },
    {
      title: <div style={{ textAlign: 'end' }}>Market cap</div>,
      key: 'tags',
      dataIndex: 'marketCap',
      render: (_, { marketCap }) => (
        <div style={{ textAlign: 'end' }}>
          {size.width < 830
            ? ConvertPrice(marketCap).toLocaleString()
            : marketCap?.toLocaleString()}
          {}
        </div>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (_, { idCoin }) => (
        <Space size="middle" style={{ color: '#C99400' }}>
          <Link style={{ color: '#C99400' }} to={'/detail/' + idCoin} replace>
            {size.width < 830 ? '...' : 'Detail'}
          </Link>
          {TableType === 'all-coin' ? (
            <div style={{ color: '#C99400', cursor: 'pointer' }}>
              <IconFllow idCoin={idCoin} title="Follow" state={dataCoinsFollow.includes(idCoin)} />
            </div>
          ) : (
            <div style={{ color: '#C99400', cursor: 'pointer' }}>
              <StarOutlined />
              {size.width < 830 ? '' : 'Add to fortfolio'}
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
      marketCap: e?.market_cap,
    };
  });
  return (
    <div>
      <Table
        className={darkMode ? 'darkMode RowHeight' : 'RowHeight'}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 15, position: ['topRight'] }}
        scroll={{ x: 555 }}
      />
    </div>
  );
}

export default memo(TableListCoin);
