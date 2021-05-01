import { useEffect} from 'react';
import DataTable from './DataTable'
import ActualDetails from './ActualDetails'
import DetailsPlot from './DetailsPlot'

const Details = (props)=>{

    useEffect(()=>{

    },[props])

    return (
    <div class="m-2 ">
      
      <ActualDetails DetailType={props.DetailType} data={props.data}/>

      <DataTable previousData={props.previousData} DetailType={props.DetailType}/>

      <DetailsPlot DetailType={props.DetailType} Header={props.DetailType+' Variation Chart'}/>

    </div>
  );
}

export default Details