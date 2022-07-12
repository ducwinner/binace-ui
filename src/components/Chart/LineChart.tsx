import React from 'react';

import { LineChart, Line, XAxis, YAxis } from 'recharts';

const styles: any = {
  textAlign: 'center',
};

const data: any = [];

const rand = 300;
for (let i = 0; i < 7; i++) {
  let d = {
    year: 2000 + i,
    value: Math.random() * (rand + 50) + 100,
  };

  data.push(d);
}

export const LineChartCoin = () => (
  <div style={styles}>
    <LineChart
      width={250}
      height={70}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
      <XAxis hide dataKey="year" />
      <YAxis hide />
    </LineChart>
  </div>
);
