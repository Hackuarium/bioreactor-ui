export const DEVICES_PARAMETERS = [
    {
        label:'Temperature',
        parameters:[
            {
                label: 'Date',
                variable: 'date',
                name: 'Date',
                description: '',
                factor: 1,
                unit: '',
                writable: false,
                series:false
            },
            {
                label: 'A',
                variable: 'cpuTemperature',
                name: 'CPU Temperature',
                description: '',
                factor: 1,
                unit: '°C',
                writable: false,
                series:true,
                color:'red'
            }
        ]
    },
    {
        label:'Load',
        parameters:[
            {
                label: 'Date',
                variable: 'cpuTemperature',
                name: 'Date',
                description: '',
                factor: 1,
                unit: '',
                writable: false,
            },
            {
                label: 'H',
                variable: 'load',
                name: 'Load',
                description: 'Total load',
                factor: 1,
                unit: '%',
                writable: false,
                series:true,
                color:'red'
              },
          
              {
                label: 'I',
                variable: 'userLoad',
                name: 'User load',
                description: 'Load from user',
                factor: 1,
                unit: '%',
                writable: false,
                series:true,
                color:'blue'
              },
          
              {
                label: 'J',
                variable: 'systemLoad',
                name: 'System load',
                description: 'Load from system',
                factor: 1,
                unit: '%',
                writable: false,
                series:true,
                color:'green'
              },
          
              {
                label: 'K',
                variable: 'niceLoad',
                name: 'Nice load',
                description: 'Load for Nice',
                factor: 1,
                unit: '%',
                writable: false,
                series:false,
                color:'red'
              },
          
              {
                label: 'L',
                variable: 'idleLoad',
                name: 'Idle load',
                description: 'Idle percent of time',
                factor: 1,
                unit: '%',
                writable: false,
                series:false,
                color:'red'
              },
          
              {
                label: 'M',
                variable: 'irqLoad',
                name: 'IRQ load',
                description: 'Load due to IRQ',
                factor: 1,
                unit: '%',
                writable: false,
                series:false,
                color:'red'
              },
        ]
    },
    {
        label:'FS',
        parameters:[
            {
                label: 'Date',
                variable: 'cpuTemperature',
                name: 'Date',
                description: '',
                factor: 1,
                unit: '',
                writable: false,
                series:false,
                color:'red'
            },
            {
                label: 'N',
                variable: 'fsMinimalUse',
                name: 'FS minimal use',
                description: 'Minimal percent spaced used in a filesystem',
                factor: 1,
                unit: '%',
                writable: false,
                series:true,
                color:'green'
              },
              {
                label: 'O',
                variable: 'fsMaximalUse',
                name: 'FS maximal use',
                description: 'Maximal percent spaced used in a filesystem',
                factor: 1,
                unit: '%',
                writable: false,
                series:true,
                color:'red'
              }
        ]
    },
    {
        label:'I/O',
        parameters:[
            {
                label: 'Date',
                variable: 'cpuTemperature',
                name: 'Date',
                description: '',
                factor: 1,
                unit: '',
                writable: false,
                series:false,
                color:'red'
            },
            {
                label: 'D',
                variable: 'fsRead',
                name: 'FS Read',
                description: 'File system read in kb',
                factor: 1,
                unit: 'kb',
                writable: false,
                series:true,
                color:'blue'
              },
          
              {
                label: 'E',
                variable: 'fsWrite',
                name: 'FS Write',
                description: 'File system read in kb',
                factor: 1,
                unit: 'kb',
                writable: false,
                series:true,
                color:'black'
              },
          
              {
                label: 'F',
                variable: 'networkRead',
                name: 'Network Read',
                description: 'File system read in kb',
                factor: 1,
                unit: 'kb',
                writable: false,
                series:true,
                color:'red'
              },
          
              {
                label: 'G',
                variable: 'networkWrite',
                name: 'Network Write',
                description: 'File system read in kb',
                factor: 1,
                unit: 'kb',
                writable: false,
                series:true,
                color:'green'
              },
        ]
    }
];

export const getParams=(type)=>{
    return DEVICES_PARAMETERS.filter(p=>p.label===type)[0]? DEVICES_PARAMETERS.filter(p=>p.label===type)[0].parameters:[]
}

export const getSeries=(type)=>{
    return DEVICES_PARAMETERS.filter(p=>p.label===type)[0]? DEVICES_PARAMETERS.filter(p=>p.label===type)[0].parameters.filter(pr=>pr.series===true):[]
}