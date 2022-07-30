import { Button, Col, Modal, Row, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CryptoApi from '../../api/CryptoApi';
import Chart from '../../components/Chart';
import TableCoinFortFolio from '../../components/TableCoinFortFolio';
import '../../styles/Fortfolio/FortFolio.less';
import suitcaseImng from '../../assets/img/suitcase.png';
import lighHeartGIF from '../../assets/GIF/heart-light.gif';
import darkHeartGIF from '../../assets/GIF/heart-dark.gif';
import { CloseCircleOutlined } from '@ant-design/icons';
import { FaRegGrinBeamSweat, FaHandPointRight } from 'react-icons/fa';

import { addNewCoin, DataInterFace, getFortfolio } from '../../Redux/fortfolioSlice';
import { fethchLstCoinMKC } from '../../Redux/CoinApiSlice';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const { TabPane } = Tabs;

export interface lstValueInterFace {
  totalBalance: number;
  totalChange24h: number;
  totalPercentChange24h: number;
  totalFunds: number;
  totalProfitLoss: number;
}

export interface DataPieChartInterFace {
  name: string;
  value: number;
}

function FortFolio() {
  //Redux
  const { backGroudPrimary, text, textBlurPrimary } = useSelector(
    (state: any) => state.theme.colors
  );

  const darkMode = useSelector((state: any) => state.theme.darkMode);
  const dataUser: DataInterFace[] = useSelector((state: any) => state.fortfolio.data);
  const dispatch: any = useDispatch();
  const [dataPieChart, setDataPieChart] = useState<DataPieChartInterFace[]>([]);
  const [lstCoinUser, setLstCoinUser] = useState<any[]>([]);
  const [lstValue, setLstValue] = useState<lstValueInterFace>({
    totalBalance: 0,
    totalChange24h: 0,
    totalPercentChange24h: 0,
    totalFunds: 0,
    totalProfitLoss: 0,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalLogin, setIsModalLogin] = useState(false);
  const [search, setSearch] = useState('');
  const lstCoinMkc = useSelector((state: any) => state.listCoinApi.lstCoinMkc);
  const [lstCoinSearch, setLstCoinSearch] = useState<any[]>([]);
  const [isAddCoin, setIsAddCoin] = useState<boolean>(false);

  useEffect(() => {
    const fetchCoin = async () => {
      await dispatch(fethchLstCoinMKC());
    };
    fetchCoin();
  }, [dispatch]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      dispatch(getFortfolio({ userId: userId }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (dataUser.length > 0) {
      var lstCoinId: string[] = [];
      dataUser.forEach((e: any) => lstCoinId.push(e.coinId));
      var ids = lstCoinId.toString();
      const fetchCoin = async () => {
        const params = {
          ids: ids,
        };
        var lstCoin: Object[] | any = await CryptoApi.getAll(params);
        setLstCoinUser(lstCoin);
      };
      fetchCoin();
    }
  }, [dataUser, dispatch]);

  // Convert dataCoin to use PieChart
  useEffect(() => {
    if (dataUser.length > 0) {
      interface DataPieInterface {
        name: string;
        value: number;
      }

      const dataPieChart: DataPieInterface[] = dataUser.map((e) => ({
        name: e.coinId?.toUpperCase(),
        value: e.quantity * e.priceInput,
      }));
      //sort Array

      const compare = (a: DataPieInterface, b: DataPieInterface) => {
        var typeA = a.value;
        var typeB = b.value;

        let comparison = 0;
        if (typeA < typeB) {
          comparison = 1;
        } else if (typeA > typeB) {
          comparison = -1;
        }
        return comparison;
      };
      dataPieChart.sort(compare);
      //-------------------------------
      var result: any[] = [];
      for (var i = 0; i < 4; i++) {
        if (i < 3) {
          result.push(dataPieChart[i]);
        } else {
          const totalOrther = dataPieChart.reduce((total: number, item: any, index) => {
            let valueOrther = 0;
            if (index >= 3) {
              valueOrther = item.value;
            }
            return total + valueOrther;
          }, 0);
          result.push({ name: 'ORTHER', value: totalOrther });
        }
      }
      setDataPieChart(result);
    }
  }, [dataUser]);

  useEffect(() => {
    if (lstCoinUser.length > 0) {
      // total Balance
      const totalBalance = dataUser.reduce((total: number, coin: any) => {
        var price: number = lstCoinUser.filter((e: any) => e.id === coin.coinId)[0].current_price;
        return total + coin.quantity * price;
      }, 0);
      // total Value Change 24h
      const totalChange24h = dataUser.reduce((total: number, coin: any) => {
        var price: number = lstCoinUser.filter((e: any) => e.id === coin.coinId)[0]
          .price_change_24h;
        return total + coin.quantity * price;
      }, 0);

      var totalPercentChange24h;
      if (totalBalance !== 0) {
        totalPercentChange24h = (totalChange24h / totalBalance) * 100;
      } else {
        totalPercentChange24h = 0;
      }
      // total Funds
      const totalFunds = dataUser.reduce((total: number, coin: any) => {
        var value: number = coin.quantity * coin.priceInput;
        return total + value;
      }, 0);

      //Total Profit Loss
      const totalProfitLoss = totalBalance - totalFunds;

      setLstValue({
        totalBalance,
        totalChange24h,
        totalPercentChange24h,
        totalFunds,
        totalProfitLoss,
      });
    }
  }, [dataUser, lstCoinUser]);

  const showAddModal = () => {
    const filter: any[] = [];
    lstCoinMkc.forEach((e: any, index: number) => {
      if (index < 8) filter.push(e);
    });
    setLstCoinSearch(filter);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (isAddCoin) {
      window.location.reload();
    } else {
      setIsModalVisible(false);
    }
  };

  const handleCancelAdd = () => {
    setIsModalVisible(false);
  };

  const handleCancelLogin = () => {
    setIsModalLogin(false);
  };

  const hanldeSearch = (e: any) => {
    setSearch(e.target.value);
    var filterCoinName = lstCoinMkc.filter((coin: any) =>
      coin.name.toUpperCase().includes(e.target.value.toUpperCase())
    );

    const filter: any[] = [];

    filterCoinName.forEach((e: any, index: number) => {
      if (index < 8) filter.push(e);
    });

    setLstCoinSearch(filter);
  };

  const handleAddCoin = async (coinId: any) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const isExistCoin = dataUser.filter((e: any) => e.coinId === coinId);
      if (isExistCoin.length > 0) {
        notify('This coin is exist!');
      } else {
        await dispatch(addNewCoin({ userId: userId, coinId: coinId }));
        notify('Success!');
        setIsAddCoin(true);
      }
    } else {
      setIsModalLogin(true);
    }
  };

  const notify = (title: string) => toast(title);

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div className="fortfolio" style={{ backgroundColor: backGroudPrimary }}>
      <div className="fortfolio-inner">
        <Tabs
          style={{ color: textBlurPrimary, fontWeight: 500 }}
          defaultActiveKey="1"
          onChange={onChange}
        >
          <TabPane
            tab={
              <div style={{ fontSize: '1.8rem' }}>
                <span>
                  <img
                    style={{ width: '25px', transform: 'translateY(-2px)' }}
                    src={suitcaseImng}
                    alt="img"
                  />
                </span>
                &nbsp; Fortfolio
              </div>
            }
            key="1"
          >
            <Tabs
              style={{ color: textBlurPrimary, fontWeight: 500 }}
              defaultActiveKey="1"
              onChange={onChange}
            >
              <TabPane
                tab={
                  <div>
                    <span>
                      <img
                        style={{ width: '25px', transform: 'translateY(-2px)' }}
                        src={darkMode ? darkHeartGIF : lighHeartGIF}
                        alt="img"
                      />
                    </span>
                    &nbsp; My coin
                  </div>
                }
                key="1"
              >
                <div className="fortfolio-overview">
                  <Row>
                    <Col
                      md={8}
                      lg={10}
                      xl={12}
                      style={{ paddingTop: '30px' }}
                      className="overview-total"
                    >
                      <Row gutter={[0, 32]}>
                        <Col xs={12} sm={12} md={24} lg={12}>
                          <div style={{ color: textBlurPrimary }} className="content">
                            Total Balance
                          </div>
                          <div style={{ color: text }} className="describe">
                            ${lstValue.totalBalance?.toFixed(2)}
                          </div>
                        </Col>
                        <Col xs={12} sm={12} md={24} lg={12}>
                          <div style={{ color: textBlurPrimary }} className="content">
                            24h Portfolio Change ({lstValue.totalPercentChange24h?.toFixed(2)}%)
                          </div>
                          <div style={{ color: text }} className="describe">
                            ${lstValue.totalChange24h?.toFixed(2)}
                          </div>
                        </Col>
                        <Col xs={12} sm={12} md={24} lg={12}>
                          <div style={{ color: textBlurPrimary }} className="content">
                            Total Profit Loss (
                            {lstValue.totalFunds !== 0
                              ? ((lstValue.totalProfitLoss * 100) / lstValue.totalFunds)?.toFixed(2)
                              : 0}
                            %)
                          </div>
                          <div style={{ color: text }} className="describe">
                            ${lstValue.totalProfitLoss?.toFixed(2)}
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={16} lg={14} xl={12} className="overview-chart">
                      <Chart data={dataPieChart} />
                    </Col>
                  </Row>
                </div>
                <div className="tool-action">
                  <Modal
                    title={
                      <div className="modal-title">
                        <FaRegGrinBeamSweat style={{ fontSize: '4rem', color: '#C99400' }} />
                      </div>
                    }
                    className={darkMode ? 'darkMode modal-login' : 'modal-login'}
                    visible={isModalLogin}
                    closable
                    onCancel={handleCancelLogin}
                    maskClosable={false}
                    closeIcon={<CloseCircleOutlined style={{ color: text }} />}
                  >
                    <div className="modal-body">
                      <p style={{ fontSize: '1.8rem', color: text }}>
                        You need to login to use this function!
                      </p>
                      <div>
                        <FaHandPointRight
                          style={{ fontSize: '1.8rem', color: text, transform: 'translateY(2px)' }}
                        />
                        &nbsp; &nbsp;
                        <span style={{ fontSize: '2rem', color: '#C99400', fontWeight: 500 }}>
                          <Link to="/login">Log In</Link>
                        </span>
                      </div>
                    </div>
                  </Modal>
                  <Modal
                    title="Search Coin For My Fortfolio"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancelAdd}
                    className={darkMode ? 'darkMode addCoin-modal' : 'addCoin-modal'}
                    closeIcon={<CloseCircleOutlined style={{ color: text }} />}
                  >
                    <input
                      className={'input-search'}
                      type="text"
                      placeholder="Coin Name?"
                      value={search}
                      onChange={(e) => hanldeSearch(e)}
                    />
                    <ul className={'list-coin-search'}>
                      {lstCoinSearch?.map((coin) => {
                        return (
                          <li
                            key={coin.id}
                            className={'coin-item'}
                            style={{ backgroundColor: backGroudPrimary, color: text }}
                            onClick={() => handleAddCoin(coin.id)}
                          >
                            <img src={coin.image} alt="img"></img>
                            &nbsp;&nbsp;&nbsp;
                            <div>
                              {coin.name} &nbsp; ( {coin.symbol?.toUpperCase()} )
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    <ToastContainer />
                  </Modal>
                  <div onClick={showAddModal} className={'addCoin-button'}>
                    <Button size="large" type="primary">
                      Add New Coin
                    </Button>
                  </div>
                </div>
                <TableCoinFortFolio lstValue={lstValue} lstCoinUser={lstCoinUser} />
              </TabPane>
              <TabPane tab="My NFT" key="2">
                Content of Tab Pane 2
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab={<div style={{ fontSize: '1.6rem' }}></div>} key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab={<div style={{ fontSize: '1.6rem' }}></div>} key="2">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default FortFolio;
