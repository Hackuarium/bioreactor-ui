import { useState, useEffect, memo } from 'react';

import { CardStatus, CardErrors, CardSteps } from '../../components';
import { msToTime } from '../../services/util';

// import { ReactComponent as Bioreactor } from '../../components/bioreactor/Bioreactor';
import { Bioreactor } from '../../components/bioreactor/Bioreactor';

const COLOR_CHANGED_TIMEOUT = 700;

const BioreactorTab = ({ data }) => {
  const [_value, setValue] = useState('');
  const [color, setColor] = useState(0);

  // console.log('BioreactorTab');

  const errorParameter = data.parametersArray?.find(
    (param) => param.name === 'Error',
  );

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
          // console.log(color);
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
      {/* Display Awake time */}
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
      {/* Display Status, Errors and Steps */}
      <div className="flex flex-row flex-wrap">
        <div className="flex flex-col flex-auto">
          <div
            className="flex flex-col justify-around flex-wrap m-2 p-2 rounded-md bg-blue-gray-100 shadow-md"
            style={{ transform: 'scale(1)' }}
          >
            <Bioreactor />
            <div className="flex flex-row justify-around flex-auto">
              {/* Display Errors */}
              <CardErrors color={color} />
            </div>
          </div>
          <div className="flex flex-row justify-around flex-wrap content-start">
            {/* Display Current Steps */}
            <CardSteps />
          </div>
          <div className="flex flex-row justify-around flex-wrap">
            {/* Display Status */}
            <CardStatus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(BioreactorTab);
