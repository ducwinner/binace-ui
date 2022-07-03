import { Col, Row } from 'antd';
import { Input } from 'antd';

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

function Overview() {
  return (
    <div>
      <div style={{ margin: '0 42px', padding: '80px 24px 0 24px' }} className="OverviewInner">
        <div className="OverviewTop">
          <Row>
            <Col span={6}>
              <div className="Content">Buy, trade, and hold 600+ cryptocurrencies on Binance</div>
              <div className="Search">
                <Search
                  placeholder="input search text"
                  allowClear
                  enterButton="Search"
                  size="large"
                  onSearch={onSearch}
                />
              </div>
            </Col>
            <Col span={6}></Col>
          </Row>
        </div>
        <div className="OverviewBottom"></div>
      </div>
    </div>
  );
}

export default Overview;
