import '../../../styles/Header.less';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { v4 as uuidv4 } from 'uuid';
import type { MenuProps } from 'antd';
import { useSelector } from 'react-redux';

function Header() {
  //Redux theme
  const darkMode = useSelector((state: any) => state.theme.darkMode);
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <>
      <Menu
        style={{ display: 'flex', justifyContent: 'center' }}
        theme={darkMode ? 'dark' : 'light'}
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        className={'headerMenu'}
      >
        <Menu.Item key={uuidv4()}>
          <Link to="/">
            <img
              style={{ height: '25px', margin: '10px 0' }}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Binance_logo.svg/1200px-Binance_logo.svg.png"
              alt="logo"
            />
          </Link>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Header;
