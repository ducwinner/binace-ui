import '../../../styles/Header.less';
import { Menu, MenuTheme, Switch } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { v4 as uuidv4 } from 'uuid';
import type { MenuProps } from 'antd';

function Header() {
  const [theme, setTheme] = useState<MenuTheme>('dark');
  const [current, setCurrent] = useState('mail');
  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <>
      <Menu
        style={{ display: 'flex', justifyContent: 'space-between' }}
        theme={theme}
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
        <Menu.Item>
          <Switch checked={theme === 'dark'} onChange={changeTheme} checkedChildren="Dark" unCheckedChildren="Light" />
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Header;
