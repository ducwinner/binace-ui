import '../../../styles/Header.less';
import { setDarkTheme, setDefaultTheme } from '../../../Redux/themeSlice';

import { Menu, MenuTheme, Switch } from 'antd';
import {
  SwapOutlined,
  DollarOutlined,
  BankOutlined,
  CreditCardOutlined,
  UserSwitchOutlined,
  ArrowRightOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { v4 as uuidv4 } from 'uuid';
import type { MenuProps } from 'antd';
import { Select } from 'antd';
import { useDispatch } from 'react-redux';
import useWindowSize from '../../../CustomHook/useWindowSize';
const { Option } = Select;

function Header() {
  const [theme, setTheme] = useState<MenuTheme>('light');
  const [current, setCurrent] = useState('mail');
  const sizeWinDow = useWindowSize();

  // if (sizeWinDow < 820) {
  //   setTrigger('click');
  // } else {
  //   setTrigger('hover');
  // }
  console.log(sizeWinDow);

  //Redux theme
  const dispatch = useDispatch();

  const changeTheme = (value: boolean) => {
    if (theme === 'light') {
      dispatch(setDarkTheme());
    } else {
      dispatch(setDefaultTheme());
    }
    setTheme(value ? 'dark' : 'light');
  };

  //
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const Submenus: MenuProps['items'] = [
    {
      label: (
        <Link to="/">
          <img
            style={{ height: '25px', margin: '10px 0' }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Binance_logo.svg/1200px-Binance_logo.svg.png"
            alt="logo"
          />
        </Link>
      ),
      key: uuidv4(),
    },
    {
      label: <Link to="/market">Market</Link>,
      popupClassName: 'headerSubMenu',
      key: uuidv4(),
    },

    // {
    //   label: 'NFT',
    //   popupClassName: 'headerSubMenu',
    //   key: uuidv4(),
    // },
    {
      label: <Link to="/detail/bitcoin">Cryptocurrency Detail</Link>,
      popupClassName: 'headerSubMenu',
      key: uuidv4(),
    },
    {
      label: <Link to="/fortfolio">My FortFolio</Link>,
      popupClassName: 'headerSubMenu',
      key: uuidv4(),
    },
    {
      label: 'Trade',
      popupClassName: 'headerSubMenu',
      key: uuidv4(),
      icon: (
        <SwapOutlined
          style={{ color: 'rgb(252, 213, 53)', fontSize: '1.6rem', transform: 'translateY(1px)' }}
        />
      ),
      children: [
        {
          key: uuidv4(),
          type: 'group',
          children: [
            {
              label: (
                <div className={'headerSubMenuItem'}>
                  <div className="title">
                    Binance Convert &nbsp;
                    <span className="hot">Hot</span>
                  </div>
                  <div className="describe">C??ch ????n gi???n nh???t ????? giao d???ch</div>
                  <ArrowRightOutlined className="icon" />
                </div>
              ),
              icon: <BankOutlined />,
              key: uuidv4(),
            },
            {
              label: (
                <div className={'headerSubMenuItem'}>
                  <div className="title">Binance OTC</div>
                  <div className="describe">OTC liquidity and execution services</div>
                  <ArrowRightOutlined className="icon" />
                </div>
              ),
              icon: <CreditCardOutlined />,
              key: uuidv4(),
            },
            {
              label: (
                <div className={'headerSubMenuItem'}>
                  <div className="title">Spot</div>
                  <div className="describe">Giao d???ch ti???n m?? h??a b???ng c??c c??ng c??? n??ng cao</div>
                  <ArrowRightOutlined className="icon" />
                </div>
              ),
              icon: <BankOutlined />,
              key: uuidv4(),
            },
            {
              label: (
                <div className={'headerSubMenuItem'}>
                  <div className="title">
                    K?? qu??? &nbsp;
                    <span className="hot">Hot</span>
                  </div>
                  <div className="describe">T???i ??a l???i nhu???n b???ng ????n b???y cao</div>
                  <ArrowRightOutlined className="icon" />
                </div>
              ),
              icon: <UserSwitchOutlined />,
              key: uuidv4(),
            },
            {
              label: (
                <div className={'headerSubMenuItem'}>
                  <div className="title">Swap Farming &nbsp; </div>
                  <div className="describe">Swap ????? t??ch lu??? BNB</div>
                  <ArrowRightOutlined className="icon" />
                </div>
              ),
              icon: <UserSwitchOutlined />,
              key: uuidv4(),
            },
            {
              label: (
                <div className={'headerSubMenuItem'}>
                  <div className="title">Chi???n l?????c Giao d???ch &nbsp;</div>
                  <div className="describe">Giao d???ch d??? d??ng, giao d???ch chuy??n nghi???p</div>
                  <ArrowRightOutlined className="icon" />
                </div>
              ),
              icon: <UserSwitchOutlined />,
              key: uuidv4(),
            },
          ],
        },
      ],
    },
    {
      label: <span>Buy Crypto</span>,
      popupClassName: 'headerSubMenu',
      key: uuidv4(),
      icon: (
        <DollarOutlined
          style={{ color: 'rgb(252, 213, 53)', fontSize: '1.6rem', transform: 'translateY(1px)' }}
        />
      ),
      children: [
        {
          key: uuidv4(),
          type: 'group',
          label: (
            <div className={'headerSubMenuItem1'}>
              <div className=""> Pay With</div>
              <Select
                style={{ color: 'rgb(252, 213, 53)' }}
                defaultValue="VND"
                showSearch
                placeholder="Select a Pay"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                <Option value="USD">USD</Option>
                <Option value="EURO">EURO</Option>
                <Option value="VND">VND</Option>
              </Select>
            </div>
          ),
          children: [
            {
              label: (
                <div className={'headerSubMenuItem'}>
                  <div className="title">
                    N???p ti???n qua ng??n h??ng &nbsp;
                    <span className="hot">Hot</span>
                  </div>
                  <div className="describe">N???p EUR qua SEPA ho???c th???</div>
                  <ArrowRightOutlined className="icon" />
                </div>
              ),
              icon: <BankOutlined />,
              key: uuidv4(),
            },
            {
              label: (
                <div className={'headerSubMenuItem'}>
                  <div className="title">Th??? t??n d???ng/Th??? Ghi N???</div>
                  <div className="describe">Mua ti???n m?? ho?? b???ng th???</div>
                  <ArrowRightOutlined className="icon" />
                </div>
              ),
              icon: <CreditCardOutlined />,
              key: uuidv4(),
            },
            {
              label: (
                <div className={'headerSubMenuItem'}>
                  <div className="title">Chuy???n kho???n ng??n h??ng</div>
                  <div className="describe">Mua BUSD qua SEPA</div>
                  <ArrowRightOutlined className="icon" />
                </div>
              ),
              icon: <BankOutlined />,
              key: uuidv4(),
            },
            {
              label: (
                <div className={'headerSubMenuItem'}>
                  <div className="title">
                    Giao d???ch P2P &nbsp;
                    <span className="hot">Hot</span>
                  </div>
                  <div className="describe">Chuy???n kho???n ng??n h??ng v?? 100+ l???a ch???n kh??c</div>
                  <ArrowRightOutlined className="icon" />
                </div>
              ),
              icon: <UserSwitchOutlined />,
              key: uuidv4(),
            },
          ],
        },
      ],
    },
    {
      label: <div style={{ width: '300px' }}></div>,
      popupClassName: 'headerSubMenu',
      disabled: true,
      key: uuidv4(),
    },
    {
      label: <Link to="/login">Log in</Link>,
      popupClassName: 'headerSubMenu',
      key: uuidv4(),
    },
    {
      label: <Link to="/register">Register</Link>,
      popupClassName: 'headerSubMenu',
      key: uuidv4(),
    },
    {
      label: 'Download',
      popupClassName: 'headerSubMenu',
      key: uuidv4(),
    },
    {
      label: (
        <Switch
          style={{ padding: 0 }}
          checked={theme === 'dark'}
          onChange={changeTheme}
          checkedChildren="Light"
          unCheckedChildren="Dark"
        />
      ),
      popupClassName: 'headerSubMenu',
      key: uuidv4(),
    },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <Menu
        style={{ height: '64px', alignItems: 'center' }}
        theme={theme}
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={Submenus}
        className={sizeWinDow.width < 420 ? 'headerMenu responsive' : 'headerMenu'}
        overflowedIndicator={<MenuFoldOutlined style={{ fontSize: '2rem' }} />}
        triggerSubMenuAction={sizeWinDow.width < 820 ? 'click' : 'hover'}
      />
    </div>
  );
}

export default Header;
