"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[808],{9518:(e,t,n)=>{n.d(t,{Z:()=>i});var r=n(7294),a=n(6914),o=n(2206),l=n(2658),c=n(4680);function i(e){return r.createElement(o.ZP,{open:Boolean(e.anchorEl),anchorEl:e.anchorEl,anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"}},r.createElement(c.Z,{sx:{p:1,maxWidth:400}},r.createElement(l.Z,{variant:"body1"},e.msg),r.createElement(a.Z,{onClick:()=>{"delete"===e.type?(e.setAnchorEl(null),e.onDeleteClicked(e.params)):"update"===e.type&&(e.setAnchorEl(null),e.onSaveClicked())},color:"primary"},"Yes"),r.createElement(a.Z,{onClick:()=>e.setAnchorEl(null),color:"secondary"},"No")))}},4311:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(7294),a=n(6447),o=n(7608),l=n(2288);function c(){return c=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c.apply(this,arguments)}const i=r.forwardRef((function(e,t){return r.createElement(l.Z,c({elevation:6,ref:t,variant:"filled"},e))}));function s(e){const t=(t,n)=>{"clickaway"!==n&&e.setOpen(!1)};return r.createElement(a.Z,{spacing:2,sx:{width:"100%"}},r.createElement(o.Z,{open:e.open,autoHideDuration:6e3,onClose:t},(()=>{switch(e.tag){case"success":return r.createElement(i,{onClose:t,severity:"success",sx:{width:"100%"}},e.msg);case"error":return r.createElement(i,{onClose:t,severity:"error",sx:{width:"100%"}},e.msg);case"warning":return r.createElement(i,{onClose:t,severity:"warning",sx:{width:"100%"}},e.msg);default:return null}})()))}},9808:(e,t,n)=>{n.r(t),n.d(t,{default:()=>R});var r=n(7294),a=n(4680),o=n(6867),l=n(6540),c=n(7957),i=n(1733),s=n(6818),d=n(4510),u=n(7794),p=n(5295),m=n(2643),h=n(5725),E=n(6694),f=n(5116),g=n(6914),y=n(3264),v=n(5137);const C=(0,y.Z)(g.Z)((()=>({margin:"15px 15px",backgroundColor:v.Z[500],"&:hover":{backgroundColor:v.Z[700]}})));var Z=n(4311),b=n(2176),w=n(6132),x=n(853),O=n(4482),S=n(7406),k=n(3306),j=n(9518);function _(){return _=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},_.apply(this,arguments)}const I=200,P=180,T=["crop","variety","crop_code","category","growth_stage"];function N(e){const{crop:t,variety:n,growth_stage:r,...a}=e;return{crop_id:t,variety_id:n,growth_stage_id:r,...a}}function A(){return r.createElement(b.D,null,r.createElement(w.S,null),r.createElement(x.M,null),r.createElement(O.L,null),r.createElement(S.Zh,null))}function G({fieldValues:e,formData:t,columns:n,cropCategoryOptions:a,cropVarietyOptions:o,cropGrowthStageOptions:l,handleInputChange:c,showAddModal:i,setShowAddModal:s,setIsSave:d,inputError:y,updateInputError:v,refreshRecord:C,setRefreshRecord:Z}){return r.createElement(u.Z,{open:i,onClose:()=>s(!1),sx:{display:"flex",justifyContent:"center",alignItems:"center"}},r.createElement(p.Z,{sx:{width:400}},r.createElement(m.Z,null,r.createElement(h.ZP,{container:!0,justifyContent:"center",spacing:2},r.createElement(h.ZP,{item:!0,xs:12,sx:{textAlign:"center"}},r.createElement("h1",null,"Add Crop Record")),r.createElement(h.ZP,{item:!0,xs:12},r.createElement(E.Z,{value:e[T[0]],options:a,onChange:(e,t)=>{c(e,t,T[0])},renderInput:e=>r.createElement(f.Z,_({},e,{required:!0,variant:"outlined",label:n[1].headerName,error:y[T[0]]}))})),r.createElement(h.ZP,{item:!0,xs:12},r.createElement(E.Z,{value:e[T[1]],options:o,onChange:(e,t)=>{c(e,t,T[1])},renderInput:e=>r.createElement(f.Z,_({},e,{required:!0,variant:"outlined",label:n[2].headerName,error:y[T[1]]}))})),r.createElement(h.ZP,{item:!0,xs:6},r.createElement(f.Z,{value:e[T[2]],InputLabelProps:{shrink:!0,readOnly:!0},variant:"outlined",label:n[3].headerName})),r.createElement(h.ZP,{item:!0,xs:6},r.createElement(f.Z,{value:e[T[3]],InputLabelProps:{shrink:!0,readOnly:!0},variant:"outlined",label:n[4].headerName})),r.createElement(h.ZP,{item:!0,xs:12},r.createElement(E.Z,{value:e[T[4]],options:l,onChange:(e,t)=>{c(e,t,T[4])},renderInput:e=>r.createElement(f.Z,_({},e,{required:!0,variant:"outlined",label:n[5].headerName,error:y[T[4]]}))})),r.createElement(h.ZP,{item:!0,xs:6,sx:{justifyContent:"center",textAlign:"center"}},r.createElement(g.Z,{variant:"contained",color:"success",onClick:()=>{Object.values(e).every((e=>""!==e))?async function(){const e=N(t);console.log(e);const n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)};await fetch("/api/crop/create/",n).then((e=>{e.ok&&(d(!0),s(!1),Z(~C))}))}():v()}},"Save")),r.createElement(h.ZP,{item:!0,xs:6,sx:{justifyContent:"center",textAlign:"center"}},r.createElement(g.Z,{variant:"contained",color:"secondary",onClick:()=>s(!1)},"Cancel"))))))}function R(e){const t=e.uid,[n,u]=(0,r.useState)([]),[p,m]=(0,r.useState)([]),[h,g]=(0,r.useState)([]),[y,v]=(0,r.useState)([]),[b,w]=(0,r.useState)({}),[x,O]=(0,r.useState)({}),[S,R]=(0,r.useState)([]),[D,U]=(0,r.useState)([]),[M,V]=(0,r.useState)([]),[q,J]=(0,r.useState)(!1),[L,z]=(0,r.useState)(!1),[B,F]=(0,r.useState)(!1),[H,W]=(0,r.useState)([]),[Y,K]=(0,r.useState)(null),[Q,X]=(0,r.useState)(null),[$,ee]=(0,r.useState)(null),[te,ne]=(0,r.useState)(!1),re=()=>{W(Object.fromEntries(T.map((e=>[e,!1]))))},ae=()=>{Object.keys(x).forEach((e=>{""===x[e]?W((t=>({...t,[e]:!0}))):W((t=>({...t,[e]:!1})))}))},oe=()=>{if(Object.values(x).every((e=>""!==e))){!async function(){const e=N(b);console.log(e);const t={method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)};await fetch("/api/crop/update/",t).then((e=>{e.ok&&(z(!0),K(null),ne(~te))}))}();const e=y.findIndex((e=>e.id===x.id));v([...y.slice(0,e),x,...y.slice(e+1)])}else ae()},le=e=>{!async function(e){const n={user:t,cid:e};console.log(n);const r={method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)};await fetch("/api/crop/delete/",r).then((e=>{e.ok&&(F(!0),ne(~te))}))}(e.id);const n=y.findIndex((t=>t.id===e.id));v([...y.slice(0,n),...y.slice(n+1)])},ce=(e,t,n)=>{n===T[0]?(O({...x,[n]:t.label,[T[1]]:"",[T[2]]:t.crop_code,[T[3]]:t.category,[T[4]]:""}),w({...b,[n]:t.id,[T[1]]:null,[T[4]]:null})):(O({...x,[n]:t.label}),w({...b,[n]:t.id}))},ie=[{field:"operations",headerName:"Operations",sortable:!1,width:150,disableColumnMenu:!0,disableClickEventBubbling:!0,renderCell:e=>Y!==e.id?r.createElement(r.Fragment,null,r.createElement(o.Z,{onClick:()=>(e=>{const t=S.find((t=>t.label===e.row.crop));w({cid:e.id,crop:t.id}),O(e.row),K(e.id),re()})(e)},r.createElement(c.Z,null)),r.createElement(o.Z,{onClick:t=>{X(t.currentTarget),ee(e.id)}},r.createElement(i.Z,null)),$===e.id&&r.createElement(j.Z,{anchorEl:Q,setAnchorEl:X,onDeleteClicked:le,params:e,msg:"Delete this record?",type:"delete"})):r.createElement(r.Fragment,null,r.createElement(o.Z,{onClick:t=>{X(t.currentTarget),ee(e.id)}},r.createElement(s.Z,null)),r.createElement(o.Z,{onClick:()=>(K(null),void re())},r.createElement(d.Z,null)),$===e.id&&r.createElement(j.Z,{anchorEl:Q,setAnchorEl:X,onSaveClicked:oe,params:e,msg:"Update this record?",type:"update"}))},{field:"crop",headerName:"Crop",sortable:!1,width:I,renderCell:(e,t=e.id)=>r.createElement(E.Z,{options:S,disableClearable:!0,readOnly:Y!==t,value:Y===t?x[T[0]]:e.value,onChange:(e,t)=>{ce(0,t,T[0])},renderInput:e=>Y!==t?r.createElement(f.Z,_({},e,{variant:"standard",InputProps:{disableUnderline:!0},sx:{width:I}})):r.createElement(f.Z,_({},e,{variant:"standard",error:H[T[0]],sx:{width:P}}))})},{field:"variety",headerName:"Variety",sortable:!1,width:I,renderCell:(e,t=e.id)=>r.createElement(E.Z,{options:D,disableClearable:!0,readOnly:Y!==t,value:Y===t?x[T[1]]:e.value,onChange:(e,t)=>{ce(0,t,T[1])},renderInput:e=>Y!==t?r.createElement(f.Z,_({},e,{variant:"standard",InputProps:{disableUnderline:!0},sx:{width:I}})):r.createElement(f.Z,_({},e,{variant:"standard",sx:{width:P},error:H[T[1]]}))})},{field:"crop_code",headerName:"Crop Code",sortable:!1,width:I,valueGetter:e=>Y===e.id?x[T[2]]:e.value},{field:"category",headerName:"Category",sortable:!1,width:I,valueGetter:e=>Y===e.id?x[T[3]]:e.value},{field:"growth_stage",headerName:"Growth Stage",sortable:!1,width:I,renderCell:(e,t=e.id)=>r.createElement(E.Z,{options:M,disableClearable:!0,readOnly:Y!==t,value:Y===t?x[T[4]]:e.value,onChange:(e,t)=>{ce(0,t,T[4])},renderInput:e=>Y!==t?r.createElement(f.Z,_({},e,{variant:"standard",InputProps:{disableUnderline:!0},sx:{width:I}})):r.createElement(f.Z,_({},e,{variant:"standard",sx:{width:P},error:H[T[4]]}))})},{field:"update_time",headerName:"Update Time",sortable:!1,width:I}],se={fieldValues:x,formData:b,columns:ie,cropCategoryOptions:S,cropVarietyOptions:D,cropGrowthStageOptions:M,handleInputChange:ce,showAddModal:q,setShowAddModal:J,setIsSave:z,inputError:H,updateInputError:ae,refreshRecord:te,setRefreshRecord:ne},de={open:L,setOpen:z,msg:"Crop record is uploaded successfully!",tag:"success"},ue={open:B,setOpen:F,msg:"Crop record has been deleted!",tag:"success"};return(0,r.useEffect)((()=>{!async function(){await fetch("/api/crop/category/",{method:"GET",headers:{"Content-Type":"application/json"}}).then((e=>{e.ok&&e.json().then((e=>{u(e.data)}))}))}(),async function(){await fetch("/api/crop/variety/",{method:"GET",headers:{"Content-Type":"application/json"}}).then((e=>{e.ok&&e.json().then((e=>{m(e.data)}))}))}(),async function(){await fetch("/api/crop/growthstage/",{method:"GET",headers:{"Content-Type":"application/json"}}).then((e=>{e.ok&&e.json().then((e=>{g(e.data)}))}))}(),re()}),[]),(0,r.useEffect)((()=>{R(n.map((e=>({label:e.name,id:e.ccid,crop_code:e.crop_code,category:e.category}))))}),[n]),(0,r.useEffect)((()=>{var e;e=b.crop,U(p.filter((t=>t.crop_id===e)).map((e=>({label:e.name,id:e.cvid})))),(e=>{V(h.filter((t=>t.crop_id===e)).map((e=>({label:e.name,id:e.cgsid}))))})(b.crop)}),[b.crop]),(0,r.useEffect)((()=>{!async function(e){await fetch("/api/crop/list/get/?uid="+e,{method:"GET",headers:{"Content-Type":"application/json"}}).then((e=>{e.ok&&e.json().then((e=>{const t=e.data.map((e=>function(e){return{id:e.cid,crop:e.crop,variety:e.variety,crop_code:e.crop_code,category:e.category,growth_stage:e.growth_stage,update_time:e.update_time}}(e)));v(t)}))}))}(t)}),[te]),r.createElement("div",null,r.createElement(C,{variant:"contained",startIcon:r.createElement(l.Z,null),onClick:()=>(w({user_id:t}),O(Object.fromEntries(T.map((e=>[e,""])))),K(null),J(!0),void re())},"Add Crop"),r.createElement(a.Z,{style:{height:900,margin:"0px 15px"}},r.createElement(k._,{columns:ie,rows:y,disableRowSelectionOnClick:!0,disableClickEdit:!0,rowSelection:!1,slots:{toolbar:A}})),r.createElement(G,se),r.createElement(Z.Z,de),r.createElement(Z.Z,ue))}}}]);