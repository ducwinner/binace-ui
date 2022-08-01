import OverviewMarket from './OverviewMarket';
import '../../styles/ListCoin/ListCoin.less';
import { useEffect } from 'react';
import ListCoinTable from './ListCoinTable';
import { useDispatch, useSelector } from 'react-redux';
import { fethchLstCoinMKC, fethchLstCoinVolume } from '../../Redux/CoinApiSlice';

var HightLightCoin: Object[] = [];
var NewCoin: Object[] = [];
var HightVolume: Object[] = [];
var HightMkc: Object[] = [];
function ListCoin() {
  //Redux
  const { backGroudPrimary } = useSelector((state: any) => state.theme.colors);
  const lstCoinMkc = useSelector((state: any) => state.listCoinApi.lstCoinMkc);
  const lstCoinVolume = useSelector((state: any) => state.listCoinApi.lstCoinVolume);
  const dispatch = useDispatch<any>();

  // State

  //useEffect
  useEffect(() => {
    dispatch(fethchLstCoinMKC());
    dispatch(fethchLstCoinVolume());
  }, [dispatch]);

  // filter DataCoin for OverVIewMarket
  HightMkc = lstCoinMkc.slice(0, 3);
  NewCoin = lstCoinVolume.filter(
    (e: any) => e.symbol === 'one' || e.symbol === 'icp' || e.symbol === 'sun'
  );
  HightLightCoin = lstCoinVolume.filter(
    (e: any) => e.symbol === 'gmt' || e.symbol === 'vndc' || e.symbol === 'bnb'
  );
  HightVolume = lstCoinVolume.slice(0, 3);

  return (
    <div
      className="ListCoin"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backGroudPrimary,
      }}
    >
      <OverviewMarket
        HightLightCoin={HightLightCoin}
        CoinHightMkC={HightMkc}
        CoinHightVolume={HightVolume}
        CoinNew={NewCoin}
      />
      <ListCoinTable dataCoinMKC={lstCoinMkc} />
    </div>
  );
}

export default ListCoin;
