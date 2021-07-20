import React, { useEffect, useState } from 'react';
import { Button, Dropdown } from '../../components/tailwind-ui';
import { ReactComponent as TreeDotsIcon } from '../../assets/icons/treeDots.svg';
import devicesManager from '../../services/localDeviceService';
import { COMMANDS } from '../../services/devicesOptions';

const AdvancedTab = ({ device }) => {
  const [deviceId, setDeviceId] = useState();
  const [command, setCommand] = useState('');
  const [results, setResults] = useState('');

  useEffect(() => {
    setDeviceId(device?.id);
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [device?.id]);

  const init = async () => {
    if (device?.id) {
      setCommand(COMMANDS.help);
      const data = await devicesManager.sendCommand(device?.id, COMMANDS.help);
      setResults(data);
    }
  };

  const onSend = async () => {
    if (command) {
      const data = await devicesManager.sendCommand(deviceId, command);
      setResults(data);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSend();
    }
  };

  const onHelp = async () => {
    setCommand(COMMANDS.help);
    const data = await devicesManager.sendCommand(deviceId, COMMANDS.help);
    setResults(data);
    setTimeout(() => document.activeElement.blur(), 100);
  };

  const onSettings = async () => {
    setCommand(COMMANDS.settings);
    const data = await devicesManager.sendCommand(deviceId, COMMANDS.settings);
    setResults(data);
    setTimeout(() => document.activeElement.blur(), 100);
  };

  const handleDropdownSelect = (option) =>
    option.label === 'Help'
      ? onHelp()
      : option.label === 'Settings'
      ? onSettings()
      : null;

  return (
    <div className="w-full   ">
      <div className="flex flex-col">
        <div className="w-full my-1 md:max-w-md flex flex-row">
          <input
            className="w-full py-1 px-2 border rounded-md text-base"
            placeholder="h (for help)"
            style={{ fontFamily: 'monospace' }}
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            className="mx-2 md:mr-0"
            variant="primary"
            size="small"
            onClick={onSend}
          >
            Send
          </Button>
          {/* display just in small screens */}
          <div className="flex ml-4 self-center md:hidden">
            <Dropdown
              options={[
                [
                  { label: 'Help', type: 'option' },
                  { label: 'Settings', type: 'option' },
                ],
              ]}
              onSelect={handleDropdownSelect}
            >
              <TreeDotsIcon className="w-5 h-5" fill="currentColor" />
            </Dropdown>
          </div>
        </div>
        <div className="w-full mt-2 flex flex-col md:flex-row md:max-w-2xl">
          <div className="w-full h-96 md:mr-2 flex md:flex-1 border rounded-md overflow-auto overflow-x-auto">
            <textarea
              className="w-full text-sm font-semibold text-success-400 bg-neutral-900"
              style={{ fontFamily: 'monospace' }}
              value={results}
              onChange={(event) => console.log(event.target.value)}
              disabled
            />
          </div>
          <div className="hidden flex-col md:flex">
            <Button
              className="m-1"
              variant="white"
              size="xSmall"
              onClick={onHelp}
            >
              Help
            </Button>
            <Button
              className="m-1"
              variant="white"
              size="xSmall"
              onClick={onSettings}
            >
              Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedTab;
