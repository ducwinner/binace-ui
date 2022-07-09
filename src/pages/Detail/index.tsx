import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { WarningOutlined } from '@ant-design/icons';
import CryptoApi from '../../api/CryptoApi';
import ButtonLink from '../../components/ButtonLink';
import TablePriceChange from '../../components/TablePriceChange';
import '../../styles/Detail/detail.less';

function CoinDetail() {
  const url = window.location.href;
  const nameCoin = url.split('/').splice(-1, 1)[0];
  const [dataCoin, setDataCoin] = useState<any[]>([]);
  //ReDux
  const { text, backGroudSP, backGroudPrimary, textBlurPrimary, priceUp, priceDown } = useSelector(
    (state: any) => state.theme.colors
  );

  // State
  const [inputPrice, setInputPrice] = useState<number>();

  useEffect(() => {
    const fetchCoin = async () => {
      const params = {
        ids: nameCoin,
      };

      type dataApiType = Object[] | any;
      const dataApi: dataApiType = await CryptoApi.get(params);
      console.log(dataApi);
      setDataCoin(dataApi);
    };
    fetchCoin();
  }, [nameCoin]);

  if (dataCoin.length > 0) {
    var data = dataCoin[0];
    var img = data.image;
    var name = data.name;
    var symbol = data.symbol;
    var priceCurrent = data.current_price;
    var priceHight = data.ath;
    var priceChange1h = data.price_change_percentage_1h_in_currency;
    var priceChange24h = data.price_change_percentage_24h_in_currency;
    var priceChange7d = data.price_change_percentage_7d_in_currency;
    var rank = data.market_cap_rank;
    var mkc = data.market_cap;
    var CirculationSupply = data.circulating_supply;
    var totalVolum = data.total_volume;
  }

  const onCalculateChange = (e: any) => {
    if (e.target.value < 9999999999) setInputPrice(e.target.value);
  };
  return (
    <div style={{ backgroundColor: backGroudPrimary }} className="coin-detail">
      <div className="coin-detail-inner">
        <div style={{ color: text }} className="coin-detail-header">
          <img src={img} alt="img" />
          &nbsp; {name} &nbsp;
          <div style={{ color: textBlurPrimary }}>({symbol?.toUpperCase()})</div>
        </div>
        <div className="coin-detail-body">
          <Row gutter={[56, 0]}>
            <Col span={16} className="coin-detail-left">
              <div style={{ color: text }} className="price-header">
                $ &nbsp; {priceCurrent?.toLocaleString()} &nbsp;
                <span style={{ color: priceChange24h > 0 ? priceUp : priceDown }}>
                  {' '}
                  {priceChange24h?.toFixed(2)} %
                </span>
                <span style={{ color: textBlurPrimary, fontSize: '1.2rem' }} className="time">
                  &nbsp; (1day)
                </span>
              </div>
              <TablePriceChange dataCoin={dataCoin} />
              <div className="price-infomation">
                <div style={{ color: text }} className="price-infomation-title">
                  {symbol?.toUpperCase()} Price Information
                </div>
                <div className="price-infomation-content">
                  <Row>
                    <Col span={6}>
                      <div style={{ color: textBlurPrimary }} className="top">
                        All Time High &nbsp; <WarningOutlined />
                      </div>
                      <div style={{ color: text }} className="bot">
                        $ &nbsp; {priceHight}
                      </div>
                    </Col>
                    <Col span={6}>
                      <div style={{ color: textBlurPrimary }} className="top">
                        Price Change (1h) &nbsp; <WarningOutlined />
                      </div>
                      <div
                        style={{ color: priceChange1h > 0 ? priceUp : priceDown }}
                        className={' bot'}
                      >
                        &nbsp;{priceChange1h?.toFixed(2)}%
                      </div>
                    </Col>
                    <Col span={6}>
                      <div style={{ color: textBlurPrimary }} className="top">
                        Price Change (24h) &nbsp; <WarningOutlined />
                      </div>
                      <div
                        style={{ color: priceChange24h > 0 ? priceUp : priceDown }}
                        className="bot"
                      >
                        &nbsp;{priceChange24h?.toFixed(2)}%
                      </div>
                    </Col>
                    <Col span={6}>
                      <div style={{ color: textBlurPrimary }} className="top">
                        Price Change (7d) &nbsp; <WarningOutlined />
                      </div>
                      <div
                        style={{ color: priceChange7d > 0 ? priceUp : priceDown }}
                        className="bot"
                      >
                        &nbsp;{priceChange7d?.toFixed(2)}%
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="price-infomation">
                <div style={{ color: text }} className="price-infomation-title">
                  {symbol?.toUpperCase()} Market Information
                </div>
                <div className="price-infomation-content">
                  <Row>
                    <Col span={6}>
                      <div style={{ color: textBlurPrimary }} className="top">
                        Popularity &nbsp; <WarningOutlined />
                      </div>
                      <div style={{ color: text }} className="bot">
                        #{rank}
                      </div>
                    </Col>
                    <Col span={6}>
                      <div style={{ color: textBlurPrimary }} className="top">
                        Market Cap &nbsp; <WarningOutlined />
                      </div>
                      <div style={{ color: text }} className={' bot'}>
                        $ &nbsp;{mkc?.toLocaleString()}%
                      </div>
                    </Col>
                    <Col span={6}>
                      <div style={{ color: textBlurPrimary }} className="top">
                        Total Volume &nbsp; <WarningOutlined />
                      </div>
                      <div style={{ color: text }} className="bot">
                        &nbsp;{totalVolum?.toLocaleString()}%
                      </div>
                    </Col>
                    <Col span={6}>
                      <div style={{ color: textBlurPrimary }} className="top">
                        Circulation Supply &nbsp; <WarningOutlined />
                      </div>
                      <div style={{ color: text }} className="bot">
                        &nbsp;{CirculationSupply?.toLocaleString()}%
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col span={8} className="coin-detail-right">
              <div className="buy-crypto">
                <div className="header">{symbol?.toUpperCase()} Price Calculator</div>
                <div style={{ backgroundColor: backGroudSP }} className="calculate">
                  <label htmlFor="calculate">Buy</label>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      height: '40px',
                    }}
                  >
                    <input
                      style={{ backgroundColor: backGroudSP }}
                      type="number"
                      value={inputPrice}
                      id="calculate"
                      onChange={onCalculateChange}
                      placeholder="0.00"
                    ></input>
                    <div
                      style={{
                        color: text,
                      }}
                      className="cover-img-symbol"
                    >
                      <img src={img} alt={symbol} />
                      <span>{symbol?.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                <div style={{ color: textBlurPrimary }} className="calculate-output">
                  <div>Price</div>
                  <div>
                    USD $ &nbsp;
                    {!inputPrice ? '0.00' : (inputPrice * priceCurrent)?.toLocaleString()}
                  </div>
                </div>
                <ButtonLink width="100%" title="Buy BTC" path="/" />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default CoinDetail;
