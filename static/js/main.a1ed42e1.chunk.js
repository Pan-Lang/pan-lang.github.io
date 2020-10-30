(this["webpackJsonppanlang-ui"]=this["webpackJsonppanlang-ui"]||[]).push([[0],{133:function(e,t,a){},170:function(e,t,a){e.exports=a(232)},179:function(e,t,a){e.exports=a.p+"static/media/logo_nobg.484389dc.png"},228:function(e,t){},232:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(40),l=a.n(o),c=(a(133),a(22)),i=a(10),u=a(88),s=a(60);var m=function(){return r.a.createElement(u.a,{collapseOnSelect:!0,bg:"light",expand:"lg",fixed:"top"},r.a.createElement(u.a.Brand,{href:"#home",as:c.b,to:"/"},r.a.createElement("div",{id:"logo"},r.a.createElement("img",{src:a(179),alt:"Pan-Lang",style:{width:75,height:75}}))),r.a.createElement(u.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),r.a.createElement(u.a.Collapse,{id:"responsive-navbar-nav"},r.a.createElement(s.a,{className:"mr-auto"},r.a.createElement(s.a.Link,{eventKey:"0",as:c.b,to:"/"},"Home"),r.a.createElement(s.a.Link,{eventKey:"1",as:c.b,to:"/about"},"About"),r.a.createElement(s.a.Link,{eventKey:"2",as:c.b,to:"/order"},"Order"),r.a.createElement(s.a.Link,{eventKey:"3",as:c.b,to:"/stock"},"Stock"),r.a.createElement(s.a.Link,{eventKey:"4",as:c.b,to:"/order-tracker"},"Order Tracker"))))},d=a(89),E=a(6),b=a(44),f=a(17),F=a(23),g=a(19),p=a.n(g),h=a(43),y=a(159),k="https://panlang.herokuapp.com",v=a.n(y).a.create({baseURL:k});function C(){return(C=Object(h.a)(p.a.mark((function e(t){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:v.post("/people",t).then((function(e){return!0})).catch((function(e){return!1}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var S=["1","2","3","4","5","6","7","8","9","10","11","12"],O=["January","February","March","April","May","June","July","August","September","October","November","December"],w=["2020","2021","2022","2023","2024"];var x=function(){var e=new Date,t=Object(n.useState)({month:S[e.getMonth()],year:e.getFullYear()}),a=Object(E.a)(t,2),o=a[0],l=a[1];return r.a.createElement(f.a,{style:{textAlign:"center"}},r.a.createElement("div",{style:{marginBottom:20}},r.a.createElement("br",null),r.a.createElement("h1",null,"Welcome to ")," ",r.a.createElement("h1",null,r.a.createElement("font",{style:{color:"#35E82A",fontWeight:"bold"}},"Pan-"),r.a.createElement("font",{style:{color:"#2EFFD5",fontWeight:"bold"}},"Lang"))),r.a.createElement("div",null,r.a.createElement(c.b,{to:"/order",style:{color:"white"}},r.a.createElement(b.a,{style:{backgroundColor:"#16AB8D",borderColor:"#FFFFF5",color:"#FFFFFF",borderRadius:"200px"},size:"lg",className:"mb-3",block:!0},"Start a new order"))),r.a.createElement(c.b,{to:"/stock",style:{color:"white"}},r.a.createElement(b.a,{style:{backgroundColor:"#16AB8D",borderColor:"#FFFFF5",color:"#FFFFFF",borderRadius:"200px"},size:"lg",className:"mb-3",block:!0},"Edit and add stock items")," "),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("a",{href:"".concat(k).concat("/people","?").concat(new URLSearchParams(o))},r.a.createElement(b.a,{style:{backgroundColor:"#16AB8D",borderColor:"#FFFFF5",color:"#FFFFFF",borderRadius:"200px"},size:"lg",className:"mb-3",block:!0},"Download order data")," "),r.a.createElement(F.a,{onChange:function(e){return console.log(e)}},r.a.createElement(F.a.Toggle,{variant:"type",id:"dropdown-basic",size:"md",className:"mb-3",style:{backgroundColor:"#35E82A",borderColor:"#FFFFF5",color:"#FFFFFF",borderRadius:"200px"}},"Month: ",r.a.createElement("b",null,O[S.indexOf(o.month)])),r.a.createElement(F.a.Menu,null,S.map((function(e){return r.a.createElement(F.a.Item,{onSelect:function(e){return l(Object(d.a)(Object(d.a)({},o),{},{month:e}))},eventKey:e,key:e},O[S.indexOf(e)])})))),r.a.createElement(F.a,{onChange:function(e){return console.log(e)}},r.a.createElement(F.a.Toggle,{variant:"type",id:"dropdown-basic",size:"md",className:"mb-3",style:{backgroundColor:"#35E82A",borderColor:"#FFFFF5",color:"#FFFFFF",borderRadius:"200px"}},"Year: ",r.a.createElement("b",null,o.year)),r.a.createElement(F.a.Menu,null,w.map((function(e){return r.a.createElement(F.a.Item,{onSelect:function(e){return l(Object(d.a)(Object(d.a)({},o),{},{year:e}))},eventKey:e,key:e},e)})))))};var j=function(){return r.a.createElement(f.a,{style:{paddingBottom:120,backgroundColor:"white"}},r.a.createElement("div",{style:{marginBottom:20}},r.a.createElement("h1",null,"About ",r.a.createElement("font",{style:{color:"#26B020",fontWeight:"bold"}},"Pan-Lang:")),r.a.createElement("p",null,"Pan-Lang is an organizational web application designed to help local food bank organizers keep track of orders, maintain visitor records, and communicate with non-English speaking patrons."),r.a.createElement("p",null,"Food insecurity is an important issue in the Champain County community. Nearly 15% of residents must deal with food insecurity. Many of these individuals are also ineligible for federal nutrition programs and must rely on local food pantries for meals."),r.a.createElement("p",null,"On top of this, many of these individuals speak limited English, making it difficult for them to communicate their needs to food pantry staff. With Pan-Lang, our mission is to break this language barrier and provide a more efficient method of supporting those in need.")))},A=a(77),I=a(20),B=a(242),R=I.b({firstName:I.c().required(),lastName:I.c().required(),adults:I.a().moreThan(-1).required(),children:I.a().moreThan(-1).required(),zipcode:I.a().moreThan(9999).lessThan(1e5).integer().required(),orderNotes:I.c().required()});var N=function(){var e=Object(i.f)();return r.a.createElement(f.a,{style:{backgroundColor:"white",paddingBottom:120}},r.a.createElement("h1",{style:{textAlign:"center"}},"Order"),r.a.createElement(A.a,{validationSchema:R,onSubmit:function(t){e.push("/order-stock",{fromForm:!0,personInfo:t})},initialValues:{firstName:"",lastName:"",adults:-1,children:-1,zipcode:-1,orderNotes:"test"}},(function(e){var t=e.handleSubmit,a=e.handleChange,n=(e.handleBlur,e.values,e.touched),o=(e.isValid,e.errors);return r.a.createElement("div",null,r.a.createElement(B.a,{noValidate:!0,onSubmit:t},r.a.createElement(B.a.Group,{md:"4",controlId:"orderForm1"},r.a.createElement(B.a.Label,null,"First name"),r.a.createElement(B.a.Control,{type:"text",name:"firstName",placeholder:"Enter first name here",onChange:a,isValid:n.firstName&&!o.firstName,isInvalid:!!o.firstName}),r.a.createElement(B.a.Control.Feedback,null,"Looks good!")),r.a.createElement(B.a.Group,{md:"4",controlId:"orderForm2"},r.a.createElement(B.a.Label,null,"Last name"),r.a.createElement(B.a.Control,{type:"text",name:"lastName",placeholder:"Enter last name here",onChange:a,isValid:n.lastName&&!o.lastName,isInvalid:!!o.lastName}),r.a.createElement(B.a.Control.Feedback,null,"Looks good!")),r.a.createElement(B.a.Group,{md:"4",controlId:"orderForm3"},r.a.createElement(B.a.Label,null,"# of Adults"),r.a.createElement(B.a.Control,{type:"number",name:"adults",placeholder:"Enter number of adults in household",onChange:a,isValid:n.adults&&!o.adults,isInvalid:!!o.adults}),r.a.createElement(B.a.Control.Feedback,null,"Looks good!")),r.a.createElement(B.a.Group,{md:"4",controlId:"orderForm4"},r.a.createElement(B.a.Label,null,"# of Children"),r.a.createElement(B.a.Control,{type:"number",name:"children",placeholder:"Enter number of children in household",onChange:a,isValid:n.children&&!o.children,isInvalid:!!o.children}),r.a.createElement(B.a.Control.Feedback,null,"Looks good!")),r.a.createElement(B.a.Group,{md:"4",controlId:"orderForm4"},r.a.createElement(B.a.Label,null,"ZIP Code"),r.a.createElement(B.a.Control,{type:"number",name:"zipcode",placeholder:"Enter your ZIP Code",onChange:a,isValid:n.zipcode&&!o.zipcode,isInvalid:!!o.zipcode}),r.a.createElement(B.a.Control.Feedback,null,"Looks good!")),r.a.createElement("div",{style:{display:"flex",flexDirection:"row-reverse"}},r.a.createElement(b.a,{type:"submit",style:{backgroundColor:"#16AB8D",borderColor:"#FFFFF5",color:"#FFFFFF",borderRadius:"200px"},block:!0},"Select order"))))})))},q=a(119),L=a(238),D=a(241);function z(){return T.apply(this,arguments)}function T(){return(T=Object(h.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.get("/stock");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function V(){return(V=Object(h.a)(p.a.mark((function e(t){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:v.post("/stock",t).then((function(e){return!0})).catch((function(e){return!1}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function H(e,t){return P.apply(this,arguments)}function P(){return(P=Object(h.a)(p.a.mark((function e(t,a){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.put("".concat("/stock","/").concat(t),a).then((function(e){return console.log(e),!0})).catch((function(e){return console.error(e),!1}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var K=I.b({newCount:I.a().integer().moreThan(-1).required()});var W=function(e){var t=e.show,a=e.handleClose,o=e.getStock,l=e.stockId,c=e.stockName,i=e.stockCount,u=Object(n.useState)(!1),s=Object(E.a)(u,2),m=s[0],d=s[1],f=Object(n.useState)(!1),F=Object(E.a)(f,2),g=F[0],y=F[1];function k(){return(k=Object(h.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d(!0),e.next=3,H(l,t);case 3:n=e.sent,d(!1),n?(a(),o(500)):y(!0);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return r.a.createElement(D.a,{show:t,onHide:a,"aria-labelledby":"contained-modal-title-vcenter",centered:!0},r.a.createElement(A.a,{validationSchema:K,onSubmit:function(e){return k.apply(this,arguments)},initialValues:{newCount:-1}},(function(e){var t=e.handleSubmit,n=e.handleChange,o=(e.handleBlur,e.values,e.touched),l=(e.isValid,e.errors);return r.a.createElement(r.a.Fragment,null,r.a.createElement(D.a.Header,{closeButton:!0},r.a.createElement(D.a.Title,{id:"contained-modal-title-vcenter"},"Edit amount for: ",c)),r.a.createElement(D.a.Body,null,!m&&!g&&r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Current amount: ",i),r.a.createElement(B.a,{noValidate:!0,onSubmit:t},r.a.createElement(B.a.Group,{controlId:"stockCount"},r.a.createElement(B.a.Control,{type:"number",name:"newCount",placeholder:"Insert new item count",onChange:n,isValid:o.newCount&&!l.newCount,isInvalid:!!l.newCount}),r.a.createElement(B.a.Control.Feedback,null,"Looks good!")))),m&&r.a.createElement("p",null,"Updating stock count for ",c,"..."),g&&r.a.createElement("p",null,"An error occurred when trying to update stock.")),r.a.createElement(D.a.Footer,null,!m&&r.a.createElement(r.a.Fragment,null,r.a.createElement(b.a,{variant:"secondary",style:{borderRadius:"200px"},onClick:function(){y(!1),d(!1),a()}},"Close"),!g&&r.a.createElement(b.a,{onClick:t,style:{backgroundColor:"#16AB8D",borderColor:"#FFFFF5",color:"#FFFFFF",borderRadius:"200px"}},"Save new amount"))))})))},G=a(237);var M=function(e){var t=e.heading,a=void 0===t?"":t,n=e.body,o=e.dismissible,l=void 0!==o&&o,c=e.onClose;return r.a.createElement(G.a,{variant:"danger",onClose:c,dismissible:l,className:"mt-3"},a.length>0&&r.a.createElement(G.a.Heading,null,a),n)};var _=function(e){var t=e.stockItem,a=e.getStock,o=e.lang,l=void 0===o?"name":o,c=Object(n.useState)(!1),i=Object(E.a)(c,2),u=i[0],s=i[1],m=Object(n.useState)(!1),d=Object(E.a)(m,2),F=d[0],g=d[1];return Object(n.useEffect)((function(){g(void 0!==t[l])}),[l,t]),r.a.createElement(r.a.Fragment,null,r.a.createElement(q.a,{style:{margin:5}},r.a.createElement(q.a.Body,null,r.a.createElement(q.a.Header,{as:"h2"},F?t[l]:t.name,"name"!==l&&F?" ("+t.name+")":""),r.a.createElement(q.a.Text,null,"Amount:"," ",r.a.createElement("font",{style:{fontSize:"1.4em",fontWeight:"bolder"}},t.count)),r.a.createElement(q.a.Text,{style:{textAlign:"right"}},"Last updated:"," ",void 0!==t.timestamp?new Date(t.timestamp).toDateString():"Unavailable"),r.a.createElement(f.a,{style:{display:"flex",alignItems:"center",padding:0}},!F&&r.a.createElement(L.a,{variant:"danger"},"Language unavailable: ",l),r.a.createElement("div",{style:{margin:"auto"}}),r.a.createElement(b.a,{size:"sm",style:{alignSelf:"center",backgroundColor:"#16AB8D",borderColor:"#FFFFF5",color:"#FFFFFF",borderRadius:"200px"},onClick:function(){return s(!0)}},"Edit amount")),t.count<=0&&r.a.createElement(M,{body:"Warning: Out of stock"}))),r.a.createElement(W,{show:u,handleClose:function(){return s(!1)},getStock:a,stockName:F?t[l]:t.name,stockId:t._id,stockCount:t.count}))},J=a(118),U=I.b({name:I.c().required(),count:I.a().integer().moreThan(-1).required()});var Y=function(e){var t=e.getStock;return r.a.createElement(J.a,null,r.a.createElement(q.a,null,r.a.createElement(J.a.Toggle,{as:q.a.Header,eventKey:"0"},"Click here to insert a stock item"),r.a.createElement(J.a.Collapse,{eventKey:"0"},r.a.createElement(q.a.Body,null,r.a.createElement(A.a,{validationSchema:U,onSubmit:function(e){t(500),console.log(function(e){return V.apply(this,arguments)}(e))},initialValues:{name:"",count:-1}},(function(e){var t=e.handleSubmit,a=e.handleChange,n=(e.handleBlur,e.values,e.touched),o=(e.isValid,e.errors);return r.a.createElement(B.a,{noValidate:!0,onSubmit:t},r.a.createElement(B.a.Group,{controlId:"stockInputName"},r.a.createElement(B.a.Control,{type:"text",name:"name",placeholder:"Insert item name here",onChange:a,isValid:n.name&&!o.name,isInvalid:!!o.name}),r.a.createElement(B.a.Control.Feedback,null,"Looks good!")),r.a.createElement(B.a.Group,{controlId:"stockInputCount"},r.a.createElement(B.a.Control,{type:"number",name:"count",placeholder:"Insert item count here",onChange:a,isValid:n.count&&!o.count,isInvalid:!!o.count}),r.a.createElement(B.a.Control.Feedback,null,"Looks good!")),r.a.createElement(b.a,{variant:"success",type:"submit"},"Add item to database"))}))))))},Z=a(166);var $=function(){return r.a.createElement(f.a,{style:{display:"flex",justifyContent:"center"}},r.a.createElement(Z.a,{animation:"border",role:"status",className:"mt-3",style:{marginLeft:"auto",marginRight:"auto"}},r.a.createElement("span",{className:"sr-only"},"Loading...")))},Q=["english","spanish","french","chinese"];var X=function(){var e=Object(n.useState)([]),t=Object(E.a)(e,2),a=t[0],o=t[1],l=Object(n.useState)(!1),c=Object(E.a)(l,2),i=c[0],u=c[1],s=Object(n.useState)(Q[0]),m=Object(E.a)(s,2),d=m[0],g=m[1];function p(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;o([]),u(!1),setTimeout((function(){z().then((function(e){o(e.data)})).catch((function(e){return u(!0)}))}),e)}function h(e){return e.charAt(0).toUpperCase()+e.slice(1)}return Object(n.useEffect)((function(){p()}),[]),r.a.createElement(f.a,null,r.a.createElement("h1",{style:{textAlign:"center"}},"Stock"),r.a.createElement(f.a,{style:{display:"flex",alignItems:"center",padding:0}},r.a.createElement(F.a,{onChange:function(e){return console.log(e)}},r.a.createElement(F.a.Toggle,{variant:"type",id:"dropdown-basic",size:"md",className:"mb-3",style:{backgroundColor:"#16AB8D",borderColor:"#FFFFF5",color:"#FFFFFF",borderRadius:"200px"}},"Language: ",r.a.createElement("b",null,h(d))),r.a.createElement(F.a.Menu,null,Q.map((function(e){return r.a.createElement(F.a.Item,{onSelect:function(e){return g(e)},eventKey:e,key:e},h(e))})))),r.a.createElement("div",{style:{margin:"auto"}}),r.a.createElement(b.a,{variant:"type",size:"md",onClick:p,style:{backgroundColor:"#16AB8D",borderColor:"#FFFFF5",color:"#FFFFFF",borderRadius:"200px"}},"Refresh")),!i&&r.a.createElement(Y,{getStock:p}),0===a.length&&!i&&r.a.createElement($,null),a&&a.map((function(e){return r.a.createElement(_,{stockItem:e,getStock:p,lang:"english"===d?"name":d,key:e._id})})),i&&r.a.createElement(M,{heading:"Error",body:"An error occurred while trying to get the stock.",dismissible:!1}))},ee=a(112),te=a(239);var ae=function(e){var t=e.show,a=e.handleClose,o=(e.getStock,e.stockId),l=e.stockName,c=e.stockCount,i=e.onRequest,u=Object(n.useState)(1),s=Object(E.a)(u,2),m=s[0],d=s[1];return r.a.createElement(D.a,{show:t,onHide:a,"aria-labelledby":"contained-modal-title-vcenter",centered:!0},r.a.createElement(D.a.Header,{closeButton:!0},r.a.createElement(D.a.Title,{id:"contained-modal-title-vcenter"},"Select requested amount for: ",l)),r.a.createElement(D.a.Body,null,r.a.createElement("p",null,"Current amount: ",r.a.createElement("b",null,c)),r.a.createElement("p",null,"Amount after order: ",r.a.createElement("b",null,c-m)),r.a.createElement(te.a,{"aria-label":"Stock item request buttons",style:{display:"flex",alignItems:"center"}},r.a.createElement(b.a,{size:"lg",style:{backgroundColor:"#16AB8D",borderColor:"#FFFFFF",color:"#FFFFFF"},onClick:function(){m>1&&d(m-1)}},"-"),r.a.createElement(b.a,{size:"lg",variant:"secondary",style:{borderColor:"#FFFFFF"},disabled:!0},m),r.a.createElement(b.a,{size:"lg",style:{backgroundColor:"#2EFFD5",borderColor:"#FFFFFF",color:"#FFFFFF"},onClick:function(){m<c&&d(m+1)}},"+"))),r.a.createElement(D.a.Footer,null,r.a.createElement(b.a,{variant:"secondary",style:{borderRadius:"200px"},onClick:a},"Close"),r.a.createElement(b.a,{onClick:function(){var e={id:o,name:l,requestedCount:m,countAfterRequest:c-m};console.log("submitRequest -> stockCount",c),console.log("submitRequest -> selectedAmount",m),console.log("countAfterRequest ->",e.countAfterRequest),i(e),a()},style:{backgroundColor:"#35E82A",borderColor:"#35E82A",borderRadius:"200px",color:"#FFFFFF"}},"Request amount")))};var ne=function(e){var t=e.stockItem,a=e.getStock,o=e.lang,l=void 0===o?"name":o,c=e.onRequest,i=e.isRequested,u=void 0!==i&&i,s=Object(n.useState)(!1),m=Object(E.a)(s,2),d=m[0],F=m[1],g=Object(n.useState)(!1),p=Object(E.a)(g,2),h=p[0],y=p[1];return Object(n.useEffect)((function(){y(void 0!==t[l])}),[l,t]),r.a.createElement(r.a.Fragment,null,r.a.createElement(q.a,{style:{margin:5}},r.a.createElement(q.a.Body,null,r.a.createElement(q.a.Header,{as:"h2"},h?t[l]:t.name,"name"!==l&&h?" ("+t.name+")":""),r.a.createElement(q.a.Text,null,"Amount:"," ",r.a.createElement("font",{style:{fontSize:"1.4em",fontWeight:"bolder"}},t.count)),r.a.createElement(f.a,{style:{display:"flex",alignItems:"center",padding:0}},!h&&r.a.createElement(L.a,{variant:"danger"},"Language unavailable: ",l),r.a.createElement("div",{style:{margin:"left"}}),r.a.createElement(b.a,{size:"lg",style:{alignSelf:"left",backgroundColor:"#16AB8D",borderColor:"#FFFFF5",color:"#FFFFFF",borderRadius:"200px"},onClick:function(){return F(!0)},disabled:t.count<=0},t.count<=0?"Out of stock":u?"Edit requested amount":"Request item")),r.a.createElement(q.a.Text,{style:{textAlign:"right"}},"Last updated:"," ",void 0!==t.timestamp?new Date(t.timestamp).toDateString():"Unavailable"))),r.a.createElement(ae,{show:d,handleClose:function(){return F(!1)},getStock:a,stockName:t.name,stockId:t._id,stockCount:t.count,onRequest:c}))};var re=function(e){var t=e.title,a=e.body,n=e.buttonText,o=e.show,l=e.handleClose;return r.a.createElement(D.a,{show:o,onHide:l,centered:!0},r.a.createElement(D.a.Header,{closeButton:!0},r.a.createElement(D.a.Title,{id:"contained-modal-title-vcenter"},t)),r.a.createElement(D.a.Body,null,a),r.a.createElement(D.a.Footer,null,r.a.createElement(b.a,{onClick:l,style:{backgroundColor:"#16AB8D",borderColor:"#16AB8D",borderRadius:"200px",color:"#FFFFFF"}},n)))};var oe=function(){var e=Object(i.f)(),t=Object(i.g)(),a=void 0!==t.state,o=Object(n.useState)([]),l=Object(E.a)(o,2),c=l[0],u=l[1],s=Object(n.useState)(!1),m=Object(E.a)(s,2),d=m[0],g=m[1],p=Object(n.useState)(Q[0]),h=Object(E.a)(p,2),y=h[0],k=h[1],v=Object(n.useState)(a?t.state.personInfo:q("personInfo",void 0)),S=Object(E.a)(v,2),O=S[0],w=(S[1],Object(n.useState)(q("requestedStockItems",[]))),x=Object(E.a)(w,2),j=x[0],A=x[1],I=Object(n.useState)(!1),B=Object(E.a)(I,2),R=B[0],N=B[1];function q(e,t){var a=localStorage.getItem(e);return a?JSON.parse(a):t}function L(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;u([]),g(!1),setTimeout((function(){z().then((function(e){u(e.data)})).catch((function(e){return g(!0)}))}),e)}function D(e){return e.charAt(0).toUpperCase()+e.slice(1)}function T(e){var t,a=j.find((function(t){return t.id===e.id}));if(void 0===a)t=j.concat(e);else{var n=j.indexOf(a);(t=Object(ee.a)(j))[n].requestedCount=e.requestedCount,t[n].countAfterRequest=e.countAfterRequest}A(t),localStorage.setItem("requestedStockItems",JSON.stringify(t))}function V(){var e="";return j.forEach((function(t){e+=t.name+": "+t.requestedCount+", "})),e.slice(0,-2)}return Object(n.useEffect)((function(){O?(localStorage.setItem("personInfo",JSON.stringify(O)),L(),console.log(O)):e.push("/order")}),[a,e,O]),r.a.createElement(f.a,null,r.a.createElement("h1",{style:{textAlign:"center"}},"Select stock here"),j.map((function(e){return r.a.createElement("p",{key:e.name},e.name,": ",e.requestedCount)})),!d&&r.a.createElement(b.a,{variant:"type",className:"mb-3",onClick:function(){!function(e){C.apply(this,arguments)}({firstname:O.firstName,lastname:O.lastName,adults:O.adults,children:O.adults,zipcode:O.zipcode,"order-notes":V(),fulfilled:!1});var e=j.map((function(e){return console.log("making promise... ",e.countAfterRequest),H(e.id,{newCount:e.countAfterRequest})}));Promise.all(e).then((function(e){return console.log(e)})),localStorage.removeItem("requestedStockItems"),localStorage.removeItem("personInfo"),N(!0)},block:!0,style:{backgroundColor:"#16AB8D",borderColor:"#FFFFF5",color:"#FFFFFF",borderRadius:"200px"},disabled:0===j.length},j.length>0?"Submit request":"Select items below"),r.a.createElement(f.a,{style:{display:"flex",alignItems:"center",padding:0}},r.a.createElement(F.a,{variant:"type",onChange:function(e){return console.log(e)}},r.a.createElement(F.a.Toggle,{variant:"type",id:"dropdown-basic",size:"md",className:"mb-3",style:{backgroundColor:"#16AB8D",borderColor:"#FFFFF5",color:"#FFFFFF",borderRadius:"200px"}},"Language: ",r.a.createElement("b",null,D(y))),r.a.createElement(F.a.Menu,null,Q.map((function(e){return r.a.createElement(F.a.Item,{onSelect:function(e){return k(e)},eventKey:e,key:e},D(e))})))),r.a.createElement("div",{style:{margin:"auto"}}),r.a.createElement(b.a,{variant:"type",size:"md",onClick:L,style:{backgroundColor:"#16AB8D",borderColor:"#FFFFF5",color:"#FFFFFF",borderRadius:"200px"}},"Refresh")),0===c.length&&!d&&r.a.createElement($,null),c&&O&&c.map((function(e){return r.a.createElement(ne,{stockItem:e,getStock:L,lang:"english"===y?"name":y,key:e._id,onRequest:T,isRequested:j.some((function(t){return e._id===t.id}))})})),d&&r.a.createElement(M,{heading:"Error",body:"An error occurred while trying to get the stock.",dismissible:!1}),r.a.createElement(re,{style:{backgroundColor:"#16AB8D",borderColor:"#16AB8D",color:"#FFFFFF"},title:"Order successfully placed!",body:"Thanks for your patronage! Your order will be fulfilled shortly.",buttonText:"Back to Home",show:R,handleClose:function(){N(!1),e.push("/")}}))},le=a(131),ce=a.n(le);var ie=function(e){var t=e.person,a=e.show,n=e.handleClose,o=e.fulfillPerson;return r.a.createElement(D.a,{show:a,onHide:n,"aria-labelledby":"contained-modal-title-vcenter",centered:!0},r.a.createElement(D.a.Header,null,"Confirm fulfillment"),r.a.createElement(D.a.Body,null,r.a.createElement("h5",null,"Are you sure that ",t.firstname,"'s order is correct and has been fulfilled?"),r.a.createElement("p",null,t["order-notes"])),r.a.createElement(D.a.Footer,null,r.a.createElement(b.a,{variant:"secondary",style:{borderRadius:"200px"},onClick:n},"Close"),r.a.createElement(b.a,{onClick:function(){o(t._id),n()},style:{backgroundColor:"#35E82A",borderColor:"#FFFFF5",color:"#FFFFFF",borderRadius:"200px"}},"Confirm fulfillment")))};var ue=function(e){var t=e.person,a=e.fulfillPerson,o=Object(n.useState)(!1),l=Object(E.a)(o,2),c=l[0],i=l[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(q.a,{key:t._id,size:"lg",style:{margin:5}},r.a.createElement(q.a.Body,null,r.a.createElement(q.a.Header,{as:"h2"},t.firstname," ",t.lastname),r.a.createElement(q.a.Text,null,t["order-notes"]),r.a.createElement(b.a,{onClick:function(){return i(!0)},block:!0,style:{backgroundColor:"#16AB8D",borderColor:"#16AB8D",borderRadius:"200px",color:"#FFFFFF"}},"Fulfill Order"))),r.a.createElement(ie,{person:t,show:c,handleClose:function(){return i(!1)},fulfillPerson:a}))};var se=function(){var e=Object(n.useState)([]),t=Object(E.a)(e,2),a=t[0],o=t[1];function l(e){var t=ce()(k);console.log("printing socket object: "),console.log(t),console.log("emitting personfulfilled"),t.emit("personFulfilled",e),t.on("personFulfillSuccess",(function(e){console.log("confirmed "+e),t.disconnect()})),o(a.filter((function(t){return t._id!==e})))}return Object(n.useEffect)((function(){var e=ce()(k);e.on("person",(function(e){t(e)}));var t=function(e){o((function(t){return[].concat(Object(ee.a)(t),[e])}))};return function(){console.log("effect done"),e.disconnect()}}),[]),r.a.createElement(f.a,null,0===a.length&&r.a.createElement("p",null,"No orders at the moment."),a&&a.map((function(e){return r.a.createElement(ue,{fulfillPerson:l,person:e,key:e._id})})))},me=a(240),de=a(164);var Ee=function(){var e=Object(n.useState)(""),t=Object(E.a)(e,2),a=t[0],o=t[1];return r.a.createElement(f.a,{style:{textAlign:"center"}},r.a.createElement("h1",null,"Log In"),r.a.createElement(q.a,{className:"mb-3"},r.a.createElement(q.a.Body,null,r.a.createElement("p",null,"Gain full access to your pantry's stock and current orders."),r.a.createElement(me.a,{className:"mb-3",size:"lg",onChange:function(e){o(e.target.value)}},r.a.createElement(de.a,{"aria-label":"Default",placeholder:"Enter your pantry name here","aria-describedby":"inputGroup-sizing-default"})),r.a.createElement(b.a,{style:{backgroundColor:"green"},onClick:function(){console.log("log in to pantry: ".concat(a))}},"Login to your pantry"))),r.a.createElement(q.a,null,r.a.createElement(q.a.Body,null,r.a.createElement("p",null,"Don't have a pantry with us yet?"),r.a.createElement(b.a,{style:{backgroundColor:"green"},onClick:function(){console.log("signup")}},"Sign up to create a pantry"))))};var be=function(){return r.a.createElement(c.a,{basename:"/panlang-ui"},r.a.createElement(m,{"\xe7":!0}),r.a.createElement("div",{style:{padding:55}}),r.a.createElement(i.c,null,r.a.createElement(i.a,{exact:!0,path:"/"},r.a.createElement(x,null)),r.a.createElement(i.a,{exact:!0,path:"/about"},r.a.createElement(j,null)),r.a.createElement(i.a,{path:"/stock"},r.a.createElement(X,null)),r.a.createElement(i.a,{path:"/order"},r.a.createElement(N,null)),r.a.createElement(i.a,{path:"/order-stock"},r.a.createElement(oe,null)),r.a.createElement(i.a,{path:"/order-tracker"},r.a.createElement(se,null)),r.a.createElement(i.a,{path:"/login"},r.a.createElement(Ee,null)),r.a.createElement(i.a,{path:"*"},r.a.createElement("h1",null,"Welcome to ",r.a.createElement("font",{style:{color:"#26B020"}},"Pan-Lang"),"!"))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(231);l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(be,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[170,1,2]]]);
//# sourceMappingURL=main.a1ed42e1.chunk.js.map