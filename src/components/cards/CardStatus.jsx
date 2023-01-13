import React, { useState, memo } from 'react';
import clsx from 'clsx';

import { ReactComponent as InfoIcon } from '../../assets/icons/information.svg';
import { useEffect } from 'react';

import { useContext } from 'react';
import { StatusParameterContext } from '../../pages/LocalDeviceDetails/Contexts';

/**
 *
 * @param {string} title
 * @param {string} value
 * @param {string} unit
 * @param {string} info
 * @param {string} className
 */

const TableSteps = ({ result, flags }) => {

  const checkOption = result.map((item, index) => {
    if (item === '0') {
      return (
        <li key={flags[index]}
        className={clsx(
          'text-sm text-neutral-600',
          'text-gray-600',
        )}>
          {flags[index]}
        </li>
      );
    } else {
      return (
          <li key={flags[index]}
          className={clsx(
            'text-sm text-neutral-600',
            'text-success-600',
          )}>
            <b>{flags[index]}</b>
          </li>
        );
    }
  }
  );

  return checkOption;
}

const CardStatus = () => {
  const statusParameter = useContext(StatusParameterContext);

  console.log('statusParameter', statusParameter);
  
  let flagSize = 14;

  let result;
  Math.sign(statusParameter.value) === 1
    ? 
    result = Number(statusParameter.value | 0)
      .toString(2)
      .padStart(flagSize, '0')
      .split('')
      .reverse()
    :
    result = Number(statusParameter.value | 0)
      .toString(2)
      .substring(1)
      .padStart(flagSize, '0')
      .split('')
      .reverse();

  return (
    <div className={clsx('flex', "w-full sm:w-1/2 md:w-1/2 lg:w-full flex")}>
      <div className="w-full m-2 p-2 flex flex-col justify-between items-left sm:items-start rounded-md bg-blue-gray-100 shadow-md">
        <div className="w-full py-1 flex flex-row justify-between items-start relative">
          <h3 className={'text-sm font-medium text-neutral-700'}>
            {statusParameter.name}: {statusParameter.value}
          </h3>
          {statusParameter.description && (
            <div className=" group">
              <InfoIcon
                height="12"
                width="12"
                className="my-1 fill-current text-neutral-400 group-hover:text-primary-600"
              />
              <div className="absolute bottom-full right-0 hidden group-hover:flex z-10 p-1 bg-neutral-50 shadow-md rounded"
                max-content={100}
              >
              <span className="text-xs text-neutral-400 ">{statusParameter.description}</span>
              </div>
            </div>
          )}
        </div>
        <ul className="list-inside list-disc fw-full mt-2 flex flex-col flex-wrap justify-between sm:justify-end" >
          {/* {stepTable} */}
          <TableSteps result={result} flags={statusParameter.flags} />
        </ul>
      </div>
    </div>
  );
};

export default memo(CardStatus);
