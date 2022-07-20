import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ConvertPrice from '../../GlobalFunction/ConvertPrice';
import { lstValueInterFace } from '../../pages/FortFolio';
import { DataInterFace } from '../../Redux/fortfolioSlice';
import { LineChartCoin } from '../Chart/LineChart';

interface CoinInterface {
  img: string;
  name: string;
}

interface DataType {
  key: string;
  rank: string;
  coin: CoinInterface;
  symbol: string;
  price: number;
  hodding: number;
  change1h: number;
  change24h: number;
  change7d: number;
  mkc: number;
  last7day: Array<any>;
  quantity: number;
  priceInput: number;
  ratioHodding: number;
  PNL: number;
  ratioPNL: number;
}

interface TableCoinFortFolioInterFace {
  lstValue: lstValueInterFace;
  lstCoinUser: any;
}

function TableCoinFortFolio({ lstValue, lstCoinUser }: TableCoinFortFolioInterFace) {
  // REDUX
  const { text, priceUp, priceDown } = useSelector((state: any) => state.theme.colors);

  const darkMode = useSelector((state: any) => state.theme.darkMode);
  const dataUser: DataInterFace[] = useSelector((state: any) => state.fortfolio.data);

  const [dataChart, setDataChart] = useState<any>([]);

  useEffect(() => {
    var lstCoinId: any[] = [];
    dataUser.forEach((e: any) => lstCoinId.push(e.idcoin));
    const FetchData = async () => {
      const lstDataChart = await Promise.all(
        lstCoinId.map((idcoin: any) =>
          fetch(
            `https://api.coingecko.com/api/v3/coins/${idcoin}/market_chart?vs_currency=usd&days=7&interval=weekly`
          )
            .then((response) => response.json())
            .then((data) => data.prices)
        )
      );
      const result = lstDataChart.map((item1) =>
        item1
          .filter((item2: any, index: any) => index % 5 === 0)
          .map((item3: any) => ({ a: item3[0], b: item3[1] }))
      );
      setDataChart(result);
    };
    FetchData();
  }, [dataUser]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'rank',
      dataIndex: 'rank',
      key: 'name',
      render: (text) => <div style={{ color: text }}>{text}</div>,
      width: 20,
    },
    {
      title: 'Coin',
      dataIndex: 'coin',
      key: 'coin',
      render: (_, { coin }) => (
        <div>
          <img style={{ width: '25px' }} src={coin.img} alt="" />
          &nbsp; {coin.name}
        </div>
      ),
      width: 200,
    },
    {
      title: '',
      dataIndex: 'symbol',
      key: 'name',
      render: (symbol) => <div>{symbol}</div>,
      width: 40,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <div style={{ color: text }}>{price}</div>,
      width: 100,
    },
    {
      title: '1h',
      dataIndex: 'change1h',
      key: 'change1h',
      render: (change1h) => (
        <div style={{ color: change1h > 0 ? priceUp : priceDown }}>{change1h?.toFixed(2)}%</div>
      ),
      width: 60,
    },
    {
      title: '24h',
      dataIndex: 'change24h',
      key: '24h',
      render: (change24h) => (
        <div style={{ color: change24h > 0 ? priceUp : priceDown }}>{change24h?.toFixed(2)}%</div>
      ),
      width: 60,
    },
    {
      title: '7d',
      dataIndex: 'change7d',
      key: 'change7d',
      render: (change7d) => (
        <div style={{ color: change7d > 0 ? priceUp : priceDown }}>{change7d?.toFixed(2)}%</div>
      ),
      width: 60,
    },
    {
      title: 'MKT Cap',
      dataIndex: 'mkc',
      key: 'mkc',
      render: (mkc) => <div style={{ color: text }}>{mkc}</div>,
      width: 100,
    },
    {
      title: 'last 7 day',
      dataIndex: 'last7day',
      key: 'last7day',
      render: (last7day) => <LineChartCoin data={last7day} />,
      width: 100,
    },
    {
      title: 'Holdings',
      key: 'Holdings',
      render: (_, { quantity, hodding, symbol, ratioHodding }) => (
        <div style={{ color: text }}>
          <div>
            ${hodding?.toFixed(0)}&nbsp;({ratioHodding?.toFixed(0)}%)
          </div>
          <div>
            {quantity}
            <span style={{ fontWeight: 500 }}>{symbol}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'PNL',
      dataIndex: 'pnl',
      key: 'pnl',
      render: (_, { PNL, ratioPNL }) => (
        <div style={{ color: text }}>
          <div>${PNL?.toFixed(0)}</div>
          <div style={{ color: ratioPNL > 0 ? priceUp : priceDown }}>{ratioPNL?.toFixed(0)}%</div>
        </div>
      ),
    },
  ];
  const data: DataType[] = dataUser.map((e: any, index: any) => {
    const coin = lstCoinUser.filter((coin: any) => coin.id === e.idcoin)[0];
    return {
      key: index,
      rank: coin?.market_cap_rank,
      coin: { img: coin?.image, name: coin?.name },
      symbol: coin?.symbol.toUpperCase(),
      price: coin?.current_price,
      change1h: coin?.price_change_percentage_1h_in_currency,
      change24h: coin?.price_change_percentage_24h_in_currency,
      change7d: coin?.price_change_percentage_7d_in_currency,
      mkc: ConvertPrice(coin?.market_cap),
      last7day: dataChart[index],
      quantity: e?.quantity,
      priceInput: e?.priceInput,
      hodding: coin?.current_price * e?.quantity,
      ratioHodding: (coin?.current_price * e?.quantity * 100) / lstValue.totalBalance,
      PNL: (coin?.current_price - e?.priceInput) * e?.quantity,
      ratioPNL: ((coin?.current_price - e?.priceInput) * 100) / e?.priceInput,
    };
  });

  return (
    <div className="table-fortfolio">
      <Table
        className={darkMode ? 'darkMode RowHeight' : 'RowHeight'}
        columns={columns}
        dataSource={data}
        scroll={{ x: 830 }}
      />
    </div>
  );
}

export default TableCoinFortFolio;
