import { useState, useEffect} from 'react';
import {Dropdown } from '../tailwind-ui';
import { Axis, LineSeries, Plot, Heading, Legend } from 'react-plot';
import {getSeries} from './deviceParameters'

const DetailsPlot = (props) => {

    const [series,setSeries]=useState([]);

    useEffect(()=>{
      if(props.DetailType){
        setSeries([])
        const list = getSeries(props.DetailType)
        console.log(list)
        setSeries(list)
      }
    },[props])

  const data1 = [
    { x: 0, y: 0 },
    { x: 1, y: 2 },
    { x: 2, y: 5 },
    { x: 3, y: 9 },
    { x: 4, y: 16 },
    { x: 5, y: 22 },
    { x: 6, y: 26 },
    { x: 7, y: 28 },
    { x: 10, y: 28 },
  ];

  return (
      <div>
      <div className="flex space-x-100 m-4">
            <div class="flex-1">
              <h2 class="text-2xl ">Variations Chart</h2>
              <p class="text-sm text-gray-500">Chart of variations of the device.</p>
            </div>
            <div className="flex-2 object-right">
              <Dropdown
                onSelect={function noRefCheck(){}}
                options={[
                  [
                    {
                      label: '1 hour',
                      type: 'option'
                    },
                    {
                      label: '1 day',
                      type: 'option'
                    },
                    {
                      label: '1 month',
                      type: 'option'
                    },
                    {
                      label: '1 year',
                      type: 'option'
                    }
                  ]
                ]}
                title="Diplay per"
              />
            </div>
            
          </div>

        <div className="w-max h-max m-2 p-4 flex justify-center items-center rounded-md bg-white shadow"> 
            <Plot
            width={900}
            height={400}
            margin={{ bottom: 50, left: 55, top: 20, right: 20 }}
            seriesViewportStyle={{
                stroke: 'black',
                strokeWidth: 0.3,
            }}
            >
            <Heading title={props.Header}/>

            <Axis id="x" position="bottom" label="Time" labelSpace={25} />
            <Axis id="y" position="left" label="%" labelSpace={40} paddingEnd={0.1}/>

            {
                series.length!==0?
                series.map(s=>
                    <LineSeries
                        data={data1}
                        xAxis="x"
                        yAxis="y"
                        lineStyle={{ stroke: s.color, strokeWidth: 2 }}
                        label={s.name}
                    />
                )
                :null
            }
            <Legend position="embedded" bottom="80" left="0"></Legend>
            </Plot>
        </div>

      </div>

  );
};

export default DetailsPlot;