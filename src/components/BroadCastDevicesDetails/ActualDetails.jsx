import { useState, useEffect} from 'react';
import {getParams} from './deviceParameters'

const ActualDetails = (props)=>{

    const [parameters,setParameters]=useState([]);

    useEffect(()=>{
      if(props.DetailType){
          //console.log(props.data)
        const params = getParams(props.DetailType)
        setParameters(params)
      }
    },[props])

    return (
    <div >
        {
            parameters.length!==0?
            <div className="sm:flex sm:space-x-4">
                {
                    parameters.map((p,key)=>
                        p.name!=='Date' && props.data[0]?
                        <div key={key} className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                            <div className="bg-white p-5">
                                <div className="sm:flex sm:items-start">
                                    <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                                        <h3 className="text-sm leading-6 font-medium text-gray-400">{p.name}</h3>
                                        <p className="text-3xl font-bold text-black">{eval('props.data[0].parameters.'+p.label)}</p>
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