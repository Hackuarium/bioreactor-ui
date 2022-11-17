import React, { useState } from 'react';
import { useEffect } from 'react';
import { CardValue } from '../../components';
import { msToTime } from '../../services/util';

const BioreactorTab = ({ data }) => {
  const [_value, setValue] = useState('');
  const [color, setColor] = useState(0);

  let errorParameter = data?.parametersArray?.find(param => param.name === 'Error');

  // console.log('errorParameter', errorParameter);
  // console.log('errorParameterValue', errorParameter.value);

  // change color when Error is not zero
  useEffect(() => {
    let timeout;
    try {
      // don't execute it on the first render
      if (_value) {
        setValue((_oldV) => {
          // const newV = Number(errorParameter) ;
          Number(errorParameter.value) > 0 ? setColor(-1) : Number(errorParameter.value) < 0 ? setColor(-1) : setColor(0);
          // timeout = setTimeout(() => {
          //   setColor(0);
          // }, COLOR_CHANGED_TIMEOUT);
        });
      }
    } catch (e) {
      console.log(e);
    }
    setValue(errorParameter.value);
    return () => timeout && clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorParameter.value]);

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
        <CardValue
          key={errorParameter.index}
          title={errorParameter.name || errorParameter.label}
          value={errorParameter.value * errorParameter.factor}
          unit={errorParameter.unit}
          info={errorParameter.description}
          className="w-full sm:w-1/2  md:w-1/4 lg:w-1/5 flex"
          errorParameter={color}
        />
      </div>
    </div>
  );
};

export default BioreactorTab;