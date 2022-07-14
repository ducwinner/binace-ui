import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { WarningOutlined } from '@ant-design/icons';
import ButtonLink from '../../components/ButtonLink';
import TablePriceChange from '../../components/TablePriceChange';
import '../../styles/Detail/detail.less';
import warningGIF from '../../assets/GIF/warning.gif';
import NavigationCoin from '../../components/NavigationCoin';
import ConvertPrice from '../../GlobalFunction/ConvertPrice';
import { useDispatch } from 'react-redux';
import { fethchCoinID, fethchLstCoinMKC } from '../../Redux/CoinApiSlice';

// import TradeViewChart from 'react-crypto-chart';

var img: string;
var name: string;
var symbol: string;
var priceCurrent: any;
var ath: any;
var priceChange1h: any;
var priceChange24h: any;
var priceChange7d: any;
var priceChange30d: any;
var rank: any;
var mkc: any;
var CirculationSupply: any;
var totalVolum: any;

var listTrending: Object[];
var listTopGainers: Object[];
var listTopLosers: Object[];
var ListNewAdd: Object[];

function CoinDetail() {
  const url = window.location.href;
  const nameCoin: string = url.split('/').splice(-1, 1)[0];
  const [inputPrice, setInputPrice] = useState<number>();
  //ReDux theme
  const {
    text,
    backGroudSP,
    textBlurTitle,
    backGroudPrimary,
    textBlurPrimary,
    priceUp,
    priceDown,
    textPrimary,
  } = useSelector((state: any) => state.theme.colors);
  const coinDetail = useSelector((state: any) => state.listCoinApi.detailCoin);
  const lstCoinMkc = useSelector((state: any) => state.listCoinApi.lstCoinMkc);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fethchCoinID(nameCoin));
    dispatch(fethchLstCoinMKC());
  }, [nameCoin, dispatch]);

  // filter main coin
  if (coinDetail.length > 0) {
    var currentCoin = coinDetail[0];
    img = currentCoin.image;
    name = currentCoin.name;
    symbol = currentCoin.symbol?.toUpperCase();
    priceCurrent = currentCoin.current_price?.toLocaleString();
    priceChange1h = currentCoin.price_change_percentage_1h_in_currency.toFixed(2);
    priceChange24h = currentCoin.price_change_percentage_24h_in_currency.toFixed(2);
    priceChange7d = currentCoin.price_change_percentage_7d_in_currency.toFixed(2);
    priceChange30d = currentCoin.price_change_percentage_30d_in_currency.toFixed(2);

    ath = currentCoin.ath.toLocaleString();
    rank = ConvertPrice(currentCoin.market_cap_rank);
    mkc = ConvertPrice(currentCoin.market_cap);
    CirculationSupply = ConvertPrice(currentCoin.circulating_supply);
    totalVolum = ConvertPrice(currentCoin.total_volume);
  }

  // filter Top list coin
  const arrTrending = ['bitcoin', 'ethereum', 'solana', 'shiba-inu', 'polygon', 'frax', 'tezos'];
  listTrending = lstCoinMkc.filter((e: any) => arrTrending.indexOf(e.id) !== -1);
  listTopGainers = lstCoinMkc
    .filter((e: any) => e.price_change_percentage_24h_in_currency > 6)
    .slice(0, 3);
  listTopLosers = lstCoinMkc
    .filter((e: any) => e.price_change_percentage_24h_in_currency < -5)
    .slice(-3);
  ListNewAdd = lstCoinMkc.slice(-4);

  const onCalculateChange = (e: any) => {
    if (e.target.value < 9999999999) setInputPrice(e.target.value);
  };
  console.log('ssss');
  return (
    <div style={{ backgroundColor: backGroudPrimary }} className="coin-detail">
      <div className="coin-detail-inner">
        <div style={{ color: text }} className="coin-detail-header">
          <img src={img} alt="img" />
          &nbsp; {name} &nbsp;
          <div style={{ color: textBlurPrimary }}>({symbol})</div>
        </div>
        <div className="coin-detail-body">
          <Row gutter={[56, 0]}>
            <Col span={14} className="coin-detail-left">
              <div style={{ color: text }} className="price-header">
                $ &nbsp; {priceCurrent} &nbsp;
                <span style={{ color: priceChange24h > 0 ? priceUp : priceDown }}>
                  {priceChange24h} %
                </span>
                <span style={{ color: textBlurPrimary, fontSize: '1.2rem' }} className="time">
                  &nbsp; (1day)
                </span>
              </div>
              {/* <TradeViewChart
                pair="BTCBUSD"
                interval="0"
                containerStyle={{
                  minHeight: '100vh',
                  marginBottom: '30px',
                  maxWidth: '100%',
                }}
                chartLayout={{
                  layout: {
                    backgroundColor: 'white',
                    textColor: '#ccc',
                  },
                  priceScale: {
                    borderColor: '#485c7b',
                  },
                  timeScale: {
                    borderColor: '#485c7b',
                    timeVisible: true,
                    secondsVisible: false,
                  },
                }}
                candleStickConfig={{
                  upColor: 'green',
                  downColor: 'red',
                  borderDownColor: 'transparent',
                  borderUpColor: 'transparent',
                  wickDownColor: 'gray',
                  wickUpColor: 'gray',
                }}
                histogramConfig={{
                  base: 0,
                  lineWidth: 2,
                  priceFormat: {
                    type: 'volume',
                  },
                  overlay: true,
                  scaleMargins: {
                    top: 0.8,
                    bottom: 0,
                  },
                }}
              /> */}
              <TablePriceChange
                day1={priceChange24h}
                day7={priceChange7d}
                day30={priceChange30d}
                ath={ath}
                price={priceCurrent}
              />
              <div className="price-live-data">
                <div style={{ color: text }}>{symbol} Price Live Data</div>
                <div style={{ color: textBlurTitle }} className="descrine">
                  The live price of {symbol} is $ {priceCurrent} per ({symbol} / USD) today with a
                  current market cap of $ {mkc}. 24-hour trading volume is $ {totalVolum} USD.{' '}
                  {symbol} to USD price is updated in real-time. {symbol} is {priceChange24h} in the
                  last 24 hours. It has a circulating supply of $ {CirculationSupply} USD.
                </div>
              </div>
              <div className="price-infomation">
                <div style={{ color: text }} className="price-infomation-title">
                  {symbol} Price Information
                </div>
                <div className="price-infomation-content">
                  <Row>
                    <Col span={6}>
                      <div style={{ color: textBlurPrimary }} className="top">
                        All Time High &nbsp; <WarningOutlined />
                      </div>
                      <div style={{ color: text }} className="bot">
                        $ &nbsp; {ath}
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
                        &nbsp;{priceChange1h}%
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
                        &nbsp;{priceChange24h}%
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
                        &nbsp;{priceChange7d}%
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="price-infomation">
                <div style={{ color: text }} className="price-infomation-title">
                  {symbol} Market Information
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
                        $ &nbsp;{mkc}
                      </div>
                    </Col>
                    <Col span={6}>
                      <div style={{ color: textBlurPrimary }} className="top">
                        $ &nbsp; Total Volume &nbsp; <WarningOutlined />
                      </div>
                      <div style={{ color: text }} className="bot">
                        &nbsp;{totalVolum}
                      </div>
                    </Col>
                    <Col span={6}>
                      <div style={{ color: textBlurPrimary }} className="top">
                        Circulation Supply &nbsp; <WarningOutlined />
                      </div>
                      <div style={{ color: text }} className="bot">
                        $ &nbsp;{CirculationSupply}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col span={10} className="coin-detail-right">
              <div className="buy-crypto">
                <div style={{ color: textBlurTitle }} className="header">
                  {symbol} Price Calculator
                </div>
                <div style={{ backgroundColor: backGroudSP }} className="calculate">
                  <label style={{ color: textBlurPrimary }} htmlFor="calculate">
                    Buy
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      height: '40px',
                    }}
                  >
                    <input
                      style={{ backgroundColor: backGroudSP, color: textPrimary }}
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
                      <span>{symbol}</span>
                    </div>
                  </div>
                </div>

                <div style={{ color: textBlurPrimary }} className="calculate-output">
                  <div>Price</div>
                  <div>
                    USD $ &nbsp;
                    {!inputPrice ? '0.00' : (inputPrice * priceCurrent)?.toFixed(2)}
                  </div>
                </div>
                <ButtonLink width="100%" title="Buy BTC" path="/" />
              </div>

              <div style={{ backgroundColor: backGroudSP }} className="detail-transaction-fee">
                <img src={warningGIF} alt="img" />
                <div style={{ color: textBlurPrimary }} className="title">
                  Binance has the lowest transaction fee rate amongst all major trading platforms.
                </div>
                <div className="progess">
                  <div style={{ color: text }} className="exchanges">
                    Coin Base
                  </div>
                  <div className="progess-percent">
                    <div style={{ backgroundColor: '#F6465D', width: '90%' }}>1.4%</div>
                  </div>
                </div>{' '}
                <div className="progess">
                  <div style={{ color: text }} className="exchanges">
                    Kraken
                  </div>
                  <div className="progess-percent">
                    <div style={{ backgroundColor: '#F6465D', width: '50%' }}>0.26%</div>
                  </div>
                </div>{' '}
                <div className="progess">
                  <div style={{ color: text }} className="exchanges">
                    Binance
                  </div>
                  <div className="progess-percent">
                    <div style={{ backgroundColor: '#0ECB81', width: '15%' }}>0.3%</div>
                  </div>
                </div>
              </div>

              <NavigationCoin dataCoin={listTrending} title="Trending cryptos" />
              <NavigationCoin dataCoin={listTopGainers} title="Top 3 Gainers" />
              <NavigationCoin dataCoin={listTopLosers} title="Top 3 Losers" />
              <NavigationCoin dataCoin={ListNewAdd} title="Newly Added Cryptos" />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default CoinDetail;
