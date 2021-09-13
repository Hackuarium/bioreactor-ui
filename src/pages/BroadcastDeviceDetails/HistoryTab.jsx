import React, { useState, useCallback, useEffect } from 'react';
import { throttle } from 'lodash';
import { Button, Table, Td, Th } from '../../components/tailwind-ui';

import {
  getSavedDataCount,
  getSavedDataByPage,
  mapParameters,
  clearSavedData,
  listenToDataChanges,
} from '../../services/devicesService';
import { msToTime } from '../../services/util';

const ROWS_BY_PAGE = 10;

const HistoryTab = ({ device }) => {
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [initDataListener, setInitDataListener] = useState(false);

  // initialize headers the first time the data is received
  const initHeaders = useCallback(
    (dataArray) => {
      if (headers.length === 0 && dataArray && dataArray.length > 0) {
        const heads = dataArray[0]?.parametersArray?.map(
          (h) => h.name || h.label,
        );
        setHeaders(['Time', ...heads]);
      }
    },
    [headers.length],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getDataByPage = useCallback(
    throttle(
      (_page) => {
        if (device?._id) {
          getSavedDataByPage(device?._id, _page, ROWS_BY_PAGE).then((_data) => {
            const params = _data.map((d) => ({
              epoch: msToTime(d?.epoch),
              parametersArray: mapParameters(device?.kind?.kind, d?.parameters),
            }));
            initHeaders(params);
            setData(params);
            getSavedDataCount(device?._id).then(setCount);
          });
        }
      },
      1000, // execute it just one time if it's called multiple times in 500ms
      { trailing: true },
    ),
    [device?._id, device?.kind?.kind, initHeaders],
  );

  useEffect(() => {
    let unsubscribe;
    if (device?._id) {
      unsubscribe = listenToDataChanges(
        device?._id,
        (res) => {
          getDataByPage(page);
        },
        (err) => console.log(err),
      );
    }
    return () => unsubscribe && unsubscribe.cancel();
  }, [device?._id, getDataByPage, page, initDataListener]);

  useEffect(() => {
    getDataByPage(page);
  }, [getDataByPage, page]);

  const onClear = () => {
    // destroy & re-create DB
    clearSavedData(device?._id).then(() => {
      getSavedDataCount(device?._id).then(() => {
        setInitDataListener(!initDataListener);
        setData([]);
        setPage(1);
        setCount(0);
        document.activeElement.blur();
      });
    });
  };

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

  const Empty = () => (
    <div className="mx-5 mt-4 flex flex-col items-center">
      <h3 className="text-md font-semibold text-gray-300 leading-loose">
        No saved data
      </h3>
    </div>
  );

  return (
    <div className="w-full">
      <div className="w-full p-2 flex flex-row justify-end">
        <Button size="small" variant="white" onClick={onClear}>
          Clear
        </Button>
      </div>
      <div className="w-full p-1 pb-4 overflow-x-auto">
        <Table
          pagination={{
            totalCount: count,
            page: page,
            onPageChange: setPage,
            withText: true,
            itemsPerPage: ROWS_BY_PAGE,
            maxVisiblePages: 1,
          }}
          data={data.map((d, index) => ({
            ...d,
            id: d.epoch + index,
          }))}
          Header={headerValues}
          Tr={Row}
          itemsPerPage={ROWS_BY_PAGE}
          Empty={Empty}
        />
      </div>
    </div>
  );
};

export default HistoryTab;
