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

const flags = ['Temperature control', 'Agitation control', 'Food control 1', 'Food control 2', 'Food control 3', 'Food control 4'].map((v, i) => ({
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

  console.log("steps", steps);
  
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
            step.value < 0 
              ?
              result = [...result, (step.value >>> 0).toString(2).slice(16,32).split('')]
              :
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

  console.log('_steps', _steps);

  const [_configStep, _setConfigStep] = useState(0);
  const [_actionStep, _setActionStep] = useState(0);
  const [_flagStep, _setFlagStep] = useState(0);

  // Store 16 Steps(16 bits) into: config (1 bit), action (4 bits) and flags (11 bits)
  let confStep = [];
  let actStep = [];
  let flagStep = [];

  _steps.map((step, index) => {
    // Check Step parameters
    let confTemp = Number(step.slice(0, 1).join(''));
    console.log('confTemp', confTemp);
    let actTemp = step.slice(1, 5).join('');
    let flagTemp = step.slice(5, 16).join('');
    console.log("flagTemp", flagTemp);




    





    // Set Action/Parameter Array
    // confStep = [...confStep, config[`${step[0]}`].label];
    confStep = [...confStep, config[`${confTemp}`].label];
    console.log('confStep', confStep);

    if (confStep[index] === 'Action') {
      // Check Action
      console.log('actionStepNumber', Number(`0b${actTemp}`));

      let actionTemp = '';
      switch (actTemp) {
        case '0000':
          // let actionStep0 = actions[Number(`0b${actionStep}`)].label;
          actionTemp = actions[Number(`0b${actTemp}`)].label;
          console.log(actionTemp);
          break;
        case '0001':
          actionTemp = actions[Number(`0b${actTemp}`)].label;
          console.log(actionTemp);        
          break;
        case '0010':
          actionTemp = actions[Number(`0b${actTemp}`)].label;
          console.log(actionTemp);
          break;
        case '0011':
          actionTemp = actions[Number(`0b${actTemp}`)].label;
          console.log(actionTemp);
          break;
        case '0100':
          actionTemp = actions[Number(`0b${actTemp}`)].label;
          console.log(actionTemp);
          break;
        case '0101':
          actionTemp = actions[Number(`0b${actTemp}`)].label;
          console.log(actionTemp);
          break;
        case '1000':
          actionTemp = actions[6].label;
          console.log(actionTemp);
          break;
        default:
          actionTemp = 'Not an action';
          console.log(actionTemp);
          break;
      }
      actStep = [...actStep, actionTemp];
      console.log('actStepArray', actStep);

      
      // console.log(actions.findIndex((action) => action.label === 'Set all the flags'));

      if (actStep[index] === actions[6].label) {
        // Check Parameter to set
        let tempFlag = step.slice(5, 16).reverse();
        console.log("flag without slice", tempFlag);
        let activeFlag = [];
        tempFlag.map((flag, index) => {
          if (index < 6) {
            let temp = flag === '1' ? activeFlag = [...activeFlag, flags[index].label] : null;

            // activeFlag = [...activeFlag, flags[index && Boolean(flag)].label];
          }
          // activeFlag = [...activeFlag, flags[index && Number(flag)].label];
          return activeFlag;
        });
        console.log("activeFlag", activeFlag);

        flagStep = [...flagStep, activeFlag];
        console.log("flagStep", flagStep);
        
      } else {
        let tempFlag = Number(`0b${step.slice(5, 16).join('')}`);
        console.log("tempFlagPAram", tempFlag);
        
      }


    } else if (confStep[index] === 'Change Parameter'){
      
    }
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
