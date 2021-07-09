(this["webpackJsonpbioreactor-ui"]=this["webpackJsonpbioreactor-ui"]||[]).push([[8],{108:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"b",(function(){return l})),n.d(t,"c",(function(){return i})),n.d(t,"f",(function(){return s})),n.d(t,"e",(function(){return o})),n.d(t,"a",(function(){return u}));var r=n(120),c=n.n(r),a="BIOREACTOR_devices",l="9001",i="tcp",s=["tcp","http","wss"],o=Object.keys(c.a).map((function(e){return c.a[e].kind})),u={compactSettings:"uc",runExpirement:"r",kinetic:"k",reset:"ur1234",sleep:"l",setParameter:function(e,t){return"".concat(e).concat(t)}}},121:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n(4),c=n(21),a=n(0);function l(){var e=Object(c.L)(),t=function(t,n,c){var l=c.textColor,i=c.Icon,s=c.timeout;e.addNotification({title:Object(a.jsx)("span",{className:Object(r.a)("text-base font-semibold",l+"500"),children:t}),content:Object(a.jsx)("span",{className:"text-sm text-neutral-500",children:n}),icon:Object(a.jsx)(i,{className:Object(r.a)("w-8 h-8",l+"600")})},s)};return{addErrorNotification:function(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5e3;t(e,n,{textColor:"text-danger-",Icon:c.E,timeout:r})},addWarningNotification:function(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2500;t(e,n,{textColor:"text-warning-",Icon:c.E,timeout:r})},addInfoNotification:function(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3;t(e,n,{textColor:"text-primary-",Icon:c.v,timeout:r})}}}},388:function(e,t,n){"use strict";n.r(t);var r=n(50),c=n.n(r),a=n(28),l=n(58),i=n(6),s=n(3),o=n(149),u=n(21),d=n(121),f=n(109),m=n(379),x=new m.a(navigator.serial),j=function(){var e=Object(l.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.requestDevices();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),b=function(){var e=Object(l.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.updateDevices();case 2:return e.next=4,x.getDevicesList({ready:!0});case 4:return t=e.sent,e.abrupt("return",t);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),v=function(){var e=Object(l.a)(c.a.mark((function e(t){var n,r,a=arguments;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.length>1&&void 0!==a[1]?a[1]:3e3,r=setInterval(Object(l.a)(c.a.mark((function e(){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b();case 2:n=e.sent,Object(f.isFunction)(t)&&t(n);case 4:case"end":return e.stop()}}),e)}))),n),e.abrupt("return",r);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),p={requestDevices:j,getConnectedDevices:b,continuousUpdateDevices:v,sendCommand:function(){var e=Object(l.a)(c.a.mark((function e(t,n){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.sendCommand(t,n);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},h=n(108),O=n(0),w=h.e.map((function(e){return{label:e,type:"option"}})),g=function(e){var t=e.device,n=void 0===t?{label:"--"}:t,r=e.deviceType,a=void 0===r?w.filter((function(e){return"SimpleSpectro"===e.label}))[0]:r,o=e.onSelectDevice,f=e.onSelectType,m=Object(d.a)(),x=m.addInfoNotification,j=m.addWarningNotification,b=Object(s.useState)([]),v=Object(i.a)(b,2),h=v[0],g=v[1];Object(s.useEffect)((function(){f(a)}),[]),Object(s.useEffect)((function(){y();var e=p.continuousUpdateDevices((function(e){N(e)}));return function(){return e.then((function(e){return clearInterval(e)}))}}),[h.length]);var y=function(){var e=Object(l.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.getConnectedDevices();case 2:(t=e.sent).length>0&&((null===n||void 0===n?void 0:n.id)||o(k(t)[0]),g(t));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),N=function(e){e.length>h.length?(x("New device connected"),(null===n||void 0===n?void 0:n.id)||o(k(e)[0])):e.length<h.length&&(j("Device disconnected"),0===e.length&&o({label:"--"})),g(e)},E=function(){var e=Object(l.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return document.activeElement.blur(),e.next=3,p.requestDevices();case 3:return e.next=5,p.getConnectedDevices();case 5:t=e.sent,N(t);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(e){return e.map((function(e){return{id:e.id,label:"Device-"+e.id,type:"option"}}))};return Object(O.jsxs)("div",{className:"m-4 py-3 px-4 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center rounded-md bg-white shadow ",children:[Object(O.jsxs)("div",{className:"flex flex-row flex-wrap justify-between",children:[Object(O.jsxs)("div",{className:"my-1 mx-2 w-full sm:w-max flex items-center justify-end flex-nowrap",children:[Object(O.jsx)("h3",{className:"mr-2 text-base font-medium text-neutral-800 ",children:"Device Type :"}),Object(O.jsx)(u.c,{title:a.label,options:[w],onSelect:f})]}),Object(O.jsxs)("div",{className:"my-1 mx-2 w-full sm:w-max flex items-center justify-end flex-nowrap",children:[Object(O.jsx)("h3",{className:"mr-2 text-base font-medium text-neutral-800",children:"Select device :"}),Object(O.jsx)(u.c,{title:n.label,options:[k(h)],onSelect:o})]})]}),Object(O.jsx)(u.a,{className:"mb-3 sm:mb-0",onClick:E,children:"Request device"})]})},y=function(e){var t=e.title;return Object(O.jsx)("div",{className:"my-4",children:Object(O.jsx)(u.b,{justify:"start",children:Object(O.jsx)("span",{className:"px-2 bg-white text-xs font-medium text-neutral-400",children:t})})})},N=n(4);function E(){return(E=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function k(e,t){if(null==e)return{};var n,r,c=function(e,t){if(null==e)return{};var n,r,c={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(c[n]=e[n]);return c}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(c[n]=e[n])}return c}var S=s.createElement("g",null,s.createElement("g",null,s.createElement("g",null,s.createElement("circle",{cx:265.911,cy:132.089,r:25}),s.createElement("path",{d:"M437.02,74.98C388.667,26.629,324.38,0,256,0S123.333,26.629,74.98,74.98C26.629,123.333,0,187.62,0,256 s26.629,132.667,74.98,181.02C123.333,485.371,187.62,512,256,512s132.667-26.629,181.02-74.98 C485.371,388.667,512,324.38,512,256S485.371,123.333,437.02,74.98z M256,472c-119.103,0-216-96.897-216-216S136.897,40,256,40 s216,96.897,216,216S375.103,472,256,472z"}),s.createElement("path",{d:"M278.528,366.083c-4.024,1.965-7.223,0.347-8.771-0.792c-1.546-1.138-4.041-3.705-3.359-8.17l17.163-114.269 c2.728-17.888-4.633-35.66-19.212-46.381c-14.582-10.724-33.746-12.454-50.01-4.517l-24.695,12.044l17.527,35.955l24.708-12.051 c4.023-1.962,7.223-0.345,8.771,0.793c1.547,1.138,4.041,3.706,3.36,8.17l-17.163,114.269 c-2.729,17.888,4.633,35.659,19.211,46.381c8.508,6.257,18.574,9.451,28.716,9.451c7.24,0,14.519-1.629,21.294-4.935 l24.696-12.045l-17.53-35.955L278.528,366.083z"})))),C=s.createElement("g",null),I=s.createElement("g",null),D=s.createElement("g",null),T=s.createElement("g",null),R=s.createElement("g",null),P=s.createElement("g",null),A=s.createElement("g",null),z=s.createElement("g",null),H=s.createElement("g",null),q=s.createElement("g",null),B=s.createElement("g",null),F=s.createElement("g",null),M=s.createElement("g",null),G=s.createElement("g",null),L=s.createElement("g",null);function J(e,t){var n=e.title,r=e.titleId,c=k(e,["title","titleId"]);return s.createElement("svg",E({id:"Capa_1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 512 512",style:{enableBackground:"new 0 0 512 512"},xmlSpace:"preserve",ref:t,"aria-labelledby":r},c),n?s.createElement("title",{id:r},n):null,S,C,I,D,T,R,P,A,z,H,q,B,F,M,G,L)}var U=s.forwardRef(J),V=(n.p,function(e){var t=e.title,n=e.value,r=e.unit,c=e.info,a=e.className;return Object(O.jsx)("div",{className:Object(N.a)("flex",a),children:Object(O.jsxs)("div",{className:"w-full m-1 p-2 flex flex-col justify-between items-center sm:items-start rounded-md bg-white shadow",children:[Object(O.jsxs)("div",{className:"w-full py-1 flex flex-row justify-between items-start relative",children:[Object(O.jsx)("h3",{className:"text-sm font-medium text-gray-500",children:t}),c&&Object(O.jsxs)("div",{className:" group",children:[Object(O.jsx)(U,{height:"12",width:"12",className:"my-1 fill-current text-neutral-400 group-hover:text-primary-600"}),Object(O.jsx)("div",{className:"absolute bottom-full right-0 hidden group-hover:flex z-10 p-1 bg-neutral-50 shadow-md rounded","max-content":100,children:Object(O.jsx)("span",{className:" text-xs text-neutral-500 ",children:c})})]})]}),Object(O.jsxs)("div",{className:"w-full mt-2 flex flex-row justify-center sm:justify-end items-center",children:[Object(O.jsx)("p",{className:"text-xl font-bold text-black",children:n}),Object(O.jsx)("p",{className:"ml-1 text-sm font-medium text-gray-400",children:r})]})]})})}),W=function(e){var t,n=e.data,r=e.device,a=Object(d.a)(),i=a.addInfoNotification,s=a.addErrorNotification,o=function(){var e=Object(l.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.sendCommand(r.id,t);case 3:n=e.sent,console.log("runExpirement"),console.log(n),i(n),e.next=14;break;case 9:e.prev=9,e.t0=e.catch(0),console.log("runExpirement error"),console.log(e.t0),s(e.t0);case 14:document.activeElement.blur();case 15:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}();return Object(O.jsxs)("div",{className:"flex flex-col mt-2",children:[Object(O.jsxs)("div",{className:"flex flex-row justify-end",children:[Object(O.jsx)(u.a,{className:"mx-2",onClick:function(){return o(h.a.runExpirement)},children:"Run experiment"}),Object(O.jsx)(u.a,{className:"mx-2",onClick:function(){return o(h.a.kinetic)},children:"Run Kinetic"})]}),(null===n||void 0===n?void 0:n.epoch)&&Object(O.jsx)(y,{title:Object(O.jsxs)("p",{className:" text-base font-medium text-black self-start",children:["Awake time:",Object(O.jsx)("span",{className:"mx-1 text-sm text-neutral-500",children:(null===n||void 0===n?void 0:n.epoch)/1e3+"s"})]})}),Object(O.jsx)("div",{className:" flex flex-row justify-around flex-wrap",children:null===n||void 0===n||null===(t=n.parametersArray)||void 0===t?void 0:t.map((function(e,t){return Object(O.jsx)(V,{title:e.name||e.label,value:e.value*e.factor,unit:e.unit,info:e.description,className:"w-full sm:w-1/2  md:w-1/3 lg:w-1/4 flex"},t)}))})]})},_=n(1),K=function(e){var t=e.data,n=e.deviceType,r=Object(s.useState)([]),c=Object(i.a)(r,2),l=c[0],o=c[1];Object(s.useEffect)((function(){var e,n=t&&t.length>0?null===(e=t[0].parametersArray)||void 0===e?void 0:e.map((function(e){return e.name||e.label})):[];o(["Epoch"].concat(Object(a.a)(n)))}),[n]);var d=Object(s.useCallback)((function(e){var t,n="text-xs text-center p-2";return Object(O.jsxs)("tr",{children:[Object(O.jsx)(u.H,{compact:!0,className:n+" font-medium",children:e.value.epoch}),null===(t=e.value.parametersArray)||void 0===t?void 0:t.map((function(e,t){return Object(O.jsx)(u.H,{compact:!0,className:n,children:e.value},t)}))]})}),[]),f=Object(s.useCallback)((function(){return Object(O.jsx)("tr",{children:null===l||void 0===l?void 0:l.map((function(e){return Object(O.jsx)(u.I,{className:"p-2 text-center font-normal normal-case",compact:!0,children:e},e)}))})}),[l]),m=Object(u.M)(t,{itemsPerPage:10,withText:!0}),x=m.pagination,j=m.data;return Object(O.jsx)("div",{className:"w-full p-1 overflow-x-auto",children:Object(O.jsx)(u.G,{pagination:x,data:j.map((function(e){return Object(_.a)(Object(_.a)({},e),{},{id:e.epoch})})),Header:f,Tr:d})})},X=function(e){var t=e.id,n=e.title,r=e.initialValue,c=e.unit,a=e.placeholder,l=e.info,o=e.type,u=void 0===o?"text":o,d=e.onSave,f=e.className,m=Object(s.useState)(!1),x=Object(i.a)(m,2),j=x[0],b=x[1],v=Object(s.useState)(r),p=Object(i.a)(v,2),h=p[0],w=p[1],g=Object(s.useState)(),y=Object(i.a)(g,2),E=y[0],k=y[1];Object(s.useEffect)((function(){if(E)return clearTimeout(E)}),[]);return Object(O.jsx)("div",{className:Object(N.a)("flex ",f),children:Object(O.jsxs)("div",{className:Object(N.a)("w-full m-1 p-2 flex flex-col justify-between items-center sm:items-start rounded-md bg-white shadow",j&&"border-primary-200 border-2",E&&"border-success-500 border-2"),children:[Object(O.jsxs)("div",{className:"w-full py-1 flex flex-row justify-between items-start relative",children:[Object(O.jsx)("h3",{className:"text-sm font-medium text-gray-500",children:n}),l&&Object(O.jsxs)("div",{className:" group",children:[Object(O.jsx)(U,{height:"12",width:"12",className:"my-1 fill-current text-neutral-400 group-hover:text-primary-600"}),Object(O.jsx)("div",{className:"absolute bottom-full right-0 hidden group-hover:flex z-10 p-1 bg-neutral-50 shadow-md rounded","max-content":100,children:Object(O.jsx)("span",{className:" text-xs text-neutral-500 ",children:l})})]})]}),Object(O.jsxs)("div",{className:"w-full mt-2 flex flex-row justify-center sm:justify-end items-center",children:[Object(O.jsx)("input",{className:"w-full p-1 bg-neutral-50 border-neutral-200 text-right text-black text-sm font-bold placeholder-neutral-500 placeholder-opacity-30 rounded  focus:outline-none focus:ring-0 leading-none",id:n,name:n,type:u,placeholder:a,value:h,onChange:function(e){return w(Number(e.target.value))},onFocus:function(){return b(!0)},onBlur:function(){if(r===h)b(!1);else{d(t,h);var e=setTimeout((function(){b(!1),k(void 0)}),1e3);k(e)}}}),Object(O.jsx)("p",{className:"ml-1 text-sm font-medium text-gray-400",children:c})]})]})})},Q=[1,2,5,10,30,60,120,300].map((function(e){return{label:e>59?"".concat(e/60," m"):"".concat(e," s"),value:1e3*e,type:"option"}})),Y=function(e){var t=e.device,n=e.refreshInterval,r=e.setRefreshInterval,a=e.data,o=e.refreshData,f=Object(s.useState)([]),m=Object(i.a)(f,2),x=m[0],j=m[1],b=Object(s.useState)({label:n/1e3+" s",value:n,type:"option"}),v=Object(i.a)(b,2),w=v[0],g=v[1],N=Object(d.a)(),E=N.addInfoNotification,k=N.addErrorNotification;Object(s.useEffect)((function(){var e=null===a||void 0===a?void 0:a.parameters,t=e&&Object.keys(e).filter((function(t){return e[t].writable})).map((function(t){return Object(_.a)(Object(_.a)({},e[t]),{},{key:t})}));j(t)}),[a]);var S=function(){var e=Object(l.a)(c.a.mark((function e(n,r){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.log(n+" is set to: "+r),e.next=4,p.sendCommand(t.id,h.a.setParameter(n,r));case 4:o(),E("saved","",500),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),k(e.t0.message);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,n){return e.apply(this,arguments)}}(),C=function(){var e=Object(l.a)(c.a.mark((function e(){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.sendCommand(t.id,h.a.reset);case 3:n=e.sent,E(n),o(),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),k(e.t0.message);case 11:document.activeElement.blur();case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),I=function(){var e=Object(l.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.sendCommand(t.id,h.a.sleep);case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),k(e.t0.message);case 8:document.activeElement.blur();case 9:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(){return e.apply(this,arguments)}}();return Object(O.jsxs)("div",{className:"w-full flex flex-col ",children:[Object(O.jsxs)("div",{className:"mt-2 flex flex-col sm:flex-row justify-between",children:[Object(O.jsxs)("div",{className:"my-1 mx-2 flex flex-row items-center justify-end",children:[Object(O.jsx)("p",{className:"mx-1 text-sm font-medium text-neutral-700",children:"Refresh inreval :"}),Object(O.jsx)(u.c,{title:w.label,options:[Q],onSelect:function(e){g(e),r(e.value),document.activeElement.blur()}})]}),Object(O.jsxs)("div",{className:"my-1 flex flex-row justify-end",children:[Object(O.jsx)(u.a,{className:"mx-2",variant:"white",onClick:I,children:"Sleep"}),Object(O.jsx)(u.a,{className:"mx-2 ",variant:"white",onClick:C,children:"Reset Device"})]})]}),(null===x||void 0===x?void 0:x.length)>0&&Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(y,{title:"Edit parameters"}),Object(O.jsx)("div",{className:"flex flex-row justify-start flex-wrap",children:x.map((function(e,t){return Object(O.jsx)(X,{id:e.key,title:e.name||e.label,initialValue:e.value*e.factor,placeholder:e.name,unit:e.unit,info:e.description,onSave:S,className:"w-full sm:w-1/2  md:w-1/3 lg:w-1/4 flex"},t)}))})]})]})},Z=["General","History","Configuration"].map((function(e){return{value:e,label:e}}));t.default=function(){var e=Object(s.useState)({}),t=Object(i.a)(e,2),n=t[0],r=t[1],f=Object(s.useState)([]),m=Object(i.a)(f,2),x=m[0],j=m[1],b=Object(s.useState)(1e4),v=Object(i.a)(b,2),w=v[0],y=v[1],N=Object(s.useState)(),E=Object(i.a)(N,2),k=E[0],S=E[1],C=Object(s.useState)(),I=Object(i.a)(C,2),D=I[0],T=I[1],R=Object(s.useState)(Z[0]),P=Object(i.a)(R,2),A=P[0],z=P[1],H=Object(d.a)().addErrorNotification,q=Object(s.useCallback)(function(){var e=Object(l.a)(c.a.mark((function e(t){var n,l;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=15;break}return e.prev=1,e.next=4,p.sendCommand(t,h.a.compactSettings);case 4:n=e.sent,l=Object(o.parseCurrentSettings)(n,{kind:null===D||void 0===D?void 0:D.label,parameterInfo:!0,parametersArray:!0}),r(l),j([l].concat(Object(a.a)(x))),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),H(e.t0.message);case 13:e.next=16;break;case 15:r({});case 16:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t){return e.apply(this,arguments)}}(),[x,null===D||void 0===D?void 0:D.label]);Object(s.useEffect)((function(){if(null===k||void 0===k?void 0:k.id){var e=setInterval((function(){return q(null===k||void 0===k?void 0:k.id)}),w);return function(){clearInterval(e)}}}),[null===k||void 0===k?void 0:k.id,w,q]),Object(s.useEffect)((function(){j([]),q(null===k||void 0===k?void 0:k.id)}),[null===D||void 0===D?void 0:D.label,null===k||void 0===k?void 0:k.id]);return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(g,{deviceType:D,onSelectType:T,device:k,onSelectDevice:S}),(null===k||void 0===k?void 0:k.id)?Object(O.jsxs)("div",{className:"mx-4 pb-4",children:[Object(O.jsx)(u.f,{onSelect:z,selected:A,options:Z}),Object(O.jsx)("div",{className:"p-3 mt-4 sm:m-0 flex flex-col items-center rounded-md sm:rounded-t-none bg-white shadow ",children:function(e){switch(e.value){case"General":return Object(O.jsx)(W,{data:n,device:k});case"History":return Object(O.jsx)(K,{data:x,deviceType:null===D||void 0===D?void 0:D.label});case"Configuration":return Object(O.jsx)(Y,{device:k,refreshInterval:w,setRefreshInterval:y,data:n,refreshData:function(){return q(null===k||void 0===k?void 0:k.id)}});default:return Object(O.jsx)("div",{})}}(A)})]}):Object(O.jsxs)("div",{className:"mx-5 mt-16 flex flex-col items-center",children:[Object(O.jsx)("h3",{className:"text-base font-bold text-gray-300 leading-loose",children:"No connected Device"}),Object(O.jsx)("h3",{className:"text-sm font-base text-gray-300",children:"Please plug your device into the computer"})]})]})}}}]);
//# sourceMappingURL=8.2c9ca862.chunk.js.map