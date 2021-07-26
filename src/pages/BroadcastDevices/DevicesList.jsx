import { useState } from 'react';
import {
  Spinner,
  SvgOutlineChevronRight,
  SvgSolidCog,
  SvgSolidTrash,
} from '../../components/tailwind-ui';

const DevicesList = ({ data, onSelect, onEdit, onDelete }) => {
  const [selectedElement, setSelectedElement] = useState();

  const handleSelect = async (element, e) => {
    // ignore click if another element is already selected (is loading)
    if (!selectedElement) {
      setSelectedElement(element);
      const callback = () => setSelectedElement(null);
      onSelect(element, e, callback);
    }
  };
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      {data.map((element) => (
        <li
          key={element.kind?.kind + element.name}
          className="block transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:bg-gray-50 cursor-pointer"
          onClick={(e) => handleSelect(element, e)}
        >
          <div className="relative flex items-center px-4 py-4 sm:px-6">
            {selectedElement === element && ( // if element is selected, display spinner
              <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-neutral-300">
                <div className="w-full h-full flex justify-center items-center">
                  <Spinner className="w-8 h-8 text-primary-800" />
                </div>
              </div>
            )}
            <div className="flex items-center flex-1 min-w-0">
              <div className="flex-1 min-w-0 px-4 sm:grid sm:grid-col-2 sm:gap-4">
                <p className="col-span-2 text-lg font-semibold truncate text-primary-700">
                  {element.name}
                </p>
                <div className="flex flex-col text-xs font-italic text-neutral-600">
                  <p className="truncate">
                    <span className="font-semibold">Device kind : </span>
                    {element.kind?.kind}
                  </p>
                  <p className="truncate">
                    <span className="font-semibold">URL : </span>
                    {`${element.protocol}://${element.url}:${element.port}`}
                  </p>
                  <p className="truncate">
                    <span className="font-semibold">Topic : </span>
                    {element.topic}
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

export default DevicesList;
