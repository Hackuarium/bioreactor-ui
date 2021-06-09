import React, { useState, useEffect } from 'react';
import { parseCurrentSettings } from 'legoino-util';

import { Button, Spinner } from '../../components/tailwind-ui';
import useNotification from '../../hooks/useNotification';
import devicesManager from '../../services/localDeviceService';
import { COMMANDS } from './../../services/devicesOptions';
import ValueCard from './ValueCard';
import DividerCustom from '../../components/DividerCustom';

const ConfigTab = ({ device, deviceType }) => {
  const { addInfoNotification } = useNotification();
  const [values, setValues] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);

  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      if (device?.id) {
        const compressedResults = await devicesManager.sendCommand(
          device?.id,
          COMMANDS.compactSettings,
        );
        const results = parseCurrentSettings(compressedResults, {
          kind: deviceType,
          // parameterLabel: true,
          parameterInfo: true,
          parametersArray: true,
        });
        setData(results);
        // console.log(results);
      } else {
        // no device || device has disconnected
        setData({});
      }
    };
    getData();
  }, [device?.id, deviceType]);

  useEffect(() => {
    const writableParams = data?.parametersArray?.filter((p) => p.writable);
    setValues(writableParams);
  }, [data?.parametersArray]);

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
      v.label === label ? { ...v, value: value / v.factor, edited: true } : v,
    );
    setValues(newValues);
  };

  const onSave = async () => {
    setShowSpinner(true);
    let saved = false;
    for (let v of values) {
      if (v.edited) {
        console.log(v.label + v.value);
        await devicesManager.sendCommand(
          device.id,
          COMMANDS.setParameter(v.label, v.value),
        );
        saved = true;
      }
    }
    saved
      ? addInfoNotification('Saved')
      : addInfoNotification('No change to save');
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
