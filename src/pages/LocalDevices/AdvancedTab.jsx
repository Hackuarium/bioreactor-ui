import React from 'react';
import { Button, Dropdown } from '../../components/tailwind-ui';
import { ReactComponent as TreeDotsIcon } from '../../assets/icons/treeDots.svg';

const AdvancedTab = () => {
  return (
    <div className="w-full   ">
      <div className="flex flex-col">
        <div className="w-full my-1 md:max-w-md flex flex-row">
          <input
            className="w-full py-1 px-2 border rounded-md"
            placeholder="h (for help)"
          />
          <Button className="mx-2 md:mr-0" variant="primary" size="small">
            Send
          </Button>
          {/* display just in small screens */}
          <div className="flex ml-4 self-center md:hidden">
            <Dropdown
              options={[
                [
                  { label: 'Reset', type: 'option' },
                  { label: 'Sleep', type: 'option' },
                  { label: 'Refresh', type: 'option' },
                ],
              ]}
            >
              <TreeDotsIcon className="w-5 h-5" fill="currentColor" />
            </Dropdown>
          </div>
        </div>
        <div className="w-full mt-2 flex flex-col md:flex-row md:max-w-2xl">
          <div className="w-full h-96 md:mr-2 flex md:flex-1 border rounded-md overflow-auto overflow-x-auto"></div>
          <div className="hidden flex-col md:flex">
            <Button className="m-1" variant="white" size="xSmall">
              Reset
            </Button>
            <Button className="m-1" variant="white" size="xSmall">
              Sleep
            </Button>
            <Button className="m-1" variant="white" size="xSmall">
              Refresh
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedTab;
