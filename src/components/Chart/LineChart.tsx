import React from 'react';

import { LineChart, Line, XAxis, YAxis } from 'recharts';

const styles: any = {
  textAlign: 'center',
};

interface LineChartCoinInterFace {
  data: Array<number>;
}

export const LineChartCoin = ({ data }: LineChartCoinInterFace) => {
  return (
    <div style={styles}>
      <LineChart width={150} height={70} data={data}>
        <Line type="monotone" dataKey="b" stroke="#8884d8" dot={false} />
        <XAxis hide dataKey="a" />
        <YAxis hide />
      </LineChart>
    </div>
  );
};
