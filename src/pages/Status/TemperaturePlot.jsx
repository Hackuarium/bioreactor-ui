import React from 'react';
import { useState } from 'react';
import { Data, Data2 } from '../utils/Data';
import LineChart from './LineChart';

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.random() * 100),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => Math.random() * 100),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const TemperaturePlot = () => {
  const chartData = {
    labels: Data.map((data) => data.x),
    datasets: [
      {
        label: 'Current Temperature',
        data: Data.map((data) => data.y),
        backgroundColor: 'blue',
        borderColor: 'blue',
        borderWidth: 2,
      },
      {
        label: 'Target Temperature',
        data: Data2.map((data) => data.y),
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="w-max h-max m-2 p-4 flex justify-center items-center rounded-md bg-white shadow">
      <LineChart options={options} data={chartData} />
    </div>
  );
};

export default TemperaturePlot;
