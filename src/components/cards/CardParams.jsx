import React, { useState, memo } from 'react';
import clsx from 'clsx';

import { ReactComponent as InfoIcon } from '../../assets/icons/information.svg';
import { useEffect } from 'react';

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
      if (title !== 'Error') {
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
        return null;
      }
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

  // const check = checkOption !== option ? setOption(checkOption) : null;
  // setOption(checkOption);

  // setOption(checkValues);

  return checkOption;
  // console.log('option', option);
  // return option;
}

const CardParams = ({ title, value, info, flags, className, color=0 }) => {
  const [_flag, setFlag] = useState(false);

  console.log('value', value);
  console.log('value 2', Number(value | 0).toString(2));
  
  let flagSize = 0;
  switch (title) {
    case 'Status':
      flagSize = 14;
      break;
    case 'Enable':
      flagSize = 8;
      break;
    case 'Error':
      flagSize = 8;
      break;
    default:
      break;
  }

  let result;
  Math.sign(value) === 1 && flagSize === 8
    ? 
    result = Number(value | 0)
      .toString(2)
      .padStart(flagSize, '0')
      .split('')
      .reverse()
    :
    result = Number(value | 0)
      .toString(2)
      .substring(1)
      .padStart(flagSize, '0')
      .split('')
      .reverse();

  console.log('value 3', result);

        
  console.log('value size', Number(value | 0).toString(2).length);
  console.log('value 3', Number(value | 0).toString(2).padStart(flagSize, '0'));
  console.log(flagSize);
  
  const [_flagCheck, setFlagCheck] = useState(result);

  // change color when value is changed
  useEffect(() => {
    let timeout;
    try {
      // don't execute it on the first render
      if (_flag) {
          timeout = setTimeout(() => {
            // setFlagCheck(_flagCheck => checkChange.map((v, i) => v === _flagCheck[i] ? '0' : '1'));
            setFlagCheck([...result]);
          }, COLOR_CHANGED_TIMEOUT);
        // });
      }
    } catch (e) {
      // console.log(e);
    }
    setFlag(true);
    return () => timeout && clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={clsx('flex', className)}>
      <div className="w-full m-2 p-2 flex flex-col justify-between items-left sm:items-start rounded-md bg-blue-gray-100 shadow-md">
        <div className="w-full py-1 flex flex-row justify-between items-start relative">
          <h3 className={clsx('text-sm font-medium text-neutral-700',
            color > 0 && 'text-success-700',
            color < 0 && 'text-danger-700',
            color !== 0 && 'text-danger-700')}>
            {title}: {value}</h3>
          {info && (
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
                <span className="text-xs text-neutral-400 ">{info}</span>
              </div>
            </div>
          )}
        </div>
        <ul className="list-inside list-disc">
          <div className="fw-full mt-2 flex flex-row justify-between sm:justify-end">
              {/* {stepTable} */}
              <TableSteps title={title} result={result} flags={flags} color={color} />
            </div>
        </ul>
      </div>
    </div>
  );
};

export default memo(CardParams);
