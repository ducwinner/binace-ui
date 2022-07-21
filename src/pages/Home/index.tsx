import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fethchLstCoinMKC } from '../../Redux/CoinApiSlice';
import IntroduceFortfolio from './IntroduceFortfolio';
import NeedHelp from './NeedHelp';
import Overview from './Overview';
import Popular from './Popular';
import PossibilitiesBinace from './possibilitiesBinace';

function Home() {
  const { backGroudSP, backGroudPrimary } = useSelector((state: any) => state.theme.colors);
  const data = useSelector((state: any) => state.listCoinApi.lstCoinMkc);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fethchLstCoinMKC());
  }, [dispatch]);
  console.log(data);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center',
        alignItems: 'center',
        backgroundColor: backGroudPrimary,
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: backGroudSP,
          padding: '0 20px',
        }}
      >
        <Overview />
      </div>
      <div style={{ width: '1200px', maxWidth: '100%', padding: '0 20px' }}>
        <Popular />
        <IntroduceFortfolio />
        <PossibilitiesBinace />
        <NeedHelp />
      </div>
    </div>
  );
}

export default Home;
