import React, { useContext, memo, useMemo } from 'react';
import clsx from 'clsx';

import { ReactComponent as InfoIcon } from '../../assets/icons/information.svg';
import { StepParameterContext, StepsProtocolParameterContext } from '../../pages/LocalDeviceDetails/Contexts';

/**
 * @template Frame
 * Data for the steps:
 * Configuration: 1 bit (X)
 * Flags: 6 bits (Y) (7 bits from setting: 11 bits)
 * Actions: 4 bits (Z)
 * Frame: XZZZZYYYYYYYYYYY (Total 16 bits)
 */

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
 * @param {string} info
 */

const obtainTableValues = ({ stepsProtocolParameter }) => {
  let result = stepsProtocolParameter.map((step) => {
    if (step.value < 0) {
      return (step.value >>> 0).toString(2).slice(16,32).split('');
    } else {
      return Number(step.value | 0)
      .toString(2)
      .padStart(16, '0')
      .split('');
    }
  });
  return result;
}

const calculateTable = ({ tableValues }) => {
  // Store 16 Steps(16 bits) into: config (1 bit), action (4 bits) and flags (11 bits)
  let confStep = [];
  let actStep = [];
  let flagStep = new Array(16).fill(0);

  tableValues.map((step, index) => {
    // Check Step parameters
    let confTemp = Number(step.slice(0, 1).join(''));
    let actTemp = step.slice(1, 5).join('');
    let flagTemp = step.slice(5, 16).reverse();

    // Set Action/Parameter Array
    confStep = [...confStep, config[`${confTemp}`].label];

    if (confStep[index] === 'Action') {
      // Check Action
      let actionTemp = '';
      switch (actTemp) {
        case '0000':  // Do nothing
          // let actionStep0 = actions[Number(`0b${actionStep}`)].label;
          actionTemp = actions[Number(`0b${actTemp}`)].label;
          break;
        case '0001':  // Wait in minutes
          actionTemp = actions[Number(`0b${actTemp}`)].label;
          break;
        case '0010':  // Wait in hours
          actionTemp = actions[Number(`0b${actTemp}`)].label;
          break;
        case '0011':  // Wait for weight reduction to yy% of maximum weight
          actionTemp = actions[Number(`0b${actTemp}`)].label;
          break;
        case '0100':  // Wait for weight increase to yy% of maximum weight
          actionTemp = actions[Number(`0b${actTemp}`)].label;
          break;
        case '0101':  // Wait for temperature change (continue if delta < yy [°C/100])
          actionTemp = actions[Number(`0b${actTemp}`)].label;
          break;
        case '1000':  // Set all the flags
          actionTemp = actions[6].label;
          break;
        default:  // Not an action
          actionTemp = 'Not an action';
          break;
      }
      actStep = [...actStep, actionTemp];

      let tActiveFlag = [];
      if (actStep[index] === actions[6].label) { // Set all the flags
        // Check Parameter to set
        // let tempFlag = step.slice(5, 16).reverse();
        flagTemp.map((flag, indexFlag) => {
          if (indexFlag < 6) {
            if (flag === '1') tActiveFlag = [...tActiveFlag, flags[indexFlag].label];
          }
          return tActiveFlag;
        });
        if (tActiveFlag.length === 0) tActiveFlag = 'Disable all the flags';
      } else {
        tActiveFlag = [...tActiveFlag, Number(`0b${step.slice(5, 16).join('')}`)];
      }
      flagStep[index] = [tActiveFlag];

    } else if (confStep[index] === 'Change Parameter'){
      let tempFlag = [];
      switch (actTemp) {
        case '0000':  // Set the TEMPERATURE
          actStep[index] = 'Temperature';
          tempFlag = [...tempFlag, Number(`0b${step.slice(5, 16).join('')}`)];
          break;
        default:
          actStep[index] = 'Not a parameter';
          tempFlag = [...tempFlag, 'Not a parameter'];
          break;
      }
      flagStep[index] = [tempFlag];
    }
    // console.log("flagStep", flagStep);
    return flagStep;
  });

  return [ confStep, actStep, flagStep ];
}

const TableSteps = ({ confStep, flagStep, actStep, value }) => {
  const tableSteps = confStep.map((step, index) => {
    let classTemp = '';
    Number(flagStep[index][0]) === 0 ? classTemp = 'text-gray-600' : classTemp = 'text-warning-600';
    if ((value) === index) classTemp = 'text-success-600';
    return (
      <tr className={classTemp} key={index}>
        <td>
          {index+1} 
        </td>
        <td>
          {step}
        </td>
        <td>
          {actStep[index]}
        </td>
        <td>
        {flagStep[index].join(`, `)}
        </td>
      </tr>
    );
  });
  return tableSteps;
}

const CardSteps = () => {
  // console.log('CardSteps');
  const stepParameter = useContext(StepParameterContext);
  const stepsProtocolParameter = useContext(StepsProtocolParameterContext);
  // console.log('stepParameter', stepParameter);
  // console.log('stepsProtocolParameter', stepsProtocolParameter);
  const tableValuesFunc = useMemo(() => obtainTableValues({ stepsProtocolParameter }), [stepsProtocolParameter]);

  // Obtain Table Values
  const tableValues =  tableValuesFunc;

  // Calculate Table
  const [confStep, actStep, flagStep] = useMemo(() => calculateTable({ tableValues }), [tableValues]);

  return (
    <div className={clsx('flex', "w-full sm:w-1/2 md:w-full lg:w-full")}>
      <div className="m-2 p-2 flex flex-col justify-between items-center sm:items-start rounded-md bg-blue-gray-100 shadow-md">
        <div className="w-full py-1 flex flex-row justify-between items-start relative">
          <h3 className='text-sm font-medium text-neutral-700'>
            {stepParameter.name || stepParameter.label}</h3>
          {stepParameter.description && (
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
                <span className=" text-xs text-neutral-400 ">{stepParameter.description}</span>
              </div>
            </div>
          )}
        </div>
        <table className='table-auto'>
          <thead>
            <tr>
              <th>Step</th>
              <th>Action/Set</th>
              <th>Description</th>
              <th>Parameter/Value</th>
            </tr>
          </thead>
          <tbody>
            {/* {stepsTable} */}
            <TableSteps confStep={confStep} flagStep={flagStep} actStep={actStep} value={stepParameter.value * stepParameter.factor} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(CardSteps);
