import React from 'react';
import { CardValue } from '../../components';

const GeneralTab = ({ data }) => {
  return (
    <div className=" flex flex-row justify-around flex-wrap">
      {data?.parameters?.map((param, index) => (
        <CardValue
          key={index}
          title={param.name || param.label}
          value={String(param.value * param.factor)}
          unit={param.unit}
          info={param.description}
          className="w-full sm:w-1/2  md:w-1/4 lg:w-1/5 flex"
        />
      ))}
    </div>
  );
};

export default GeneralTab;
