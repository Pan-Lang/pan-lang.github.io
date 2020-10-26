(this["webpackJsonppanlang-ui"]=this["webpackJsonppanlang-ui"]||[]).push([[0],{128:function(e,t,a){},165:function(e,t,a){e.exports=a(227)},174:function(e,t,a){e.exports=a.p+"static/media/logo.07da641c.png"},223:function(e,t){},227:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(37),o=a.n(l),c=(a(128),a(27)),i=a(10),u=a(126),s=a(84);var m=function(){return r.a.createElement(u.a,{bg:"light"},r.a.createElement(u.a.Brand,{as:c.b,to:"/"},r.a.createElement("div",{id:"logo"},r.a.createElement("img",{src:a(174),alt:"Pan-Lang",style:{width:150,height:45}}))),r.a.createElement(s.a,{className:"mr-auto"},r.a.createElement(s.a.Link,{as:c.b,to:"/order"},"Order"),r.a.createElement(s.a.Link,{as:c.b,to:"/stock"},"Stock"),r.a.createElement(s.a.Link,{as:c.b,to:"/order-tracker"},"Order Tracker")))},d=a(85),E=a(8),f=a(74),h=a(41),g=a(19),p=a(30),b=a.n(p),v=a(55),k=a(154),y="https://panlang.herokuapp.com",C=a.n(k).a.create({baseURL:y});function S(){return(S=Object(v.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:C.post("/people",t).then((function(e){return!0})).catch((function(e){return!1}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var O=["1","2","3","4","5","6","7","8","9","10","11","12"],w=["January","February","March","April","May","June","July","August","September","October","November","December"],j=["2020","2021","2022","2023","2024"];var I=function(){var e=new Date,t=Object(n.useState)({month:O[e.getMonth()],year:e.getFullYear()}),a=Object(E.a)(t,2),l=a[0],o=a[1];return r.a.createElement(h.a,{style:{textAlign:"center"}},r.a.createElement("div",{style:{marginBottom:20}},r.a.createElement("h1",null,"Welcome to")," ",r.a.createElement("h1",null,r.a.createElement("font",{style:{color:"#26B020",fontWeight:"bold"}},"Pan-Lang"))),r.a.createElement("div",null,r.a.createElement(c.b,{to:"/order",style:{color:"white"}},r.a.createElement(f.a,{variant:"success",size:"lg",className:"mb-3",block:!0},"New Order"))),r.a.createElement(c.b,{to:"/stock",style:{color:"white"}},r.a.createElement(f.a,{variant:"success",size:"lg",className:"mb-3",block:!0},"Edit Stock")," "),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("a",{href:"".concat(y).concat("/people","?").concat(new URLSearchParams(l))},r.a.createElement(f.a,{variant:"success",size:"lg",className:"mb-3",block:!0},"Download Order Data")," "),r.a.createElement(g.a,{onChange:function(e){return console.log(e)}},r.a.createElement(g.a.Toggle,{variant:"type",id:"dropdown-basic",size:"md",className:"mb-3",style:{backgroundColor:"green",color:"white"}},"Month: ",r.a.createElement("b",null,w[O.indexOf(l.month)])),r.a.createElement(g.a.Menu,null,O.map((function(e){return r.a.createElement(g.a.Item,{onSelect:function(e){return o(Object(d.a)(Object(d.a)({},l),{},{month:e}))},eventKey:e,key:e},w[O.indexOf(e)])})))),r.a.createElement(g.a,{onChange:function(e){return console.log(e)}},r.a.createElement(g.a.Toggle,{variant:"type",id:"dropdown-basic",size:"md",className:"mb-3",style:{backgroundColor:"green",color:"white"}},"Year: ",r.a.createElement("b",null,l.year)),r.a.createElement(g.a.Menu,null,j.map((function(e){return r.a.createElement(g.a.Item,{onSelect:function(e){return o(Object(d.a)(Object(d.a)({},l),{},{year:e}))},eventKey:e,key:e},e)})))))},q=a(72),N=a(17),x=a(235),L=N.b({firstName:N.c().required(),lastName:N.c().required(),adults:N.a().moreThan(-1).required(),children:N.a().moreThan(-1).required(),zipcode:N.a().moreThan(9999).lessThan(1e5).integer().required(),orderNotes:N.c().required()});var F=function(){var e=Object(i.f)();return r.a.createElement(h.a,{style:{backgroundColor:"white",paddingBottom:120}},r.a.createElement("h1",{style:{textAlign:"center"}},"Order"),r.a.createElement(q.a,{validationSchema:L,onSubmit:function(t){e.push("/order-stock",{fromForm:!0,personInfo:t})},initialValues:{firstName:"",lastName:"",adults:-1,children:-1,zipcode:-1,orderNotes:"test"}},(function(e){var t=e.handleSubmit,a=e.handleChange,n=(e.handleBlur,e.values,e.touched),l=(e.isValid,e.errors);return r.a.createElement("div",null,r.a.createElement(x.a,{noValidate:!0,onSubmit:t},r.a.createElement(x.a.Group,{md:"4",controlId:"orderForm1"},r.a.createElement(x.a.Label,null,"First name"),r.a.createElement(x.a.Control,{type:"text",name:"firstName",placeholder:"Enter first name here",onChange:a,isValid:n.firstName&&!l.firstName,isInvalid:!!l.firstName}),r.a.createElement(x.a.Control.Feedback,null,"Looks good!")),r.a.createElement(x.a.Group,{md:"4",controlId:"orderForm2"},r.a.createElement(x.a.Label,null,"Last name"),r.a.createElement(x.a.Control,{type:"text",name:"lastName",placeholder:"Enter last name here",onChange:a,isValid:n.lastName&&!l.lastName,isInvalid:!!l.lastName}),r.a.createElement(x.a.Control.Feedback,null,"Looks good!")),r.a.createElement(x.a.Group,{md:"4",controlId:"orderForm3"},r.a.createElement(x.a.Label,null,"# of Adults"),r.a.createElement(x.a.Control,{type:"number",name:"adults",placeholder:"Enter number of adults in household",onChange:a,isValid:n.adults&&!l.adults,isInvalid:!!l.adults}),r.a.createElement(x.a.Control.Feedback,null,"Looks good!")),r.a.createElement(x.a.Group,{md:"4",controlId:"orderForm4"},r.a.createElement(x.a.Label,null,"# of Children"),r.a.createElement(x.a.Control,{type:"number",name:"children",placeholder:"Enter number of children in household",onChange:a,isValid:n.children&&!l.children,isInvalid:!!l.children}),r.a.createElement(x.a.Control.Feedback,null,"Looks good!")),r.a.createElement(x.a.Group,{md:"4",controlId:"orderForm4"},r.a.createElement(x.a.Label,null,"ZIP Code"),r.a.createElement(x.a.Control,{type:"number",name:"zipcode",placeholder:"Enter your ZIP Code",onChange:a,isValid:n.zipcode&&!l.zipcode,isInvalid:!!l.zipcode}),r.a.createElement(x.a.Control.Feedback,null,"Looks good!")),r.a.createElement("div",{style:{display:"flex",flexDirection:"row-reverse"}},r.a.createElement(f.a,{type:"submit",variant:"success",block:!0},"Select order"))))})))},z=a(113),A=a(232),R=a(234);function T(){return B.apply(this,arguments)}function B(){return(B=Object(v.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.get("/stock");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function V(){return(V=Object(v.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:C.post("/stock",t).then((function(e){return!0})).catch((function(e){return!1}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function P(e,t){return H.apply(this,arguments)}function H(){return(H=Object(v.a)(b.a.mark((function e(t,a){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:C.put("".concat("/stock","/").concat(t),a).then((function(e){return console.log(e),!0})).catch((function(e){return console.error(e),!1}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var D=N.b({newCount:N.a().integer().moreThan(-1).required()});var M=function(e){var t=e.show,a=e.handleClose,n=e.getStock,l=e.stockId,o=e.stockName,c=e.stockCount;return r.a.createElement(R.a,{show:t,onHide:a,"aria-labelledby":"contained-modal-title-vcenter",centered:!0},r.a.createElement(q.a,{validationSchema:D,onSubmit:function(e){console.log(e),P(l,e),a(),n(500)},initialValues:{newCount:-1}},(function(e){var t=e.handleSubmit,n=e.handleChange,l=(e.handleBlur,e.values,e.touched),i=(e.isValid,e.errors);return r.a.createElement(r.a.Fragment,null,r.a.createElement(R.a.Header,{closeButton:!0},r.a.createElement(R.a.Title,{id:"contained-modal-title-vcenter"},"Edit amount for: ",o)),r.a.createElement(R.a.Body,null,r.a.createElement("p",null,"Current amount: ",c),r.a.createElement(x.a,{noValidate:!0,onSubmit:t},r.a.createElement(x.a.Group,{controlId:"stockCount"},r.a.createElement(x.a.Control,{type:"number",name:"newCount",placeholder:"Insert new item count",onChange:n,isValid:l.newCount&&!i.newCount,isInvalid:!!i.newCount}),r.a.createElement(x.a.Control.Feedback,null,"Looks good!")))),r.a.createElement(R.a.Footer,null,r.a.createElement(f.a,{variant:"secondary",onClick:a},"Close"),r.a.createElement(f.a,{variant:"success",onClick:t},"Save new amount")))})))};var _=function(e){var t=e.stockItem,a=e.getStock,l=e.lang,o=void 0===l?"name":l,c=Object(n.useState)(!1),i=Object(E.a)(c,2),u=i[0],s=i[1],m=Object(n.useState)(!1),d=Object(E.a)(m,2),g=d[0],p=d[1];return Object(n.useEffect)((function(){p(void 0!==t[o])}),[o,t]),r.a.createElement(r.a.Fragment,null,r.a.createElement(z.a,{style:{margin:5}},r.a.createElement(z.a.Body,null,r.a.createElement(z.a.Header,{as:"h2"},g?t[o]:t.name,"name"!==o&&g?" ("+t.name+")":""),r.a.createElement(z.a.Text,null,"Amount:"," ",r.a.createElement("font",{style:{fontSize:"1.4em",fontWeight:"bolder"}},t.count)),r.a.createElement(z.a.Text,{style:{textAlign:"right"}},"Last updated:"," ",void 0!==t.timestamp?new Date(t.timestamp).toDateString():"Unavailable"),r.a.createElement(h.a,{style:{display:"flex",alignItems:"center",padding:0}},!g&&r.a.createElement(A.a,{variant:"danger"},"Language unavailable: ",o),r.a.createElement("div",{style:{margin:"auto"}}),r.a.createElement(f.a,{size:"sm",variant:"success",style:{alignSelf:"center"},onClick:function(){return s(!0)}},"Edit amount")))),r.a.createElement(M,{show:u,handleClose:function(){return s(!1)},getStock:a,stockName:g?t[o]:t.name,stockId:t._id,stockCount:t.count}))},G=a(112),W=N.b({name:N.c().required(),count:N.a().integer().moreThan(-1).required()});var K=function(e){var t=e.getStock;return r.a.createElement(G.a,null,r.a.createElement(z.a,null,r.a.createElement(G.a.Toggle,{as:z.a.Header,eventKey:"0"},"Click here to insert a stock item"),r.a.createElement(G.a.Collapse,{eventKey:"0"},r.a.createElement(z.a.Body,null,r.a.createElement(q.a,{validationSchema:W,onSubmit:function(e){t(500),console.log(function(e){return V.apply(this,arguments)}(e))},initialValues:{name:"",count:-1}},(function(e){var t=e.handleSubmit,a=e.handleChange,n=(e.handleBlur,e.values,e.touched),l=(e.isValid,e.errors);return r.a.createElement(x.a,{noValidate:!0,onSubmit:t},r.a.createElement(x.a.Group,{controlId:"stockInputName"},r.a.createElement(x.a.Control,{type:"text",name:"name",placeholder:"Insert item name here",onChange:a,isValid:n.name&&!l.name,isInvalid:!!l.name}),r.a.createElement(x.a.Control.Feedback,null,"Looks good!")),r.a.createElement(x.a.Group,{controlId:"stockInputCount"},r.a.createElement(x.a.Control,{type:"number",name:"count",placeholder:"Insert item count here",onChange:a,isValid:n.count&&!l.count,isInvalid:!!l.count}),r.a.createElement(x.a.Control.Feedback,null,"Looks good!")),r.a.createElement(f.a,{variant:"success",type:"submit"},"Add item to database"))}))))))},U=a(160);var J=function(){return r.a.createElement(U.a,{animation:"border",role:"status"},r.a.createElement("span",{className:"sr-only"},"Loading..."))},Y=["english","spanish","french","chinese"];var Z=function(){var e=Object(n.useState)([]),t=Object(E.a)(e,2),a=t[0],l=t[1],o=Object(n.useState)(!1),c=Object(E.a)(o,2),i=c[0],u=c[1],s=Object(n.useState)(Y[0]),m=Object(E.a)(s,2),d=m[0],p=m[1];function b(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;l([]),setTimeout((function(){T().then((function(e){l(e.data)})).catch((function(e){return u(!0)}))}),e)}function v(e){return e.charAt(0).toUpperCase()+e.slice(1)}return Object(n.useEffect)((function(){b()}),[]),r.a.createElement(h.a,null,r.a.createElement("h1",{style:{textAlign:"center"}},"Stock"),r.a.createElement(h.a,{style:{display:"flex",alignItems:"center",padding:0}},r.a.createElement(g.a,{onChange:function(e){return console.log(e)}},r.a.createElement(g.a.Toggle,{variant:"type",id:"dropdown-basic",size:"md",className:"mb-3",style:{backgroundColor:"green",color:"white"}},"Language: ",r.a.createElement("b",null,v(d))),r.a.createElement(g.a.Menu,null,Y.map((function(e){return r.a.createElement(g.a.Item,{onSelect:function(e){return p(e)},eventKey:e,key:e},v(e))})))),r.a.createElement("div",{style:{margin:"auto"}}),r.a.createElement(f.a,{variant:"type",size:"md",onClick:b,style:{backgroundColor:"green",color:"white"}},"Refresh")),r.a.createElement(K,{getStock:b}),0===a.length&&!i&&r.a.createElement(J,null),a&&a.map((function(e){return r.a.createElement(_,{stockItem:e,getStock:b,lang:"english"===d?"name":d,key:e._id})})),i&&r.a.createElement("p",null,"Error :("))},$=a(162),Q=a(233);var X=function(e){var t=e.show,a=e.handleClose,l=(e.getStock,e.stockId),o=e.stockName,c=e.stockCount,i=e.onRequest,u=Object(n.useState)(1),s=Object(E.a)(u,2),m=s[0],d=s[1];return r.a.createElement(R.a,{show:t,onHide:a,"aria-labelledby":"contained-modal-title-vcenter",centered:!0},r.a.createElement(R.a.Header,{closeButton:!0},r.a.createElement(R.a.Title,{id:"contained-modal-title-vcenter"},"Select requested amount for: ",o)),r.a.createElement(R.a.Body,null,r.a.createElement("p",null,"Current amount: ",r.a.createElement("b",null,c)),r.a.createElement("p",null,"Amount after order: ",r.a.createElement("b",null,c-m)),r.a.createElement(Q.a,{"aria-label":"Stock item request buttons",style:{display:"flex",alignItems:"center"}},r.a.createElement(f.a,{size:"lg",onClick:function(){m>1&&d(m-1)}},"-"),r.a.createElement(f.a,{size:"lg",variant:"secondary",disabled:!0},m),r.a.createElement(f.a,{variant:"success",size:"lg",onClick:function(){m<c&&d(m+1)}},"+"))),r.a.createElement(R.a.Footer,null,r.a.createElement(f.a,{variant:"secondary",onClick:a},"Close"),r.a.createElement(f.a,{variant:"success",onClick:function(){var e={id:l,name:o,requestedCount:m,countAfterRequest:c-m};console.log("submitRequest -> stockCount",c),console.log("submitRequest -> selectedAmount",m),console.log("countAfterRequest ->",e.countAfterRequest),i(e),a()}},"Request amount")))};var ee=function(e){var t=e.stockItem,a=e.getStock,l=e.lang,o=void 0===l?"name":l,c=e.onRequest,i=e.isRequested,u=void 0!==i&&i,s=Object(n.useState)(!1),m=Object(E.a)(s,2),d=m[0],g=m[1],p=Object(n.useState)(!1),b=Object(E.a)(p,2),v=b[0],k=b[1];return Object(n.useEffect)((function(){k(void 0!==t[o])}),[o,t]),r.a.createElement(r.a.Fragment,null,r.a.createElement(z.a,{style:{margin:5}},r.a.createElement(z.a.Body,null,r.a.createElement(z.a.Header,{as:"h2"},v?t[o]:t.name,"name"!==o&&v?" ("+t.name+")":""),r.a.createElement(z.a.Text,null,"Amount:"," ",r.a.createElement("font",{style:{fontSize:"1.4em",fontWeight:"bolder"}},t.count)),r.a.createElement(h.a,{style:{display:"flex",alignItems:"center",padding:0}},!v&&r.a.createElement(A.a,{variant:"danger"},"Language unavailable: ",o),r.a.createElement("div",{style:{margin:"left"}}),r.a.createElement(f.a,{size:"lg",variant:"success",style:{alignSelf:"left"},onClick:function(){return g(!0)},disabled:t.count<=0},t.count<=0?"Out of stock":u?"Edit requested amount":"Request item")),r.a.createElement(z.a.Text,{style:{textAlign:"right"}},"Last updated:"," ",void 0!==t.timestamp?new Date(t.timestamp).toDateString():"Unavailable"))),r.a.createElement(X,{show:d,handleClose:function(){return g(!1)},getStock:a,stockName:v?t[o]:t.name,stockId:t._id,stockCount:t.count,onRequest:c}))};var te=function(){var e=Object(i.f)(),t=Object(i.g)(),a=void 0!==t.state,l=a?t.state.personInfo:{},o=Object(n.useState)([]),c=Object(E.a)(o,2),u=c[0],s=c[1],m=Object(n.useState)(!1),d=Object(E.a)(m,2),p=d[0],b=d[1],v=Object(n.useState)(Y[0]),k=Object(E.a)(v,2),y=k[0],C=k[1],O=Object(n.useState)([]),w=Object(E.a)(O,2),j=w[0],I=w[1];function q(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;s([]),setTimeout((function(){T().then((function(e){s(e.data)})).catch((function(e){return b(!0)}))}),e)}function N(e){return e.charAt(0).toUpperCase()+e.slice(1)}function x(e){var t=j.find((function(t){return t.id===e.id}));if(void 0===t)I(j.concat(e));else{var a=j.indexOf(t),n=Object($.a)(j);n[a].requestedCount=e.requestedCount,n[a].countAfterRequest=e.countAfterRequest,I(n)}}function L(){var e="";return j.forEach((function(t){e+=t.name+": "+t.requestedCount+", "})),e.slice(0,-2)}return Object(n.useEffect)((function(){a?(q(),console.log(l)):e.push("/order")}),[a,e,l]),r.a.createElement(h.a,null,r.a.createElement("h1",{style:{textAlign:"center"}},"Select stock here"),j.map((function(e){return r.a.createElement("p",{key:e.name},e.name,": ",e.requestedCount)})),r.a.createElement(f.a,{variant:"type",className:"mb-3",onClick:function(){!function(e){S.apply(this,arguments)}({firstname:l.firstName,lastname:l.lastName,adults:l.adults,children:l.adults,zipcode:l.zipcode,"order-notes":L(),fulfilled:!1});var t=j.map((function(e){return console.log("making promise... ",e.countAfterRequest),P(e.id,{newCount:e.countAfterRequest})}));Promise.all(t).then((function(e){return console.log(e)})),e.push("/")},block:!0,style:{backgroundColor:"green",color:"white"}},"Submit request"),r.a.createElement(h.a,{style:{display:"flex",alignItems:"center",padding:0}},r.a.createElement(g.a,{variant:"type",onChange:function(e){return console.log(e)}},r.a.createElement(g.a.Toggle,{variant:"type",id:"dropdown-basic",size:"md",className:"mb-3",style:{backgroundColor:"green",color:"white"}},"Language: ",r.a.createElement("b",null,N(y))),r.a.createElement(g.a.Menu,null,Y.map((function(e){return r.a.createElement(g.a.Item,{onSelect:function(e){return C(e)},eventKey:e,key:e},N(e))})))),r.a.createElement("div",{style:{margin:"auto"}}),r.a.createElement(f.a,{variant:"type",size:"md",onClick:q,style:{backgroundColor:"green",color:"white"}},"Refresh")),0===u.length&&!p&&r.a.createElement(J,null),u&&a&&u.map((function(e){return r.a.createElement(ee,{stockItem:e,getStock:q,lang:"english"===y?"name":y,key:e._id,onRequest:x,isRequested:j.some((function(t){return e._id===t.id}))})})),p&&r.a.createElement("p",null,"Error"))},ae=a(125),ne=a.n(ae);var re=function(e){var t=e.person,a=e.show,n=e.handleClose,l=e.fulfillPerson;return r.a.createElement(R.a,{show:a,onHide:n,"aria-labelledby":"contained-modal-title-vcenter",centered:!0},r.a.createElement(R.a.Header,null,"Confirm fulfillment"),r.a.createElement(R.a.Body,null,r.a.createElement("h5",null,"Are you sure that ",t.firstname,"'s order is correct and has been fulfilled?"),r.a.createElement("p",null,t["order-notes"])),r.a.createElement(R.a.Footer,null,r.a.createElement(f.a,{variant:"secondary",onClick:n},"Close"),r.a.createElement(f.a,{variant:"success",onClick:function(){l(t._id),n()}},"Confirm fulfillment")))};var le=function(e){var t=e.person,a=e.fulfillPerson,l=Object(n.useState)(!1),o=Object(E.a)(l,2),c=o[0],i=o[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(z.a,{key:t._id,size:"lg",style:{margin:5}},r.a.createElement(z.a.Body,null,r.a.createElement(z.a.Header,{as:"h2"},t.firstname," ",t.lastname),r.a.createElement(z.a.Text,null,t["order-notes"]),r.a.createElement(f.a,{variant:"success",onClick:function(){return i(!0)},block:!0},"Fulfill Order"))),r.a.createElement(re,{person:t,show:c,handleClose:function(){return i(!1)},fulfillPerson:a}))};var oe=function(){var e=Object(n.useState)([]),t=Object(E.a)(e,2),a=t[0],l=t[1];function o(e){var t=ne()(y);console.log("printing socket object: "),console.log(t),console.log("emitting personfulfilled"),t.emit("personFulfilled",e),t.on("personFulfillSuccess",(function(e){console.log("confirmed "+e),t.disconnect()})),l(a.filter((function(t){return t._id!==e})))}return Object(n.useEffect)((function(){var e=ne()(y);e.on("person",(function(e){console.log(e),t(e)}));var t=function(e){l(a.concat(e)),console.log(a)};return function(){console.log("effect done"),e.disconnect()}}),[]),r.a.createElement(h.a,null,0===a.length&&r.a.createElement("p",null,"No orders at the moment."),a&&a.map((function(e){return r.a.createElement(le,{fulfillPerson:o,person:e,key:e._id})})))};var ce=function(){return r.a.createElement(c.a,{basename:"/panlang-ui"},r.a.createElement(m,{"\xe7":!0}),r.a.createElement("br",null),r.a.createElement(i.c,null,r.a.createElement(i.a,{exact:!0,path:"/"},r.a.createElement(I,null)),r.a.createElement(i.a,{path:"/stock"},r.a.createElement(Z,null)),r.a.createElement(i.a,{path:"/order"},r.a.createElement(F,null)),r.a.createElement(i.a,{path:"/order-stock"},r.a.createElement(te,null)),r.a.createElement(i.a,{path:"/order-tracker"},r.a.createElement(oe,null)),r.a.createElement(i.a,{path:"*"},r.a.createElement("h1",null,"Welcome to ",r.a.createElement("font",{style:{color:"#26B020"}},"Pan-Lang"),"!"))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(226);o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ce,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[165,1,2]]]);
//# sourceMappingURL=main.96438ca4.chunk.js.map