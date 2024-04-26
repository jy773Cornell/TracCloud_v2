"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5452],{7600:(e,t,n)=>{n.r(t),n.d(t,{default:()=>i});var r=n(1504),a=n(6988),c=n(6350),l=n(4408);function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s.apply(this,arguments)}const o=r.forwardRef((function(e,t){return r.createElement(l.c,s({elevation:6,ref:t,variant:"filled"},e))}));function i(e){const t=(t,n)=>{"clickaway"!==n&&e.setOpen(!1)};return r.createElement(a.c,{spacing:2,sx:{width:"100%"}},r.createElement(c.c,{open:e.open,autoHideDuration:6e3,onClose:t},(()=>{switch(e.tag){case"success":return r.createElement(o,{onClose:t,severity:"success",sx:{width:"100%"}},e.msg);case"error":return r.createElement(o,{onClose:t,severity:"error",sx:{width:"100%"}},e.msg);case"warning":return r.createElement(o,{onClose:t,severity:"warning",sx:{width:"100%"}},e.msg);default:return null}})()))}},5452:(e,t,n)=>{n.r(t),n.d(t,{default:()=>y});var r=n(2528),a=n(5984),c=n(7516),l=n(4477),s=n(3964),o=n(4660),i=n(3604),u=n(1940),d=n(5084),m=n(1504),p=n(7600),f=n(8130);function h(){return h=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},h.apply(this,arguments)}const E=["type_id","first_name","last_name","email"];function y({uid:e,employerID:t,refreshRecord:n,setRefreshRecord:y,showAddModal:g,setShowAddModal:v}){const[b,x]=(0,m.useState)({}),[w,C]=(0,m.useState)([]),[j,O]=(0,m.useState)(!1),[k,A]=(0,m.useState)(!1),[S,_]=(0,m.useState)([]),[T,I]=(0,m.useState)([]),N=(e,t,n)=>{x({...b,[n]:t})};(0,m.useEffect)((()=>{!async function(){await fetch("/api/user/type/get/",{method:"GET",headers:{"Content-Type":"application/json"}}).then((e=>{e.ok&&e.json().then((e=>{const t=e.data;_(t)}))}))}()}),[]),(0,m.useEffect)((()=>{(e=>{I(e.filter((e=>"Employee"===e.relation_type)).map((e=>({label:e.name,id:e.utid}))))})(S)}),[S]),(0,m.useEffect)((()=>{x(Object.fromEntries(E.map((e=>[e,""])))),C(Object.fromEntries(E.map((e=>[e,!1]))))}),[g]);const R={open:j,setOpen:O,msg:"New employee has been added successfully! An activation email has already been sent to the new employee.",tag:"success"};return m.createElement(m.Fragment,null,m.createElement(a.c,{open:g,sx:{display:"flex",justifyContent:"center",alignItems:"center"}},m.createElement("div",null,m.createElement(c.c,{sx:{width:400}},m.createElement(l.c,null,m.createElement(s.cp,{container:!0,justifyContent:"center",spacing:2},m.createElement(s.cp,{item:!0,xs:12,sx:{textAlign:"center"}},m.createElement("h1",null,"Add New Employee")),m.createElement(s.cp,{item:!0,xs:12},m.createElement(o.c,{options:T||[],disableClearable:!0,onChange:(e,t)=>{N(0,t.id,E[0])},renderInput:e=>m.createElement(i.c,h({},e,{required:!0,fullWidth:!0,variant:"outlined",label:"Employee Type",error:w[E[0]]}))})),m.createElement(s.cp,{item:!0,xs:6},m.createElement(i.c,{required:!0,fullWidth:!0,variant:"outlined",label:"First Name",onChange:e=>{N(0,e.target.value,E[1])},error:w[E[1]]})),m.createElement(s.cp,{item:!0,xs:6},m.createElement(i.c,{required:!0,fullWidth:!0,variant:"outlined",label:"Last Name",onChange:e=>{N(0,e.target.value,E[2])},error:w[E[2]]})),m.createElement(s.cp,{item:!0,xs:12},m.createElement(i.c,{required:!0,fullWidth:!0,variant:"outlined",label:"Email",autoComplete:"email",onChange:e=>{N(0,e.target.value,E[3])},error:w[E[3]]})),m.createElement(s.cp,{item:!0,xs:6,sx:{justifyContent:"center",textAlign:"center"}},m.createElement(u.c,{variant:"contained",color:"secondary",onClick:()=>v(!1)},"Cancel")),m.createElement(s.cp,{item:!0,xs:6,sx:{justifyContent:"center",textAlign:"center"}},m.createElement(u.c,{variant:"contained",color:"success",onClick:()=>{(()=>{const e=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;let t=!0;return E.forEach(((n,r)=>{let a=""===b[n],c=3===r&&!e.test(b[n]);a||c?(t=!1,C((e=>({...e,[n]:!0})))):C((e=>({...e,[n]:!1})))})),t})()&&async function(t){A(!0);const a={employer_id:t,added_by_id:e,...b};console.log(a);const c={method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":(0,r.U$)("csrftoken")},body:JSON.stringify(a)};await fetch("/user_manage/employee/create/",c).then((e=>{e.ok&&(O(!0),v(!1),y(~n)),A(!1)}))}(t)}},"Add"))))),m.createElement(d.c,{sx:{zIndex:e=>e.zIndex.drawer+1},open:k},m.createElement(f.c,{color:"inherit"})))),m.createElement(p.default,R))}}}]);