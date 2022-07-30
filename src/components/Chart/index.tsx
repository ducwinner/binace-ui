import { memo } from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts';
import useWindowSize from '../../CustomHook/useWindowSize';
import { DataPieChartInterFace } from '../../pages/FortFolio';

const COLORS = ['rgb(32, 108, 214', '#00C49F', 'rgb(252, 213, 53)', '#FF8042'];

const Bullet = ({ backgroundColor, size }: any) => {
  return (
    <div
      className="CirecleBullet"
      style={{
        transform: 'translateY(6px)',
        marginRight: '10px',
        backgroundColor,
        width: size,
        height: size,
      }}
    ></div>
  );
};

interface ChartInterFace {
  data: DataPieChartInterFace[];
}
function PieChartCoin({ data }: ChartInterFace) {
  const { backGroudPrimary, text } = useSelector((state: any) => state.theme.colors);
  const size = useWindowSize();
  const chart = data.length > 0 ? data : [{ name: 'TOTAL', value: 1000 }];
  const CustomizedLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul
        style={{ listStyle: 'none', margin: size.width < 410 ? '0 0 0 50px' : '0 50px 0 0' }}
        className="LegendList"
      >
        {payload.map((entry: any, index: any) => (
          <li key={`item-${index}`}>
            <div style={{ display: 'flex' }} className="BulletLabel">
              <Bullet backgroundColor={entry.payload.fill} size="10px" />
              <div
                style={{ color: text, fontWeight: 600, fontSize: '1.6rem' }}
                className="BulletLabelText"
              >
                {entry.value}
                <span style={{ marginLeft: '20px', opacity: data.length > 0 ? 1 : 0 }}>
                  {entry.payload.value}$US
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{ width: '100%', height: 420 }}>
      <ResponsiveContainer>
        <PieChart style={{ backgroundColor: backGroudPrimary }}>
          <Pie
            data={chart}
            dataKey="value"
            cx={size.width > 500 ? 150 : 180}
            cy={size.width > 500 ? 200 : 120}
            innerRadius={80}
            outerRadius={100}
          >
            {chart.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          {size.width > 410 ? (
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              content={<CustomizedLegend />}
            />
          ) : (
            <Legend layout="horizontal" verticalAlign="top" content={<CustomizedLegend />} />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(PieChartCoin);
