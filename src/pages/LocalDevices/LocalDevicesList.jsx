import React from 'react';
import {
  SvgOutlineChevronRight,
  SvgSolidCog,
  SvgSolidTrash,
} from '../../components/tailwind-ui';

const LocalDevicesList = ({ data, onSelect, onEdit, onDelete }) => {
  const handleSelect = async (element, e) => {
    console.log(element);
  };

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      {data.map((element) => (
        <li
          key={element.id}
          className="block transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:bg-gray-50 cursor-pointer"
          onClick={(e) => handleSelect(element, e)}
        >
          <div className="relative flex items-center px-4 py-4 sm:px-6">
            <div className="flex items-center flex-1 min-w-0">
              <div className="flex-1 min-w-0 px-4 sm:grid sm:grid-col-2 sm:gap-4">
                <p className="col-span-2 text-lg font-semibold truncate text-primary-700">
                  {element.name}
                </p>
                <div className="pt-2 sm:pt-0 flex flex-col text-xs font-italic text-neutral-600 justify-center">
                  <p className="truncate">
                    <span className="font-semibold">{element?.kind?.name}</span>
                  </p>
                </div>
                <div className="pt-2 sm:pt-0 flex justify-end items-center cursor-default">
                  <button
                    className="mx-1 p-2 border rounded shadow-sm bg-neutral-100 focus:outline-none active:bg-neutral-200"
                    onClick={(e) => onEdit(element, e)}
                  >
                    <SvgSolidCog className="text-gray-700" />
                  </button>
                  <button
                    className="mx-1 p-2 border rounded shadow-sm bg-neutral-100 focus:outline-none active:bg-neutral-200"
                    onClick={(e) => onDelete(element, e)}
                  >
                    <SvgSolidTrash className="text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <SvgOutlineChevronRight className="w-5 h-5 text-neutral-400" />
            </div>
          </div>
          <div className="w-full border-t border-neutral-100" />
        </li>
      ))}
    </div>
  );
};

export default LocalDevicesList;
