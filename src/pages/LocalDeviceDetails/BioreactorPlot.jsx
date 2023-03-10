import { useState, useEffect, memo } from 'react';

import { getSavedData } from '../../services/devicesService';

// import { msToTime } from '../../services/util';
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

  const paramArray = (data, param = 0) => {
    return data.map((d) => d.parametersArray[param].value);
  };

  const paramEpoch = (data) => {
    // console.log(data.map((d) => msToTime(d.epoch).replaceAll(' ', '')));
    // return data.map((d) => msToTime(d.epoch).replaceAll(' ', ''));
    return data.map((d) => new Date(d.epoch).toLocaleTimeString());
  };

  return (
    <div className="flex flex-col">
      {/* Display Plots */}
      <div className="flex flex-row">
        <div className="flex justify-center">
          <Plot
            data={[
              {
                // x: [1, 2, 3],
                // y: [2, 6, 3],
                x: paramEpoch(data).reverse(),
                y: paramArray(data, 6).reverse(),
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'red' },
              },
            ]}
            layout={{
              title: {
                text: 'Plot Weight',
              },
              xaxis: {
                title: {
                  // standoff: 80,
                  text: 'Time',
                },
                // dtick: 86400000.0,
                nticks: 10,
                // side: 'top',
                tickangle: -45,
              },
              yaxis: {
                title: {
                  text: 'Weight [gr]',
                },
              },
              // width: 500, height: 320,
            }}
          />
        </div>
        <div className="flex justify-center">
          <Plot
            data={[
              {
                // x: [1, 2, 3],
                // y: [2, 6, 3],
                x: paramEpoch(data).reverse(),
                y: paramArray(data, 2).reverse(),
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'red' },
              },
            ]}
            layout={{
              title: {
                text: 'Plot Temperature PCB',
              },
              xaxis: {
                title: {
                  // standoff: 80,
                  text: 'Time',
                  constraintoward: 'left',
                },
                // side: 'top',
                nticks: 10,
                tickangle: -45,
              },
              yaxis: {
                title: {
                  text: 'Temp [°C]',
                },
              },
              // width: 500, height: 320,
            }}
          />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex justify-center">
          <Plot
            data={[
              {
                // x: [1, 2, 3],
                // y: [2, 6, 3],
                x: paramEpoch(data).reverse(),
                y: paramArray(data).reverse(),
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'red' },
              },
            ]}
            layout={{
              title: {
                text: 'Plot Temperature A',
              },
              xaxis: {
                title: {
                  // standoff: 80,
                  text: 'Time',
                },
                // side: 'top',
                nticks: 10,
                tickangle: -45,
              },
              yaxis: {
                title: {
                  text: 'Temp [°C]',
                },
              },
              // width: 500, height: 320,
            }}
          />
        </div>
        <div className="flex justify-center">
          <Plot
            data={[
              {
                // x: [1, 2, 3],
                // y: [2, 6, 3],
                x: paramEpoch(data).reverse(),
                y: paramArray(data, 1).reverse(),
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'red' },
              },
            ]}
            layout={{
              title: {
                text: 'Plot Temperature B',
              },
              xaxis: {
                title: {
                  // standoff: 80,
                  text: 'Time',
                },
                // side: 'top',
                nticks: 10,
                tickangle: -45,
              },
              yaxis: {
                title: {
                  text: 'Temp [°C]',
                },
              },
              // width: 500, height: 320,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(BioreactorPlot);
