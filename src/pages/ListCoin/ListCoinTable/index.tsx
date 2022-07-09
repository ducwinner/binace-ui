import { ChangeEvent, useState } from 'react';
import { Input, Select, Tabs } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import TableListCoin from '../../../components/TableListCoin';
import { dataCoinsFollow } from '../../../Data/CoinFollow';
import { useSelector } from 'react-redux';

const { TabPane } = Tabs;
const { Option } = Select;

interface ListCoinTableInterFace {
  dataCoinMKC: Object[];
}

function ListCoinTable({ dataCoinMKC }: ListCoinTableInterFace) {
  // Redux
  const { backGroudPrimary, textBlurPrimary } = useSelector((state: any) => state.theme.colors);
  const darkMode = useSelector((state: any) => state.theme.darkMode);

  const listCoinFollow = useSelector((state: any) => state.coinFollow);

  // State
  const [reRender, setReRender] = useState(true);
  const [dataSearch, setDateSearch] = useState<any[]>([]);
  const [stateSearch, setStateSearch] = useState<string>('Name');

  // Function State
  const onChange = (key: string) => {
    setReRender(!reRender);
  };

  // Search Coin
  const onSearchChange = (input: ChangeEvent<HTMLInputElement>) => {
    const dataAfterSearch = dataCoinMKC.filter((e: any) =>
      stateSearch === 'Name'
        ? e.name.toUpperCase().includes(input.target.value.toUpperCase())
        : e.symbol.toUpperCase().includes(input.target.value.toUpperCase())
    );
    setDateSearch(dataAfterSearch);
  };

  // Value Select
  const onSelectChange = (event: string) => {
    setStateSearch(event);
  };

  //FortFolio

  const dataFortFolio = listCoinFollow.map(
    (name: string) => dataCoinMKC.filter((e: any) => e.id === name)[0]
  );

  return (
    <div
      style={{
        backgroundColor: backGroudPrimary,
      }}
      className="coverContainerListCoin"
    >
      <div style={{ position: 'relative' }} className="ContainerListCoin">
        <Tabs
          style={{ width: '100%', color: textBlurPrimary, fontWeight: 500, borderBottom: 'red' }}
          size="large"
          defaultActiveKey="2"
          onChange={onChange}
        >
          <TabPane
            forceRender
            tab={
              <span>
                <StarOutlined /> Danh sách yêu thích
              </span>
            }
            key="1"
          >
            <Tabs
              style={{ color: textBlurPrimary, fontWeight: 500 }}
              size="middle"
              defaultActiveKey="1"
            >
              <TabPane tab="Spot" key="1">
                <TableListCoin TableType="fortfolio" dataCoin={dataFortFolio} />
              </TabPane>
              <TabPane tab="Future" key="2">
                Chưa có
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="ALL Cryptos" key="2">
            <Tabs
              style={{ color: textBlurPrimary, fontWeight: 500 }}
              size="middle"
              defaultActiveKey="1"
            >
              <TabPane tab="Tất cả" key="1">
                <TableListCoin
                  TableType="all-coin"
                  dataCoin={dataSearch.length === 0 ? dataCoinMKC : dataSearch}
                />
              </TabPane>
              <TabPane tab="Metaverse" key="2">
                Chưa có
              </TabPane>
              <TabPane tab="Gaming" key="3">
                Chưa có
              </TabPane>{' '}
              <TabPane tab="Defi" key="4">
                Chưa có
              </TabPane>{' '}
              <TabPane tab="NFT" key="5">
                Chưa có
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="New Listing" key="3">
            <Tabs
              style={{ color: textBlurPrimary, fontWeight: 500 }}
              size="middle"
              defaultActiveKey="1"
            >
              <TabPane tab="Tất cả" key="1">
                Tất cả
              </TabPane>
            </Tabs>
          </TabPane>
        </Tabs>
        <Input.Group
          style={{ backgroundColor: backGroudPrimary }}
          size="large"
          compact
          className="inputSearch"
        >
          <Select
            onChange={onSelectChange}
            style={{ width: '100px' }}
            size="large"
            defaultValue="Name"
            className={darkMode ? 'darkMode' : ''}
          >
            <Option value="Name">Name</Option>
            <Option value="Symbol">Symbol</Option>
          </Select>
          <Input
            style={{ backgroundColor: backGroudPrimary }}
            maxLength={8}
            size="large"
            onChange={onSearchChange}
            placeholder={'Tìm kiếm đồng coin'}
          ></Input>
        </Input.Group>
      </div>
    </div>
  );
}

export default ListCoinTable;
