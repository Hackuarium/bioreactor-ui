import React from 'react';
import TemperaturePlot from '../components/temperaturePlot';
import TemperatureDisplay from '../components/temperatureDisplay';

const Status = () => {
  return (
    <div className="w-full h-full p-6 lg:p-8 flex justify-center">
      <div className="w-max h-max flex flex-col items-center justify-start lg:justify-center">
        <div className="w-full flex flex-row justify-around items-center lg:justify-end">
          <TemperatureDisplay
            title="Current Temperature"
            value="20"
            valueColor="red"
          />
          <TemperatureDisplay
            title="Target Temperature"
            value="25"
            valueColor="green"
          />
        </div>
        <div className="w-full h-max lg:w-max">
          <TemperaturePlot></TemperaturePlot>
        </div>
      </div>
    </div>
  );
};

export default Status;
