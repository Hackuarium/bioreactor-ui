import React from 'react';

const GeneralParams = ({ data }) => {
  return (
    <div className="flex flex-row justify-around flex-wrap">
      {data?.parametersArray?.map((param, index) => (
        <div key={index} className="w-full sm:w-1/2  md:w-1/3 lg:w-1/4 flex">
          <div className="w-full m-1 p-2 flex flex-col justify-between items-center sm:items-start rounded-md bg-white shadow transform transition-all">
            <h3 className="py-1 text-sm font-medium text-gray-400">
              {param.name || param.label}
            </h3>
            <div className="w-full flex flex-row justify-end items-center">
              <p className="text-xl font-bold text-black leading-none">
                {param.value * param.factor}
              </p>
              <p className="ml-1 text-sm font-medium text-gray-400 leading-none">
                {param.unit}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GeneralParams;
