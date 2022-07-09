import { RightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CryptoApi from '../../../api/CryptoApi';
import TableHotCoin from '../../../components/TableHotCoin';

import '../../../styles/Home/Popular.less';

function Popular() {
  //Redux Theme
  const { text, textBlurPrimary } = useSelector((state: any) => state.theme.colors);

  // State
  const [listCoin, setListCoin] = useState<Object[]>([]);
  useEffect(() => {
    const fetchCoin = async () => {
      const params = {
        per_page: 100,
        order: 'market_cap_desc',
      };
      type listCoinType = Object[] | any;

      const listCoin: listCoinType = await CryptoApi.getAll(params);
      const HotCoin = listCoin.filter(
        (e: any) =>
          e.id === 'bitcoin' ||
          e.id === 'binancecoin' ||
          e.id === 'ethereum' ||
          e.id === 'chainlink'
      );
      setListCoin(HotCoin);
    };

    fetchCoin();
  }, []);

  return (
    <div>
      <div className="PopularList" style={{ width: '100%' }}>
        <div className="popularHeader">
          <div className="content" style={{ color: text }}>
            Popular cryptocurrencies
          </div>
          <div className="viewMore" style={{ color: textBlurPrimary }}>
            View more markets <RightOutlined />
          </div>
        </div>
        <div className="popularListCoin">
          <TableHotCoin dataCoin={listCoin} />
        </div>
      </div>
    </div>
  );
}

export default Popular;
