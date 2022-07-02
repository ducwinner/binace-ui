import '../../../styles/Header.less';
import { Menu, MenuTheme, Switch } from 'antd';
import {
  DollarOutlined,
  BankOutlined,
  CreditCardOutlined,
  UserSwitchOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { v4 as uuidv4 } from 'uuid';
function Header() {
  const [theme, setTheme] = useState<MenuTheme>('dark');

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  console.log(uuidv4());

  return (
    <Menu
      theme={theme}
      className="header"
      style={{ height: '64px', alignItems: 'center' }}
      mode={'horizontal'}
      defaultSelectedKeys={['home']}
    >
      <Menu.Item>
        <Link to="/">
          <img
            style={{ height: '25px', margin: '10px 0' }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Binance_logo.svg/1200px-Binance_logo.svg.png"
            alt="logo"
          />
        </Link>
      </Menu.Item>

      <Menu.SubMenu
        className="headerSubMenu"
        key={uuidv4()}
        title="Mua Crypto"
        icon={
          <DollarOutlined style={{ color: 'rgb(252, 213, 53)', fontSize: '1.6rem', transform: 'translateY(1px)' }} />
        }
      >
        <Menu.Item key={uuidv4()} icon={<BankOutlined />} className={'headerSubMenuItem'}></Menu.Item>
        <Menu.Item key={uuidv4()} icon={<CreditCardOutlined />} className={'headerSubMenuItem'}></Menu.Item>
        <Menu.Item key={uuidv4()} icon={<BankOutlined />} className={'headerSubMenuItem'}></Menu.Item>
        <Menu.Item key={uuidv4()} icon={<UserSwitchOutlined />} className={'headerSubMenuItem'}></Menu.Item>
      </Menu.SubMenu>

      <Menu.Item key={uuidv4()} className="headerSubMenu">
        Thị trường
      </Menu.Item>

      <Menu.SubMenu
        className="headerSubMenu"
        key={uuidv4()}
        title="Giao dịch"
        icon={
          <DollarOutlined style={{ color: 'rgb(252, 213, 53)', fontSize: '1.6rem', transform: 'translateY(1px)' }} />
        }
      >
        <Menu.Item key={uuidv4()} icon={<BankOutlined />} className={'headerSubMenuItem'}>
          <div className="title">
            Binance Convert &nbsp;
            <span className="hot">Hot</span>
          </div>
          <div className="describe">Cách đơn giản nhất để giao dịch</div>
          <ArrowRightOutlined className="icon" />
        </Menu.Item>
        <Menu.Item key={uuidv4()} icon={<CreditCardOutlined />} className={'headerSubMenuItem'}>
          <div>Binance OTC</div>
          <div className="describe">OTC liquidity and execution services</div>
          <ArrowRightOutlined className="icon" />
        </Menu.Item>
        <Menu.Item key={uuidv4()} icon={<BankOutlined />} className={'headerSubMenuItem'}>
          <div>Spot</div>
          <div className="describe">Giao dịch tiền mã hóa bằng các công cụ nâng cao</div>
          <ArrowRightOutlined className="icon" />
        </Menu.Item>
        <Menu.Item key={uuidv4()} icon={<UserSwitchOutlined />} className={'headerSubMenuItem'}>
          <div>
            Ký quỹ &nbsp;
            <span className="hot">Hot</span>
          </div>
          <div className="describe">Tối đa lợi nhuận bằng đòn bẩy cao</div>
          <ArrowRightOutlined className="icon" />
        </Menu.Item>
        <Menu.Item key={uuidv4()} icon={<UserSwitchOutlined />} className={'headerSubMenuItem'}>
          <div>
            Swap Farming &nbsp;
            <span className="hot">Hot</span>
          </div>
          <div className="describe">Swap để tích luỹ BNB</div>
          <ArrowRightOutlined className="icon" />
        </Menu.Item>
        <Menu.Item key={uuidv4()} icon={<UserSwitchOutlined />} className={'headerSubMenuItem'}>
          <div>
            Chiến lược Giao dịch &nbsp;
            <span className="hot">Hot</span>
          </div>
          <div className="describe">Giao dịch dễ dàng, giao dịch chuyên nghiệp</div>
          <ArrowRightOutlined className="icon" />
        </Menu.Item>
      </Menu.SubMenu>

      <Switch checked={theme === 'dark'} onChange={changeTheme} checkedChildren="Dark" unCheckedChildren="Light" />
    </Menu>
  );
}

export default Header;
