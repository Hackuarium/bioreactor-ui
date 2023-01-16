import React, { useState, useEffect, memo } from 'react';

import { CardValue, CardStatus, CardErrors, CardSteps } from '../../components';
import { msToTime } from '../../services/util';

const COLOR_CHANGED_TIMEOUT = 700;

const BioreactorTab = ({ data }) => {
  const [_value, setValue] = useState('');
  const [color, setColor] = useState(0);

  console.log('BioreactorTab');
  console.log('W value', data.parametersArray?.find(param => param.label === 'W').value);
  console.log('X value', data.parametersArray?.find(param => param.label === 'X').value);
  console.log('Y value', data.parametersArray?.find(param => param.label === 'Y').value);
  console.log('Z value', data.parametersArray?.find(param => param.label === 'Z').value);
  console.log('AZ value', data.parametersArray?.find(param => param.label === 'AZ').value);

  const [errorParameter, setErrorParameter] = useState(data.parametersArray?.find(param => param.name === 'Error'));

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
      <div className="ml-auto">
        {data?.epoch && (
          <p className="mx-2 my-2 text-base font-medium text-black self-end">
            Awake time:
            <span className="mx-1 text-sm text-neutral-500">
              {msToTime(data?.epoch)}
            </span>
          </p>
        )}
      </div>
      <div className="flex flex-row flex-wrap">
        <div className="flex flex-col flex-auto">
          <div className="flex flex-row justify-around flex-wrap">
            {/* Display Status */}
            <CardStatus />
          </div>
          <div className="flex flex-row justify-around flex-auto">
            {/* Display Errors */}
            <CardErrors color={color} />
          </div>
        </div>
        <div className="flex flex-row justify-around flex-wrap">
            {/* Display Current Steps */}
            <CardSteps />
          </div>
      </div>

    </div>
  );
};

export default memo(BioreactorTab);