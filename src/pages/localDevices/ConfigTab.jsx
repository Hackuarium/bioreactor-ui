import React, { useState, useEffect } from 'react';

import { Button, Divider, Spinner } from '../../components/tailwind-ui';
import useNotification from '../../hooks/useNotification';
import { getLocalDevicesManager } from '../../services/localDeviceService';
import { COMMANDS } from './../../services/devicesOptions';
import ValueCard from './ValueCard';

const ConfigTab = ({ device, data }) => {
  const devicesManager = getLocalDevicesManager();
  const { addInfoNotification } = useNotification();
  const [values, setValues] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const writableParams = data?.filter((p) => p.writable);
    setValues(writableParams);
  }, [data]);

  const onReset = async () => {
    const resultMsg = await devicesManager.sendCommand(
      device.id,
      COMMANDS.reset,
    );
    addInfoNotification(resultMsg);
    document.activeElement.blur();
  };

  const onSleep = () => {
    console.log('sleep');
    document.activeElement.blur();
  };

  const onValueChanged = (label, value) => {
    const newValues = values.map((v) =>
      v.label === label ? { ...v, value: value / v.factor } : v,
    );
    setValues(newValues);
  };

  const onSave = async () => {
    setShowSpinner(true);
    for (let v of values) {
      console.log(v.label + v.value);
      await devicesManager.sendCommand(
        device.id,
        COMMANDS.setParameter(v.label, v.value),
      );
    }
    addInfoNotification('Saved');
    setShowSpinner(false);
    document.activeElement.blur();
  };

  return (
    <div className="w-full flex flex-col ">
      <div className="mt-2 flex flex-row-reverse justify-start">
        <Button className="mx-2 " variant="white" onClick={onReset}>
          Reset Device
        </Button>
        <Button className="mx-2" variant="white" onClick={onSleep}>
          Sleep
        </Button>
      </div>

      {values?.length > 0 && (
        <>
          <DividerCustom title="Edit parameters" />
          <div className="flex flex-row justify-start flex-wrap">
            {values.map((p, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2  md:w-1/3 lg:w-1/4 flex"
              >
                <ValueCard
                  title={p.name || p.label}
                  value={p.value * p.factor}
                  placeholder={p.description}
                  unit={p.unit}
                  editable={true}
                  onChange={(newValue) => onValueChanged(p.label, newValue)}
                />
              </div>
            ))}
          </div>

          <Button
            className="mx-2 mt-2 flex self-end"
            variant="white"
            onClick={onSave}
          >
            {showSpinner && (
              <Spinner className="text-primary-600 w-5 mr-2"></Spinner>
            )}
            Save
          </Button>
        </>
      )}
    </div>
  );
};

const DividerCustom = ({ title }) => {
  return (
    <div className="my-4">
      <Divider justify="start">
        <span className="px-2 bg-white text-xs font-medium text-neutral-400">
          {title}
        </span>
      </Divider>
    </div>
  );
};

export default ConfigTab;
