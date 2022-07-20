import { Col, Row } from 'antd';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import TableOverView from '../../../components/TableOverView';
import '../../../styles/ListCoin/OverviewMarket.less';

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
  // Redux theme
  const { backGroudSP, text } = useSelector((state: any) => state.theme.colors);
  console.log(backGroudSP, text);
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
      </div>
    </div>
  );
}

export default memo(OverviewMarket);
