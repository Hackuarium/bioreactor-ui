import { useState, useEffect} from 'react';
import {Dropdown } from '../tailwind-ui';
import { Axis, LineSeries, Plot, Heading, Legend } from 'react-plot';
import {getSeries} from './deviceParameters'
import {xBoxPlot} from 'ml-spectra-processing'

const DetailsPlot = (props) => {

    const [series,setSeries]=useState([]);
    const [data,setData] = useState([]);
    const [allData,setAllData]=useState([])
    const [lines,setLines]=useState()
    const [type,setType]=useState()
    const [groupedBy,setGroupedBy]=useState('')

    useEffect(()=>{
      setType(props.DetailType)
    },[props.DetailType])
    
    
    useEffect(()=>{
      /*var x = xBoxPlot([1,2,3,4,5,6])
      console.log(x)
      console.log(type)*/
      if(type){
        setSeries([])
        setSeries(getSeries(type))
      }
    },[type])

    useEffect(()=>{
      if(props.allData.length!==0 ){
        setAllData(props.allData)
      }
    },[props])

    const sameHour=(d1, d2)=> {
      console.log(d1.toLocaleString())
      console.log(d2.toLocaleString())
      console.log(d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate() &&
      d1.getHours() === d2.getHours())
      return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate() &&
        d1.getHours() === d2.getHours()
    }

    const sameDay=(d1, d2)=> {
      return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
    }

    const sameMonth=(d1, d2)=> {
      return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth()
    }

    const sameYear=(d1, d2)=> {
      return d1.getFullYear() === d2.getFullYear()
    }

    const EpochToDate=(epoch)=> {
      if (epoch < 10000000000)
          epoch *= 1000; // convert to milliseconds (Epoch is usually expressed in seconds, but Javascript uses Milliseconds)
      var epoch = epoch + (new Date().getTimezoneOffset() * -1); //for timeZone        
      return new Date(epoch);
    }

    useEffect(()=>{
        console.log(series)
        var t = []
        if(series && series.length!==0)
        series.forEach(s => {
          var table=[]
          allData.map((d,key) => {
            console.log(key/*EpochToDate(d.doc.epoch).toLocaleString()*/)
            if(d.doc.parameters)
            table.push({x:key/*EpochToDate(d.doc.epoch)*/,y: eval('d.doc.parameters.'+s.label)})
          })
        
        console.log(table)
          return t.push({label:s.name,data:table})
        })
        setData(t)
        console.log(t[0])
    },[series,allData])

    useEffect(()=>{
      setLines(getSeriesLines())
    },[data,type])

    const getDataOfSeries=(label)=>{
      var seriesData = data.filter((d)=>d.label===label)[0]?data.filter((d)=>d.label===label)[0].data:null
    

      /*if(seriesData.length!==0){
        var groupedDataTable=[]
        var minimalDate = /*EpochToDate(*///seriesData[0].x//)
        /*var maximalDate = /*EpochToDate(*///seriesData[seriesData.length-1].x//)

        //if(groupedBy==='Hour'){
          /*var lastDate = minimalDate
          var stop = false
          while( lastDate.getTime()!==maximalDate.getTime() && !stop){
            console.log('')
            
            var dataTable = []
            seriesData.map(
              d=>{
                console.log(sameHour(d.x,lastDate))
                if(sameHour(d.x,lastDate)) {
                  dataTable.push(d)
                }
              })
            console.log(dataTable)
            if(dataTable.length >= 5){
              var t = dataTable.map(d=>d.y)
              groupedDataTable.push(xBoxPlot(t))
            } 
            if(dataTable.length===0){
              stop=true
            }
            console.log(lastDate)
            var next = seriesData.filter(
              (d)=>{
                 return !sameHour(d.x,lastDate) && sameDay(d.x,lastDate)
              })[0]

              var xd= new Date()
            if(next){
              console.log(next.x)
              lastDate = seriesData.filter(d=>
                (d.x.getHours()>lastDate.getHours()) && (sameDay(d.x,lastDate) )
              )[0]?seriesData.filter(d=>
                (d.x.getHours()>lastDate.getHours()) && (sameDay(d.x,lastDate) )
              )[0].x:xd
              console.log(lastDate)
            }
              if(lastDate instanceof Date && lastDate===xd){
                stop=true
              }
            //lastDate=new Date(lastDate.getFullYear(),lastDate.getMonth(),lastDate.getDate(),lastDate.getHours()+1)
          }

          console.log(groupedDataTable)
          
        //}
      }*/
      
      if(groupedBy==='Day'){

      }
      if(groupedBy==='Month'){

      }
      if(groupedBy==='Year'){

      }

      var fullSeries=[{
        x:'',
        min:'',
        max:'',
        Q1:'',
        Q2:'',
        Q3:''
      }]
      return seriesData
    }

    const getSeriesLines=()=>{
      var lines = []
      
      if(series && series.length!==0){
           series.forEach((s,key)=>{
            var dataItems=getDataOfSeries(s.name)
            
            lines.push(
            <LineSeries
                key={key}
                data={dataItems}
                xAxis="x"
                yAxis="y"
                lineStyle={{ stroke: s.color, strokeWidth: 2 }}
                label={s.name}
                displayMarker
                markerShape="circle"
                
            />)
           }
            
              )
      }
      return lines
    }

    //console.log(lines)

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
            <div className="flex-1">
              <h2 className="text-2xl ">Variations Chart</h2>
              <p className="text-sm text-gray-500">Chart of variations of the device.</p>
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

        <div className="h-max flex justify-center items-center rounded-md bg-white shadow"> 
            <Plot
            width={900}
            height={500}
            //margin={{ bottom: 45, left: 90, top: 40, right: 20 }}
            margin={{ bottom: 50, left: 55, top: 20, right: 20 }}
            seriesViewportStyle={{
                stroke: 'black',
                strokeWidth: 0.4,
            }}
            >
            <Heading title={props.Header}/>

            <Axis id="x" position="bottom" label="Time" labelSpace={25} paddingEnd={0.1} paddingStart={0.1}/>
            <Axis  id="y" position="left" label="%" scale="log"  labelSpace={65} paddingStart={0.1} paddingEnd={0.1}/>

            {lines}

            <Legend position="embedded" bottom="80" left="0"></Legend>

            </Plot>
        </div>

      </div>

  );
};

export default DetailsPlot;