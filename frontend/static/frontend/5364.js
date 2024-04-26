"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5364],{8576:(e,t,n)=>{n.d(t,{K:()=>o});var c=n(1504);const o=n.n(c)().createContext({notificationFetch:!1,toggleNotificationFetch:()=>{}})},7600:(e,t,n)=>{n.r(t),n.d(t,{default:()=>l});var c=n(1504),o=n(6988),r=n(6350),a=n(4408);function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var c in n)Object.prototype.hasOwnProperty.call(n,c)&&(e[c]=n[c])}return e},s.apply(this,arguments)}const i=c.forwardRef((function(e,t){return c.createElement(a.c,s({elevation:6,ref:t,variant:"filled"},e))}));function l(e){const t=(t,n)=>{"clickaway"!==n&&e.setOpen(!1)};return c.createElement(o.c,{spacing:2,sx:{width:"100%"}},c.createElement(r.c,{open:e.open,autoHideDuration:6e3,onClose:t},(()=>{switch(e.tag){case"success":return c.createElement(i,{onClose:t,severity:"success",sx:{width:"100%"}},e.msg);case"error":return c.createElement(i,{onClose:t,severity:"error",sx:{width:"100%"}},e.msg);case"warning":return c.createElement(i,{onClose:t,severity:"warning",sx:{width:"100%"}},e.msg);default:return null}})()))}},5364:(e,t,n)=>{n.r(t),n.d(t,{default:()=>f});var c=n(2528),o=n(5984),r=n(7516),a=n(4477),s=n(3964),i=n(1940),l=n(1504),u=n(7600),d=n(3284),m=n(8576);function f(e){const{notificationFetch:t,toggleNotificationFetch:n}=(0,l.useContext)(m.K),[f,p]=(0,l.useState)(null),[g,h]=(0,l.useState)(!0),[y,x]=(0,l.useState)(!1),[E,w]=(0,l.useState)(!1),[C,k]=(0,l.useState)(!1),v=(0,d.IT)(),j=new URLSearchParams(v.search),b=j.get("mid"),O=j.get("cpid");(0,l.useEffect)((()=>{!async function(e){await fetch("/workflow/connection/requester/get/?cpid="+e,{method:"GET",headers:{"Content-Type":"application/json"}}).then((e=>{e.ok&&e.json().then((e=>{p(e.data)}))}))}(O)}),[]);const S={open:y,setOpen:x,msg:"Congratulation! You just built a new connection!",tag:"success"},T={open:E,setOpen:w,msg:"The connection has already existed!",tag:"error"},F={open:C,setOpen:k,msg:"You've declined the connection request!",tag:"warning"};return l.createElement(l.Fragment,null,l.createElement(o.c,{open:g,sx:{display:"flex",justifyContent:"center",alignItems:"center"}},l.createElement(r.c,{sx:{width:600}},l.createElement(a.c,null,l.createElement(s.cp,{container:!0,justifyContent:"center",spacing:2},l.createElement(s.cp,{item:!0,xs:12,sx:{textAlign:"center"}},l.createElement("h1",null,"Connect Request")),l.createElement(s.cp,{item:!0,xs:12,sx:{textAlign:"center",fontSize:"22px"}},l.createElement("strong",null,"Username: "),(null==f?void 0:f.username)||""),l.createElement(s.cp,{item:!0,xs:12,sx:{textAlign:"center",fontSize:"22px"}},l.createElement("strong",null,"Role: "),f?`${f.type} of ${f.business_name}`:""),l.createElement(s.cp,{item:!0,xs:4,sx:{justifyContent:"center",textAlign:"center"}},l.createElement(i.c,{variant:"contained",onClick:()=>{h(!1),n()}},"Later")),l.createElement(s.cp,{item:!0,xs:4,sx:{justifyContent:"center",textAlign:"center"}},l.createElement(i.c,{variant:"contained",color:"secondary",disabled:!f,onClick:()=>async function(e,t,o,r){const a={provider_id:e,requester_id:t,cpid:o,mid:r};console.log(a);const s={method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":(0,c.U$)("csrftoken")},body:JSON.stringify(a)};try{const e=await fetch("/workflow/connection/reject/",s),t=await e.json();e.ok?k(!0):t[Object.keys(t)[0]][0].includes("already exists")&&w(!0),h(!1),n()}catch(e){console.error("Failed to fetch",e)}}(e.employerID,f.uid,O,b)},"Decline")),l.createElement(s.cp,{item:!0,xs:4,sx:{justifyContent:"center",textAlign:"center"}},l.createElement(i.c,{variant:"contained",color:"success",disabled:!f,onClick:()=>async function(e,t,o,r){const a={provider_id:e,requester_id:t,cpid:o,mid:r};console.log(a);const s={method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":(0,c.U$)("csrftoken")},body:JSON.stringify(a)};try{const e=await fetch("/workflow/connection/approve/",s),t=await e.json();e.ok?x(!0):t[Object.keys(t)[0]][0].includes("already exists")&&w(!0),h(!1),n()}catch(e){console.error("Failed to fetch",e)}}(e.employerID,f.uid,O,b)},"Accept")))))),l.createElement(u.default,S),l.createElement(u.default,T),l.createElement(u.default,F))}}}]);