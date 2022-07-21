import { Col, Row, Tabs } from 'antd';
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

import { DataInterFace } from '../../Redux/fortfolioSlice';

const { TabPane } = Tabs;

export interface lstValueInterFace {
  totalBalance: number;
  totalChange24h: number;
  totalPercentChange24h: number;
  totalFunds: number;
  totalProfitLoss: number;
}

export interface DataPieChartInterFace {
  id: string;
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

  useEffect(() => {
    var lstCoinId: string[] = [];
    dataUser.forEach((e: any) => lstCoinId.push(e.idcoin));
    var ids = lstCoinId.toString();
    const fetchCoin = async () => {
      const params = {
        ids: ids,
      };
      var lstCoin: Object[] | any = await CryptoApi.getAll(params);
      setLstCoinUser(lstCoin);
    };
    fetchCoin();
  }, [dataUser, dispatch]);

  // Convert dataCoin to use PieChart
  useEffect(() => {
    interface DataPieInterface {
      name: string;
      value: number;
    }

    const dataPieChart: DataPieInterface[] = dataUser.map((e) => ({
      name: e.idcoin?.toUpperCase(),
      value: e.quantity * e.priceInput,
    }));
    //sort Array

    function compare(a: DataPieInterface, b: DataPieInterface) {
      // Sử dụng toUpperCase() để chuyển các kí tự về cùng viết hoa
      var typeA = a.value;
      var typeB = b.value;

      let comparison = 0;
      if (typeA < typeB) {
        comparison = 1;
      } else if (typeA > typeB) {
        comparison = -1;
      }
      return comparison;
    }
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
        console.log(totalOrther);
        result.push({ name: 'ORTHER', value: totalOrther });
      }
    }
    setDataPieChart(result);
  }, [dataUser]);

  useEffect(() => {
    if (lstCoinUser.length > 0) {
      // total Balance
      const totalBalance = dataUser.reduce((total: number, coin: any) => {
        var price: number = lstCoinUser.filter((e: any) => e.id === coin.idcoin)[0].current_price;
        return total + coin.quantity * price;
      }, 0);
      // total Value Change 24h
      const totalChange24h = dataUser.reduce((total: number, coin: any) => {
        var price: number = lstCoinUser.filter((e: any) => e.id === coin.idcoin)[0]
          .price_change_24h;
        return total + coin.quantity * price;
      }, 0);

      const totalPercentChange24h = (totalChange24h / totalBalance) * 100;
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
                            {((lstValue.totalProfitLoss * 100) / lstValue.totalFunds)?.toFixed(2)}%)
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
