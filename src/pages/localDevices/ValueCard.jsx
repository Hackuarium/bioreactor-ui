const ValueCard = ({
  title,
  value,
  unit,
  placeholder,
  type = 'text',
  editable,
  onChange,
}) => {
  return (
    <div className="w-full m-1 p-2 flex flex-col justify-between items-center sm:items-start rounded-md bg-white shadow transform transition-all">
      <h3 className="py-1 text-sm font-medium text-gray-500">{title}</h3>
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
  );
};

export default ValueCard;
