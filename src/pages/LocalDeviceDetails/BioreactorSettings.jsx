import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { DividerCustom } from '../../components';

import { msToTime } from '../../services/util';

const BioreactorSettings = ({ data }) => {
  const [steps, setSteps] = useState({});
  const stepsValue = [...Array(16).keys()].map((v) => v+1);

  // Form
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);

  const handleChange = (event) => {
    const step = event.target.name;
    const stepValue = event.target.value;
    setSteps(values => ({...values, [step]: stepValue}))
  }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log('steps: ', steps);
  // };

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
        {/* <form onSubmit={handleSubmit}>
          {stepsForm}
          <input type="submit" />
        </form> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="number" placeholder="Step 1" {...register("Step 1", {required: true, min: 0, maxLength: 80})} />
          <input type="number" placeholder="Step 2" {...register("Step 2", {required: true, min: 0, maxLength: 100})} />
          <input type="text" placeholder="Step 3" {...register("Step 3", {required: true, pattern: /^\S+@\S+$/i})} />
          <input type="text" placeholder="Step 4" {...register("Step 4", {required: true, minLength: 1, maxLength: 12})} />
          <select {...register("Title", { required: true })}>
            <option value="Step">Step</option>
            <option value="Parameter">Parameter</option>
          </select>

          <input {...register("Set", { required: true })} type="radio" value="Yes" />
          <input {...register("Set", { required: true })} type="radio" value="No" />

          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default BioreactorSettings;
