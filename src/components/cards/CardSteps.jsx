import React, { useState } from 'react';
import clsx from 'clsx';

import { ReactComponent as InfoIcon } from '../../assets/icons/information.svg';
import { useEffect } from 'react';

const COLOR_CHANGED_TIMEOUT = 1000;

const config = [0, 1].map((v) => ({
  label: v === 0 ? `Action` : 'Change Parameter',
  value: v,
  type: 'option',
}));

const flags = ['Temperature control', 'Agitation control', 'Food control 1', 'Food control 2', 'Food control 3', 'Food control 4',].map((v, i) => ({
  label: v,
  value: 2 ** i,
  type: 'option',
}));

const actions = ['Do nothing', 'Wait in minutes', 'Wait in hours', 'Wait for weight reduction to yy% of maximum weight', 'Wait for weight increase to yy% of maximum weight', 'Wait for temperature change (continue if delta < yy [°C/100])', 'Set all the flags'].map((v, i) => ({
  label: v,
  value: i,
  type: 'option',
}));

/**
 *
 * @param {string} title
 * @param {string} value
 * @param {string} unit
 * @param {string} info
 * @param {string} className
 */

const CardStatus = ({ title, value, unit, info, steps, className }) => {
  console.log('steps',steps);

  // const [_flag, setFlag] = useState(false);

  const [_steps, setSteps] = useState([]);

  // change _steps when steps is changed
  useEffect(() => {
    let timeout;
    try {
      // don't execute it on the first render
      // if (_flag) {
          timeout = setTimeout(() => {
            let result = [];
            result = steps.map((step, index) => {
              result = [...result, Number(step.value | 0)
              .toString(2)
              .padStart(16, '0')
              .split('')];
              return result[index];
            });
            setSteps(_steps => [...result]);
          }, COLOR_CHANGED_TIMEOUT);
        // });
      // }
    } catch (e) {
      // console.log(e);
    }
    // setFlag(true);
    return () => timeout && clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps]);

  // setSteps(steps.map((step, index) => {
  //   let result = [Number(step.value | 0)
  //   .toString(2)
  //   .padStart(16, '0')
  //   .split('')];
  //   return result[index];
  // }));

  // let result = [];
  // result = steps.map((step, index) => {
  //   result = [...result, Number(step.value | 0)
  //   .toString(2)
  //   .padStart(16, '0')
  //   .split('')];
  //   return result[index];
  // });
  // console.log('result', result);

  console.log('_steps', _steps);

  let ii = [...Array(16).keys()];

  console.log('ii', ii);

  _steps.map((step, index) => {
    let configStep = config[`${step[0]}`].label;
    console.log('configStep', configStep);
    let actionStep = step.slice(1, 5).join('');
    console.log('actionStep', actionStep);
    console.log('actionStepNumber', Number(`0b${actionStep}`));
    switch (actionStep) {
      case '0000':
        // let actionStep0 = actions[Number(`0b${actionStep}`)].label;
        console.log('Do nothing', actions[Number(`0b${actionStep}`)].label);        
        break;
      case '0001':
        console.log('Wait in minutes', actions[Number(`0b${actionStep}`)].label);
        break;
      case '0010':
        console.log('Wait in hours', actions[Number(`0b${actionStep}`)].label);
        break;
      case '0011':
        console.log('Wait for weight reduction to yy% of maximum weight', actions[Number(`0b${actionStep}`)].label);
        break;
      case '0100':
        console.log('Wait for weight increase to yy% of maximum weight', actions[Number(`0b${actionStep}`)].label);
        break;
      case '0101':
        console.log('Wait for temperature change (continue if delta < yy [°C/100])', actions[Number(`0b${actionStep}`)].label);
        break;
      case '1000':
        console.log('Set all the flags', actions[Number(`0b${actionStep}`)].label);
        break;
      default:
        break;
    }
    // step.forEach((v, i) => {
    //   console.log('v', v);
    //   return true;
    // })
  });

  _steps.forEach((step, index) => {
  });
  
  // let ans = ii.map((v, i) => {console.log(`_flagSteps${i}`, _flagSteps[`${i}`][`${i}`])});
  // console.log('_flagSteps', _flagSteps[`${ii[0]}`]);

  return (
    <div className={clsx('flex', className)}>
      <div className="w-full m-2 p-2 flex flex-col justify-between items-center sm:items-start rounded-md bg-blue-gray-100 shadow-md">
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
        
      </div>
    </div>
  );
};

export default CardStatus;
