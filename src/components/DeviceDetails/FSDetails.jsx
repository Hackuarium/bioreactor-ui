import { useState, useEffect} from 'react';
import { Table ,Dropdown } from '../tailwind-ui';
import FSPlot from './FSPlot'

const FSDetails = (props)=>{

    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(50);

    useEffect(()=>{
        setCount(props.previousData.length)
    },[props])

    return (
    <div class="m-2 ">
    <div class="sm:flex sm:space-x-4">
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
              <div class="bg-white p-5">
                  <div class="sm:flex sm:items-start">
                      <div class="text-center sm:mt-0 sm:ml-2 sm:text-left">
                          <h3 class="text-sm leading-6 font-medium text-gray-400">Min</h3>
                          <p class="text-3xl font-bold text-black">71,897</p>
                      </div>
                  </div>
              </div>
          </div>
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
              <div class="bg-white p-5">
                  <div class="sm:flex sm:items-start">
                      <div class="text-center sm:mt-0 sm:ml-2 sm:text-left">
                          <h3 class="text-sm leading-6 font-medium text-gray-400">Max</h3>
                          <p class="text-3xl font-bold text-black">58.16%</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div class="  my-1   bg-white w-full rounded-lg ">
      <div className="flex space-x-100 m-4">
            <div class="flex-1">
              <h2 class="text-2xl ">Previous Details</h2>
              <p class="text-sm text-gray-500">Previous details of the device.</p>
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
        <Table
          class="min-w-full table-auto"
          Header={() => (
            <tr class="bg-primary-900">
              <th class="px-4 py-2">
                <span class="text-white">Date</span>
              </th>
              <th class="px-4 py-2">
                <span class="text-white">FS min</span>
              </th>
              <th class="px-4 py-2">
                <span class="text-white">FS mix</span>
              </th>
            </tr>
          )}
          Tr={({ value }) =>
            value && value.doc.parameters ? (
              <tr class="bg-white border-4 border-gray-200 text-center">
                <td class="px-4 py-2">
                  <span>dd/mm/yy HH:MM:ss</span>
                </td>
                <td class="px-4 py-2">
                  <span>{value.doc.parameters.N}</span>
                </td>
                <td class="px-4 py-2">
                  <span>{value.doc.parameters.O}</span>
                </td>
              </tr>
            ) : null
          }
          data={props.previousData}
          pagination={{
            itemsPerPage: 10,
            onPageChange: (page) => {
              setCurrentPage(page);
            },
            page: currentPage,
            totalCount: count,
            withText: true,
          }}
        />
      </div>
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
          <FSPlot/>

    </div>
  );
}

export default FSDetails