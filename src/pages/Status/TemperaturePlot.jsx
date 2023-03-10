import React from 'react';
import { Data1, Data2 } from '../utils/Data';
import { Axis, LineSeries, Plot, Heading, Legend } from 'react-plot';

const TemperaturePlot = () => {
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
        <Heading title="Temperature" />

        <Axis id="x" position="bottom" label="Time" labelSpace={25} />
        <Axis
          id="y"
          position="left"
          label="°C"
          labelSpace={40}
          paddingEnd={0.1}
        />

        <LineSeries
          data={Data1}
          xAxis="x"
          yAxis="y"
          lineStyle={{ stroke: 'red', strokeWidth: 2 }}
          label="Current temperature °C"
        />

        <LineSeries
          data={Data2}
          xAxis="x"
          yAxis="y"
          lineStyle={{ stroke: 'green', strokeWidth: 2 }}
          label="Target temperature °C"
        />
        <Legend position="embedded" bottom="80" left="0"></Legend>
      </Plot>
    </div>
  );
};

export default TemperaturePlot;
