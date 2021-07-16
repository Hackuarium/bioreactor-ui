import { useState, useEffect } from 'react';

import { getParams } from './deviceParameters';
import { CardValue } from '../../components';

const ActualDetails = (props) => {
  const [parameters, setParameters] = useState([]);

  useEffect(() => {
    if (props.DetailType) {
      //   console.log(props.data);
      const params = getParams(props.DetailType);
      setParameters(params);
    }
  }, [props]);

  return (
    <div>
      {parameters.length !== 0 ? (
        <div className="flex flex-row justify-start flex-wrap">
          {parameters.map((p, index) =>
            p.name !== 'Date' && props.data[0] ? (
              <CardValue
                key={index}
                title={p.name}
                value={props.data[0].parameters[p.label]}
                unit={p.unit}
                info={p.description}
                className="w-full flex sm:w-1/3 md:w-1/4 lg:w-1/5 "
              />
            ) : null,
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ActualDetails;
