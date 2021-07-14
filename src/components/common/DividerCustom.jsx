import React from 'react';
import { Divider } from '../tailwind-ui';

const DividerCustom = ({ title }) => {
  return (
    <div className="my-4">
      <Divider justify="start">
        <span className="px-2 bg-white text-xs font-medium text-neutral-400">
          {title}
        </span>
      </Divider>
    </div>
  );
};

export default DividerCustom;
