import { ChangeEvent, useEffect, useState } from 'react';
import CryptoApi from '../../api/CryptoApi';
import OverviewMarket from './OverviewMarket';
import { Input, Select, Tabs } from 'antd';
import '../../styles/ListCoin/ListCoin.less';
import { StarOutlined } from '@ant-design/icons';
import TableListCoin from '../../components/TableListCoin';
const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;

var HightLightCoin: any[] = [];
var NewCoin: any[] = [];
var HightVolume: any[] = [];
var HightMkc: any[] = [];
function ListCoin() {
  // State
  const [dataCoin, setDataCoin] = useState<any[]>([]);
  const [typeSearch, setTypeSearch] = useState<string>('Name');

  //useEffect
  useEffect(() => {
    const fetchCoin = async () => {
      const params = {
        per_page: 100,
        order: 'market_cap_desc',
      };
      type listCoinType = any[] | any;
      const listCoin: listCoinType = await CryptoApi.getAll(params);
      HightMkc = listCoin.slice(0, 3);
      setDataCoin(listCoin);
    };
    fetchCoin();
  }, []);

  useEffect(() => {
    const fetchCoin = async () => {
      const params = {
        per_page: 100,
        order: 'volume_desc',
      };

      type MyStructure = any[] | any;

      const listCoin: MyStructure = await CryptoApi.getAll(params);
      NewCoin = listCoin.filter(
        (e: any) => e.symbol === 'one' || e.symbol === 'icp' || e.symbol === 'sun'
      );
      HightLightCoin = listCoin.filter(
        (e: any) => e.symbol === 'gmt' || e.symbol === 'vndc' || e.symbol === 'bnb'
      );
      HightVolume = listCoin.slice(0, 3);
    };
    fetchCoin();
  }, []);

  // Function State
  const onChange = (key: string) => {
    console.log(key);
  };

  const onSearchChange = (input: ChangeEvent<HTMLInputElement>) => {
    var DataCoinSearch: any[] = [];
    if (typeSearch === 'Name') {
      DataCoinSearch = dataCoin.map((e: any) => e.name === input);
    } else {
      DataCoinSearch = dataCoin.map((e: any) => e.symbol === input);
    }
    setDataCoin(DataCoinSearch);
  };

  const onSelectChange = (e: string) => {
    setTypeSearch(e);
  };
  return (
    <div
      className="ListCoin"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <OverviewMarket
        HightLightCoin={HightLightCoin}
        CoinHightMkC={HightMkc}
        CoinHightVolume={HightVolume}
        CoinNew={NewCoin}
      />
      <div style={{ position: 'relative' }} className="ContainerListCoin">
        <Tabs style={{ width: '100%' }} size="large" defaultActiveKey="2" onChange={onChange}>
          <TabPane
            tab={
              <span>
                {' '}
                <StarOutlined /> Danh sách yêu thích
              </span>
            }
            key="1"
          >
            Chưa có
          </TabPane>
          <TabPane tab="ALL Cryptos" key="2">
            <Tabs size="middle" defaultActiveKey="1" onChange={onChange}>
              <TabPane tab="Tất cả" key="1">
                <TableListCoin dataCoin={dataCoin} />
              </TabPane>
              <TabPane tab="Metaverse" key="2">
                Niêm yết mới
              </TabPane>
              <TabPane tab="Gaming" key="3">
                Content of Tab Pane 3
              </TabPane>{' '}
              <TabPane tab="Defi" key="4">
                Content of Tab Pane 3
              </TabPane>{' '}
              <TabPane tab="NFT" key="5">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="New Listing" key="3">
            <Tabs size="middle" defaultActiveKey="1" onChange={onChange}>
              <TabPane tab="Tất cả" key="1">
                Tất cả
              </TabPane>
            </Tabs>
          </TabPane>
        </Tabs>
        <Input.Group size="large" compact className="inputSearch">
          <Select
            onChange={onSelectChange}
            style={{ width: '100px' }}
            size="large"
            defaultValue="Name"
          >
            <Option value="Name">Name</Option>
            <Option value="Symbol">Symbol</Option>
          </Select>
          <Search
            size="large"
            onChange={onSearchChange}
            placeholder={'Cryptocurrency' + typeSearch + '?'}
            enterButton="Lọc Ngay"
          />
        </Input.Group>
      </div>
    </div>
  );
}

export default ListCoin;
