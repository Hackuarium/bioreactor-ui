import React, { useState, useEffect, memo, useMemo, useReducer } from 'react';

import { CardValue, CardParams, CardSteps } from '../../components';
import { msToTime } from '../../services/util';

const COLOR_CHANGED_TIMEOUT = 700;


const setStatus = data => {
  console.log('Check status');
  return data.parametersArray?.find(param => param.name === 'Status');
}

const BioreactorTab = ({ data }) => {
  const [_value, setValue] = useState('');
  const [color, setColor] = useState(0);

  console.log('BioreactorTab');

  const [statusParameter, setStatusParameter] = useState(data.parametersArray?.find(param => param.name === 'Status'));
  // const statusParameter = useMemo(() => setStatus(data), [data]);
  const [errorParameter, setErrorParameter] = useState(data.parametersArray?.find(param => param.name === 'Error'));

  // useEffect(() => {
  //   console.log('status', status);
  //   setStatusParameter(status);
  //   // setErrorParameter(data.parametersArray?.find(param => param.name === 'Error'));
  // }, [status]);

  // let statusParameter = data?.parametersArray?.find(param => param.name === 'Status');

  // let errorParameter = data?.parametersArray?.find(param => param.name === 'Error');

  let stepParameter = data?.parametersArray?.find(param => param.name === 'Current step');

  let steps = [...Array(16).keys()].map((v) => v+1);

  let stepsParameters = steps.map(v => (data?.parametersArray?.find(param => param.name === `Step ${v}`)));
  
  // setErrorParameter(errorParameter.value);

  // change color when Error is not zero
  useEffect(() => {
    let timeout;
    try {
      // don't execute it on the first render
      if (_value) {
        setValue((_oldV) => {
          const newV = Number(errorParameter.value);
          newV > 0 ? setColor(-1) : newV < 0 ? setColor(-1) : setColor(0);
          timeout = setTimeout(() => {
            setColor(0);
          }, COLOR_CHANGED_TIMEOUT);
          console.log(color);
        });
      }
    } catch (e) {
      console.log(e);
    }
    setValue(errorParameter.value);
    return () => timeout && clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.epoch]);

  return (
    <div className="flex flex-col">
      {data?.epoch && (
        <p className="mx-2 my-2 text-base font-medium text-black self-end">
          Awake time:
          <span className="mx-1 text-sm text-neutral-500">
            {msToTime(data?.epoch)}
          </span>
        </p>
      )}
      <div className=" flex flex-row justify-around flex-wrap">
        {/* Display Status */}
        <CardParams
          key={statusParameter.index}
          title={statusParameter.name || statusParameter.label}
          value={statusParameter.value * statusParameter.factor}
          unit={statusParameter.unit}
          info={statusParameter.description}
          flags={statusParameter.flags}
          className="w-full sm:w-1/2 md:w-1/2 lg:w-full flex"
        />
      </div>
      <div className="flex flex-row justify-around flex-wrap">
        {/* Display Errors */}
        <CardParams
          key={errorParameter.index}
          title={errorParameter.name || errorParameter.label}
          value={errorParameter.value * errorParameter.factor}
          unit={errorParameter.unit}
          info={errorParameter.description}
          flags={errorParameter.flags}
          className="w-full sm:w-1/2 md:w-1/2 lg:w-full flex"
          color={color}
        />
      </div>
      <div className="flex flex-row justify-around flex-wrap">
        {/* Display Current Steps */}
        <CardSteps
          key={stepParameter.index}
          title={stepParameter.name || stepParameter.label}
          value={stepParameter.value * stepParameter.factor}
          unit={stepParameter.unit}
          info={stepParameter.description}
          steps={stepsParameters}
          className="w-full sm:w-1/2  md:w-1/4 lg:w-1/5 flex"
        />
      </div>
    </div>
  );
};

export default memo(BioreactorTab);