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
  LogoutOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { v4 as uuidv4 } from 'uuid';
import type { MenuProps } from 'antd';
import { Select } from 'antd';
import { useDispatch } from 'react-redux';
import useWindowSize from '../../../CustomHook/useWindowSize';
import { useSelector } from 'react-redux';
import { EncryptionEmail } from '../../../GlobalFunction/EncryptionEmail';
import { getMe, logout } from '../../../Redux/authSlice';
const { Option } = Select;

function Header() {
  const user = useSelector((state: any) => state.user.authUser);

  const [theme, setTheme] = useState<MenuTheme>('light');
  const { text } = useSelector((state: any) => state.theme.colors);
  const [current, setCurrent] = useState('mail');
  const sizeWinDow = useWindowSize();

  //Redux theme
  const dispatch: any = useDispatch();

  console.log('user', user);

  useEffect(() => {
    if (localStorage.getItem('token')) dispatch(getMe({ userId: 1 }));
  }, []);

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

  const handleLogOutClick = () => {
    dispatch(logout());
    window.location.reload();
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
                  <div className="describe">Cách đơn giản nhất để giao dịch</div>
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
                  <div className="describe">Giao dịch tiền mã hóa bằng các công cụ nâng cao</div>
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
                    Ký quỹ &nbsp;
                    <span className="hot">Hot</span>
                  </div>
                  <div className="describe">Tối đa lợi nhuận bằng đòn bẩy cao</div>
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
                  <div className="describe">Swap để tích luỹ BNB</div>
                  <ArrowRightOutlined className="icon" />
                </div>
              ),
              icon: <UserSwitchOutlined />,
              key: uuidv4(),
            },
            {
              label: (
                <div className={'headerSubMenuItem'}>
                  <div className="title">Chiến lược Giao dịch &nbsp;</div>
                  <div className="describe">Giao dịch dễ dàng, giao dịch chuyên nghiệp</div>
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
                    Nạp tiền qua ngân hàng &nbsp;
                    <span className="hot">Hot</span>
                  </div>
                  <div className="describe">Nạp EUR qua SEPA hoặc thẻ</div>
                  <ArrowRightOutlined className="icon" />
                </div>
              ),
              icon: <BankOutlined />,
              key: uuidv4(),
            },
            {
              label: (
                <div className={'headerSubMenuItem'}>
                  <div className="title">Thẻ tín dụng/Thẻ Ghi Nợ</div>
                  <div className="describe">Mua tiền mã hoá bằng thẻ</div>
                  <ArrowRightOutlined className="icon" />
                </div>
              ),
              icon: <CreditCardOutlined />,
              key: uuidv4(),
            },
            {
              label: (
                <div className={'headerSubMenuItem'}>
                  <div className="title">Chuyển khoản ngân hàng</div>
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
                    Giao dịch P2P &nbsp;
                    <span className="hot">Hot</span>
                  </div>
                  <div className="describe">Chuyển khoản ngân hàng và 100+ lựa chọn khác</div>
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
      label: user ? (
        <div className="header-user">
          <img
            src={user.image ? user.image : 'https://img.icons8.com/plasticine/100/000000/user.png'}
            alt="1"
          />
        </div>
      ) : (
        <Link to="/login">Log in</Link>
      ),
      popupClassName: 'headerSubMenu',
      key: uuidv4(),
      children: [
        user
          ? {
              label: (
                <div style={{ fontSize: '1.6rem', fontWeight: 600, color: text }}>
                  {EncryptionEmail(user.email)}
                </div>
              ),
              key: uuidv4(),
              type: 'group',
              children: [
                {
                  label: <div onClick={handleLogOutClick}>Log out</div>,
                  key: uuidv4(),
                  icon: <LogoutOutlined />,
                },
              ],
            }
          : null,
      ],
    },
    {
      label: user ? <BellOutlined className="bell-icon" /> : <Link to="/register">Register</Link>,
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
