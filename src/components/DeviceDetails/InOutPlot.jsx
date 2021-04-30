import React from 'react';
import { Axis, LineSeries, Plot, Heading, Legend } from 'react-plot';

const InOutPlot = () => {
  const data1 = [
    { x: 0, y: 0 },
    { x: 1, y: 2 },
    { x: 2, y: 5 },
    { x: 3, y: 9 },
    { x: 4, y: 16 },
    { x: 5, y: 22 },
    { x: 6, y: 26 },
    { x: 7, y: 28 },
    { x: 10, y: 28 },
  ];
  const data2 = [
    { x: 0, y: 20 },
    { x: 5, y: 20 },
    { x: 5, y: 30 },
    { x: 10, y: 30 },
  ];
  const data3 = [
    { x: 0, y: 0 },
    { x: 1, y: 17 },
    { x: 2, y: 19 },
    { x: 3, y: 22 },
    { x: 4, y: 40 },
    { x: 5, y: 45 },
    { x: 6, y: 60 },
    { x: 7, y: 78 },
    { x: 10, y: 80 },
  ];
  const data4 = [
    { x: 0, y: 40 },
    { x: 5, y: 40 },
    { x: 5, y: 60 },
    { x: 10, y: 60 },
  ];

  return (
    <div className="w-max h-max m-2 p-4 flex justify-center items-center rounded-md bg-white shadow">
      <Plot
        width={900}
        height={400}
        margin={{ bottom: 50, left: 55, top: 20, right: 20 }}
        seriesViewportStyle={{
          stroke: 'black',
          strokeWidth: 0.3,
        }}
      >
        <Heading title="FS Details Variations" />

        <Axis id="x" position="bottom" label="Time" labelSpace={25} />
        <Axis
          id="y"
          position="left"
          label="kb"
          labelSpace={40}
          paddingEnd={0.1}
        />

        <LineSeries
          data={data1}
          xAxis="x"
          yAxis="y"
          lineStyle={{ stroke: 'red', strokeWidth: 2 }}
          label="FS Read"
        />

        <LineSeries
          data={data2}
          xAxis="x"
          yAxis="y"
          lineStyle={{ stroke: 'green', strokeWidth: 2 }}
          label="FS Write"
        />

        <LineSeries
          data={data3}
          xAxis="x"
          yAxis="y"
          lineStyle={{ stroke: 'blue', strokeWidth: 2 }}
          label="Network Read"
        />

        <LineSeries
          data={data4}
          xAxis="x"
          yAxis="y"
          lineStyle={{ stroke: 'yellow', strokeWidth: 2 }}
          label="Network Write"
        />
        <Legend position="embedded" bottom="80" left="0"></Legend>
      </Plot>
    </div>
  );
};

export default InOutPlot;