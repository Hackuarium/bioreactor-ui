import React from 'react';
import ValueCard from './ValueCard';

const GeneralTab = ({ data }) => {
  return (
    <div className="flex flex-row justify-around flex-wrap">
      {data?.map((param, index) => (
        <div key={index} className="w-full sm:w-1/2  md:w-1/3 lg:w-1/4 flex">
          <ValueCard
            title={param.name || param.label}
            value={param.value * param.factor}
            unit={param.unit}
          />
        </div>
      ))}
    </div>
  );
};

export default GeneralTab;
