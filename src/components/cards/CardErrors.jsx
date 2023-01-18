import React, { memo, useContext } from 'react';
import clsx from 'clsx';

import { ReactComponent as InfoIcon } from '../../assets/icons/information.svg';

import { ErrorParameterContext } from '../../pages/LocalDeviceDetails/Contexts';

/**
 *
 * @param {string} errorParameter
 * @param {number} color
 */

const TableErrors = ({ title, result, flags, color }) => {
  const checkOption = result.map((item, index) => {
    if (item === '0') {
      return null;
    } else {
      return (
          <li key={flags[index]}
          className={clsx(
            'text-sm text-neutral-600',
            color !== 0 && 'text-danger-600',
          )}>
            <b>{flags[index]}</b>
          </li>
        );
    }
  }
  );

  return checkOption;
}

const CardErrors = ({ color=0 }) => {
  const errorParameter = useContext(ErrorParameterContext);

  if (Number(errorParameter.value) === 0) return null;

  let flagSize = 8;
  
  let result;
  Math.sign(errorParameter.value) === 1
    ? 
    result = Number(errorParameter.value | 0)
      .toString(2)
      .padStart(flagSize, '0')
      .split('')
      .reverse()
    :
    result = Number(errorParameter.value | 0)
      .toString(2)
      .substring(1)
      .padStart(flagSize, '0')
      .split('')
      .reverse();

  return (
    <div className={clsx('flex', "w-full sm:w-1/2 md:w-full lg:w-full")}>
      <div className="w-full m-2 p-2 flex-1 flex-col justify-between items-left sm:items-start rounded-md bg-blue-gray-100 shadow-md">
        <div className="w-full py-1 flex flex-row justify-between items-start relative">
            <h3 className={clsx('text-sm font-medium text-neutral-700',
              color > 0 && 'text-success-700',
              color < 0 && 'text-danger-700',
              color !== 0 && 'text-danger-700')}>
              {errorParameter.name || errorParameter.label}: {errorParameter.value}</h3>
            {errorParameter.description && (
              <div className=" group">
                <InfoIcon
                  height="12"
                  width="12"
                  className="my-1 fill-current text-neutral-400 group-hover:text-primary-600"
                />
                <div
                  className="absolute bottom-full right-0 hidden group-hover:flex z-10 p-1 bg-neutral-50 shadow-md rounded"
                  max-content={100}
                >
                  <span className="text-xs text-neutral-400 ">{errorParameter.description}</span>
                </div>
              </div>
            )}
          </div>
          <ul className="list-inside list-disc fw-full mt-2 flex flex-col flex-wrap justify-between sm:justify-end">
            {/* {errorTable} */}
            <TableErrors result={result} flags={errorParameter.flags} color={color} />
          </ul>
       </div>
    </div>

  );
};

export default memo(CardErrors);
