import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../styles/component/ButtonLink.less';

interface ButtonLinkInterFace {
  title: string;
  path: string;
  width?: string;
}

function ButtonLink({ title, path, width = '200px' }: ButtonLinkInterFace) {
  const darkMode = useSelector((state: any) => state.theme.darkMode);
  return (
    <Button
      className={darkMode ? 'darkMode' : ''}
      href=""
      style={{ width: width }}
      type="primary"
      shape="round"
      size="large"
    >
      <Link style={{ color: '#181A20', fontWeight: 500 }} to={path}>
        {title}
      </Link>
    </Button>
  );
}

export default ButtonLink;
