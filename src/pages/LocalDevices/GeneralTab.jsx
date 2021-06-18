import useNotification from '../../hooks/useNotification';
import devicesManager from '../../services/localDeviceService';
import { COMMANDS } from './../../services/devicesOptions';

import DividerCustom from '../../components/DividerCustom';
import { Button } from '../../components/tailwind-ui';
import ValueCard from './ValueCard';

const GeneralTab = ({ data, device }) => {
  const { addInfoNotification, addErrorNotification } = useNotification();

  const onSendCommand = async (command) => {
    try {
      const resultMsg = await devicesManager.sendCommand(device.id, command);
      console.log('runExpirement');
      console.log(resultMsg);
      addInfoNotification(resultMsg);
    } catch (e) {
      console.log('runExpirement error');
      console.log(e);
      addErrorNotification(e);
    }
    document.activeElement.blur();
  };

  return (
    <div className="flex flex-col mt-2">
      <div className="flex flex-row justify-end">
        <Button
          className="mx-2"
          onClick={() => onSendCommand(COMMANDS.runExpirement)}
        >
          Run experiment
        </Button>
        <Button
          className="mx-2"
          onClick={() => onSendCommand(COMMANDS.kinetic)}
        >
          Run Kinetic
        </Button>
      </div>
      {data?.epoch && (
        <DividerCustom
          title={
            <p className=" text-base font-medium text-black self-start">
              Awake time:
              <span className="mx-1 text-sm text-neutral-500">
                {data?.epoch / 1000 + 's'}
              </span>
            </p>
          }
        />
      )}
      <div className=" flex flex-row justify-around flex-wrap">
        {data?.parametersArray?.map((param, index) => (
          <ValueCard
            key={index}
            title={param.name || param.label}
            value={param.value * param.factor}
            unit={param.unit}
            className="w-full sm:w-1/2  md:w-1/3 lg:w-1/4 flex"
          />
        ))}
      </div>
    </div>
  );
};

export default GeneralTab;
