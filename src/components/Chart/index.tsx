import { useSelector } from 'react-redux';
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts';

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
  data: Object[];
}
export default function PieChartCoin({ data }: ChartInterFace) {
  const { backGroudPrimary, text } = useSelector((state: any) => state.theme.colors);

  const CustomizedLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul style={{ listStyle: 'none', marginRight: '50px' }} className="LegendList">
        {payload.map((entry: any, index: any) => (
          <li key={`item-${index}`}>
            <div style={{ display: 'flex' }} className="BulletLabel">
              <Bullet backgroundColor={entry.payload.fill} size="10px" />
              <div
                style={{ color: text, fontWeight: 600, fontSize: '1.6rem' }}
                className="BulletLabelText"
              >
                {entry.value}
                <span style={{ marginLeft: '20px' }}>{entry.payload.value}$US</span>
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
          <Pie data={data} dataKey="value" cx={200} cy={200} innerRadius={80} outerRadius={100}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            content={<CustomizedLegend />}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
