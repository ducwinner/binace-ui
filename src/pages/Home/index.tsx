import { useSelector } from 'react-redux';
import IntroduceFortfolio from './IntroduceFortfolio';
import NeedHelp from './NeedHelp';
import Overview from './Overview';
import Popular from './Popular';
import PossibilitiesBinace from './possibilitiesBinace';

function Home() {
  const { backGroudSP, backGroudPrimary } = useSelector((state: any) => state.theme.colors);

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
        }}
      >
        <Overview />
      </div>
      <div style={{ width: '1200px', maxWidth: '100%' }}>
        <Popular />
        <IntroduceFortfolio />
        <PossibilitiesBinace />
        <NeedHelp />
      </div>
    </div>
  );
}

export default Home;
