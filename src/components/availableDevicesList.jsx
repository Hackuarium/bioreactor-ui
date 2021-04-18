import {
  SvgOutlineChevronRight,
  SvgSolidCog,
  SvgSolidTrash,
} from '../components/tailwind-ui';

const AvailableDevicesList = ({ data, onSelect, onEdit, onDelete }) => {
  return (
    <div>
      <div className="w-full flex flex-row items-center">
        <h3 className="w-max ml-2 mr-4 text-neutral-600 text-sm font-semibold whitespace-nowrap ">
          Available devices
        </h3>
        <div className="w-full border-t border-neutral-300" />
      </div>
      <div className="h-4" />
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        {data.map((element) => (
          <li
            key={element.kind + element.name}
            className="block transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:bg-gray-50 cursor-pointer"
            onClick={(e) => onSelect(element, e)}
          >
            <div className="flex items-center px-4 py-4 sm:px-6">
              <div className="flex items-center flex-1 min-w-0">
                <div className="flex-1 min-w-0 px-4 md:grid md:grid-col-2 md:gap-4">
                  <p className="col-span-2 text-lg font-semibold truncate text-primary-700">
                    {element.name}
                  </p>
                  <div className="flex flex-col text-sm font-italic text-neutral">
                    <p className="truncate">
                      <span className="font-semibold">URL : </span>
                      {element.url}
                    </p>
                    <p className="truncate">
                      <span className="font-semibold">Topic : </span>
                      {element.topic}
                    </p>
                  </div>
                  <div className="pt-2 md:pt-0 flex justify-end items-center cursor-default">
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
    </div>
  );
};

export default AvailableDevicesList;
