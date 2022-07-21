import { Col, Row, Select } from 'antd';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import TableOverView from '../../../components/TableOverView';
import useWindowSize from '../../../CustomHook/useWindowSize';
import '../../../styles/ListCoin/OverviewMarket.less';

const { Option } = Select;

interface OverViewMarketInterFace {
  HightLightCoin: any[];
  CoinHightMkC: any[];
  CoinHightVolume: any[];
  CoinNew: any[];
}

function OverviewMarket({
  HightLightCoin,
  CoinHightMkC,
  CoinHightVolume,
  CoinNew,
}: OverViewMarketInterFace) {
  // state
  const [typeList, setTypeList] = useState<any>('1');
  const sizeWinDow = useWindowSize();

  // Redux theme
  const { backGroudSP, text } = useSelector((state: any) => state.theme.colors);

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    setTypeList(value.value);
  };

  const choseTypeList = (type: string) => {
    switch (type) {
      case '1':
        <TableOverView listCoin={HightLightCoin} describe="HightLight Coin" />;
        break;
      case '2':
        <TableOverView listCoin={CoinNew} describe="New Listing" />;
        break;
      case '3':
        <TableOverView listCoin={CoinHightMkC} describe="Top Market Cap" />;
        break;
      case '3':
        <TableOverView listCoin={CoinHightVolume} describe="Top Volume Coin" />;
        break;
      default:
    }
  };
  //
  return (
    <div
      style={{
        backgroundColor: backGroudSP,
      }}
      className="coverOverViewMarket"
    >
      <div className="overViewMarket">
        <div className="header">
          <div style={{ fontSize: '3rem', fontWeight: 600, color: text }}>Markets</div>
          <div className="marketOverView">
            <img
              src="https://img.icons8.com/dusk/64/000000/doughnut-chart--v1.png"
              alt="percent-circle"
            />
            <div style={{ color: text }}>Market Overview</div>
          </div>
        </div>

        {sizeWinDow.width < 414 ? (
          <>
            <Select
              labelInValue
              defaultValue={{ value: '1', label: 'HightLight Coin' }}
              style={{ width: 250, marginBottom: 25 }}
              onChange={handleChange}
            >
              <Option value="1">HightLight Coin</Option>
              <Option value="2">New Listing</Option>
              <Option value="3">Top Market Cap</Option>
              <Option value="4">Top Volume Coin</Option>
            </Select>
            {typeList === '1' ? (
              <TableOverView listCoin={HightLightCoin} describe="HightLight Coin" />
            ) : typeList === '2' ? (
              <TableOverView listCoin={CoinNew} describe="New Listing" />
            ) : typeList === '3' ? (
              <TableOverView listCoin={CoinHightMkC} describe="Top Market Cap" />
            ) : (
              <TableOverView listCoin={CoinHightVolume} describe="Top Volume Coin" />
            )}
          </>
        ) : (
          <div className="wrapper">
            <Row gutter={[{ md: 24, xl: 56 }, 24]} style={{ marginLeft: '0' }}>
              <Col lg={6}>
                <TableOverView listCoin={HightLightCoin} describe="HightLight Coin" />
              </Col>
              <Col lg={6}>
                <TableOverView listCoin={CoinNew} describe="New Listing" />
              </Col>
              <Col lg={6}>
                <TableOverView listCoin={CoinHightMkC} describe="Top Market Cap" />
              </Col>
              <Col lg={6}>
                <TableOverView listCoin={CoinHightVolume} describe="Top Volume Coin" />
              </Col>
            </Row>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(OverviewMarket);
