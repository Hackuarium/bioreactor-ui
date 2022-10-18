import React from 'react';
import TemperaturePlot from './TemperaturePlot';
import TemperatureDisplay from './TemperatureDisplay';
import TagDisplay from "./TagDisplay";

const Status = () => {
  return (
    <div className="w-full h-full p-6 lg:p-8 flex justify-center">
      <div className="w-max h-max flex flex-col items-center justify-start lg:justify-center">
        <div className="w-full flex flex-row justify-around items-center lg:justify-center">
          <h2 className="text-2xl font-semibold mb-7">Active Services</h2>
        </div>
        <div className="w-full flex flex-row justify-around items-center lg:justify-end mb-4">
          <TagDisplay
            title="PID"
            value="Active"
            valueColor="green"
            magnitude=""
          />
          <TagDisplay
            title="Stepper"
            value="Active"
            valueColor="green"
            magnitude=""
          />
          <TagDisplay
            title="Food 1"
            value="Active"
            valueColor="green"
            magnitude=""
          />
          <TagDisplay
            title="Food 2"
            value="Active"
            valueColor="green"
            magnitude=""
          />
          <TagDisplay
            title="Food 3"
            value="Inactive"
            valueColor="red"
            magnitude=""
          />
          <TagDisplay
            title="Food 4"
            value="Inactive"
            valueColor="red"
            magnitude=""
          />
        </div>
        <div className="w-full flex flex-row justify-around items-center lg:justify-center">
          <h2 className="text-2xl font-semibold mb-7">Parameter Status</h2>
        </div>
        <div className="w-full flex flex-row justify-around items-center lg:justify-end">
          <TemperatureDisplay
            title="Current Temperature"
            value="28"
            valueColor="red"
          />
          <TemperatureDisplay
            title="Target Temperature"
            value="30"
            valueColor="green"
          />
        </div>
        <div className="w-full h-max lg:w-max">
          <TemperaturePlot></TemperaturePlot>
        </div>
        <div className="w-full flex flex-row justify-around items-center lg:justify-end">
          <TagDisplay
            title="Protocol"
            value="0"
            valueColor="green"
            magnitude="Step"
          />
        <TagDisplay
            title="Weight"
            value="1000"
            valueColor="green"
            magnitude="gr"
          />
          <TagDisplay
            title="Heating Power"
            value="0"
            valueColor="green"
            magnitude="%"
          />
        </div>
      </div>
    </div>
  );
};

export default Status;
