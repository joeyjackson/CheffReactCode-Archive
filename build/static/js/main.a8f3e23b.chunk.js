(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1132:function(e,t,n){},1133:function(e,t,n){},1170:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(11),i=n.n(l),o=(n(532),n(533),n(534),n(60)),c=n(38),s=n.n(c),u=n(77),p=n(17),m=(n(208),n(506),n(833),n(215)),d=n.n(m),g=(n(302),n(507),n(307)),f=function(e){return r.a.createElement("div",null,r.a.createElement(g.StaticGoogleMap,{size:"352x500",apiKey:"AIzaSyAojclCkVnINxiSN0uKSLG1Q5RPBvtX9HI",zoom:17},r.a.createElement(g.Marker,{location:e.lat.toString()+","+e.lng.toString()})))};d.a.setApiKey("AIzaSyAojclCkVnINxiSN0uKSLG1Q5RPBvtX9HI"),d.a.enableDebug();var h=function(e){return console.log(e),r.a.createElement(p.c,{style:{width:"22rem"}},r.a.createElement(f,{lat:e.latitude,lng:e.longitude}),r.a.createElement(p.d,null,r.a.createElement(p.f,null,e.name),r.a.createElement(p.e,null,e.location)))},b=n(106),y=Object(a.createContext)(),O=function(){return Object(a.useContext)(y)},E=function(){var e=O(),t=Object(o.a)(e,2),n=t[0],a=(t[1],n.franchiseLocations);console.log(a);var l=a.map(function(e){return r.a.createElement(p.g,{key:e.location,lg:"4",md:"6",style:{paddingTop:"50px",paddingBottom:"50px"}},r.a.createElement(b.b,{to:{pathname:"/location/".concat(e.location),state:{location:e.location,franchise:e.franchise}}},r.a.createElement("div",{className:"d-flex justify-content-center"},r.a.createElement(h,{location:e.location,name:e.franchise,latitude:e.latitude,longitude:e.longitude}))))});return r.a.createElement(p.n,null,l)},v=n(508),j=n(145),S=n(518),I=n(509),_=n(517),x=n(216),N=n.n(x),C=function(e){function t(e){var n;return Object(v.a)(this,t),(n=Object(S.a)(this,Object(I.a)(t).call(this,e))).handleChange=function(e){n.setState({latitude:null,longitude:null,errorMessage:""}),n.props.dispatch({type:"tempSearchAddress",state:e})},n.extractFranchiseAndAddress=function(e){var t="",a="";-1===e.indexOf("-")?(t=e.slice(0,e.indexOf(",")),a=e.slice(e.indexOf(",")+2)):(t=e.slice(0,e.indexOf("-")),a=e.slice(e.indexOf("-")+2)),n.props.dispatch({type:"selectedFranchise",state:t}),n.props.dispatch({type:"selectedAddress",state:a})},n.handleSelect=function(e){n.setState({isGeocoding:!0}),n.props.dispatch({type:"tempSearchAddress",state:e}),Object(x.geocodeByAddress)(e).then(function(e){return Object(x.getLatLng)(e[0])}).then(function(t){var a=t.lat,r=t.lng;n.setState({latitude:a,longitude:r,isGeocoding:!1}),n.props.dispatch({type:"selectedCoordinates",state:{lat:a,lng:r}}),n.extractFranchiseAndAddress(e)}).catch(function(e){n.setState({isGeocoding:!1}),console.log("error",e)})},n.handleCloseClick=function(){n.setState({latitude:null,longitude:null}),n.props.dispatch({type:"selectedFranchise",state:""}),n.props.dispatch({type:"selectedAddress",state:""}),n.props.dispatch({type:"tempSearchAddress",state:""})},n.handleError=function(e,t){console.log("Error from Google Maps API",e),n.setState({errorMessage:e},function(){t()})},n.state={errorMessage:"",latitude:null,longitude:null,isGeocoding:!1,selectedFranchise:"",selectedAddress:""},n}return Object(_.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){var e=this,t=this.state,n=t.errorMessage,a=t.latitude,l=t.longitude,i=t.isGeocoding,o=this.props.address;return r.a.createElement("div",{style:{paddingBottom:"25px"}},r.a.createElement(N.a,{onChange:this.handleChange,value:o,onSelect:this.handleSelect,onError:this.handleError,shouldFetchSuggestions:o.length>2},function(t){var n=t.getInputProps,a=t.suggestions,l=t.getSuggestionItemProps;return r.a.createElement("div",{className:"Demo__search-bar-container"},r.a.createElement("div",{className:"Demo__search-input-container"},r.a.createElement("input",n({placeholder:"Enter the name of your restaurant",className:"Demo__search-input"})),o.length>0&&r.a.createElement("button",{className:"Demo__clear-button",onClick:e.handleCloseClick},"x")),a.length>0&&r.a.createElement("div",{className:"Demo__autocomplete-container"},a.map(function(e){var t=function(){for(var e=[],t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];return n.forEach(function(t){if("string"===typeof t)e.push(t);else{if("object"!==typeof(n=t)||null===n)throw new Error("`classnames` only accepts string or object as arguments");Object.keys(t).forEach(function(n){t[n]&&e.push(n)})}var n}),e.join(" ")}("Demo__suggestion-item",{"Demo__suggestion-item--active":e.active});return r.a.createElement("div",l(e,{className:t}),r.a.createElement("strong",null,e.formattedSuggestion.mainText)," ",r.a.createElement("small",null,e.formattedSuggestion.secondaryText))})))}),n.length>0&&r.a.createElement("div",{className:"Demo__error-message"},this.state.errorMessage),a&&l&&!i&&console.log(a,l))}}]),t}(r.a.Component),w=n(108),A=n(66),T=(n(457),n(168)),q=(n(273),n(146)),L="mutation CreateInventoryItem($input: CreateInventoryItemInput!) {\n  createInventoryItem(input: $input) {\n    franchise\n    location\n    item\n    itemNumber\n    storage\n    category\n    price\n    quantity\n    packSize\n    units\n    brand\n    supplier\n    parValue\n    id\n  }\n}\n",k="mutation DeleteInventoryItem($input: DeleteInventoryItemInput!) {\n  deleteInventoryItem(input: $input) {\n    franchise\n    location\n    item\n    itemNumber\n    storage\n    category\n    price\n    quantity\n    packSize\n    units\n    brand\n    supplier\n    parValue\n    id\n  }\n}\n",z=n(510),P=(n(458),n(514)),D=n.n(P),F=n(211),V=n(27),B=function(){var e=O(),t=Object(o.a)(e,2),n=t[0],l=t[1],i=Object(a.useState)({franchise:n.currentFranchise,location:n.currentLocation,item:null,itemNumber:null,price:null,storage:null,quantity:null,units:"OZ",brand:null,supplier:null,parValue:null}),s=Object(o.a)(i,2),u=s[0],m=s[1];return r.a.createElement(p.h,null,r.a.createElement("h3",{className:"display-5",style:{paddingTop:"80px"}},r.a.createElement("strong",null,"Create New Inventory Item")),r.a.createElement("hr",{className:"my-4"}),r.a.createElement("div",{className:"d-flex justify-content-center",style:{paddingBottom:"50px"}},r.a.createElement("form",null,r.a.createElement(p.i,{label:"Item Number",outline:!0,type:"number",getValue:function(e){var t=Object(V.a)({},u);t.itemNumber=e,m(t)}}),r.a.createElement(p.i,{label:"Item Description",outline:!0,getValue:function(e){var t=Object(V.a)({},u);t.item=e,m(t)}}),r.a.createElement(p.i,{label:"Price",outline:!0,type:"number",getValue:function(e){var t=Object(V.a)({},u);t.price=e,m(t)}}),r.a.createElement(p.n,null,r.a.createElement(p.g,{sm:"7"},r.a.createElement(p.i,{label:"Quantity",outline:!0,type:"number",getValue:function(e){var t=Object(V.a)({},u);t.quantity=e,m(t)}}),r.a.createElement(p.i,{label:"Par Value",outline:!0,type:"number",getValue:function(e){var t=Object(V.a)({},u);t.parValue=e,m(t)}})),r.a.createElement(p.g,{sm:"5"},r.a.createElement("label",{className:"grey-text"},"Units"),r.a.createElement(q.a,{isClearable:!0,onChange:function(e){return function(e){if(e){if(e.hasOwnProperty("__isNew__")){var t=Object(A.a)(n.unitOptions),a=Object(V.a)({},e);delete a.__isNew__,t.push(a),l({type:"unitOptions",state:t})}var r=Object(V.a)({},u);r.units=e.value,m(r)}}(e)},options:n.unitOptions,placeholder:"OZ"}))),r.a.createElement("br",null),r.a.createElement("label",{className:"grey-text"},"Storage"),r.a.createElement(q.a,{isClearable:!0,onChange:function(e){return function(e){if(e){if(e.hasOwnProperty("__isNew__")){var t=Object(A.a)(n.storageOptions),a=Object(V.a)({},e);delete a.__isNew__,t.push(a),l({type:"storageOptions",state:t})}var r=Object(V.a)({},u);r.storage=e.value,m(r)}}(e)},options:n.storageOptions,placeholder:"Select/Type Storage"}),r.a.createElement("br",null),r.a.createElement("label",{className:"grey-text"},"Brand"),r.a.createElement(q.a,{isClearable:!0,onChange:function(e){return function(e){if(e){if(e.hasOwnProperty("__isNew__")){var t=Object(A.a)(n.brandOptions),a=Object(V.a)({},e);delete a.__isNew__,t.push(a),l({type:"brandOptions",state:t})}var r=Object(V.a)({},u);r.brand=e.value,m(r)}}(e)},options:n.brandOptions,placeholder:"Select/Type Brand"}),r.a.createElement("br",null),r.a.createElement("label",{className:"grey-text"},"Supplier"),r.a.createElement(q.a,{isClearable:!0,onChange:function(e){return function(e){if(e){if(e.hasOwnProperty("__isNew__")){var t=Object(A.a)(n.supplierOptions),a=Object(V.a)({},e);delete a.__isNew__,t.push(a),l({type:"supplierOptions",state:t})}var r=Object(V.a)({},u);r.supplier=e.value,m(r)}}(e)},options:n.supplierOptions,placeholder:"Select/Type Supplier"}),r.a.createElement("div",{className:"text-center mt-4"},r.a.createElement(p.b,{color:"primary",onClick:function(){c.API.graphql(Object(c.graphqlOperation)(L,{input:u})).then(function(e){console.log(e)}).catch(function(e){console.log(e)})}},"Create Item")))))},$=n(1207),G=n(1208),M=Object($.a)(function(e){return{progress:{margin:e.spacing(2)}}}),R=function(e){var t=M();return e.loading&&r.a.createElement("div",{className:"-loading -active"},r.a.createElement("div",{className:"-loading-inner"},r.a.createElement(G.a,{className:t.progress})))},U=(n(1132),n(328)),H=function(e){var t=Object(a.useState)([]),n=Object(o.a)(t,2),l=(n[0],n[1]),i=Object(a.useState)(!1),s=Object(o.a)(i,2),m=s[0],d=s[1],g=O(),f=Object(o.a)(g,2),h=f[0],b=f[1],y=Object(a.useState)()[1];Object(a.useEffect)(function(){console.log("mounted"),b({type:"currentLocation",state:e.location}),b({type:"currentFranchise",state:e.franchise}),b({type:"itemToRemove",state:e.franchise})},[]);var E=function(e){"__typename"in e&&delete e.__typename,c.API.graphql(Object(c.graphqlOperation)("mutation UpdateInventoryItem($input: UpdateInventoryItemInput!) {\n  updateInventoryItem(input: $input) {\n    franchise\n    location\n    item\n    itemNumber\n    storage\n    category\n    price\n    quantity\n    packSize\n    units\n    brand\n    supplier\n    parValue\n    id\n  }\n}\n",{input:e})).then(function(e){console.log(e)}).catch(function(e){console.log(e)})},v=function(e){console.log(e),c.API.graphql(Object(c.graphqlOperation)(k,{input:{id:e}})).then(function(e){!function(){var e=U();c.API.graphql(Object(c.graphqlOperation)(L,{input:{franchise:"NA",location:"NA",item:"NA",itemNumber:1234,storage:"NA",category:"NA",price:123,quantity:123,packSize:"NA",units:"NA",brand:"NA",supplier:"NA",parValue:"NA",id:e}})).then(function(t){c.API.graphql(Object(c.graphqlOperation)(k,{input:{id:e}}))}).catch(function(e){console.log(e)})}()}).catch(function(e){console.log(e)})},j=function(e){var t=Object(A.a)(h.inventoryTableItems);switch(e.column.Header){case"Item Description":return r.a.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"}},r.a.createElement("span",null,r.a.createElement(p.b,{className:"position-relative",flat:!0,onClick:function(){v(e.original.id)}},r.a.createElement("i",{className:"material-icons"},"clear"))),r.a.createElement("span",null,r.a.createElement(p.i,{style:{textAlign:"center"},size:"md",valueDefault:e.original[e.column.id],getValue:function(n){t[e.index][e.column.id]=n},onBlur:function(){E(e.original)}})));case"Quantity":return r.a.createElement(p.i,{style:{textAlign:"center"},size:"md",type:"number",valueDefault:e.original[e.column.id],getValue:function(n){t[e.index][e.column.id]=n},onBlur:function(){E(e.original)}});case"Units":return r.a.createElement(p.o,{style:{textAlign:"center"},options:h.unitOptions,selected:e.original.units,getValue:function(n){t[e.index][e.column.id]=n[0],E(e.original)}});case"Storage":return r.a.createElement(p.o,{options:h.storageOptions,selected:e.original.storage,getValue:function(n){t[e.index][e.column.id]=n[0],E(e.original)}})}},S=[{Header:"Item Description",accessor:"item",Cell:j},{Header:"Quantity",accessor:"quantity",Cell:j},{Header:"Units",accessor:"units",Cell:j},{Header:"Storage",accessor:"storage",Cell:j}];return r.a.createElement(p.h,{className:"mt-5 text-center",style:{paddingBottom:"50px"}},r.a.createElement("div",{style:{paddingTop:"50px",paddingBottom:"80px"}},r.a.createElement(D.a,{hintText:"Search by item number/description, quantity, storage type, price, brand, or supplier",onChange:function(e){var t=Object(z.a)(h.inventoryTableItems,e,{keys:["item","quantity","storage"]});l(t)},onRequestSearch:function(e){return console.log(e)},style:{margin:"0 auto",maxWidth:800}})),r.a.createElement(u.Connect,{query:Object(c.graphqlOperation)("query ListInventoryItems(\n  $filter: ModelInventoryItemFilterInput\n  $limit: Int\n  $nextToken: String\n) {\n  listInventoryItems(filter: $filter, limit: $limit, nextToken: $nextToken) {\n    items {\n      franchise\n      location\n      item\n      itemNumber\n      storage\n      category\n      price\n      quantity\n      packSize\n      units\n      brand\n      supplier\n      parValue\n      id\n    }\n    nextToken\n  }\n}\n",{filter:{location:{eq:e.location}},limit:20}),subscription:Object(c.graphqlOperation)("subscription OnCreateInventoryItem {\n  onCreateInventoryItem {\n    franchise\n    location\n    item\n    itemNumber\n    storage\n    category\n    price\n    quantity\n    packSize\n    units\n    brand\n    supplier\n    parValue\n    id\n  }\n}\n"),onSubscriptionMsg:function(e,t){var n,a=t.onCreateInventoryItem;if(n="listInventoryItems"in e?Object(A.a)(e.listInventoryItems.items):e,console.log(h),console.log(n),"NA"===a.franchise){for(var r=0;r<n.length;r++)n[r].id===h.itemToRemove&&n.splice(r,1);return console.log(n),n}return n.push(a),n}},function(e){var t;return console.log(e),e.loading?r.a.createElement(T.a,{className:"-striped -highlight",noDataText:"Inventory has not been setup",columns:S,data:[],defaultPageSize:10,loading:e.loading,LoadingComponent:R}):(t="listInventoryItems"in e.data?e.data.listInventoryItems.items:e.data,r.a.createElement(T.a,{className:"-striped -highlight",noDataText:"Inventory has not been setup",columns:S,data:t,getTdProps:function(){return{style:{overflow:"visible"}}},resolveData:function(e){return b({type:"inventoryTableItems",state:e}),e},loading:e.loading,LoadingComponent:R,defaultPageSize:10,pageSizeOptions:[5,10,20,50,100],onPageChange:function(e){y()},renderPageSizeOptions:function(e){var t=e.pageSize,n=(e.pageSizeOptions,e.rowsSelectorText,e.onPageSizeChange);return e.rowsText,r.a.createElement("span",{style:{width:"150px"}},r.a.createElement(F.a,{onChange:function(e){return n(e.value)},placeholder:"".concat(t," rows"),options:[{value:5,label:"5 rows"},{value:10,label:"10 rows"},{value:20,label:"20 rows"},{value:50,label:"50 rows"},{value:100,label:"100 rows"}]}))}}))}),r.a.createElement(p.b,{color:"primary",onClick:function(){d(!m)}},"Create New Inventory Item"),r.a.createElement(p.j,{isOpen:m,toggle:function(){return d(!m)},centered:!0,size:"lg"},r.a.createElement(p.m,{toggle:function(){return d(!m)}}),r.a.createElement(p.k,null,r.a.createElement(B,null)),r.a.createElement(p.l,null,r.a.createElement(p.b,{color:"secondary",onClick:function(){return d(!m)}},"Close"))))},Q=(n(1133),{aws_project_region:"us-east-2",aws_cognito_identity_pool_id:"us-east-2:8c1fe34b-e786-4999-b6b8-02b7ce6ffbdf",aws_cognito_region:"us-east-2",aws_user_pools_id:"us-east-2_9AlobejmS",aws_user_pools_web_client_id:"2bmf1sp9pf622o5r8egl23qgki",aws_appsync_graphqlEndpoint:"https://46yagyum2nabbnl4qfbvw7qulm.appsync-api.us-east-2.amazonaws.com/graphql",aws_appsync_region:"us-east-2",aws_appsync_authenticationType:"AMAZON_COGNITO_USER_POOLS"}),Z=n(1205),K=Object($.a)(function(e){return{margin:{margin:e.spacing(1)},extendedIcon:{marginRight:e.spacing(1)}}}),J=function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],l=t[1],i=O(),s=Object(o.a)(i,2),u=s[0],m=s[1],d=K(),g=function(){new Promise(function(e){n.map(function(e){var t,n=Object(V.a)({},e);n.user=u.userEmail,console.log(n),t=n,c.API.graphql(Object(c.graphqlOperation)("mutation CreateUserLocations($input: CreateUserLocationsInput!) {\n  createUserLocations(input: $input) {\n    user\n    franchise\n    location\n    longitude\n    latitude\n    units\n    storageTypes\n    brands\n    suppliers\n    id\n  }\n}\n",{input:t})).then(function(e){console.log(e)}).catch(function(e){console.log(e)})}),m({type:"franchiseLocations",state:n}),e()})},f=function(e){var t=Object(A.a)(n);return console.log(e),"Franchise"===e.column.Header?r.a.createElement(p.n,{style:{display:"flex",alignItems:"center",justifyContent:"center"}},r.a.createElement(p.g,{size:"2"},r.a.createElement(Z.a,{"aria-label":"Delete",className:d.margin,onClick:function(){var t=Object(A.a)(n);console.log(t),t.splice(e.index,1),console.log(t),l(t)}},r.a.createElement("i",{className:"material-icons"},"clear"))),r.a.createElement(p.g,null,r.a.createElement(p.i,{style:{textAlign:"center"},size:"sm",valueDefault:e.original[e.column.id],getValue:function(n){t[e.index][e.column.id]=n},onBlur:function(){l(t)}}))):r.a.createElement(p.i,{style:{textAlign:"center"},size:"sm",valueDefault:e.original[e.column.id],getValue:function(n){t[e.index][e.column.id]=n},onBlur:function(){l(t)}})},h=[{Header:"Franchise",accessor:"franchise",Cell:f},{Header:"Location",accessor:"location",Cell:f}];return r.a.createElement(p.h,{className:"mt-5 text-center",style:{paddingBottom:"50px"}},r.a.createElement("h1",{className:"display-5"},r.a.createElement("strong",null,"First Time Setup")),r.a.createElement("hr",{className:"my-5"}),0===n.length?r.a.createElement("p",{className:"lead",style:{paddingBottom:"25px"}},"You currently have no restaurants associated with your account."):r.a.createElement(r.a.Fragment,null),r.a.createElement(T.a,{className:"-striped -highlight",columns:h,data:n,pageSize:5,pageSizeOptions:[5,10,20,50,100],showPageSizeOptions:!0,noDataText:"No locations setup yet",renderPageSizeOptions:function(e){var t=e.pageSize,n=(e.pageSizeOptions,e.rowsSelectorText,e.onPageSizeChange);return e.rowsText,r.a.createElement("span",{style:{width:"150px"}},r.a.createElement(F.a,{onChange:function(e){return n(e.value)},placeholder:"".concat(t," rows"),options:[{value:5,label:"5 rows"},{value:10,label:"10 rows"},{value:20,label:"20 rows"}]}))},onPageChange:function(e){var t=Object(A.a)(n);l(t)}}),r.a.createElement("p",{className:"lead",style:{paddingTop:"50px"}},"Start typing the name of your restaurant below and choose from the list provided."),r.a.createElement(C,{dispatch:m,address:u.tempSearchAddress}),r.a.createElement("div",{className:"d-flex justify-content-between"},""!==u.selectedFranchise?r.a.createElement(p.a,{type:"pulse",infinite:!0},r.a.createElement(p.b,{color:"primary",rounded:!0,onClick:function(){return function(){var e=Object(A.a)(n);console.log(n),e.push({franchise:u.selectedFranchise,location:u.selectedAddress,latitude:u.latitude,longitude:u.longitude}),m({type:"selectedFranchise",state:""}),m({type:"selectedAddress",state:""}),m({type:"tempSearchAddress",state:""}),l(e)}()}},"Add Restaurant")):r.a.createElement(p.b,{color:"primary",rounded:!0,disabled:!0},"Add Restaurant"),n.length>0?r.a.createElement(p.a,{type:"pulse",infinite:!0},r.a.createElement(p.b,{color:"success",rounded:!0,onClick:function(){return g()}},"Done")):r.a.createElement(p.b,{color:"success",rounded:!0,disabled:!0},"Done")))},X=Object(u.withAuthenticator)(function(){var e=O(),t=Object(o.a)(e,2),n=t[0],l=t[1],i=function(e){c.API.graphql(Object(c.graphqlOperation)("query ListUserLocationss(\n  $filter: ModelUserLocationsFilterInput\n  $limit: Int\n  $nextToken: String\n) {\n  listUserLocationss(filter: $filter, limit: $limit, nextToken: $nextToken) {\n    items {\n      user\n      franchise\n      location\n      longitude\n      latitude\n      units\n      storageTypes\n      brands\n      suppliers\n      id\n    }\n    nextToken\n  }\n}\n",{filter:{user:{eq:e}}})).then(function(t){l({type:"franchiseLocations",state:t.data.listUserLocationss.items}),l({type:"userEmail",state:e})}).catch(function(e){console.log(e)})};return Object(a.useEffect)(function(){c.Auth.currentUserInfo().then(function(e){var t=e.attributes.email;i(t)})},[]),r.a.createElement(b.a,null,r.a.createElement(w.c,null,n.userEmail&&r.a.createElement(w.a,{exact:!0,path:"/",render:function(e){return 0===n.franchiseLocations.length?r.a.createElement(J,null):r.a.createElement(E,null)}}),r.a.createElement(w.a,{path:"/location/:location",render:function(e){return console.log(e),r.a.createElement(H,{location:e.location.state.location,franchise:e.location.state.franchise})}})))},{includeGreetings:!0,authenticatorComponents:[r.a.createElement(u.Greetings,null),r.a.createElement(u.ConfirmSignIn,null),r.a.createElement(u.TOTPSetup,null),r.a.createElement(u.ForgotPassword,null),r.a.createElement(u.Loading,null),r.a.createElement(u.RequireNewPassword,null),r.a.createElement(u.VerifyContact,null),r.a.createElement(u.SignIn,null)],theme:u.AmplifyTheme}),W=n(217),Y=n(515),ee=function(e,t){switch(t.type){case"franchiseLocations":return Object(V.a)({},e,{franchiseLocations:t.state});case"storageOptions":return Object(V.a)({},e,{storageOptions:t.state});case"brandOptions":return Object(V.a)({},e,{brandOptions:t.state});case"itemToRemove":return Object(V.a)({},e,{itemToRemove:t.state});case"supplierOptions":return Object(V.a)({},e,{supplierOptions:t.state});case"unitOptions":return Object(V.a)({},e,{unitOptions:t.state});case"currentLocation":return Object(V.a)({},e,{currentLocation:t.state});case"currentFranchise":return Object(V.a)({},e,{currentFranchise:t.state});case"inventoryTableItems":return Object(V.a)({},e,{inventoryTableItems:t.state});case"inventoryTableLoading":return Object(V.a)({},e,{inventoryTableLoading:t.state});case"selectedFranchise":return Object(V.a)({},e,{selectedFranchise:t.state});case"selectedAddress":return Object(V.a)({},e,{selectedAddress:t.state});case"tempSearchAddress":return Object(V.a)({},e,{tempSearchAddress:t.state});case"userEmail":return Object(V.a)({},e,{userEmail:t.state});case"selectedCoordinates":return Object(V.a)({},e,{latitude:t.state.lat,longitude:t.state.lng});default:return e}},te=n(516),ne=n.n(te),ae={position:W.b.BOTTOM_CENTER,timeout:5e3,offset:"200px",transition:W.c.SCALE};s.a.configure(Q),i.a.render(r.a.createElement(W.a,Object.assign({template:Y.a},ae),r.a.createElement(function(e){var t=e.reducer,n=e.initialState,l=e.children;return r.a.createElement(y.Provider,{value:Object(a.useReducer)(t,n)},l)},{initialState:{franchiseLocations:[],storageOptions:[{value:"Dry Storage",label:"Dry Storage"},{value:"Cold Storage",label:"Cold Storage"},{value:"Freezer",label:"Freezer"},{value:"Low Velocity",label:"Low Velocity"}],unitOptions:[{value:"OZ",label:"OZ"},{value:"LB",label:"LB"},{value:"CT",label:"CT"},{value:"GM",label:"GM"},{value:"AV",label:"AV"},{value:"GA",label:"GA"}],supplierOptions:[],brandOptions:[],storageFilter:[{type:"Dry Storage",filtered:!1},{type:"Cold Storage",filtered:!1},{type:"Freezer",filtered:!1},{type:"Low  Velocity",filtered:!1}],tempSearchAddress:"",selectedFranchise:"",selectedAddress:"",currentLocation:"",currentFranchise:"",inventoryTableLoading:!0,inventoryTableItems:[],itemToRemove:""},reducer:ee},r.a.createElement(ne.a,null,r.a.createElement(X,null)))),document.getElementById("root"))},227:function(e,t){},280:function(e,t){},527:function(e,t,n){e.exports=n(1170)},534:function(e,t,n){}},[[527,1,2]]]);
//# sourceMappingURL=main.a8f3e23b.chunk.js.map