import { useState, useEffect} from 'react';
import {getParams} from './deviceParameters'

const ActualDetails = (props)=>{

    const [parameters,setParameters]=useState([]);

    useEffect(()=>{
      if(props.DetailType){
        const params = getParams(props.DetailType)
        console.log(params)
        setParameters(params)
      }
    },[props])

    return (
    <div >
        {
            parameters.length!==0?
            <div class="sm:flex sm:space-x-4">
                {
                    parameters.map(p=>
                        p.name!=='Date' && props.data[0]?
                        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                            <div class="bg-white p-5">
                                <div class="sm:flex sm:items-start">
                                    <div class="text-center sm:mt-0 sm:ml-2 sm:text-left">
                                        <h3 class="text-sm leading-6 font-medium text-gray-400">{p.name}</h3>
                                        <p class="text-3xl font-bold text-black">{eval('props.data[0].parameters.'+p.label)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :null
                    )
                }
                
            </div>
            :null
        }
   
    </div>
  );
}

export default ActualDetails