import React, { useState, useEffect } from 'react';

import { Button, Spinner, Dropdown } from '../../components/tailwind-ui';
import useNotification from '../../hooks/useNotification';
import devicesManager from '../../services/localDeviceService';
import { COMMANDS } from './../../services/devicesOptions';
import ValueCard from './ValueCard';
import DividerCustom from '../../components/DividerCustom';

const intervals = [
  {
    label: '1 s',
    value: 1000,
    type: 'option',
  },
  {
    label: '2 s',
    value: 2000,
    type: 'option',
  },
  {
    label: '5 s',
    value: 5000,
    type: 'option',
  },
  {
    label: '10 s',
    value: 10000,
    type: 'option',
  },
];

const ConfigTab = ({
  device,
  data,
  refreshInterval = 1000,
  setRefreshInterval,
}) => {
  const { addInfoNotification, addErrorNotification } = useNotification();
  const [writableParams, setWritableParams] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [_refreshInterval, _setRefreshInterval] = useState({
    label: refreshInterval / 1000 + ' s',
    value: refreshInterval,
    type: 'option',
  });
  const [render, setRender] = useState(false);

  useEffect(() => {
    const parameters = data?.parameters;
    const values =
      parameters &&
      Object.keys(parameters)
        .filter((key) => parameters[key].writable)
        .map((key) => ({ ...parameters[key], key }));
    setWritableParams(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  const reRender = () => {
    setTimeout(() => {
      setRender(!render);
    }, 1000);
  };

  const OnRefreshIntervalChanged = (option) => {
    _setRefreshInterval(option);
    setRefreshInterval(option.value);
    document.activeElement.blur();
  };

  const onReset = async () => {
    try {
      const resultMsg = await devicesManager.sendCommand(
        device.id,
        COMMANDS.reset,
      );
      addInfoNotification(resultMsg);
      reRender();
    } catch (e) {
      addErrorNotification(e.message);
    }
    document.activeElement.blur();
  };

  const onSleep = async () => {
    try {
      await devicesManager.sendCommand(device.id, COMMANDS.sleep);
    } catch (e) {
      addErrorNotification(e.message);
    }
    document.activeElement.blur();
  };

  const onValueChanged = (label, value) => {
    const newValues = writableParams.map((v) =>
      v.label === label ? { ...v, value: value / v.factor, edited: true } : v,
    );
    setWritableParams(newValues);
  };

  const onSave = async () => {
    setShowSpinner(true);
    let saved = false;
    try {
      for (let v of writableParams) {
        if (v.edited) {
          console.log(v.key + v.value);
          await devicesManager.sendCommand(
            device.id,
            COMMANDS.setParameter(v.key, v.value),
          );
          saved = true;
        }
      }
      saved
        ? addInfoNotification('Saved')
        : addInfoNotification('No changes to save');
      reRender();
    } catch (e) {
      addErrorNotification(e.message);
    }
    setShowSpinner(false);
    document.activeElement.blur();
  };

  return (
    <div className="w-full flex flex-col ">
      <div className="mt-2 flex flex-row justify-between">
        <div className="flex flex-row items-center z-10">
          <p className="mx-2 text-sm font-medium text-neutral-700">
            Refresh inreval :
          </p>
          <Dropdown
            title={_refreshInterval.label}
            options={[intervals]}
            onSelect={OnRefreshIntervalChanged}
          />
        </div>
        <div className="flex flex-row justify-end">
          <Button className="mx-2" variant="white" onClick={onSleep}>
            Sleep
          </Button>
          <Button className="mx-2 " variant="white" onClick={onReset}>
            Reset Device
          </Button>
        </div>
      </div>

      {writableParams?.length > 0 && (
        <>
          <DividerCustom title="Edit parameters" />
          <div className="flex flex-row justify-start flex-wrap">
            {writableParams.map((p, index) => (
              <ValueCard
                key={index}
                title={p.name || p.label}
                value={p.value * p.factor}
                placeholder={p.description}
                unit={p.unit}
                editable={true}
                onChange={(newValue) => onValueChanged(p.label, newValue)}
                className="w-full sm:w-1/2  md:w-1/3 lg:w-1/4 flex"
              />
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

export default ConfigTab;
