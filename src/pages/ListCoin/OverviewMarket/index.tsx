import { Col, Row } from 'antd';
import { memo } from 'react';
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
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#fafafa',
        width: '100%',
        paddingBottom: '30px',
      }}
    >
      <div className="overViewMarket">
        <div className="header">
          <div style={{ fontSize: '3rem', fontWeight: 600 }}>Markets</div>
          <div className="marketOverView">
            <img
              src="https://img.icons8.com/dusk/64/000000/doughnut-chart--v1.png"
              alt="percent-circle"
            />
            <div>Market Overview</div>
          </div>
        </div>
        <div className="wrapper">
          <Row gutter={[56, 24]}>
            <Col span={6}>
              <TableOverView listCoin={HightLightCoin} describe="HightLight Coin" />
            </Col>
            <Col span={6}>
              <TableOverView listCoin={CoinNew} describe="New Listing" />
            </Col>
            <Col span={6}>
              <TableOverView listCoin={CoinHightMkC} describe="Top Market Cap" />
            </Col>
            <Col span={6}>
              <TableOverView listCoin={CoinHightVolume} describe="Top Volume Coin" />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default memo(OverviewMarket);
