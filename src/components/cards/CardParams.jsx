import React, { useState } from 'react';
import clsx from 'clsx';

import { ReactComponent as InfoIcon } from '../../assets/icons/information.svg';
import { useEffect } from 'react';

const COLOR_CHANGED_TIMEOUT = 1000;

/**
 *
 * @param {string} title
 * @param {string} value
 * @param {string} unit
 * @param {string} info
 * @param {string} className
 */

const CardStatus = ({ title, value, unit, info, flags, className }) => {

  const [_flag, setFlag] = useState(false);

  console.log('value', value);
  
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


  console.log('value size', Number(value | 0).length);

  let result = Number(value | 0)
  .toString(2)
  .padStart(flagSize, '0')
  .split('')
  .reverse();
  
  console.log(`result ${flagSize}`, result);
  
  const [_flagCheck, setFlagCheck] = useState(result);

  // change color when value is changed
  useEffect(() => {
    let timeout;
    try {
      // don't execute it on the first render
      if (_flag) {
          timeout = setTimeout(() => {
            // setFlagCheck(_flagCheck => checkChange.map((v, i) => v === _flagCheck[i] ? '0' : '1'));
            setFlagCheck(_flagCheck => [...result]);
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

  console.log('checkFlag', _flagCheck);

  return (
    <div className={clsx('flex', className)}>
      <div className="w-full m-2 p-2 flex flex-col justify-between items-left sm:items-start rounded-md bg-blue-gray-100 shadow-md">
        <div className="w-full py-1 flex flex-row justify-between items-start relative">
          <h3 className='text-sm font-medium text-neutral-700'>
            {title}</h3>
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
                <span className=" text-xs text-neutral-400 ">{info}</span>
              </div>
            </div>
          )}
        </div>
        <ul className="list-disc">
          <div className="w-full mt-2 flex flex-row justify-between sm:justify-end items-left">
            {result.map((item, index) => {
              if (_flagCheck[index] === '0') {
                return (
                    <li
                    className={clsx(
                      'text-md text-neutral-600',
                      'text-gray-600',
                    )}>
                      {flags[index]}
                    </li>
                  );
              } else {
                return (

                    <li
                    className={clsx(
                      'text-md text-neutral-600',
                      'text-danger-600',
                    )}>
                      {flags[index]}
                    </li>
                  );
              }
            }
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default CardStatus;
