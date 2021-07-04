import clsx from 'clsx';
import { ReactComponent as InfoIcon } from '../assets/icons/information.svg';

const ValueCard = ({
  title,
  value,
  unit,
  placeholder,
  info,
  type = 'text',
  editable,
  onChange,
  className,
}) => {
  return (
    <div className={clsx('flex', className)}>
      <div className="w-full m-1 p-2 flex flex-col justify-between items-center sm:items-start rounded-md bg-white shadow">
        <div className="w-full py-1 flex flex-row justify-between items-start relative">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          {info && (
            <div className=" group">
              <InfoIcon
                height="12"
                width="12"
                className="my-1 fill-current text-neutral-400 group-hover:text-primary-600"
              />
              <div
                className="absolute bottom-full right-0 hidden group-hover:flex z-10 p-1 bg-neutral-50 shadow-md rounded"
                max-content={100}
              >
                <span className=" text-xs text-neutral-500 ">{info}</span>
              </div>
            </div>
          )}
        </div>
        <div className="w-full mt-2 flex flex-row justify-center sm:justify-end items-center">
          {editable ? (
            <input
              className="w-full p-1 bg-neutral-50 border-neutral-200 text-right text-black text-sm font-bold placeholder-neutral-500 placeholder-opacity-30 rounded  focus:outline-none focus:ring-0 leading-none"
              id={title}
              name={title}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={(event) => onChange(event.target.value)}
            />
          ) : (
            <p className="text-xl font-bold text-black">{value}</p>
          )}
          <p className="ml-1 text-sm font-medium text-gray-400">{unit}</p>
        </div>
      </div>
    </div>
  );
};

export default ValueCard;
