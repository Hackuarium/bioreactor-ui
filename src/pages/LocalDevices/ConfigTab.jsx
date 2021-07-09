import { useState, useEffect } from 'react';

import { Button, Dropdown } from '../../components/tailwind-ui';
import DividerCustom from '../../components/DividerCustom';
import useNotification from '../../hooks/useNotification';
import devicesManager from '../../services/localDeviceService';
import { COMMANDS } from './../../services/devicesOptions';
import CardInput from '../../components/CardInput';

const intervals = [1, 2, 5, 10, 30, 60, 120, 300].map((v) => ({
  label: v > 59 ? `${v / 60} m` : `${v} s`,
  value: v * 1000,
  type: 'option',
}));

const ConfigTab = ({
  device,
  data,
  refreshInterval = 1000,
  setRefreshInterval,
}) => {
  const { addInfoNotification, addErrorNotification } = useNotification();
  const [writableParams, setWritableParams] = useState([]);
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

  const onSaveValue = async (key, value) => {
    try {
      console.log(key + ' : ' + value);
      await devicesManager.sendCommand(
        device.id,
        COMMANDS.setParameter(key, value),
      );
      reRender();
      addInfoNotification('saved', '', 500);
    } catch (e) {
      addErrorNotification(e.message);
    }
  };

  return (
    <div className="w-full flex flex-col ">
      <div className="mt-2 flex flex-col sm:flex-row justify-between">
        <div className="my-1 mx-2 flex flex-row items-center justify-end">
          <p className="mx-1 text-sm font-medium text-neutral-700">
            Refresh inreval :
          </p>
          <Dropdown
            title={_refreshInterval.label}
            options={[intervals]}
            onSelect={OnRefreshIntervalChanged}
          />
        </div>
        <div className="my-1 flex flex-row justify-end">
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
              <CardInput
                key={index}
                id={p.key}
                title={p.name || p.label}
                initialValue={p.value * p.factor}
                placeholder={p.name}
                unit={p.unit}
                info={p.description}
                onSave={onSaveValue}
                onChange={(newValue) => onValueChanged(p.label, newValue)}
                className="w-full sm:w-1/2  md:w-1/3 lg:w-1/4 flex"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ConfigTab;
