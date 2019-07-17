(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1138:function(e,t,a){},1140:function(e,t,a){},1177:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(12),i=a.n(l),o=(a(538),a(539),a(540),a(41)),c=a(37),s=a.n(c),u=a(86),m=a(6),p=(a(208),a(512),a(839),a(216)),d=a.n(p),g=(a(302),a(513),a(307)),f=function(e){return r.a.createElement("div",null,r.a.createElement(g.StaticGoogleMap,{size:"400x450",apiKey:"AIzaSyAojclCkVnINxiSN0uKSLG1Q5RPBvtX9HI",zoom:17},r.a.createElement(g.Marker,{location:e.lat.toString()+","+e.lng.toString()})))};d.a.setApiKey("AIzaSyAojclCkVnINxiSN0uKSLG1Q5RPBvtX9HI"),d.a.enableDebug();var y=function(e){return console.log(e),r.a.createElement(m.c,{style:{width:"22rem"}},r.a.createElement(f,{lat:e.latitude,lng:e.longitude}),r.a.createElement(m.d,null,r.a.createElement(m.g,null,e.name),r.a.createElement(m.f,null,e.location)))},b=a(71),h=Object(n.createContext)(),E=function(){return Object(n.useContext)(h)},v=function(){var e=E(),t=Object(o.a)(e,2),a=t[0],n=(t[1],a.franchiseLocations.map(function(e){return r.a.createElement(m.h,{key:e.location,lg:"4",md:"6",style:{paddingTop:"50px",paddingBottom:"50px"}},r.a.createElement(b.b,{to:{pathname:"/location/storageFilter/".concat(e.location),state:{location:e.location,franchise:e.franchise}}},r.a.createElement("div",{className:"d-flex justify-content-center"},r.a.createElement(y,{location:e.location,name:e.franchise,latitude:e.latitude,longitude:e.longitude}))))}));return r.a.createElement(m.o,null,n)},O=a(514),j=a(146),_=a(523),I=a(515),w=a(524),N=a(217),x=a.n(N),C=function(e){function t(e){var a;return Object(O.a)(this,t),(a=Object(_.a)(this,Object(I.a)(t).call(this,e))).handleChange=function(e){a.setState({latitude:null,longitude:null,errorMessage:""}),a.props.dispatch({type:"tempSearchAddress",state:e})},a.extractFranchiseAndAddress=function(e){var t="",n="";-1===e.indexOf("-")?(t=e.slice(0,e.indexOf(",")),n=e.slice(e.indexOf(",")+2)):(t=e.slice(0,e.indexOf("-")),n=e.slice(e.indexOf("-")+2)),a.props.dispatch({type:"selectedFranchise",state:t}),a.props.dispatch({type:"selectedAddress",state:n})},a.handleSelect=function(e){a.setState({isGeocoding:!0}),a.props.dispatch({type:"tempSearchAddress",state:e}),Object(N.geocodeByAddress)(e).then(function(e){return Object(N.getLatLng)(e[0])}).then(function(t){var n=t.lat,r=t.lng;a.setState({latitude:n,longitude:r,isGeocoding:!1}),a.props.dispatch({type:"selectedCoordinates",state:{lat:n,lng:r}}),a.extractFranchiseAndAddress(e)}).catch(function(e){a.setState({isGeocoding:!1}),console.log("error",e)})},a.handleCloseClick=function(){a.setState({latitude:null,longitude:null}),a.props.dispatch({type:"selectedFranchise",state:""}),a.props.dispatch({type:"selectedAddress",state:""}),a.props.dispatch({type:"tempSearchAddress",state:""})},a.handleError=function(e,t){console.log("Error from Google Maps API",e),a.setState({errorMessage:e},function(){t()})},a.state={errorMessage:"",latitude:null,longitude:null,isGeocoding:!1,selectedFranchise:"",selectedAddress:""},a}return Object(w.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.errorMessage,n=t.latitude,l=t.longitude,i=t.isGeocoding,o=this.props.address;return r.a.createElement("div",{style:{paddingBottom:"25px"}},r.a.createElement(x.a,{onChange:this.handleChange,value:o,onSelect:this.handleSelect,onError:this.handleError,shouldFetchSuggestions:o.length>2},function(t){var a=t.getInputProps,n=t.suggestions,l=t.getSuggestionItemProps;return r.a.createElement("div",{className:"Demo__search-bar-container"},r.a.createElement("div",{className:"Demo__search-input-container"},r.a.createElement("input",a({placeholder:"Enter the name of your restaurant",className:"Demo__search-input"})),o.length>0&&r.a.createElement("button",{className:"Demo__clear-button",onClick:e.handleCloseClick},"x")),n.length>0&&r.a.createElement("div",{className:"Demo__autocomplete-container"},n.map(function(e){var t=function(){for(var e=[],t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];return a.forEach(function(t){if("string"===typeof t)e.push(t);else{if("object"!==typeof(a=t)||null===a)throw new Error("`classnames` only accepts string or object as arguments");Object.keys(t).forEach(function(a){t[a]&&e.push(a)})}var a}),e.join(" ")}("Demo__suggestion-item",{"Demo__suggestion-item--active":e.active});return r.a.createElement("div",l(e,{className:t}),r.a.createElement("strong",null,e.formattedSuggestion.mainText)," ",r.a.createElement("small",null,e.formattedSuggestion.secondaryText))})))}),a.length>0&&r.a.createElement("div",{className:"Demo__error-message"},this.state.errorMessage),n&&l&&!i&&console.log(n,l))}}]),t}(r.a.Component),S=a(109),T=a(53),k=(a(462),a(213)),P=(a(190),a(90)),F="query ListInventoryItems(\n  $filter: ModelInventoryItemFilterInput\n  $limit: Int\n  $nextToken: String\n) {\n  listInventoryItems(filter: $filter, limit: $limit, nextToken: $nextToken) {\n    items {\n      franchise\n      location\n      item\n      itemNumber\n      storage\n      category\n      price\n      quantity\n      packSize\n      units\n      brand\n      supplier\n      parValue\n      id\n    }\n    nextToken\n  }\n}\n",A="mutation UpdateInventoryItem($input: UpdateInventoryItemInput!) {\n  updateInventoryItem(input: $input) {\n    franchise\n    location\n    item\n    itemNumber\n    storage\n    category\n    price\n    quantity\n    packSize\n    units\n    brand\n    supplier\n    parValue\n    id\n  }\n}\n",q=a(516),D=(a(463),a(520)),z=a.n(D),L=a(211),U=a(16),V=function(){var e=E(),t=Object(o.a)(e,2),a=t[0],l=t[1],i=Object(n.useState)({franchise:a.currentFranchise,location:a.currentLocation,item:null,itemNumber:Math.floor(6e6*Math.random()+1e6),price:null,storage:null,quantity:null,units:"OZ",brand:null,supplier:null,parValue:null}),s=Object(o.a)(i,2),u=s[0],p=s[1];return r.a.createElement(m.i,null,r.a.createElement("h3",{className:"display-5",style:{paddingTop:"80px"}},r.a.createElement("strong",null,"Create New Inventory Item")),r.a.createElement("hr",{className:"my-4"}),r.a.createElement("div",{className:"d-flex justify-content-center",style:{paddingBottom:"50px"}},r.a.createElement("form",null,r.a.createElement(m.j,{label:"Item Number",outline:!0,type:"number",valueDefault:u.itemNumber,getValue:function(e){var t=Object(U.a)({},u);t.itemNumber=e,p(t)}}),r.a.createElement(m.j,{label:"Item Description",outline:!0,getValue:function(e){var t=Object(U.a)({},u);t.item=e,p(t)}}),r.a.createElement(m.j,{label:"Price",outline:!0,type:"number",getValue:function(e){var t=Object(U.a)({},u);t.price=e,p(t)}}),r.a.createElement(m.o,null,r.a.createElement(m.h,{sm:"7"},r.a.createElement(m.j,{label:"Quantity",outline:!0,type:"number",getValue:function(e){var t=Object(U.a)({},u);t.quantity=e,p(t)}}),r.a.createElement(m.j,{label:"Par Value",outline:!0,type:"number",getValue:function(e){var t=Object(U.a)({},u);t.parValue=e,p(t)}})),r.a.createElement(m.h,{sm:"5"},r.a.createElement("label",{className:"grey-text"},"Units"),r.a.createElement(P.a,{isClearable:!0,onChange:function(e){return function(e){if(e){if(e.hasOwnProperty("__isNew__")){var t=Object(T.a)(a.unitOptions),n=Object(U.a)({},e);delete n.__isNew__,t.push(n),l({type:"unitOptions",state:t})}var r=Object(U.a)({},u);r.units=e.value,p(r)}}(e)},options:a.unitOptions,placeholder:"OZ"}))),r.a.createElement("br",null),r.a.createElement("label",{className:"grey-text"},"Storage"),r.a.createElement(P.a,{isClearable:!0,onChange:function(e){return function(e){if(e){if(e.hasOwnProperty("__isNew__")){var t=Object(T.a)(a.storageOptions),n=Object(U.a)({},e);delete n.__isNew__,t.push(n),l({type:"storageOptions",state:t})}var r=Object(U.a)({},u);r.storage=e.value,p(r)}}(e)},options:a.storageOptions,placeholder:"Select/Type Storage"}),r.a.createElement("br",null),r.a.createElement("label",{className:"grey-text"},"Brand"),r.a.createElement(P.a,{isClearable:!0,onChange:function(e){return function(e){if(e){if(e.hasOwnProperty("__isNew__")){var t=Object(T.a)(a.brandOptions),n=Object(U.a)({},e);delete n.__isNew__,t.push(n),l({type:"brandOptions",state:t})}var r=Object(U.a)({},u);r.brand=e.value,p(r)}}(e)},options:a.brandOptions,placeholder:"Select/Type Brand"}),r.a.createElement("br",null),r.a.createElement("label",{className:"grey-text"},"Supplier"),r.a.createElement(P.a,{isClearable:!0,onChange:function(e){return function(e){if(e){if(e.hasOwnProperty("__isNew__")){var t=Object(T.a)(a.supplierOptions),n=Object(U.a)({},e);delete n.__isNew__,t.push(n),l({type:"supplierOptions",state:t})}var r=Object(U.a)({},u);r.supplier=e.value,p(r)}}(e)},options:a.supplierOptions,placeholder:"Select/Type Supplier"}),r.a.createElement("div",{className:"text-center mt-4"},r.a.createElement(m.b,{color:"primary",onClick:function(){c.API.graphql(Object(c.graphqlOperation)("mutation CreateInventoryItem($input: CreateInventoryItemInput!) {\n  createInventoryItem(input: $input) {\n    franchise\n    location\n    item\n    itemNumber\n    storage\n    category\n    price\n    quantity\n    packSize\n    units\n    brand\n    supplier\n    parValue\n    id\n  }\n}\n",{input:u})).then(function(e){console.log(e)}).catch(function(e){console.log(e)})}},"Create Item")))))},G=function(){var e=E(),t=Object(o.a)(e,2),a=t[0],l=t[1],i=Object(n.useState)({franchise:a.inventoryItemToUpdate.franchise,id:a.inventoryItemToUpdate.id,location:a.inventoryItemToUpdate.location,item:a.inventoryItemToUpdate.item,itemNumber:a.inventoryItemToUpdate.itemNumber,price:a.inventoryItemToUpdate.price,storage:a.inventoryItemToUpdate.storage,quantity:a.inventoryItemToUpdate.quantity,units:a.inventoryItemToUpdate.units,brand:a.inventoryItemToUpdate.brand,supplier:a.inventoryItemToUpdate.supplier,parValue:a.inventoryItemToUpdate.parValue}),s=Object(o.a)(i,2),u=s[0],p=s[1];console.log(a.inventoryItemToUpdate);return r.a.createElement(m.i,null,r.a.createElement("h3",{className:"display-5",style:{paddingTop:"80px"}},r.a.createElement("strong",null,"Create New Inventory Item")),r.a.createElement("hr",{className:"my-4"}),r.a.createElement("div",{className:"d-flex justify-content-center",style:{paddingBottom:"50px"}},r.a.createElement("form",null,r.a.createElement(m.j,{label:"Item Number",outline:!0,type:"number",valueDefault:u.itemNumber,getValue:function(e){var t=Object(U.a)({},u);t.itemNumber=e,p(t)}}),r.a.createElement(m.j,{label:"Item Description",outline:!0,valueDefault:u.item,getValue:function(e){var t=Object(U.a)({},u);t.item=e,p(t)}}),r.a.createElement(m.j,{label:"Price",outline:!0,type:"number",valueDefault:u.price,getValue:function(e){var t=Object(U.a)({},u);t.price=e,p(t)}}),r.a.createElement(m.o,null,r.a.createElement(m.h,{sm:"7"},r.a.createElement(m.j,{label:"Quantity",outline:!0,type:"number",valueDefault:u.quantity,getValue:function(e){var t=Object(U.a)({},u);t.quantity=e,p(t)}}),r.a.createElement(m.j,{label:"Par Value",outline:!0,type:"number",valueDefault:u.parValue,getValue:function(e){var t=Object(U.a)({},u);t.parValue=e,p(t)}})),r.a.createElement(m.h,{sm:"5"},r.a.createElement("label",{className:"grey-text"},r.a.createElement("strong",null,"Units")),r.a.createElement(P.a,{isClearable:!0,isSearchable:!0,placeholder:u.units,onChange:function(e){return function(e){if(e){if(e.hasOwnProperty("__isNew__")){var t=Object(T.a)(a.unitOptions),n=Object(U.a)({},e);delete n.__isNew__,t.push(n),l({type:"unitOptions",state:t})}var r=Object(U.a)({},u);r.units=e.value,p(r)}}(e)},options:a.unitOptions}))),r.a.createElement("br",null),r.a.createElement("label",{className:"grey-text"},r.a.createElement("strong",null,"Storage")),r.a.createElement(P.a,{isClearable:!0,isSearchable:!0,placeholder:u.storage,onChange:function(e){return function(e){if(e){if(e.hasOwnProperty("__isNew__")){var t=Object(T.a)(a.storageOptions),n=Object(U.a)({},e);delete n.__isNew__,t.push(n),l({type:"storageOptions",state:t})}var r=Object(U.a)({},u);r.storage=e.value,p(r)}}(e)},options:a.storageOptions}),r.a.createElement("br",null),r.a.createElement("label",{className:"grey-text"},r.a.createElement("strong",null,"Brand")),r.a.createElement(P.a,{isClearable:!0,isSearchable:!0,placeholder:u.brand,onChange:function(e){return function(e){if(e){if(e.hasOwnProperty("__isNew__")){var t=Object(T.a)(a.brandOptions),n=Object(U.a)({},e);delete n.__isNew__,t.push(n),l({type:"brandOptions",state:t})}var r=Object(U.a)({},u);r.brand=e.value,p(r)}}(e)},options:a.brandOptions}),r.a.createElement("br",null),r.a.createElement("label",{className:"grey-text"},r.a.createElement("strong",null,"Supplier")),r.a.createElement(P.a,{isClearable:!0,isSearchable:!0,placeholder:u.supplier,onChange:function(e){return function(e){if(e){if(e.hasOwnProperty("__isNew__")){var t=Object(T.a)(a.supplierOptions),n=Object(U.a)({},e);delete n.__isNew__,t.push(n),l({type:"supplierOptions",state:t})}var r=Object(U.a)({},u);r.supplier=e.value,p(r)}}(e)},options:a.supplierOptions}),r.a.createElement("div",{className:"text-center mt-4"},r.a.createElement(m.b,{color:"primary",onClick:function(){var e;e=u,console.log(e),"__typename"in e&&delete e.__typename,c.API.graphql(Object(c.graphqlOperation)(A,{input:e})).then(function(e){console.log(e)}).catch(function(e){console.log(e)})}},"Update Item")))))},B=a(1214),$=a(1215),M=Object(B.a)(function(e){return{progress:{margin:e.spacing(2)}}}),H=function(e){var t=M();return e.loading&&r.a.createElement("div",{className:"-loading -active"},r.a.createElement("div",{className:"-loading-inner"},r.a.createElement($.a,{className:t.progress})))},R=(a(1138),a(497));a(1139);a(333);var Q=function(e){var t=Object(n.useState)([]),a=Object(o.a)(t,2),l=a[0],i=a[1],s=Object(n.useState)(!1),u=Object(o.a)(s,2),p=u[0],d=u[1],g=Object(n.useState)(!1),f=Object(o.a)(g,2),y=f[0],h=f[1],v=E(),O=Object(o.a)(v,2),j=O[0],_=O[1],I=r.a.useState(),w=Object(o.a)(I,2)[1],N=Object(n.useCallback)(function(){return w({})},[]);Object(n.useEffect)(function(){console.log("mounted"),_({type:"currentLocation",state:e.location}),_({type:"currentFranchise",state:e.franchise}),_({type:"inventoryTableLoading",state:!0}),C()},[]);var x=function(){_({type:"inventoryTableLoading",state:!0}),setTimeout(C(),100)},C=function(){var t=Object.keys(j.storageFilter);console.log(j.storageFilter);var a=[];t.map(function(e){switch(e){case"dryGoods":j.storageFilter[e]&&a.push({storage:{eq:"Dry Goods"}});break;case"packagingPaperCleaning":j.storageFilter[e]&&a.push({storage:{eq:"Packaging/Paper/Cleaning"}});break;case"produce":j.storageFilter[e]&&a.push({storage:{eq:"Produce"}});break;case"protein":j.storageFilter[e]&&a.push({storage:{eq:"Protein"}});break;case"dairy":j.storageFilter[e]&&a.push({storage:{eq:"Dairy"}})}}),console.log(a),0===a.length&&(a=[{storage:{eq:"Dry Goods"}},{storage:{eq:"Packaging/Paper/Cleaning"}},{storage:{eq:"Produce"}},{storage:{eq:"Protein"}},{storage:{eq:"Dairy"}}]),c.API.graphql(Object(c.graphqlOperation)(F,{filter:{location:{eq:e.location},or:a}})).then(function(t){null!==t.data.listInventoryItems.nextToken?(console.log(t),function t(a,n,r){c.API.graphql(Object(c.graphqlOperation)(F,{filter:{location:{eq:e.location},or:r},nextToken:n})).then(function(e){a.push.apply(a,Object(T.a)(e.data.listInventoryItems.items)),null!==e.data.listInventoryItems.nextToken?t(a,e.data.listInventoryItems.nextToken):(_({type:"inventoryTableItems",state:a}),_({type:"inventoryTableLoading",state:!1}))}).catch(function(e){console.log(e)})}(t.data.listInventoryItems.items,t.data.listInventoryItems.nextToken,a)):(_({type:"inventoryTableItems",state:t.data.listInventoryItems.items}),_({type:"inventoryTableLoading",state:!1}))}).catch(function(e){console.log(e)})},S=function(e){var t=Object(T.a)(j.inventoryTableItems);switch(e.column.Header){case"Action":return r.a.createElement("div",{className:"d-flex justify-content-around"},r.a.createElement("span",null,r.a.createElement(m.b,{className:"position-relative",color:"primary",floating:!0,onClick:function(){var t;t=e.original.id,console.log(t),c.API.graphql(Object(c.graphqlOperation)("mutation DeleteInventoryItem($input: DeleteInventoryItemInput!) {\n  deleteInventoryItem(input: $input) {\n    franchise\n    location\n    item\n    itemNumber\n    storage\n    category\n    price\n    quantity\n    packSize\n    units\n    brand\n    supplier\n    parValue\n    id\n  }\n}\n",{input:{id:t}})).then(function(e){console.log(e),x()}).catch(function(e){console.log(e)})}},r.a.createElement("i",{className:"material-icons"},"clear"))),r.a.createElement("span",null,r.a.createElement(m.b,{className:"position-relative",color:"primary",floating:!0,onClick:function(){_({type:"inventoryItemToUpdate",state:e.original}),d(!0)}},r.a.createElement("i",{className:"material-icons"},"edit"))));case"Item Description":return r.a.createElement(m.i,{style:{paddingTop:"30px"}},r.a.createElement("span",{className:"align-middle"},r.a.createElement("strong",null,e.original[e.column.id])));case"Quantity":return r.a.createElement(m.j,{style:{textAlign:"center"},size:"md",type:"number",valueDefault:e.original[e.column.id],getValue:function(a){t[e.index][e.column.id]=a},onBlur:function(){var t;t=e.original,console.log(t),"__typename"in t&&delete t.__typename,c.API.graphql(Object(c.graphqlOperation)(A,{input:t})).then(function(e){console.log(e)}).catch(function(e){console.log(e)})}});case"Units":case"Storage":return r.a.createElement(m.i,{style:{paddingTop:"30px"}},r.a.createElement("span",{className:"align-middle"},r.a.createElement("strong",null,e.original[e.column.id])))}},P=[{Header:"Action",accessor:"action",Cell:S,width:200},{Header:"Item Description",accessor:"item",Cell:S},{Header:"Quantity",accessor:"quantity",Cell:S,width:125},{Header:"Units",accessor:"units",Cell:S,width:125},{Header:"Storage",accessor:"storage",Cell:S,width:300}];return r.a.createElement(m.i,{className:"mt-5 text-center",style:{paddingBottom:"50px"}},r.a.createElement("div",{style:{paddingTop:"50px",paddingBottom:"80px"}},r.a.createElement(z.a,{hintText:"Search by item number/description, quantity, storage type, price, brand, or supplier",onChange:function(e){if(""===e)_({type:"inventoryTableItems",state:l});else{var t=Object(q.a)(j.inventoryTableItems,e,{keys:["item","quantity","storage","units","price","brand","supplier"]});_({type:"inventoryTableItems",state:t})}},onBlur:function(e){_({type:"inventoryTableItems",state:l})},onFocus:function(e){return i(j.inventoryTableItems)},style:{margin:"0 auto",maxWidth:800}})),r.a.createElement(k.a,{className:"-striped -highlight",noDataText:"Inventory has not been setup",columns:P,data:j.inventoryTableItems,getTdProps:function(){return{style:{overflow:"visible",verticalAlign:"middle",textAlign:"center"}}},loading:j.inventoryTableLoading,LoadingComponent:H,defaultPageSize:10,pageSizeOptions:[5,10,20,50,100],onPageChange:function(e){N()},renderPageSizeOptions:function(e){var t=e.pageSize,a=(e.pageSizeOptions,e.rowsSelectorText,e.onPageSizeChange);return e.rowsText,r.a.createElement("span",{style:{width:"150px"}},r.a.createElement(L.a,{onChange:function(e){return a(e.value)},placeholder:"".concat(t," rows"),options:[{value:5,label:"5 rows"},{value:10,label:"10 rows"},{value:20,label:"20 rows"},{value:50,label:"50 rows"},{value:100,label:"100 rows"}]}))}}),r.a.createElement("div",{className:"d-flex justify-content-around"},r.a.createElement(m.b,{color:"primary",rounded:!0,onClick:function(){h(!y)}},"Create New Inventory Item"),r.a.createElement(m.b,{color:"info",rounded:!0,onClick:function(){!function(){if(j.inventoryTableItems.length>0){var t=new R;t.setFontSize(25),t.text(65,20,"Supply Order Form"),t.setFontSize(20),t.text(20,40,e.franchise),t.setFontSize(15),t.text(20,50,e.location);var a=[];j.inventoryTableItems.map(function(e){a.push([e.itemNumber,e.item,e.price,e.quantity,e.parValue,e.units,e.storage,e.brand,e.supplier])}),t.autoTable({startY:70,theme:"grid",head:[["Item #","Item","Price","Quantity","Par Value","Units","Storage","Brand","Supplier"]],body:a});var n=new Date,r=String(n.getDate()).padStart(2,"0"),l=String(n.getMonth()+1).padStart(2,"0"),i=n.getFullYear();n=l+"/"+r+"/"+i;var o=e.franchise.split(" ").join("_");t.save("".concat(o,"_SupplyOrder_").concat(n,".pdf"))}}()}},"Generate Supply Order")),r.a.createElement("div",{className:"d-flex justify-content-around"},r.a.createElement(b.b,{to:{pathname:"/location/storageFilter/".concat(e.location),state:{location:e.location,franchise:e.franchise}}},r.a.createElement(m.b,{color:"primary",rounded:!0},r.a.createElement("i",{class:"material-icons"},"navigate_before"))),r.a.createElement(b.b,{to:{pathname:"/"}},r.a.createElement(m.b,{color:"primary",rounded:!0},r.a.createElement("i",{class:"material-icons"},"home")))),r.a.createElement(m.k,{isOpen:y,toggle:function(){return h(!y)},centered:!0,size:"lg"},r.a.createElement(m.n,{toggle:function(){return h(!y)}}),r.a.createElement(m.l,null,r.a.createElement(V,null)),r.a.createElement(m.m,null,r.a.createElement(m.b,{color:"secondary",onClick:function(){h(!y),x()}},"Close"))),r.a.createElement(m.k,{isOpen:p,toggle:function(){return d(!p)},centered:!0,size:"lg"},r.a.createElement(m.n,{toggle:function(){d(!p),x()}}),r.a.createElement(m.l,null,r.a.createElement(G,null)),r.a.createElement(m.m,null,r.a.createElement(m.b,{color:"secondary",onClick:function(){d(!p),x()}},"Close"))))},Z=(a(1140),{aws_project_region:"us-east-2",aws_cognito_identity_pool_id:"us-east-2:8c1fe34b-e786-4999-b6b8-02b7ce6ffbdf",aws_cognito_region:"us-east-2",aws_user_pools_id:"us-east-2_9AlobejmS",aws_user_pools_web_client_id:"2bmf1sp9pf622o5r8egl23qgki",aws_appsync_graphqlEndpoint:"https://46yagyum2nabbnl4qfbvw7qulm.appsync-api.us-east-2.amazonaws.com/graphql",aws_appsync_region:"us-east-2",aws_appsync_authenticationType:"AMAZON_COGNITO_USER_POOLS"}),K=a(1212),Y=Object(B.a)(function(e){return{margin:{margin:e.spacing(1)},extendedIcon:{marginRight:e.spacing(1)}}}),J=function(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),a=t[0],l=t[1],i=E(),s=Object(o.a)(i,2),u=s[0],p=s[1],d=Y(),g=function(){new Promise(function(e){a.map(function(e){var t,a=Object(U.a)({},e);a.user=u.userEmail,console.log(a),t=a,c.API.graphql(Object(c.graphqlOperation)("mutation CreateUserLocations($input: CreateUserLocationsInput!) {\n  createUserLocations(input: $input) {\n    user\n    franchise\n    location\n    longitude\n    latitude\n    units\n    storageTypes\n    brands\n    suppliers\n    id\n  }\n}\n",{input:t})).then(function(e){console.log(e)}).catch(function(e){console.log(e)})}),p({type:"franchiseLocations",state:a}),e()})},f=function(e){var t=Object(T.a)(a);return console.log(e),"Franchise"===e.column.Header?r.a.createElement(m.o,{style:{display:"flex",alignItems:"center",justifyContent:"center"}},r.a.createElement(m.h,{size:"2"},r.a.createElement(K.a,{"aria-label":"Delete",className:d.margin,onClick:function(){var t=Object(T.a)(a);console.log(t),t.splice(e.index,1),console.log(t),l(t)}},r.a.createElement("i",{className:"material-icons"},"clear"))),r.a.createElement(m.h,null,r.a.createElement(m.j,{style:{textAlign:"center"},size:"sm",valueDefault:e.original[e.column.id],getValue:function(a){t[e.index][e.column.id]=a},onBlur:function(){l(t)}}))):r.a.createElement(m.j,{style:{textAlign:"center"},size:"sm",valueDefault:e.original[e.column.id],getValue:function(a){t[e.index][e.column.id]=a},onBlur:function(){l(t)}})},y=[{Header:"Franchise",accessor:"franchise",Cell:f},{Header:"Location",accessor:"location",Cell:f}];return r.a.createElement(m.i,{className:"mt-5 text-center",style:{paddingBottom:"50px"}},r.a.createElement("h1",{className:"display-5"},r.a.createElement("strong",null,"First Time Setup")),r.a.createElement("hr",{className:"my-5"}),0===a.length?r.a.createElement("p",{className:"lead",style:{paddingBottom:"25px"}},"You currently have no restaurants associated with your account."):r.a.createElement(r.a.Fragment,null),r.a.createElement(k.a,{className:"-striped -highlight",columns:y,data:a,pageSize:5,pageSizeOptions:[5,10,20,50,100],showPageSizeOptions:!0,noDataText:"No locations setup yet",renderPageSizeOptions:function(e){var t=e.pageSize,a=(e.pageSizeOptions,e.rowsSelectorText,e.onPageSizeChange);return e.rowsText,r.a.createElement("span",{style:{width:"150px"}},r.a.createElement(L.a,{onChange:function(e){return a(e.value)},placeholder:"".concat(t," rows"),options:[{value:5,label:"5 rows"},{value:10,label:"10 rows"},{value:20,label:"20 rows"}]}))},onPageChange:function(e){var t=Object(T.a)(a);l(t)}}),r.a.createElement("p",{className:"lead",style:{paddingTop:"50px"}},"Start typing the name of your restaurant below and choose from the list provided."),r.a.createElement(C,{dispatch:p,address:u.tempSearchAddress}),r.a.createElement("div",{className:"d-flex justify-content-between"},""!==u.selectedFranchise?r.a.createElement(m.a,{type:"pulse",infinite:!0},r.a.createElement(m.b,{color:"primary",rounded:!0,onClick:function(){return function(){var e=Object(T.a)(a);console.log(a),e.push({franchise:u.selectedFranchise,location:u.selectedAddress,latitude:u.latitude,longitude:u.longitude}),p({type:"selectedFranchise",state:""}),p({type:"selectedAddress",state:""}),p({type:"tempSearchAddress",state:""}),l(e)}()}},"Add Restaurant")):r.a.createElement(m.b,{color:"primary",rounded:!0,disabled:!0},"Add Restaurant"),a.length>0?r.a.createElement(m.a,{type:"pulse",infinite:!0},r.a.createElement(m.b,{color:"success",rounded:!0,onClick:function(){return g()}},"Done")):r.a.createElement(m.b,{color:"success",rounded:!0,disabled:!0},"Done")))},X=a(308),W=a.n(X),ee=a(309),te=a.n(ee),ae=a(310),ne=a.n(ae),re=a(311),le=a.n(re),ie=a(312),oe=a.n(ie),ce=function(e){var t=E(),a=Object(o.a)(t,2),n=a[0],l=a[1];return console.log(n.storageFilter),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"d-flex justify-content-around flex-wrap bd-highlight example-parent",style:{paddingBottom:"50px"}},n.storageFilter.dryGoods?r.a.createElement(m.a,{type:"pulse",infinite:!0,duration:"2s"},r.a.createElement(m.b,{size:"lg",color:"primary",flat:!0,onClick:function(){var e=n.storageFilter;e.dryGoods=!1,l({type:"storageFilter",state:e})}},r.a.createElement(m.c,{style:{width:"22rem"}},r.a.createElement(m.e,{className:"img-fluid",src:W.a,waves:!0}),r.a.createElement(m.d,null,r.a.createElement("h5",null,"Dry Goods"))))):r.a.createElement(m.b,{size:"lg",outline:!0,flat:!0,color:"primary",onClick:function(){var e=n.storageFilter;e.dryGoods=!0,l({type:"storageFilter",state:e})}},r.a.createElement(m.c,{style:{width:"22rem"}},r.a.createElement(m.e,{className:"img-fluid",src:W.a,waves:!0}),r.a.createElement(m.d,null,r.a.createElement("h5",null,"Dry Goods")))),n.storageFilter.packagingPaperCleaning?r.a.createElement(m.a,{type:"pulse",infinite:!0,duration:"2s"},r.a.createElement(m.b,{size:"lg",color:"primary",flat:!0,onClick:function(){var e=n.storageFilter;e.packagingPaperCleaning=!1,l({type:"storageFilter",state:e})}},r.a.createElement(m.c,{style:{width:"22rem"}},r.a.createElement(m.e,{className:"img-fluid",src:te.a,waves:!0}),r.a.createElement(m.d,null,r.a.createElement("h5",null,"Packaging/Paper/Cleaning"))))):r.a.createElement(m.b,{size:"lg",outline:!0,flat:!0,color:"primary",onClick:function(){var e=n.storageFilter;e.packagingPaperCleaning=!0,l({type:"storageFilter",state:e})}},r.a.createElement(m.c,{style:{width:"22rem"}},r.a.createElement(m.e,{className:"img-fluid",src:te.a,waves:!0}),r.a.createElement(m.d,null,r.a.createElement("h5",null,"Packaging/Paper/Cleaning")))),n.storageFilter.produce?r.a.createElement(m.a,{type:"pulse",infinite:!0,duration:"2s"},r.a.createElement(m.b,{size:"lg",color:"primary",flat:!0,onClick:function(){var e=n.storageFilter;e.produce=!1,l({type:"storageFilter",state:e})}},r.a.createElement(m.c,{style:{width:"22rem"}},r.a.createElement(m.e,{className:"img-fluid",src:ne.a,waves:!0}),r.a.createElement(m.d,null,r.a.createElement("h5",null,"Produce"))))):r.a.createElement(m.b,{size:"lg",outline:!0,flat:!0,color:"primary",onClick:function(){var e=n.storageFilter;e.produce=!0,l({type:"storageFilter",state:e})}},r.a.createElement(m.c,{style:{width:"22rem"}},r.a.createElement(m.e,{className:"img-fluid",src:ne.a,waves:!0}),r.a.createElement(m.d,null,r.a.createElement("h5",null,"Produce")))),n.storageFilter.dairy?r.a.createElement(m.a,{type:"pulse",infinite:!0,duration:"2s"},r.a.createElement(m.b,{size:"lg",color:"primary",flat:!0,onClick:function(){var e=n.storageFilter;e.dairy=!1,l({type:"storageFilter",state:e})}},r.a.createElement(m.c,{style:{width:"22rem"}},r.a.createElement(m.e,{className:"img-fluid",src:le.a,waves:!0}),r.a.createElement(m.d,null,r.a.createElement("h5",null,"Dairy"))))):r.a.createElement(m.b,{size:"lg",flat:!0,color:"primary",onClick:function(){var e=n.storageFilter;e.dairy=!0,l({type:"storageFilter",state:e})}},r.a.createElement(m.c,{style:{width:"22rem"}},r.a.createElement(m.e,{className:"img-fluid",src:le.a,waves:!0}),r.a.createElement(m.d,null,r.a.createElement("h5",null,"Dairy")))),n.storageFilter.protein?r.a.createElement(m.a,{type:"pulse",infinite:!0,duration:"2s"},r.a.createElement(m.b,{size:"lg",color:"primary",flat:!0,onClick:function(){var e=n.storageFilter;e.protein=!1,l({type:"storageFilter",state:e})}},r.a.createElement(m.c,{style:{width:"22rem"}},r.a.createElement(m.e,{className:"img-fluid",src:oe.a,waves:!0}),r.a.createElement(m.d,null,r.a.createElement("h5",null,"Protein"))))):r.a.createElement(m.b,{size:"lg",flat:!0,color:"primary",onClick:function(){var e=n.storageFilter;e.protein=!0,l({type:"storageFilter",state:e})}},r.a.createElement(m.c,{style:{width:"22rem"}},r.a.createElement(m.e,{className:"img-fluid",src:oe.a,waves:!0}),r.a.createElement(m.d,null,r.a.createElement("h5",null,"Protein"))))),r.a.createElement("div",{className:"d-flex justify-content-around",style:{paddingBottom:"50px"}},r.a.createElement(b.b,{to:{pathname:"/"}},r.a.createElement(m.b,{color:"primary",rounded:!0},r.a.createElement("i",{class:"material-icons"},"navigate_before"))),r.a.createElement(b.b,{to:{pathname:"/location/inventoryTable/".concat(e.location),state:{location:e.location,franchise:e.franchise}}},r.a.createElement(m.b,{color:"primary",rounded:!0},r.a.createElement("i",{className:"material-icons"},"navigate_next")))))},se=Object(u.withAuthenticator)(function(){var e=E(),t=Object(o.a)(e,2),a=t[0],l=t[1],i=function(e){c.API.graphql(Object(c.graphqlOperation)("query ListUserLocationss(\n  $filter: ModelUserLocationsFilterInput\n  $limit: Int\n  $nextToken: String\n) {\n  listUserLocationss(filter: $filter, limit: $limit, nextToken: $nextToken) {\n    items {\n      user\n      franchise\n      location\n      longitude\n      latitude\n      units\n      storageTypes\n      brands\n      suppliers\n      id\n    }\n    nextToken\n  }\n}\n",{filter:{user:{eq:e}}})).then(function(t){l({type:"franchiseLocations",state:t.data.listUserLocationss.items}),l({type:"userEmail",state:e})}).catch(function(e){console.log(e)})};return Object(n.useEffect)(function(){c.Auth.currentUserInfo().then(function(e){var t=e.attributes.email;i(t)})},[]),r.a.createElement(b.a,null,r.a.createElement(S.c,null,a.userEmail&&r.a.createElement(S.a,{exact:!0,path:"/",render:function(e){return 0===a.franchiseLocations.length?r.a.createElement(J,null):r.a.createElement(v,null)}}),r.a.createElement(S.a,{path:"/location/storageFilter/:location",render:function(e){return console.log(e),r.a.createElement(ce,{location:e.location.state.location,franchise:e.location.state.franchise})}}),r.a.createElement(S.a,{path:"/location/inventoryTable/:location",render:function(e){return console.log(e),r.a.createElement(Q,{location:e.location.state.location,franchise:e.location.state.franchise})}})))},{includeGreetings:!0,authenticatorComponents:[r.a.createElement(u.Greetings,null),r.a.createElement(u.ConfirmSignIn,null),r.a.createElement(u.TOTPSetup,null),r.a.createElement(u.ForgotPassword,null),r.a.createElement(u.Loading,null),r.a.createElement(u.RequireNewPassword,null),r.a.createElement(u.VerifyContact,null),r.a.createElement(u.SignIn,null)],theme:u.AmplifyTheme}),ue=a(218),me=a(521),pe=function(e,t){switch(t.type){case"franchiseLocations":return Object(U.a)({},e,{franchiseLocations:t.state});case"storageOptions":return Object(U.a)({},e,{storageOptions:t.state});case"brandOptions":return Object(U.a)({},e,{brandOptions:t.state});case"itemToRemove":return Object(U.a)({},e,{itemToRemove:t.state});case"supplierOptions":return Object(U.a)({},e,{supplierOptions:t.state});case"storageFilter":return Object(U.a)({},e,{storageFilter:t.state});case"unitOptions":return Object(U.a)({},e,{unitOptions:t.state});case"currentLocation":return Object(U.a)({},e,{currentLocation:t.state});case"currentFranchise":return Object(U.a)({},e,{currentFranchise:t.state});case"inventoryTableItems":return Object(U.a)({},e,{inventoryTableItems:t.state});case"inventoryItemToUpdate":return Object(U.a)({},e,{inventoryItemToUpdate:t.state});case"inventoryTableLoading":return Object(U.a)({},e,{inventoryTableLoading:t.state});case"selectedFranchise":return Object(U.a)({},e,{selectedFranchise:t.state});case"selectedAddress":return Object(U.a)({},e,{selectedAddress:t.state});case"tempSearchAddress":return Object(U.a)({},e,{tempSearchAddress:t.state});case"userEmail":return Object(U.a)({},e,{userEmail:t.state});case"selectedCoordinates":return Object(U.a)({},e,{latitude:t.state.lat,longitude:t.state.lng});default:return e}},de=a(522),ge=a.n(de),fe={position:ue.b.BOTTOM_CENTER,timeout:5e3,offset:"200px",transition:ue.c.SCALE};s.a.configure(Z),i.a.render(r.a.createElement(ue.a,Object.assign({template:me.a},fe),r.a.createElement(function(e){var t=e.reducer,a=e.initialState,l=e.children;return r.a.createElement(h.Provider,{value:Object(n.useReducer)(t,a)},l)},{initialState:{franchiseLocations:[],storageOptions:[{value:"Dry Goods",label:"Dry Goods"},{value:"Packaging/Paper/Cleaning",label:"Packaging/Paper/Cleaning"},{value:"Produce",label:"Produce"},{value:"Dairy",label:"Dairy"},{value:"Protein",label:"Protein"}],unitOptions:[{value:"OZ",label:"OZ"},{value:"LB",label:"LB"},{value:"CT",label:"CT"},{value:"GM",label:"GM"},{value:"AV",label:"AV"},{value:"GA",label:"GA"}],supplierOptions:[],brandOptions:[],storageFilter:{dryGoods:!1,packagingPaperCleaning:!1,produce:!1,dairy:!1,protein:!1},tempSearchAddress:"",selectedFranchise:"",selectedAddress:"",currentLocation:"",currentFranchise:"",inventoryTableLoading:!0,inventoryTableItems:[],inventoryItemHasUpdated:!1},reducer:pe},r.a.createElement(ge.a,null,r.a.createElement(se,null)))),document.getElementById("root"))},228:function(e,t){},280:function(e,t){},308:function(e,t,a){e.exports=a.p+"static/media/dryGoods.d164cc7e.jpg"},309:function(e,t,a){e.exports=a.p+"static/media/packagingCleaning.2353df13.jpg"},310:function(e,t,a){e.exports=a.p+"static/media/produce.aff80969.jpg"},311:function(e,t,a){e.exports=a.p+"static/media/dairy.8415a217.jpg"},312:function(e,t,a){e.exports=a.p+"static/media/protein.bab7032e.jpg"},533:function(e,t,a){e.exports=a(1177)},540:function(e,t,a){}},[[533,1,2]]]);
//# sourceMappingURL=main.acf37aa5.chunk.js.map