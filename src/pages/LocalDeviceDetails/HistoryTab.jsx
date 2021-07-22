import { useCallback, useState, useEffect } from 'react';
import { Table, Td, Th, useTable } from '../../components/tailwind-ui';

const HistoryTab = ({ data }) => {
  const [headers, setHeaders] = useState([]);

  // extract headers from the first element on data (just the first time )
  useEffect(() => {
    const heads =
      data && data.length > 0
        ? data[0].parametersArray?.map((h) => h.name || h.label)
        : [];
    setHeaders(['Epoch', ...heads]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Row = useCallback((val) => {
    const classnames = 'text-xs text-center p-2';
    return (
      <tr>
        <Td compact={true} className={classnames + ' font-medium'}>
          {val.value.epoch}
        </Td>
        {val.value.parametersArray?.map((p, index) => (
          <Td key={index} compact={true} className={classnames}>
            {p.value}
          </Td>
        ))}
      </tr>
    );
  }, []);

  const headerValues = useCallback(() => {
    return (
      <tr>
        {headers?.map((h) => (
          <Th
            key={h}
            className="p-2 text-center font-normal normal-case"
            compact={true}
          >
            {h}
          </Th>
        ))}
      </tr>
    );
  }, [headers]);

  const { pagination, data: sliceData } = useTable(data, {
    itemsPerPage: 10,
    withText: true,
  });

  return (
    <div className="w-full p-1 overflow-x-auto">
      <Table
        pagination={pagination}
        data={sliceData.map((d) => ({ ...d, id: d.epoch }))}
        Header={headerValues}
        Tr={Row}
      />
    </div>
  );
};

export default HistoryTab;
