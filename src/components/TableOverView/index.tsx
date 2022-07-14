import { useSelector } from 'react-redux';
import '../../styles/component/TableOverView.less';

interface TableOverViewInterFace {
  describe: string;
  listCoin: any;
}

function TableOverView({ listCoin, describe }: TableOverViewInterFace) {
  const { priceDown, priceUp, text } = useSelector((state: any) => state.theme.colors);
  const darkMode = useSelector((state: any) => state.theme.darkMode);

  return (
    <div className={darkMode ? 'darkMode TableOverView' : 'TableOverView'}>
      <ul className="">
        <li className="coinDescribe">{describe}</li>
        {listCoin.map((e: any, id: number) => {
          return (
            <li key={id} className="coinRow">
              <div style={{ fontWeight: 600, color: text }} className="symbol">
                <img src={e.image} alt={e.symbol}></img>
                &nbsp;
                {e.symbol?.toUpperCase()}
              </div>
              <div style={{ fontWeight: 500, color: text }} className="price">
                {e.current_price < 100 ? e.current_price?.toFixed(5) : e.current_price?.toFixed(1)}
              </div>
              <div
                style={{
                  color: e.price_change_percentage_24h > 0 ? priceUp : priceDown,
                  fontWeight: 600,
                }}
              >
                {e.price_change_percentage_24h > 0 ? '+' : ''}
                {e.price_change_percentage_24h?.toFixed(2)}%
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TableOverView;
