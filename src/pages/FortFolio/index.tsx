import { Col, Row, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CryptoApi from '../../api/CryptoApi';
import Chart from '../../components/Chart';
import TableCoinFortFolio from '../../components/TableCoinFortFolio';
import '../../styles/Fortfolio/FortFolio.less';

import { DataInterFace } from '../../Redux/fortfolioSlice';

const { TabPane } = Tabs;

export interface lstValueInterFace {
  totalBalance: number;
  totalChange24h: number;
  totalPercentChange24h: number;
  totalFunds: number;
  totalProfitLoss: number;
}

function FortFolio() {
  //Redux
  const { backGroudPrimary, text } = useSelector((state: any) => state.theme.colors);
  const dataUser: DataInterFace[] = useSelector((state: any) => state.fortfolio.data);
  const dispatch: any = useDispatch();
  const [lstCoinUser, setLstCoinUser] = useState<any[]>([]);
  const [lstValue, setLstValue] = useState<lstValueInterFace>({
    totalBalance: 0,
    totalChange24h: 0,
    totalPercentChange24h: 0,
    totalFunds: 0,
    totalProfitLoss: 0,
  });

  console.log('dataUser', dataUser);

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
    <div className="fortfolio">
      <div className="fortfolio-inner">
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="FortFolio" key="1">
            <Tabs defaultActiveKey="1" onChange={onChange}>
              <TabPane tab="My Coins" key="1">
                <div className="fortfolio-overview">
                  <Row>
                    <Col span={12} className="overview-total">
                      <Row style={{ color: text, padding: '50px' }} gutter={[0, 32]}>
                        <Col span={12}>
                          <div className="content">Total Balance</div>
                          <div className="describe">${lstValue.totalBalance?.toFixed(2)}</div>
                        </Col>
                        <Col span={12}>
                          <div className="content">
                            24h Portfolio Change ({lstValue.totalPercentChange24h?.toFixed(2)}%)
                          </div>
                          <div className="describe">{lstValue.totalChange24h?.toFixed(2)}</div>
                        </Col>
                        <Col span={12}>
                          <div className="content">
                            Total Profit Loss (
                            {((lstValue.totalProfitLoss * 100) / lstValue.totalFunds)?.toFixed(2)}%)
                          </div>
                          <div className="describe">{lstValue.totalProfitLoss?.toFixed(2)}</div>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={12} className="overview-chart">
                      <Chart />
                    </Col>
                  </Row>
                </div>
                <TableCoinFortFolio
                  lstValue={lstValue}
                  lstCoinUser={lstCoinUser}
                  dataUser={dataUser}
                />
              </TabPane>
              <TabPane tab="My NFT" key="2">
                Content of Tab Pane 2
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default FortFolio;
