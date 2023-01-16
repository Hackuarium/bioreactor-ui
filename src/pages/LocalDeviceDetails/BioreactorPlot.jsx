import { useState, useEffect, memo, useCallback } from 'react';

import { getSavedData, clearSavedData } from '../../services/devicesService';

import { msToTime } from '../../services/util';
import Plot from 'react-plotly.js';


const BioreactorPlot = ({ device, refreshInterval }) => {
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

  const paramArray = (data) => {
    return data.map((d) => d.parametersArray[0].value);
  };

  const paramEpoch = (data) => {
    return data.map((d) => msToTime(d.epoch));
  };

  console.log('data', data);

  console.log('param', data.map((d) => d.parametersArray[0].value));

  console.log('epoch', data.map((d) => msToTime(d.epoch)));

  return (
    <div className="flex flex-col">
      {/* Display Plot */}
      <div className="flex justify-center ">
        <Plot
          data={[
            {
              // x: [1, 2, 3],
              // y: [2, 6, 3],
              x: paramEpoch(data).reverse(),
              y: paramArray(data).reverse(),
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            },
          ]}
          layout={{ 
              title: {
                text:'Plot Temperature',
              },
              xaxis: {
                title: {
                  text: 'x Axis',
                },
                // side: 'top',
              },
              yaxis: {
                title: {
                  text: 'Temp [°C]',
                }
              }
            }
          }
        />
      </div>
    </div>
  );
};

export default memo(BioreactorPlot);