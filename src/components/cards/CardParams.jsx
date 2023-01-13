import React, { useState, memo, useContext } from 'react';
import clsx from 'clsx';

import { ReactComponent as InfoIcon } from '../../assets/icons/information.svg';
import { useEffect } from 'react';

import { ErrorParameterContext } from '../../pages/LocalDeviceDetails/Contexts';

const COLOR_CHANGED_TIMEOUT = 700;

/**
 *
 * @param {string} title
 * @param {string} value
 * @param {string} unit
 * @param {string} info
 * @param {string} className
 */

const TableSteps = ({ title, result, flags, color }) => {

  console.log('result in TableSteps', result);
  
  // const [option, setOption] = useState([]);

  const checkOption = result.map((item, index) => {
    if (item === '0') {
      return null;
    } else {
      return (
          <li key={flags[index]}
          className={clsx(
            'text-sm text-neutral-600',
            color !== 0 && 'text-danger-600',
            title === 'Status' && 'text-success-600',
          )}>
            <b>{flags[index]}</b>
          </li>
        );
    }
  }
  );

  return checkOption;
}

const CardParams = ({ color=0 }) => {
  const errorParameter = useContext(ErrorParameterContext);

  const [_flag, setFlag] = useState(false);

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

  // const [_flagCheck, setFlagCheck] = useState(result);

  // // change color when value is changed
  // useEffect(() => {
  //   let timeout;
  //   try {
  //     // don't execute it on the first render
  //     if (_flag) {
  //         timeout = setTimeout(() => {
  //           // setFlagCheck(_flagCheck => checkChange.map((v, i) => v === _flagCheck[i] ? '0' : '1'));
  //           setFlagCheck([...result]);
  //         }, COLOR_CHANGED_TIMEOUT);
  //       // });
  //     }
  //   } catch (e) {
  //     // console.log(e);
  //   }
  //   setFlag(true);
  //   return () => timeout && clearTimeout(timeout);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [errorParameter.value]);

  return (
    <div className={clsx('flex', "w-full sm:w-1/2 md:w-1/2 lg:w-full flex")}>
      <div className="w-full m-2 p-2 flex flex-col justify-between items-left sm:items-start rounded-md bg-blue-gray-100 shadow-md">
        <div className="w-full py-1 flex flex-row justify-between items-start relative">
          <h3 className={clsx('text-sm font-medium text-neutral-700',
            color > 0 && 'text-success-700',
            color < 0 && 'text-danger-700',
            color !== 0 && 'text-danger-700')}>
            {errorParameter.name || errorParameter.label}: {errorParameter.value}</h3>
          {errorParameter.info && (
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
                <span className="text-xs text-neutral-400 ">{errorParameter.info}</span>
              </div>
            </div>
          )}
        </div>
        <ul className="list-inside list-disc">
          <div className="fw-full mt-2 flex flex-col flex-wrap justify-between sm:justify-end">
              {/* {stepTable} */}
              <TableSteps result={result} flags={errorParameter.flags} color={color} />
            </div>
        </ul>
      </div>
    </div>
  );
};

export default memo(CardParams);
