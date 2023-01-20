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

const stepsForm2 = stepsValue.map((step) => (
  <div className="flex flex-row">
    <label className='text-gray-400'>Enter Step {step}:
    </label>
    <select {...register("Config", { required: true })}>
      <option value="0">Action</option>
      <option value="1">Change Parameter</option>
    </select>
    <select {...register("Flags", { required: true })}>
      <option value="000001">Temperature control</option>
      <option value="000010">Agitation control</option>
      <option value="000100">Food control 1</option>
      <option value="001000">Food control 2</option>
      <option value="010000">Food control 3</option>
      <option value="100000">Food control 4</option>
    </select>
    <select {...register("Actions", { required: true })}>
      <option value="0">Do nothing</option>
      <option value="1">Wait in minutes</option>
      <option value="2">Wait in hours</option>
      <option value="3">Wait for weight reduction to yy% of maximum weight</option>
      <option value="4">Wait for weight increase to yy% of maximum weight</option>
      <option value="5">Wait for temperature change</option>
      <option value="6">Set all flags</option>
    </select>
    <input type="number" placeholder="Step 1" {...register("Step 1", {required: true, min: 0, maxLength: 80})} />
  </div>
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
      <div className="flex flex-row justify-between">
        {/* <form onSubmit={handleSubmit}>
          {stepsForm}
          <input type="submit" />
        </form> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {stepsForm2}
          {/* <input type="number" placeholder="Step 2" {...register("Step 2", {required: true, min: 0, maxLength: 100})} />
          <input type="text" placeholder="Step 3" {...register("Step 3", {required: true, pattern: /^\S+@\S+$/i})} />
          <input type="text" placeholder="Step 4" {...register("Step 4", {required: true, minLength: 1, maxLength: 12})} />
          <input type="number" placeholder="Step 5" {...register("Step 1", {required: true, min: 0, maxLength: 80})} />
          <input type="number" placeholder="Step 6" {...register("Step 2", {required: true, min: 0, maxLength: 100})} />
          <input type="text" placeholder="Step 7" {...register("Step 3", {required: true, pattern: /^\S+@\S+$/i})} />
          <input type="text" placeholder="Step 8" {...register("Step 4", {required: true, minLength: 1, maxLength: 12})} />
          <input type="number" placeholder="Step 9" {...register("Step 1", {required: true, min: 0, maxLength: 80})} />
          <input type="number" placeholder="Step 10" {...register("Step 2", {required: true, min: 0, maxLength: 100})} />
          <input type="text" placeholder="Step 11" {...register("Step 3", {required: true, pattern: /^\S+@\S+$/i})} />
          <input type="text" placeholder="Step 12" {...register("Step 4", {required: true, minLength: 1, maxLength: 12})} />
          <input type="number" placeholder="Step 13" {...register("Step 1", {required: true, min: 0, maxLength: 80})} />
          <input type="number" placeholder="Step 14" {...register("Step 2", {required: true, min: 0, maxLength: 100})} />
          <input type="text" placeholder="Step 15" {...register("Step 3", {required: true, pattern: /^\S+@\S+$/i})} />
          <input type="text" placeholder="Step 16" {...register("Step 4", {required: true, minLength: 1, maxLength: 12})} />
          <select {...register("Title", { required: true })}>
            <option value="Step">Step</option>
            <option value="Parameter">Parameter</option>
          </select> */}

          <input {...register("Set", { required: true })} type="radio" value="Yes" />
          <input {...register("Set", { required: true })} type="radio" value="No" />

          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default BioreactorSettings;
