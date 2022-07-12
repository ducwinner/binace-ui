import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';
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
  change1h: number;
  change24h: number;
  change7d: number;
  mkc: number;
  last7day: any;
  quantity: number;
  priceInput: number;
}

interface TableCoinFortFolioInterFace {
  lstValue: lstValueInterFace;
  lstCoinUser: any;
  dataUser: DataInterFace[];
}

function TableCoinFortFolio({ lstValue, lstCoinUser, dataUser }: TableCoinFortFolioInterFace) {
  const { text, textBlurPrimary, priceUp, priceDown } = useSelector(
    (state: any) => state.theme.colors
  );

  useEffect(() => {
    var lstCoinId: any[] = [];
    dataUser.forEach((e: any) => lstCoinId.push(e.idcoin));

    const dataChart: any[] = [];
    const flattenArray = (data: any) => {
      const chart1 = data.map((e: any[]) => e.map((item) => item[1]));
      dataChart.push(chart1);
    };
    lstCoinId.forEach((idcoin: any) =>
      fetch(`https://api.coingecko.com/api/v3/coins/${idcoin}/market_chart?vs_currency=usd&days=7`)
        .then((response) => response.json())
        .then((data) => flattenArray(data.prices))
    );
    console.log(dataChart);

    // const chart2 = chart1.map((e: any) =>
    //   e.filter((e: any, index: any) => {
    //     if (index % 2 !== 0) {
    //       return e;
    //     }
    //     return e;
    //   })
    // );
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
      render: (_, { coin, symbol }) => (
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
        <div style={{ color: change1h > 0 ? priceUp : priceDown }}>{change1h}%</div>
      ),
      width: 60,
    },
    {
      title: '24h',
      dataIndex: 'change24h',
      key: '24h',
      render: (change24h) => (
        <div style={{ color: change24h > 0 ? priceUp : priceDown }}>{change24h}%</div>
      ),
      width: 60,
    },
    {
      title: '7d',
      dataIndex: 'change7d',
      key: 'change7d',
      render: (change7d) => (
        <div style={{ color: change7d > 0 ? priceUp : priceDown }}>{change7d}%</div>
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
      key: 'mkc',
      render: (mkc) => <LineChartCoin />,
      width: 100,
    },
    {
      title: 'Holdings',
      key: 'Holdings',
      render: (_, { quantity, priceInput, symbol }) => (
        <div style={{ color: text }}>
          <div>${priceInput}</div>
          <div>
            {quantity}
            {symbol}
          </div>
        </div>
      ),
    },
    {
      title: 'PNL',
      dataIndex: 'PNL',
      key: 'PNL',
    },
  ];
  const data: DataType[] = lstCoinUser.map((e: any) => {
    const coin = dataUser.filter((coin: any) => coin.idcoin === e.id)[0];
    fetch(`https://api.coingecko.com/api/v3/coins/${e.id}/market_chart?vs_currency=usd&days=7`)
      .then((response) => response.json())
      .then((data) => data.prices);
    return {
      key: e.id,
      rank: e.market_cap_rank,
      coin: { img: e.image, name: e.name },
      symbol: e.symbol?.toUpperCase(),
      price: e.current_price,
      change1h: e.price_change_percentage_1h_in_currency?.toFixed(2),
      change24h: e.price_change_percentage_24h_in_currency.toFixed(2),
      change7d: e.price_change_percentage_7d_in_currency.toFixed(2),
      mkc: ConvertPrice(e.market_cap),
      last7day: 'price',
      quantity: coin.quantity,
      priceInput: coin.priceInput,
    };
  });

  return (
    <div className="table-fortfolio">
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default TableCoinFortFolio;
