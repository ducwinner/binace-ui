import { Col, Row } from 'antd';
import { Input } from 'antd';
import '../../../styles/OverviewHome.less';

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

function Overview() {
  return (
    <div style={{ backgroundColor: '#fafafa' }}>
      <div style={{ margin: '0 42px', padding: '80px 24px 0 24px' }} className="OverviewInner">
        <div className="OverviewTop">
          <Row>
            <Col span={12}>
              <div style={{ width: '70%' }}>
                <div className="content">Buy, trade, and hold 600+ cryptocurrencies on Binance</div>
                <div className="search">
                  <Search
                    placeholder="Email/phone"
                    allowClear
                    enterButton="Get Start"
                    size="large"
                    onSearch={onSearch}
                  />
                </div>
              </div>
            </Col>
            <Col span={12}>
              <img
                style={{ objectFit: 'contain', width: '80%' }}
                src="https://public.bnbstatic.com/image/cms/content/body/202202/749d00d2b5be8010d079ba039b619ca4.png"
                alt="img"
              />
            </Col>
          </Row>
        </div>
        <div className="OverviewBottom">
          <Row>
            <Col span={6}>
              <div className="value">$76 billion</div>
              <div className="describe">24h trading volume on Binance exchange</div>
            </Col>
            <Col span={6}>
              <div className="value">600+</div>
              <div className="describe">Cryptocurrencies listed</div>
            </Col>
            <Col span={6}>
              <div className="value">90 million</div>
              <div className="describe">Registered users who trust Binance</div>
            </Col>
            <Col span={6}>
              <div className="value"> &lt;0.10%</div>
              <div className="describe">Lowest transaction fees</div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Overview;
