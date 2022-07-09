import OverviewMarket from './OverviewMarket';
import '../../styles/ListCoin/ListCoin.less';
import CryptoApi from '../../api/CryptoApi';
import { useEffect, useState } from 'react';
import ListCoinTable from './ListCoinTable';
import { useSelector } from 'react-redux';

var HightLightCoin: Object[] = [];
var NewCoin: Object[] = [];
var HightVolume: Object[] = [];
var HightMkc: Object[] = [];
function ListCoin() {
  //Redux Theme
  const { backGroudPrimary } = useSelector((state: any) => state.theme.colors);

  // State
  const [dataCoinMKC, setDataCoinMKC] = useState<Object[]>([]);
  const [dataCoinVolume, SetDataCoinVolume] = useState<Object[]>([]);

  //useEffect
  useEffect(() => {
    const fetchCoin = async () => {
      const params = {
        per_page: 200,
        order: 'volume_desc',
      };
      type MyStructure = Object[] | any;

      const listCoin: MyStructure = await CryptoApi.getAll(params);
      SetDataCoinVolume(listCoin);
    };
    fetchCoin();
  }, []);

  useEffect(() => {
    const fetchCoin = async () => {
      const params = {
        per_page: 100,
        order: 'market_cap_desc',
      };
      type listCoinType = Object[] | any;
      const listCoin: listCoinType = await CryptoApi.getAll(params);
      setDataCoinMKC(listCoin);
    };
    fetchCoin();
  }, []);

  // filter DataCoin for OverVIewMarket
  HightMkc = dataCoinMKC.slice(0, 3);
  NewCoin = dataCoinVolume.filter(
    (e: any) => e.symbol === 'one' || e.symbol === 'icp' || e.symbol === 'sun'
  );
  HightLightCoin = dataCoinVolume.filter(
    (e: any) => e.symbol === 'gmt' || e.symbol === 'vndc' || e.symbol === 'bnb'
  );
  HightVolume = dataCoinVolume.slice(0, 3);

  console.log(HightVolume);
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
      <ListCoinTable dataCoinMKC={dataCoinMKC} />
    </div>
  );
}

export default ListCoin;
