// src/components/PieChart.js
import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function LineChart({ options, data }) {
  return (
    <div className="flex">
      <Line
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Temperature',
            },
          },
        }}
      />
    </div>
  );
}
export default LineChart;
