import { useState, useEffect} from 'react';
import { Table } from '../tailwind-ui';
import {getParams} from './deviceParameters'

const DataTable = (props)=>{

    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(50);
    const [parameters,setParameters]=useState([]);

    useEffect(()=>{
      if(props.DetailType){
        const params = getParams(props.DetailType)
        setParameters(params)
      }
      setCount(props.previousData.length)
    },[props])

    const EpochToDate=(epoch)=> {
      if (epoch < 10000000000)
          epoch *= 1000; // convert to milliseconds (Epoch is usually expressed in seconds, but Javascript uses Milliseconds)
      var epoch = epoch + (new Date().getTimezoneOffset() * -1); //for timeZone        
      return new Date(epoch);
    }

    return (
    <div className="my-1 overflow-scroll w-24 min-w-full md:min-w-0  bg-white w-full rounded-lg ">
      <div className="flex space-x-100 m-4">
            <div className="flex-1">
              <h2 className="text-2xl ">Previous Details</h2>
              <p className="text-sm text-gray-500">Previous details of the device.</p>
            </div>
          </div>
        <Table
        className="min-w-full table-auto "
          Header={() => (
            parameters.length!==0?
              <tr className="bg-primary-900">
                {
                  parameters.map((p,key)=>
                    <th key={key} className="px-4 py-2">
                      <span className="text-white">{p.name+' '+p.unit}</span>
                    </th>
                  )
                }
              </tr>
            :null
          )}
          Tr={({ value }) =>
            value && value.doc.parameters ? (
              <tr className="bg-white border-4 border-gray-200 text-center">
              {
                  parameters.map((p,key)=>
                    {
                    return p.name==='Date'?
                    <td className="px-4 py-2" key={key}>
                      <span >{EpochToDate(value.doc.epoch).toLocaleString()}</span>
                    </td>
                    :
                    <td className="px-4 py-2" key={key}>
                      <span>{eval('value.doc.parameters.'+p.label)}</span>
                    </td>
                    }
                  )
                }
              </tr>
            ) : null
          }
          data={props.previousData}
          pagination={{
            itemsPerPage: 100,
            onPageChange: (page) => {
              props.setCurrentPage(page);
            },
            page: props.currentPage,
            totalCount: props.count,
            withText: true,
          }}
        />
    </div>
  );
}

export default DataTable