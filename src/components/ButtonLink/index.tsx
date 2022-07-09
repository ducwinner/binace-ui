import { Button } from 'antd';
import { Link } from 'react-router-dom';

interface ButtonLinkInterFace {
  title: string;
  path: string;
  width?: string;
}

function ButtonLink({ title, path, width = '200px' }: ButtonLinkInterFace) {
  return (
    <Button href="" style={{ width: width }} type="primary" shape="round" size="large">
      <Link style={{ color: '#181A20', fontWeight: 500 }} to={path}>
        {title}
      </Link>
    </Button>
  );
}

export default ButtonLink;
