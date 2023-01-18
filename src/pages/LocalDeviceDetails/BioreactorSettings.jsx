import { useState, useEffect } from 'react';

import { DividerCustom } from '../../components';

import { msToTime } from '../../services/util';

const BioreactorSettings = ({ data }) => {
  const [steps, setSteps] = useState({});
  const stepsValue = [...Array(16).keys()].map((v) => v+1);

  const handleChange = (event) => {
    const step = event.target.name;
    const stepValue = event.target.value;
    setSteps(values => ({...values, [step]: stepValue}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('steps: ', steps);
  };

  const stepsForm = stepsValue.map((step) => (
    <label>Enter Step {step}:
      <input
        type="text"
        name={step}
        value={steps[`${step}`] || ''}
        onChange={handleChange}
      />
    </label>
  ));

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
      <DividerCustom title="Edit parameters" />
      <div className="flex flex-col flex-wrap">
        <form onSubmit={handleSubmit}>
          {stepsForm}
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default BioreactorSettings;