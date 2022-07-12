import { useSelector } from 'react-redux';
import { PieChart, Pie, Legend, Cell, ResponsiveContainer, Label } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
  lstCoin?: Object[];
}
export default function Chart() {
  const { backGroudPrimary, text } = useSelector((state: any) => state.theme.colors);
  const data01 = [
    { name: 'BTC', value: 90 },
    { name: 'ETH', value: 25 },
    { name: 'BNB', value: 10 },
  ];

  const CustomizedLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul style={{ listStyle: 'none', marginRight: '100px' }} className="LegendList">
        {payload.map((entry: any, index: any) => (
          <li key={`item-${index}`}>
            <div style={{ display: 'flex' }} className="BulletLabel">
              <Bullet backgroundColor={entry.payload.fill} size="10px" />
              <div
                style={{ color: text, fontWeight: 600, fontSize: '1.6rem' }}
                className="BulletLabelText"
              >
                {entry.value}
                <span style={{ marginLeft: '20px' }}>{entry.payload.value}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const CustomLabel = ({ viewBox, labelText, value }: any) => {
    const { cx, cy } = viewBox;
    return (
      <g>
        <text
          x={cx}
          y={cy}
          className="recharts-text recharts-label"
          textAnchor="middle"
          dominantBaseline="central"
          alignmentBaseline="middle"
          fontSize="15"
          color={text}
        >
          {labelText}
        </text>
        <text
          x={cx}
          y={cy + 20}
          className="recharts-text recharts-label"
          textAnchor="middle"
          dominantBaseline="central"
          alignmentBaseline="middle"
          fill="#0088FE"
          fontSize="26"
          fontWeight="600"
        >
          {value}
        </text>
      </g>
    );
  };

  return (
    <div style={{ width: '100%', height: 420 }}>
      <ResponsiveContainer>
        <PieChart style={{ backgroundColor: backGroudPrimary }}>
          <Pie data={data01} dataKey="value" cx={200} cy={200} innerRadius={80} outerRadius={100}>
            {data01.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            <Label content={<CustomLabel labelText="My FortFolio <3" />} position="center" />
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
