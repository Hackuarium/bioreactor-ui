import { useCallback, useState, useEffect } from 'react';
import { Button, Table, Td, Th, useTable } from '../../components/tailwind-ui';
import { getSavedData, clearSavedData } from '../../services/devicesService';
import { msToTime } from '../../services/util';

const ROWS_BY_PAGE = 10;

const HistoryTab = ({ device, refreshInterval }) => {
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);

  // extract headers from the first element on data
  useEffect(() => {
    if (device?._id) {
      getSavedData(device?._id).then((rows) => {
        initHeaders(rows);
        setData(rows);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [device?._id]);

  useEffect(() => {
    if (device?._id && device?.connected) {
      const timeout = setInterval(
        () =>
          getSavedData(device?._id).then((rows) => {
            initHeaders(rows);
            setData(rows);
          }),
        refreshInterval,
      );
      return () => clearInterval(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [device?._id, device?.connected, refreshInterval]);

  const initHeaders = (dataArray) => {
    if (headers.length === 0 && dataArray && dataArray.length > 0) {
      const heads = dataArray[0].parametersArray?.map((h) => h.name || h.label);
      setHeaders(['Time', ...heads]);
    }
  };

  const onClear = () => {
    clearSavedData(device?._id).then(() => setData([]));
  };

  /* A function that returns a table row. */
  const Row = useCallback((val) => {
    const classnames = 'text-xs text-center p-2';
    const timeEpoch = new Date(val.value.epoch).toLocaleTimeString();
    return (
      <tr>
        <Td compact={true} className={classnames + ' font-medium'}>
          {/* {msToTime(val.value.epoch)} */}
          {timeEpoch}
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
    itemsPerPage: ROWS_BY_PAGE,
    withText: true,
  });

  return (
    <div className="w-full">
      <div className="w-full p-2 flex flex-row justify-end">
        <Button size="small" variant="white" onClick={onClear}>
          Clear
        </Button>
      </div>
      <div className="w-full p-1 pb-4 overflow-x-auto">
        <Table
          pagination={pagination}
          data={sliceData.map((d, index) => ({
            ...d,
            id: d.epoch + index,
          }))}
          Header={headerValues}
          Tr={Row}
        />
      </div>
    </div>
  );
};

export default HistoryTab;
