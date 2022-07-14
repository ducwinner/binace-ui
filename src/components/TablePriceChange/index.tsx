import { current } from '@reduxjs/toolkit';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useSelector } from 'react-redux';
import '../../styles/component/TablePriceChange.less';

interface DataType {
  key: string;
  change: string;
  amount: any;
  percent: any;
}

interface pricChangeInterface {
  day1: any;
  day7: any;
  day30: any;
  ath: any;
  price: any;
}

function TablePriceChange({ day1, day7, day30, ath, price }: pricChangeInterface) {
  //Theme
  const {
    text,
    backGroudSP,
    textBlurTitle,
    backGroudPrimary,
    textBlurPrimary,
    priceUp,
    priceDown,
  } = useSelector((state: any) => state.theme.colors);

  const darkMode = useSelector((state: any) => state.theme.darkMode);
  //
  const changeYear = price - ath;
  const percentChangeYear = ((changeYear * 100) / ath).toFixed(2);

  const percent1 = (day1 * price).toFixed(2);
  const percent7 = (day7 * price).toFixed(2);
  const percent30 = (day30 * price).toFixed(2);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Change',
      dataIndex: 'change',
      key: 'change',
      render: (a) => <div style={{ color: text }}>{a}</div>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (_, { amount }) => <div style={{ color: text }}>$&nbsp;{amount}</div>,
    },
    {
      title: '%',
      dataIndex: 'percent',
      key: 'percent',
      render: (_, { percent }) => (
        <div style={{ color: percent > 0 ? priceUp : priceDown }}>{percent}%</div>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      change: 'To Day',
      amount: percent1,
      percent: day1,
    },
    {
      key: '2',
      change: '7 Day',
      amount: percent7,
      percent: day7,
    },
    {
      key: '3',
      change: '30 Day',
      amount: percent30,
      percent: day30,
    },
    {
      key: '4',
      change: '1 Year',
      amount: changeYear,
      percent: percentChangeYear,
    },
  ];
  return (
    <div className="table-price-change">
      <Table
        className={darkMode ? 'darkMode RowHeight' : 'RowHeight'}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
}

export default TablePriceChange;
