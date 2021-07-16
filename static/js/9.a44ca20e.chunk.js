(this["webpackJsonpbioreactor-ui"]=this["webpackJsonpbioreactor-ui"]||[]).push([[9],{110:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"f",(function(){return u})),n.d(t,"e",(function(){return s})),n.d(t,"a",(function(){return l}));var r=n(120),c=n.n(r),a="BIOREACTOR_devices",i="80",o="http",u=["http","tcp","wss"],s=Object.keys(c.a).map((function(e){return c.a[e].kind})),l={compactSettings:"uc",runExperiment:"r",kinetic:"k",reset:"ur1234",sleep:"l",setParameter:function(e,t){return"".concat(e).concat(t)}}},137:function(e,t,n){"use strict";n.d(t,"e",(function(){return O})),n.d(t,"d",(function(){return x})),n.d(t,"g",(function(){return g})),n.d(t,"c",(function(){return w})),n.d(t,"a",(function(){return y})),n.d(t,"b",(function(){return D})),n.d(t,"f",(function(){return k}));var r,c=n(1),a=n(53),i=n.n(a),o=n(59),u=n(156),s=function(e){var t=function(){return new u.a(e)};return{getInfo:function(){return new Promise((function(e,n){var r=t();r.info().then((function(t){return r.close((function(){return e(t)}))})).catch((function(e){return r.close((function(){return n(e)}))}))}))},getAll:function(){var e=Object(o.a)(i.a.mark((function e(n){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,r){var a=t();a.allDocs(Object(c.a)({include_docs:!0},n)).then((function(t){return a.close((function(){return e(t)}))})).catch((function(e){return a.close((function(){return r(e)}))}))})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),get:function(e){return new Promise((function(n,r){var c=t();e?c.get(e).then((function(e){return c.close((function(){return n(e)}))})).catch((function(e){return c.close((function(){return r(e)}))})):r(new Error("Doc fetch : docId is required"))}))},put:function(e){return new Promise((function(n,r){var c=t();"_id"in e?c.put(e).then((function(e){return c.close((function(){return n(e)}))})).catch((function(e){return c.close((function(){return r(e)}))})):r(new Error("Doc create : _id is required in doc"))}))},update:function(e){return new Promise((function(n,r){var a=t();"_id"in e?a.get(e._id).then((function(t){return a.put(Object(c.a)(Object(c.a)({},e),{},{_rev:t._rev})).then((function(e){return a.close((function(){return n(e)}))})).catch((function(e){return r(e)}))})).catch((function(e){return a.close((function(){return r(e)}))})):r(new Error("Doc update : _id is required in doc"))}))},remove:function(e){return new Promise((function(n,r){var c=t();e?c.get(e).then((function(t){return c.remove({_id:e,_rev:t._rev}).then((function(e){return c.close((function(){return n(e)}))})).catch((function(e){return r(e)}))})).catch((function(e){return c.close((function(){return r(e)}))})):r(new Error("Doc remove : docId is required"))}))}}},l=n(112),d=n(158),f=n.n(d),b=n(144),p=function(e,t,n,c,a){return new Promise((function(c,a){!function(e,t,n,c,a,i,o){r&&r.connected&&r.options.hostname===e&&Object(l.isFunction)(i)&&i(r);var u="".concat(t,"://").concat(e,":").concat(n);(r=f.a.connect(u,{keepalive:300,reconnectPeriod:5e3})).on("connect",(function(){console.log("connected to ".concat(u," : ").concat(r.connected)),Object(l.isFunction)(i)&&i(r)})),r.stream.on("error",(function(e){console.log(e);var t=new Error("Couldn't connect to BROKER \"".concat(u,'"'));t.name="Mqtt Error",r.end(),Object(l.isFunction)(o)&&o(t)}))}(e,t,n,0,0,(function(e){return c(e)}),(function(e){return a(e)}))}))},m=function(e,t,n,r){e.subscribe(t,{qos:2},(function(t){t?Object(l.isFunction)(r)&&r(t):e.on("message",(function(e,t){var r;Object(l.isFunction)(n)&&n((r=t,Object(b.parseCurrentSettings)(r.toString(),{})))}))}));return function(n){return e.unsubscribe(t,{},n)}},j=function(e,t){return e.end((function(){console.log('mqtt broker "'.concat(e.options.hostname,'" disconnected')),Object(l.isFunction)(t)&&t()}))},h=n(110),v=function(e,t){console.log(e);var n=new Error("".concat(t," \n").concat(null===e||void 0===e?void 0:e.message));throw n.name="DATABASE_ERROR",n},O=function(){var e=Object(o.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s(h.d).getAll().then((function(e){return e.rows.map((function(e){return e.doc}))})).catch((function(e){return v(e,"Get locally saved devices error")})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),x=function(){var e=Object(o.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s(h.d).get(t).catch((function(e){return v(e,"Get device error")})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),g=function(){var e=Object(o.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s(h.d).update(t).catch((function(e){return v(e,"Update device error")})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(e){return s(h.d).remove(e).catch((function(e){return v(e,"Delete device error")}))},y=function(e){var t=e.kind,n=e.name,r=e.url,c=e.protocol,a=void 0===c?h.c:c,i=e.port,o=void 0===i?h.b:i,u=e.topic,l=e.username,d=e.password;return s(h.d).put({_id:"".concat(t,"_").concat(n),name:n,url:r,protocol:a,port:o,topic:u,kind:t,username:l,password:d}).catch((function(e){return"conflict"===e.name?v(e,"Device name must be unique"):v(e,"Insert device error")}))},D=function(e){var t=e._id,n=e.name,r=e.kind,a=e.deviceId,u=void 0===a?t||"".concat(r,"_").concat(n):a,d=e.url,f=e.protocol,b=void 0===f?h.c:f,v=e.port,O=void 0===v?h.b:v,x=e.topic;e.username,e.password;return new Promise(function(){var e=Object(o.a)(i.a.mark((function e(t,n){var r,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p(d,b,O);case 3:r=e.sent,a=s(u),t({subscribe:function(e,t){return m(r,x,(function(t){a.put(Object(c.a)({_id:Date.now().toString()},t)),Object(l.isFunction)(e)&&e(t)}),t)},disconnect:function(){return j(r)},getAllData:function(){return a.getAll().then((function(e){return e.rows.map((function(e){return e.doc}))}))},getLastData:function(){return a.getAll({descending:!0,limit:1}).then((function(e){return e.rows.map((function(e){return e.doc}))}))},getPageData:function(e,t){return a.getAll({descending:!0,skip:e,limit:t}).then((function(e){return e.rows.map((function(e){return e.doc}))}))},getAllDataCount:function(){return a.getAll().then((function(e){return e.total_rows}))}}),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),n(e.t0);case 17:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(t,n){return e.apply(this,arguments)}}())},k=function(e){var t=e.url,n=e.protocol,r=void 0===n?h.c:n,c=e.port,a=void 0===c?h.b:c,u=e.topic;e.username,e.password;return new Promise(function(){var e=Object(o.a)(i.a.mark((function e(n,c){var o,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p(t,r,a);case 3:o=e.sent,s=m(o,u,(function(e){s(),j(o,(function(){return n(e)}))}),c),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),c(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,n){return e.apply(this,arguments)}}())}},157:function(e,t){},162:function(e,t){},163:function(e,t){},175:function(e,t){},176:function(e,t){},401:function(e,t,n){"use strict";n.r(t);var r=n(28),c=n(6),a=n(2),i=n(20),o=n(137),u=[{label:"Temperature",parameters:[{label:"Date",variable:"date",name:"Date",description:"",factor:1,unit:"",writable:!1,series:!1},{label:"A",variable:"cpuTemperature",name:"CPU Temperature",description:"",factor:1,unit:"\xb0C",writable:!1,series:!0,color:"red"}]},{label:"Load",parameters:[{label:"Date",variable:"cpuTemperature",name:"Date",description:"",factor:1,unit:"",writable:!1},{label:"H",variable:"load",name:"Load",description:"Total load",factor:1,unit:"%",writable:!1,series:!0,color:"red"},{label:"I",variable:"userLoad",name:"User load",description:"Load from user",factor:1,unit:"%",writable:!1,series:!0,color:"blue"},{label:"J",variable:"systemLoad",name:"System load",description:"Load from system",factor:1,unit:"%",writable:!1,series:!0,color:"green"},{label:"K",variable:"niceLoad",name:"Nice load",description:"Load for Nice",factor:1,unit:"%",writable:!1,series:!1,color:"red"},{label:"L",variable:"idleLoad",name:"Idle load",description:"Idle percent of time",factor:1,unit:"%",writable:!1,series:!1,color:"red"},{label:"M",variable:"irqLoad",name:"IRQ load",description:"Load due to IRQ",factor:1,unit:"%",writable:!1,series:!1,color:"red"}]},{label:"FS",parameters:[{label:"Date",variable:"cpuTemperature",name:"Date",description:"",factor:1,unit:"",writable:!1,series:!1,color:"red"},{label:"N",variable:"fsMinimalUse",name:"FS minimal use",description:"Minimal percent spaced used in a filesystem",factor:1,unit:"%",writable:!1,series:!0,color:"green"},{label:"O",variable:"fsMaximalUse",name:"FS maximal use",description:"Maximal percent spaced used in a filesystem",factor:1,unit:"%",writable:!1,series:!0,color:"red"}]},{label:"I/O",parameters:[{label:"Date",variable:"cpuTemperature",name:"Date",description:"",factor:1,unit:"",writable:!1,series:!1,color:"red"},{label:"D",variable:"fsRead",name:"FS Read",description:"File system read in kb",factor:1,unit:"kb",writable:!1,series:!0,color:"blue"},{label:"E",variable:"fsWrite",name:"FS Write",description:"File system read in kb",factor:1,unit:"kb",writable:!1,series:!0,color:"black"},{label:"F",variable:"networkRead",name:"Network Read",description:"File system read in kb",factor:1,unit:"kb",writable:!1,series:!0,color:"red"},{label:"G",variable:"networkWrite",name:"Network Write",description:"File system read in kb",factor:1,unit:"kb",writable:!1,series:!0,color:"green"}]}],s=function(e){return u.filter((function(t){return t.label===e}))[0]?u.filter((function(t){return t.label===e}))[0].parameters:[]},l=n(0),d=function(e){var t=Object(a.useState)([]),n=Object(c.a)(t,2),r=n[0],o=n[1];Object(a.useEffect)((function(){if(e.DetailType){var t=s(e.DetailType);o(t)}}),[e]);var u=function(e){e<1e10&&(e*=1e3);var t=e+-1*(new Date).getTimezoneOffset();return new Date(t)};return Object(l.jsxs)("div",{className:"my-1 overflow-scroll w-24 min-w-full md:min-w-0  bg-white w-full rounded-lg ",children:[Object(l.jsx)("div",{className:"flex space-x-100 m-4",children:Object(l.jsxs)("div",{className:"flex-1",children:[Object(l.jsx)("h2",{className:"text-2xl ",children:"Previous Details"}),Object(l.jsx)("p",{className:"text-sm text-gray-500",children:"Previous details of the device."})]})}),Object(l.jsx)(i.G,{className:"min-w-full table-auto ",Header:function(){return 0!==r.length?Object(l.jsx)("tr",{className:"bg-primary-900",children:r.map((function(e,t){return Object(l.jsx)("th",{className:"px-4 py-2",children:Object(l.jsx)("span",{className:"text-white",children:e.name+" "+e.unit})},t)}))}):null},Tr:function(e){var t=e.value;return t&&t.parameters?Object(l.jsx)("tr",{className:"bg-white border-4 border-gray-200 text-center",children:r.map((function(e,n){return"Date"===e.name?Object(l.jsx)("td",{className:"px-4 py-2",children:Object(l.jsx)("span",{children:u(t.epoch).toLocaleString()})},n):Object(l.jsx)("td",{className:"px-4 py-2",children:Object(l.jsx)("span",{children:t.parameters[e.label]})},n)}))}):null},data:e.previousData,pagination:{itemsPerPage:100,onPageChange:function(t){e.setCurrentPage(t)},page:e.currentPage,totalCount:e.count,withText:!0}})]})},f=n(63),b=function(e){var t=Object(a.useState)([]),n=Object(c.a)(t,2),r=n[0],i=n[1];return Object(a.useEffect)((function(){if(e.DetailType){var t=s(e.DetailType);i(t)}}),[e]),Object(l.jsx)("div",{children:0!==r.length?Object(l.jsx)("div",{className:"flex flex-row justify-start flex-wrap",children:r.map((function(t,n){return"Date"!==t.name&&e.data[0]?Object(l.jsx)(f.b,{title:t.name,value:e.data[0].parameters[t.label],unit:t.unit,info:t.description,className:"w-full flex sm:w-1/3 md:w-1/4 lg:w-1/5 "},n):null}))}):null})},p=n(208),m=(n(391),function(e){var t=Object(a.useState)([]),n=Object(c.a)(t,2),r=n[0],o=n[1],s=Object(a.useState)([]),d=Object(c.a)(s,2),f=d[0],b=d[1],m=Object(a.useState)([]),j=Object(c.a)(m,2),h=j[0],v=j[1],O=Object(a.useState)(),x=Object(c.a)(O,2),g=x[0],w=x[1],y=Object(a.useState)(),D=Object(c.a)(y,2),k=D[0],N=D[1],S=Object(a.useState)(""),E=Object(c.a)(S,2);E[0],E[1];Object(a.useEffect)((function(){N(e.DetailType)}),[e.DetailType]),Object(a.useEffect)((function(){k&&(o([]),o(function(e){return u.filter((function(t){return t.label===e}))[0]?u.filter((function(t){return t.label===e}))[0].parameters.filter((function(e){return!0===e.series})):[]}(k)))}),[k]),Object(a.useEffect)((function(){0!==e.allData.length&&v(e.allData)}),[e]);Object(a.useEffect)((function(){console.log(r);var e=[];r&&0!==r.length&&r.forEach((function(t){var n=[];return h.forEach((function(e,r){console.log(r),e.parameters&&n.push({x:r,y:e.parameters[t.label]})})),console.log(n),e.push({label:t.name,data:n})})),b(e),console.log(e[0])}),[r,h]),Object(a.useEffect)((function(){w(T())}),[f,k]);var T=function(){var e=[];return r&&0!==r.length&&r.forEach((function(t,n){var r,c=(r=t.name,f.filter((function(e){return e.label===r}))[0]?f.filter((function(e){return e.label===r}))[0].data:null);e.push(Object(l.jsx)(p.e,{data:c,xAxis:"x",yAxis:"y",lineStyle:{stroke:t.color,strokeWidth:2},label:t.name,displayMarker:!0,markerShape:"circle"},n))})),e};return Object(l.jsxs)("div",{children:[Object(l.jsxs)("div",{className:"flex space-x-100 m-4",children:[Object(l.jsxs)("div",{className:"flex-1",children:[Object(l.jsx)("h2",{className:"text-2xl ",children:"Variations Chart"}),Object(l.jsx)("p",{className:"text-sm text-gray-500",children:"Chart of variations of the device."})]}),Object(l.jsx)("div",{className:"flex-2 object-right",children:Object(l.jsx)(i.c,{onSelect:function(){},options:[[{label:"1 hour",type:"option"},{label:"1 day",type:"option"},{label:"1 month",type:"option"},{label:"1 year",type:"option"}]],title:"Display per"})})]}),Object(l.jsx)("div",{className:"h-max flex justify-center items-center rounded-md bg-white shadow",children:Object(l.jsxs)(p.f,{width:900,height:500,margin:{bottom:50,left:55,top:20,right:20},seriesViewportStyle:{stroke:"black",strokeWidth:.4},children:[Object(l.jsx)(p.c,{title:e.Header}),Object(l.jsx)(p.b,{id:"x",position:"bottom",label:"Time",labelSpace:25,paddingEnd:.1,paddingStart:.1}),Object(l.jsx)(p.b,{id:"y",position:"left",label:"%",scale:"log",labelSpace:65,paddingStart:.1,paddingEnd:.1}),g,Object(l.jsx)(p.d,{position:"embedded",bottom:"80",left:"0"})]})})]})}),j=function(e){return Object(a.useEffect)((function(){}),[e]),Object(l.jsxs)("div",{className:"m-2 ",children:[Object(l.jsx)(b,{DetailType:e.DetailType,data:e.data}),Object(l.jsx)(m,{allData:e.allData,previousData:e.previousData,DetailType:e.DetailType,Header:e.DetailType+" Variation Chart"}),Object(l.jsx)(d,{currentPage:e.currentPage,setCurrentPage:function(t){return e.setCurrentPage(t)},count:e.count,previousData:e.previousData,DetailType:e.DetailType})]})};t.default=function(e){var t=e.match,n=Object(a.useState)(1),u=Object(c.a)(n,2),s=u[0],d=u[1],f=Object(a.useState)(0),b=Object(c.a)(f,2),p=b[0],m=b[1],h=Object(a.useState)({value:"Load",label:"Load"}),v=Object(c.a)(h,2),O=v[0],x=v[1],g=Object(a.useState)([]),w=Object(c.a)(g,2),y=w[0],D=w[1],k=Object(a.useState)([]),N=Object(c.a)(k,2),S=N[0],E=N[1],T=Object(a.useState)(),P=Object(c.a)(T,2),_=P[0],F=P[1],C=Object(a.useState)(),L=Object(c.a)(C,2),A=L[0],I=L[1],R="".concat(t.params.id);return Object(a.useEffect)((function(){return R&&Object(o.d)(R).then((function(e){console.log(e),I(e),Object(o.b)(e).then((function(e){return F(e)}))})),function(){return null===_||void 0===_?void 0:_.disconnect()}}),[R]),Object(a.useEffect)((function(){_&&(_.getAllDataCount().then((function(e){console.log("data count"),console.log(e),m(e)})),_.subscribe((function(e){return D([e].concat(Object(r.a)(y)))}),(function(e){return console.log(e)})),_.getPageData(10*s,10).then((function(e){E(e)})))}),[_]),Object(a.useEffect)((function(){_&&_.getPageData(10*s,10).then((function(e){E(e)}))}),[s]),Object(l.jsxs)("div",{className:"m-4 p-2 shadow-lg ",style:{backgroundColor:"white",borderRadius:"10px"},children:[Object(l.jsxs)("div",{className:"m-4",children:[Object(l.jsxs)("div",{className:"p-4 border-b",children:[Object(l.jsx)("h2",{className:"text-2xl ",children:"Device Information"}),Object(l.jsx)("p",{className:"text-sm text-gray-500",children:"Device connection details."})]}),Object(l.jsx)("div",{children:Object(l.jsxs)("div",{className:"md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b",children:[Object(l.jsx)("p",{className:"text-gray-600",children:"Device Name"}),Object(l.jsx)("p",{children:A?A.name:""})]})}),Object(l.jsx)("div",{children:Object(l.jsxs)("div",{className:"md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b",children:[Object(l.jsx)("p",{className:"text-gray-600",children:"Url"}),Object(l.jsx)("p",{children:A?A.url:""})]})}),Object(l.jsx)("div",{children:Object(l.jsxs)("div",{className:"md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b",children:[Object(l.jsx)("p",{className:"text-gray-600",children:"Device kind"}),Object(l.jsx)("p",{children:A?A.kind:""})]})}),Object(l.jsx)("div",{children:Object(l.jsxs)("div",{className:"md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b",children:[Object(l.jsx)("p",{className:"text-gray-600",children:"Topic"}),Object(l.jsx)("p",{children:A?A.topic:""})]})})]}),Object(l.jsx)(i.f,{onSelect:function(e){x(e),d(1)},selected:O,options:["Load","I/O","FS","Temperature"].map((function(e){return{value:String(e),label:String(e)+" Details"}}))}),Object(l.jsx)(j,{allData:S,currentPage:s,count:p,data:y,previousData:S,DetailType:O.value,setCurrentPage:function(e){return d(e)}})]})}}}]);
//# sourceMappingURL=9.a44ca20e.chunk.js.map