import { useEffect } from 'react';
import DataTable from './DataTable';
import ActualDetails from './ActualDetails';
import DetailsPlot from './DetailsPlot';

const Details = (props) => {
  useEffect(() => {
    //console.log(props.data)
  }, [props]);

  return (
    <div className="m-2 ">
      <ActualDetails DetailType={props.DetailType} data={props.data} />

      <DetailsPlot
        allData={props.allData}
        previousData={props.previousData}
        DetailType={props.DetailType}
        Header={props.DetailType + ' Variation Chart'}
      />

      <DataTable
        currentPage={props.currentPage}
        setCurrentPage={(p) => props.setCurrentPage(p)}
        count={props.count}
        previousData={props.previousData}
        DetailType={props.DetailType}
      />
    </div>
  );
};

export default Details;
