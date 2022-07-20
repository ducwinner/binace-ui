import { Col, Row } from 'antd';
import { Input } from 'antd';
import { useSelector } from 'react-redux';
import '../../../styles/OverviewHome.less';

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

function Overview() {
  const { text } = useSelector((state: any) => state.theme.colors);
  const darkMode = useSelector((state: any) => state.theme.darkMode);
  return (
    <div style={{ width: '1200px', maxWidth: '100%' }}>
      <div style={{ color: text }} className="OverviewInner">
        <div className="OverviewTop">
          <Row>
            <Col md={12}>
              <div style={{ width: '80%' }}>
                <div className="content">Buy, trade, and hold 600+ cryptocurrencies on Binance</div>
                <div className="search">
                  <Search
                    className={darkMode ? 'darkMode ' : ''}
                    placeholder="Email/phone"
                    allowClear
                    enterButton="Get Start"
                    size="large"
                    onSearch={onSearch}
                  />
                </div>
              </div>
            </Col>
            <Col md={12} style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
              <img
                style={{ width: '80%', minWidth: '360px', maxWidth: '480px' }}
                src="https://public.bnbstatic.com/image/cms/content/body/202202/749d00d2b5be8010d079ba039b619ca4.png"
                alt="img"
              />
            </Col>
          </Row>
        </div>
        <div className="OverviewBottom">
          <Row>
            <Col sm={12} lg={6}>
              <div className="value">$76 billion</div>
              <div className="describe">24h trading volume on Binance exchange</div>
            </Col>
            <Col sm={12} lg={6}>
              <div className="value">600+</div>
              <div className="describe">Cryptocurrencies listed</div>
            </Col>
            <Col sm={12} lg={6}>
              <div className="value">90 million</div>
              <div className="describe">Registered users who trust Binance</div>
            </Col>
            <Col sm={12} lg={6}>
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
