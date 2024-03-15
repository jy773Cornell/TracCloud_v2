"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7232],{7600:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});var r=n(1504),l=n(6988),a=n(6350),i=n(4408);function c(){return c=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c.apply(this,arguments)}const s=r.forwardRef((function(e,t){return r.createElement(i.c,c({elevation:6,ref:t,variant:"filled"},e))}));function o(e){const t=(t,n)=>{"clickaway"!==n&&e.setOpen(!1)};return r.createElement(l.c,{spacing:2,sx:{width:"100%"}},r.createElement(a.c,{open:e.open,autoHideDuration:6e3,onClose:t},(()=>{switch(e.tag){case"success":return r.createElement(s,{onClose:t,severity:"success",sx:{width:"100%"}},e.msg);case"error":return r.createElement(s,{onClose:t,severity:"error",sx:{width:"100%"}},e.msg);case"warning":return r.createElement(s,{onClose:t,severity:"warning",sx:{width:"100%"}},e.msg);default:return null}})()))}},7232:(e,t,n)=>{n.d(t,{c:()=>w});var r=n(1504),l=n(7339),a=n(1940),i=n(3964),c=n(4660),s=n(3604),o=n(3184),d=n(600),u=n(9732),p=n(5984),m=n(7516),f=n(4477),y=n(2184),E=n(9032),v=n(444),b=n(7600),g=n(2528);function h(){return h=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},h.apply(this,arguments)}const C=(0,r.lazy)((()=>Promise.all([n.e(1032),n.e(2018)]).then(n.bind(n,2018)))),O=(0,r.lazy)((()=>Promise.all([n.e(6484),n.e(4016)]).then(n.bind(n,4016)))),x=r.createElement(y.c,{fontSize:"small"}),S=r.createElement(E.c,{fontSize:"small"}),k=["Select Chemicals","Select Crops","Select Sites","Responsible Person"],j=["Row","Hole Code#","Section","Block"];function w({uid:e,openSprayCard:t,setOpenSprayCard:n,sprayData:y,sprayOptions:E,refreshRecord:w,setRefreshRecord:_,setAssignSprayCard:P,sprayCardSelected:A,setSprayCardSelected:N,fieldValues:I,setFieldValues:F,initialFieldValues:R,field_names:T,selectedResponsible:L,setSelectedResponsible:W,tag:z,privilege:J}){const[D,U]=(0,r.useState)({}),[q,V]=(0,r.useState)({}),[$,B]=(0,r.useState)([]),[G,H]=(0,r.useState)({}),[X,M]=(0,r.useState)([]),[K,Q]=(0,r.useState)([]),[Y,Z]=(0,r.useState)([]),[ee,te]=(0,r.useState)([]),[ne,re]=r.useState(0),[le,ae]=r.useState({0:!1,1:!1,2:!1,3:!1}),[ie,ce]=(0,r.useState)(!1),[se,oe]=(0,r.useState)(!1),de=()=>{const t=(e,t)=>{for(let n in e)if(e[n].id===t)return n};let n=[];for(let r in Object.keys(D[T[0]]))for(let l of Object.keys(D[T[4]])){let a={};a.user_id=e,a.crop_id=D[T[4]][l].cid,a.site_id=D[T[4]][l].id,a.applied_area=D[T[6]][l],a.area_unit_id=E.siteUnitOptions.find((e=>e.label===D[T[4]][l].unit)).id,a.partial_treatment=D[T[9]][l],a.alt_row_middle=D[T[10]][l],a.chemical_purchase_id=D[T[0]][r].id,a.decision_support_id=D[T[1]][r].id,a.target_id=D[T[3]][t(D[T[2]],D[T[4]][l].cid)].id,a.gallons_water_rate=D[T[7]],a.application_rate=D[T[8]][r],a.total_amount=parseFloat(D[T[6]][l])*parseFloat(D[T[8]][r]),a.amount_unit_id=E.chemicalUnitOptions.find((e=>e.label===D[T[0]][r].unit)).id,a.total_cost=parseFloat(D[T[6]][l])*parseFloat(D[T[8]][r])*parseFloat(D[T[0]][r].cost),a.rate_unit_id=E.chemicalUnitOptions.find((e=>e.label===D[T[0]][r].unit)).id,a.responsible_person_id=D[T[11]],a.growth_stage_id=D[T[12]][l].id,n.push(a)}return n},ue=(e,t,n,r=null)=>{let l;if(r?(l=I[n]||{},l[r]=t):l=t,n===T[2]){Ee(t.id,r);const e=he(l),[a,i,c,s]=Ce(e);F({...I,[n]:l,[T[4]]:e,[T[6]]:a,[T[9]]:i,[T[10]]:c,[T[12]]:s}),me()}else if(n===T[4]){const[e,t]=Oe(l),[r,a,i,c]=Ce(l);F({...I,[n]:l,[T[2]]:e,[T[3]]:t,[T[6]]:r,[T[9]]:a,[T[10]]:i,[T[12]]:c}),me()}else if(n===T[5])F({...I,[n]:l}),U({...D,[n]:l});else if(n===T[9]){let e={...I[T[6]]};l[r]||I[T[10]][r]||(e[r]=I[T[4]][r].area),F({...I,[n]:l,[T[6]]:e})}else if(n===T[10]){let e={...I[T[6]]};l[r]||I[T[9]][r]||(e[r]=I[T[4]][r].area),F({...I,[n]:l,[T[6]]:e})}else F({...I,[n]:l});[T[0],T[1],T[7],T[8]].includes(n)&&be(0),[T[2],T[4]].includes(n)&&(be(1),be(2)),[T[3]].includes(n)&&be(1),[T[6],T[9],T[10]].includes(n)&&be(2),[T[11]].includes(n)&&be(3)},pe=e=>{const t=I[e]||{},n=Object.keys(t).length;if(t[n]="",e===T[0]){const r=I[T[1]]||{};r[n]="";const l=I[T[8]]||{};l[n]="",F({...I,[e]:t,[T[1]]:r,[T[8]]:l})}else if(e===T[2]){const r=I[T[3]]||{};r[n]="",F({...I,[e]:t,[T[3]]:r})}},me=()=>{V({...q,[T[6]]:{}})},fe=(e,t,n)=>{let r=t.reduce(((t,n)=>(t[n]={...e[n]},t)),{});return Object.values(r).map((e=>{delete e[n]})),Object.keys(r).reduce(((e,t)=>(e[t]=Object.values(r[t]).reduce(((e,t,n)=>(e[n]=t,e)),{}),e)),{})},ye=(e,t)=>{let n,r;if(e===T[0])n=fe(I,[T[0],T[1],T[8]],t),r=fe(q,[T[0],T[1],T[8]],t);else if(e===T[2]){n=fe(I,[T[2],T[3]],t),r=fe(q,[T[2],T[3]],t);const e=he(n[T[2]]),[l,a,i,c]=Ce(e);n[T[4]]=e,n[T[6]]=l,n[T[9]]=a,n[T[10]]=i,n[T[12]]=c}else n={};F({...I,...n}),V({...q,...r})},Ee=(e,t)=>{const n=y.cropList.find((t=>t.cid===e));if(n){const e={...$};e[t]=y.applicationTarget.filter((e=>e.crop_id===y.cropCategory.find((e=>e.name===n.crop)).ccid||null===e.crop_id)).map((e=>({label:e.name,id:e.attid}))),B((t=>({...t,...e})))}},ve=()=>{if(y.siteList){const e={},t={};y.siteList.forEach((n=>{e[n.sid]=[],t[n.sid]=[]})),"create"===z&&Z(e),te(t),Q(y.siteList.map(ge))}},be=e=>{ae((t=>({...t,[e]:!1})))},ge=e=>({value:e.sid.toString(),label:e.type+" - "+e.name,children:Array.isArray(e.children)?e.children.map(ge):[]}),he=e=>{const t=Object.values(e).filter((e=>void 0!==e.id)).map((e=>e.id)),n=[...new Set(t)];return Object.values(X).filter((e=>n.includes(e.cid))).reduce(((e,t,n)=>(e[n]=t,e)),{})},Ce=e=>{const t=I[T[4]],n=I[T[6]],r=I[T[9]],l=I[T[10]],a=I[T[12]];let i={},c={},s={},o={};return Object.keys(e).map((d=>{const u=Object.keys(t).find((n=>JSON.stringify(e[d])===JSON.stringify(t[n])));u?(i[d]=n[u],c[d]=r[u],s[d]=l[u],o[d]=a[u]):(i[d]=e[d].area,c[d]=!1,s[d]=!1,o[d]="")})),[i,c,s,o]},Oe=e=>{const t=Object.values(e).filter((e=>void 0!==e.cid)).map((e=>e.cid)),n=[...new Set(t)],r=E.cropOptions.filter((e=>n.includes(e.id)));let l={},a={},i=0;for(let e in I[T[2]])""!==I[T[2]][e]&&(l[i]=I[T[2]][e],a[i]=I[T[3]][e],Ee(I[T[2]][e].id,i),i++);for(let e in l)r.includes(l[e])||(delete l[e],delete a[e]);return r.map((e=>{if(!Object.values(l).includes(e)){const t=Object.keys(l).length;l[t]=e,a[t]="",Ee(e.id,t)}})),[l,a]},xe=(e,t)=>{V((n=>{let r={...n};if(r[t]||(r[t]={}),t===T[4])r[t]=0===Object.values(e).length;else for(let n in e)e.hasOwnProperty(n)&&(r[t][n]=""===e[n]);return r}))},Se=(e,t)=>{let n=Object.values(e);return 0===n.length?(xe(e,t),!1):n.every((e=>""!==e))?(xe(e,t),!0):(xe(e,t),!1)},ke={steps:k,activeStep:ne,setActiveStep:re,completed:le,setCompleted:ae,saveChemicals:()=>{const e=Se(I[T[0]],T[0]),t=Se(I[T[1]],T[1]),n=""!==I[T[7]],r=Se(I[T[8]],T[8]);return V((e=>({...e,[T[7]]:""===I[T[7]]}))),e&&t&&n&&r?(U((e=>({...e,[T[0]]:I[T[0]],[T[1]]:I[T[1]],[T[7]]:I[T[7]],[T[8]]:I[T[8]]}))),!0):(oe(!0),!1)},saveCrops:()=>{const e=Se(I[T[2]],T[2]),t=Se(I[T[3]],T[3]);return e&&t?(U({...D,[T[2]]:I[T[2]],[T[3]]:I[T[3]]}),!0):(oe(!0),!1)},saveSites:()=>{const e=Se(I[T[4]],T[4]),t=Se(I[T[6]],T[6]),n=Se(I[T[12]],T[12]);return e&&t&&n?(U({...D,[T[4]]:I[T[4]],[T[6]]:I[T[6]],[T[9]]:I[T[9]],[T[10]]:I[T[10]],[T[12]]:I[T[12]]}),!0):(oe(!0),!1)},saveResponsible:()=>(V((e=>({...e,[T[11]]:""===I[T[11]]}))),I[T[11]]?(U({...D,[T[11]]:I[T[11]]}),!0):(oe(!0),!1)),submitSprayCardData:async function(){if("create"===z){const e=await async function(){const e=de();console.log(e);const t={method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":(0,g.U$)("csrftoken")},body:JSON.stringify(e)},n=await fetch("/workflow/spraycard/create/",t);return n.ok?(await n.json()).data:null}();await async function(e){const t={spray_record_id:e};console.log(t);const r={method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":(0,g.U$)("csrftoken")},body:JSON.stringify(t)},l=await fetch("/workflow/spraycard/initiate/",r);if(l.ok){const e=await l.json();N(e.data),n(!1),J.spraycard_a&&P(!0),ce(!0),_(~w)}}(e)}else await async function(){const e={scpid:A.scpid,records:de()};console.log(e);const t={method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":(0,g.U$)("csrftoken")},body:JSON.stringify(e)};(await fetch("/workflow/spraycard/update/",t)).ok&&(n(!1),ce(!0),_(~w))}()},closeModal:()=>{n(!1)},buttonText:"create"===z?"Create":"Update"},je={sprayData:y,field_names:T,fieldValues:I,setFieldValues:F,siteOptions:X,end_site_types:j,checked:Y,setChecked:Z,expanded:ee,setExpanded:te,nodes:K},we={open:ie,setOpen:ce,msg:"Spray Card Process Initiated Successfully.",tag:"success"},_e={open:se,setOpen:oe,msg:"None data or uncompleted data found.",tag:"error"};return(0,r.useEffect)((()=>{(()=>{const e=Object.values(Y).flat().map((e=>X.find((t=>t.id===e)))).filter(Boolean).reduce(((e,t,n)=>(e[n]=t,e)),{});if(JSON.stringify(I[T[4]])!==JSON.stringify(e)){const[t,n]=Oe(e),[r,l,a,i]=Ce(e);F((c=>({...c,[T[2]]:t,[T[3]]:n,[T[4]]:e,[T[6]]:r,[T[9]]:l,[T[10]]:a,[T[12]]:i})))}me()})(),be(1),be(2)}),[Y]),(0,r.useEffect)((()=>{var e;(()=>{var e;const t=(e,n,r)=>{e&&Array.isArray(e.children)&&e.children.forEach((e=>{n.includes(e.value)&&!r.includes(e.value)&&r.push(e.value),t(e,n,r)}))},n=Object.values(I[T[4]]).map((e=>e.id)),r={};null===(e=y.siteList)||void 0===e||e.forEach((e=>{r[e.sid]=[]})),Object.keys(r).forEach((e=>{const l=K.find((t=>t.value===e));t(l,n,r[e])})),JSON.stringify(Y)!==JSON.stringify(r)&&Z((e=>({...e,...r})))})(),(e=>{let t={};Object.keys(e).map((n=>{t[n]=E.growthStageOptions.filter((t=>t.crop_id===e[n].ccid))})),H(t)})(I[T[4]]),null===(e=Object.keys(null==I?void 0:I[T[2]]))||void 0===e||e.map((e=>Ee(I[T[2]][e].id,e)))}),[I]),(0,r.useEffect)((()=>{ue(0,null==L?void 0:L.id,T[11])}),[L]),(0,r.useEffect)((()=>{"create"===z&&(F(R),W(null)),V({}),U({}),re(0),ae({0:!1,1:!1,2:!1,3:!1}),ve()}),[t]),(0,r.useEffect)((()=>{M((null==E?void 0:E.siteOptions)||[]),ve()}),[y,E]),r.createElement(r.Fragment,null,r.createElement(p.c,{open:t,sx:{display:"flex",justifyContent:"center",alignItems:"center"}},r.createElement(m.c,{sx:{width:1200}},r.createElement(f.c,null,r.createElement(l.c,{sx:{width:"100%",flexGrow:1}},r.createElement(l.c,{sx:{width:"100%",minHeight:400,maxHeight:800,overflow:"auto"}},r.createElement("div",{style:{display:0===ne?"block":"none"}},r.createElement(i.cp,{container:!0,justifyContent:"center",spacing:3},r.createElement(i.cp,{item:!0,xs:12,sx:{textAlign:"center"}},r.createElement("h1",null,"Create Spray Card Process")),r.createElement(i.cp,{item:!0,xs:4},r.createElement(s.c,{value:I[T[7]],variant:"outlined",fullWidth:!0,required:!0,label:"Gallons Water Rate",type:"number",inputProps:{step:.01},InputProps:{endAdornment:r.createElement(o.c,{position:"end"},"per site unit")},error:(null==q?void 0:q[T[7]])||!1,onChange:e=>{ue(0,e.target.value,T[7])}})),Object.keys(I[T[0]]).map((e=>{var t,n,l,d,u;return r.createElement(i.cp,{item:!0,xs:12,key:e},r.createElement(i.cp,{container:!0,justifyContent:"center",spacing:2},r.createElement(i.cp,{item:!0,xs:2}),r.createElement(i.cp,{item:!0,xs:7},r.createElement(c.c,{value:I[T[0]][e],options:E.chemicalOptions||[],disableClearable:!0,onChange:(t,n)=>{ue(0,n,T[0],e)},renderInput:t=>{var n;return r.createElement(s.c,h({},t,{fullWidth:!0,required:!0,variant:"outlined",placeholder:"EPA NO. | Trade Name | Cost per Unit | Purchase Date",label:"Chemical "+(Number(e)+1),error:(null==q||null===(n=q[T[0]])||void 0===n?void 0:n[e])||!1}))}})),r.createElement(i.cp,{item:!0,xs:1,sx:{display:"flex",alignItems:"center"}},r.createElement(a.c,{variant:"contained",color:"secondary",onClick:()=>ye(T[0],e)},"Delete")),r.createElement(i.cp,{item:!0,xs:2}),r.createElement(i.cp,{item:!0,xs:2}),r.createElement(i.cp,{item:!0,xs:4},r.createElement(c.c,{value:I[T[1]][e],options:E.decisionSupportOptions||[],disableClearable:!0,onChange:(t,n)=>{ue(0,n,T[1],e)},renderInput:t=>{var n;return r.createElement(s.c,h({},t,{fullWidth:!0,required:!0,variant:"outlined",label:"Decision Support "+(Number(e)+1),error:(null==q||null===(n=q[T[1]])||void 0===n?void 0:n[e])||!1}))}})),r.createElement(i.cp,{item:!0,xs:4},r.createElement(s.c,{value:I[T[8]][e],variant:"outlined",fullWidth:!0,required:!0,label:"Application Rate "+(Number(e)+1),type:"number",inputProps:{step:.01},InputProps:{endAdornment:r.createElement(o.c,{position:"end"},`${null!=I&&null!==(t=I[T[0]])&&void 0!==t&&null!==(n=t[e])&&void 0!==n&&n.unit?null==I||null===(l=I[T[0]])||void 0===l||null===(d=l[e])||void 0===d?void 0:d.unit:""} per site unit`)},error:(null==q||null===(u=q[T[8]])||void 0===u?void 0:u[e])||!1,onChange:t=>{ue(0,t.target.value,T[8],e)}})),r.createElement(i.cp,{item:!0,xs:2})))})),r.createElement(i.cp,{item:!0,xs:12,sx:{textAlign:"center"}},r.createElement(a.c,{variant:"contained",color:"primary",sx:{mb:2},onClick:()=>pe(T[0])},"Add Chemical")))),r.createElement("div",{style:{display:1===ne?"block":"none"}},r.createElement(i.cp,{container:!0,justifyContent:"center",spacing:3},r.createElement(i.cp,{item:!0,xs:12,sx:{textAlign:"center"}},r.createElement("h1",null,"Create Spray Card Process")),Object.keys(I[T[2]]).map((e=>r.createElement(r.Fragment,{key:e},r.createElement(i.cp,{item:!0,xs:1.5}),r.createElement(i.cp,{item:!0,xs:4},r.createElement(c.c,{id:`${e}`,value:I[T[2]][e],options:E.cropOptions||[],disableClearable:!0,onChange:(t,n)=>{ue(0,n,T[2],e)},renderInput:t=>{var n;return r.createElement(s.c,h({},t,{fullWidth:!0,required:!0,variant:"outlined",placeholder:"Crop (Variety)",label:"Crop "+(Number(e)+1),error:(null==q||null===(n=q[T[2]])||void 0===n?void 0:n[e])||!1}))}})),r.createElement(i.cp,{item:!0,xs:4},r.createElement(c.c,{id:`${e}`,value:I[T[3]][e],options:$[e]||[],disableClearable:!0,onChange:(t,n)=>{ue(0,n,T[3],e)},renderInput:t=>{var n;return r.createElement(s.c,h({},t,{fullWidth:!0,required:!0,variant:"outlined",label:"Pesticide Target "+(Number(e)+1),error:(null==q||null===(n=q[T[3]])||void 0===n?void 0:n[e])||!1}))}})),r.createElement(i.cp,{item:!0,xs:1,sx:{display:"flex",alignItems:"center"}},r.createElement(a.c,{variant:"contained",color:"secondary",onClick:()=>ye(T[2],e)},"Delete")),r.createElement(i.cp,{item:!0,xs:1.5})))),r.createElement(i.cp,{item:!0,xs:12,sx:{textAlign:"center"}},r.createElement(a.c,{variant:"contained",color:"primary",sx:{mb:2},onClick:()=>pe(T[2])},"Add Crop")))),r.createElement("div",{style:{display:2===ne?"block":"none"}},r.createElement(i.cp,{container:!0,justifyContent:"center",spacing:3},r.createElement(i.cp,{item:!0,xs:12,sx:{textAlign:"center"}},r.createElement("h1",null,"Create Spray Card Process")),r.createElement(r.Fragment,null,r.createElement(i.cp,{item:!0,xs:12},r.createElement(c.c,{multiple:!0,size:"small",value:Object.values(I[T[4]]),options:((e,t)=>{const n=Object.values(he(t));return e.sort(((e,t)=>n.includes(e)&&n.includes(t)?n.indexOf(e)-n.indexOf(t):n.includes(e)?-1:n.includes(t)?1:0))})(X,I[T[2]]),getOptionLabel:e=>e.label,groupBy:e=>e.crop,disableCloseOnSelect:!0,onChange:(e,t)=>{ue(0,t,T[4])},renderOption:(e,t,{selected:n})=>r.createElement("li",h({},e,{style:{padding:"2px"}}),r.createElement(u.c,{icon:x,checkedIcon:S,style:{marginRight:8},checked:n}),t.label),renderInput:e=>r.createElement(s.c,h({},e,{variant:"outlined",label:"Selected Sites",error:(null==q?void 0:q[T[4]])||!1})),renderGroup:e=>r.createElement("li",{key:e.key},r.createElement(v.o,null,e.group),r.createElement(v.g,null,e.children))})),r.createElement(i.cp,{item:!0,xs:12},r.createElement(i.cp,{container:!0,spacing:2},r.createElement(O,je)))),r.createElement(i.cp,{item:!0,xs:12,style:{marginBottom:24}},r.createElement(i.cp,{container:!0,justifyContent:"center",spacing:2},Object.keys(I[T[4]]).map((e=>{var t;return r.createElement(r.Fragment,{key:e},r.createElement(i.cp,{item:!0,xs:3},r.createElement(s.c,{variant:"outlined",fullWidth:!0,size:"small",value:I[T[4]][e].label,label:"Site "+(Number(e)+1),InputLabelProps:{shrink:!0},InputProps:{readOnly:!0}})),r.createElement(i.cp,{item:!0,xs:3},r.createElement(c.c,{value:I[T[12]][e]?I[T[12]][e].label:null,options:G[e]||[],onChange:(t,n)=>{ue(0,n,T[12],e)},renderInput:t=>{var n;return r.createElement(s.c,h({},t,{required:!0,variant:"outlined",size:"small",label:"Growth Stage "+(Number(e)+1),error:(null==q||null===(n=q[T[12]])||void 0===n?void 0:n[e])||!1}))}})),r.createElement(i.cp,{item:!0,xs:2},I[T[9]][e]||I[T[10]][e]?r.createElement(s.c,{variant:"outlined",fullWidth:!0,size:"small",value:isNaN(parseFloat(I[T[6]][e]))?"":parseFloat(I[T[6]][e]),label:"Applied Area "+(Number(e)+1),type:"number",inputProps:{step:.01},InputLabelProps:{shrink:!0},InputProps:{endAdornment:r.createElement(o.c,{position:"end"},I[T[4]][e].unit)},onChange:t=>{ue(0,t.target.value,T[6],e)},error:(null==q||null===(t=q[T[6]])||void 0===t?void 0:t[e])||!1}):r.createElement(s.c,{variant:"outlined",fullWidth:!0,size:"small",value:I[T[6]][e],label:"Applied Area "+(Number(e)+1),InputLabelProps:{shrink:!0},InputProps:{readOnly:!0,endAdornment:r.createElement(o.c,{position:"end"},I[T[4]][e].unit)}})),r.createElement(i.cp,{item:!0,xs:2,container:!0,justifyContent:"center",alignItems:"center"},r.createElement(d.c,{control:r.createElement(u.c,{checked:I[T[9]][e],disabled:!!I[T[10]][e],onChange:(t,n)=>{ue(0,n,T[9],e)}}),label:"Partial Treatment"})),r.createElement(i.cp,{item:!0,xs:2,container:!0,justifyContent:"center",alignItems:"center"},r.createElement(d.c,{control:r.createElement(u.c,{checked:I[T[10]][e],disabled:!!I[T[9]][e],onChange:(t,n)=>{ue(0,n,T[10],e)}}),label:"Alt Row Middle"})))})))))),r.createElement("div",{style:{display:3===ne?"block":"none"}},r.createElement(i.cp,{container:!0,justifyContent:"center",spacing:2},r.createElement(i.cp,{item:!0,xs:12,sx:{textAlign:"center"}},r.createElement("h1",null,"Create Spray Card Process")),r.createElement(i.cp,{item:!0,xs:6},r.createElement(c.c,{value:L,options:null!=E&&E.assigneeOptions?(Pe=E.assigneeOptions,[...Pe].sort(((e,t)=>{if(e.type<t.type)return-1;if(e.type>t.type)return 1;if(e.type===t.type){if(e.label<t.label)return-1;if(e.label>t.label)return 1}return 0}))):[],getOptionLabel:e=>e.label,groupBy:e=>e.type,disableClearable:!0,onChange:(e,t)=>{W(t)},renderInput:e=>r.createElement(s.c,h({},e,{variant:"outlined",label:"Responsible Person",error:(null==q?void 0:q[T[11]])||!1})),renderGroup:e=>r.createElement("li",{key:e.key},r.createElement(v.o,null,e.group),r.createElement(v.g,null,e.children))}))))),r.createElement(C,ke))))),r.createElement(b.default,we),r.createElement(b.default,_e));var Pe}},444:(e,t,n)=>{n.d(t,{g:()=>i,o:()=>a});var r=n(6060),l=n(3036);const a=(0,r.c)("div")((({theme:e})=>({position:"sticky",top:"-8px",padding:"4px 10px",color:l.c[200]}))),i=(0,r.c)("ul")({padding:0})}}]);