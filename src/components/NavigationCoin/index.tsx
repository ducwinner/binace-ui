import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../styles/component/NavigationCoin.less';

interface NavigationCoinInterFace {
  dataCoin: Object[];
  title: string;
}

function NavigationCoin({ dataCoin, title }: NavigationCoinInterFace) {
  //Redux Theme
  const { text, textBlurPrimary, priceUp, priceDown } = useSelector(
    (state: any) => state.theme.colors
  );

  const darkMode = useSelector((state: any) => state.theme.darkMode);

  return (
    <div className="navigation-coin">
      <div style={{ color: text }} className="navigation-header">
        {title}
      </div>
      <ul className="navigation-container">
        {dataCoin?.map((e: any) => (
          <Link onClick={() => window.location.reload()} to={'/detail/' + e.id} replace key={e.id}>
            <li className={darkMode && 'darkMode'}>
              <div className="infor">
                <img src={e.image} alt="img" />
                <div>
                  <div style={{ color: text }} className="name">
                    {e.name}
                  </div>
                  <div style={{ color: textBlurPrimary }} className="symbol">
                    {e.symbol.toUpperCase()}
                  </div>
                </div>
              </div>
              <div className="price">
                <div style={{ color: text, fontWeight: 500 }} className="current-pricer">
                  $ &nbsp; {e.current_price.toLocaleString()}
                </div>
                <div
                  style={{
                    color: e.price_change_percentage_24h_in_currency > 0 ? priceUp : priceDown,
                  }}
                  className="change"
                >
                  {e.price_change_percentage_24h_in_currency.toFixed(2)}%
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default NavigationCoin;
