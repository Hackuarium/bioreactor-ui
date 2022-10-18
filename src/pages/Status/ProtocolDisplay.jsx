import React from 'react';

const ProtocolDisplay = ({ title, value, valueColor }) => {
  return (
    <div className="h-max w-max m-2 p-2 flex flex-col justify-between flex-1 lg:flex-initial rounded-md bg-white shadow">
      <h2 className="text-lg pr-12">{title}</h2>
      <p className="text-2xl text-right " style={{ color: valueColor }}>
        {value + ' Step'}
      </p>
    </div>
  );
};

export default ProtocolDisplay;
