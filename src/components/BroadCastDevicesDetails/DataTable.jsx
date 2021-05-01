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
        console.log(params)
        setParameters(params)
      }
      setCount(props.previousData.length)
    },[props])

    return (
    <div class="my-1 overflow-scroll w-24 min-w-full md:min-w-0  bg-white w-full rounded-lg ">
      <div className="flex space-x-100 m-4">
            <div class="flex-1">
              <h2 class="text-2xl ">Previous Details</h2>
              <p class="text-sm text-gray-500">Previous details of the device.</p>
            </div>
          </div>
        <Table
          class="min-w-full table-auto "
          Header={() => (
            parameters.length!==0?
              <tr class="bg-primary-900">
                {
                  parameters.map(p=>
                    <th class="px-4 py-2">
                      <span class="text-white">{p.name+' '+p.unit}</span>
                    </th>
                  )
                }
              </tr>
            :null
          )}
          Tr={({ value }) =>
            value && value.doc.parameters ? (
              <tr class="bg-white border-4 border-gray-200 text-center">
              {
                  parameters.map(p=>
                    {return p.name==='Date'?
                    <td class="px-4 py-2">
                      <span >dd/mm/yy HH:MM:ss</span>
                    </td>
                    :
                    <td class="px-4 py-2">
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
            itemsPerPage: 10,
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