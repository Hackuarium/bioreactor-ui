import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { DividerCustom } from '../../components';
import { Button, Dropdown } from '../../components/tailwind-ui';

import { msToTime } from '../../services/util';

/**
 * @template Frame
 * Data for the steps:
 * Configuration: 1 bit (X)
 * Flags: 6 bits (Y) (7 bits from setting: 11 bits)
 * Actions: 4 bits (Z)
 * Frame: XZZZZYYYYYYYYYYY (Total 16 bits)
 */

// Copy from CardSteps.jsx

const config = [0, 1].map((v) => ({
  label: v === 0 ? `Action` : 'Change Parameter',
  value: v,
  type: 'option',
}));

const flags = [
  'Temperature control',
  'Agitation control',
  'Food control 1',
  'Food control 2',
  'Food control 3',
  'Food control 4',
].map((v, i) => ({
  label: v,
  value: 2 ** i,
  type: 'option',
}));

const actions = [
  'Do nothing',
  'Wait in minutes',
  'Wait in hours',
  'Wait for weight reduction to yy% of maximum weight',
  'Wait for weight increase to yy% of maximum weight',
  'Wait for temperature change (continue if delta < yy [°C/100])',
  'Set all the flags',
].map((v, i) => ({
  label: v,
  value: i,
  type: 'option',
}));

const StepsForm = ({ stepsValue, register, OnRefreshIntervalChanged }) =>
  stepsValue.map((step, index) => (
    <div key={index} className="flex flex-row">
      <div className="my-2.5 flex flex-auto justify-between">
        <label className="text-gray-400">Set Step {step}:</label>
      </div>
      <div className="mx-1 my-1 flex flex-row justify-end">
        {/* <select
            className="sm:w-min md:min-w-full"
            {...register('Config', { required: true })}
          >
            <option value={config[0].value} selected>
              {config[0].label}
            </option>
            <option value={config[1].value}>{config[1].label}</option>
          </select> */}
        <Dropdown
          title={'Configuration'}
          options={[config]}
          onSelect={OnRefreshIntervalChanged}
        />
      </div>
      <div className="mx-1 my-1 flex flex-row justify-end">
        <Dropdown
          title={'Flags'}
          options={[flags]}
          onSelect={OnRefreshIntervalChanged}
        />
      </div>
      <div className="mx-1 my-1 flex flex-row justify-end">
        <Dropdown
          className="sm:w-min md:w-1/2"
          title={'Actions'}
          options={[actions]}
          onSelect={OnRefreshIntervalChanged}
        />
      </div>
      <div className="mx-1 my-1 flex flex-row justify-end">
        <input
          className="sm:w-min md:min-w-full"
          type="number"
          placeholder={`Time or Weight quantity (default: 0)`}
          {...register(`Step ${step}`, {
            required: true,
            min: 0,
            max: `${actions ? 2047 : 100}`,
            maxLength: 100,
          })}
        />
      </div>
    </div>
  ));

const BioreactorSettings = ({ data }) => {
  // const stepsValue = [...Array(16).keys()].map((v) => v + 1);
  const stepsValue = useMemo(() => [...Array(16).keys()].map((v) => v + 1), []);

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  Object.keys(errors).length !== 0 && console.log(errors);

  // const handleChange = (event) => {
  //   const step = event.target.name;
  //   const stepValue = event.target.value;
  //   setSteps((values) => ({ ...values, [step]: stepValue }));
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log('steps: ', steps);
  // };

  const OnRefreshIntervalChanged = (option) => {
    // _setRefreshInterval(option);
    // setRefreshInterval(option.value);
    // document.activeElement.blur();
  };

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
      <div className="flex flex-column">
        <form onSubmit={handleSubmit(onSubmit)}>
          <StepsForm
            stepsValue={stepsValue}
            register={register}
            OnRefreshIntervalChanged={OnRefreshIntervalChanged}
          />
          {/* <input
            {...register('Set', { required: true })}
            type="radio"
            value="Yes"
          /> */}
          <div className="my-1 flex flex-row justify-end">
            <Button className="mx-2" variant="white" onClick={onSubmit}>
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BioreactorSettings;
