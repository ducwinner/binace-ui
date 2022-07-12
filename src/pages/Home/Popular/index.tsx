import { RightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CryptoApi from '../../../api/CryptoApi';
import TableHotCoin from '../../../components/TableHotCoin';
import { fethchLstCoinMKC } from '../../../Redux/CoinApiSlice';

import '../../../styles/Home/Popular.less';

function Popular() {
  // State
  const [listCoin, setListCoin] = useState<Object[]>([]);
  //Redux
  const { text, textBlurPrimary } = useSelector((state: any) => state.theme.colors);
  const litCoinMkc = useSelector((state: any) => state.listCoinApi.lstCoinMkc);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fethchLstCoinMKC());
  }, [dispatch]);

  useEffect(() => {
    const HotCoin = litCoinMkc.filter(
      (e: any) =>
        e.id === 'bitcoin' || e.id === 'binancecoin' || e.id === 'ethereum' || e.id === 'chainlink'
    );
    setListCoin(HotCoin);
  }, [litCoinMkc]);

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
