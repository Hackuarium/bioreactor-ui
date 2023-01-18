import { useState, useEffect } from 'react';

import { CardStatus, CardErrors, CardSteps } from '../../components';
import { msToTime } from '../../services/util';

const COLOR_CHANGED_TIMEOUT = 700;

const BioreactorSettings = ({ data }) => {

  return (
    <div className="flex">
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
    </div>
  );
};

export default BioreactorSettings;