"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3964],{3964:(e,n,r)=>{r.d(n,{cp:()=>M});var t=r(5656),o=r(5072),i=r(1504),a=r(3268),s=r.n(a),c=r(4971),p=r(4968),u=r(4088),l=r(5664),m=r(2940),f=r(6940),d=r(440),b=r(2592);const g=i.createContext();g.displayName="GridContext";const w=g;var h=r(7100),x=r(1272);function y(e){return(0,x.c)("MuiGrid",e)}const O=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12],$=(0,h.c)("MuiGrid",["root","container","item","zeroMinWidth",...[0,1,2,3,4,5,6,7,8,9,10].map((e=>`spacing-xs-${e}`)),...["column-reverse","column","row-reverse","row"].map((e=>`direction-xs-${e}`)),...["nowrap","wrap-reverse","wrap"].map((e=>`wrap-xs-${e}`)),...O.map((e=>`grid-xs-${e}`)),...O.map((e=>`grid-sm-${e}`)),...O.map((e=>`grid-md-${e}`)),...O.map((e=>`grid-lg-${e}`)),...O.map((e=>`grid-xl-${e}`))]);var v=r(7624);const S=["className","columns","columnSpacing","component","container","direction","item","rowSpacing","spacing","wrap","zeroMinWidth"];function k(e){const n=parseFloat(e);return`${n}${String(e).replace(String(n),"")||"px"}`}function T({breakpoints:e,values:n}){let r="";Object.keys(n).forEach((e=>{""===r&&0!==n[e]&&(r=e)}));const t=Object.keys(e).sort(((n,r)=>e[n]-e[r]));return t.slice(0,t.indexOf(r))}const W=(0,f.cp)("div",{name:"MuiGrid",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:r}=e,{container:t,direction:o,item:i,spacing:a,wrap:s,zeroMinWidth:c,breakpoints:p}=r;let u=[];t&&(u=function(e,n,r={}){if(!e||e<=0)return[];if("string"==typeof e&&!Number.isNaN(Number(e))||"number"==typeof e)return[r[`spacing-xs-${String(e)}`]];const t=[];return n.forEach((n=>{const o=e[n];Number(o)>0&&t.push(r[`spacing-${n}-${String(o)}`])})),t}(a,p,n));const l=[];return p.forEach((e=>{const t=r[e];t&&l.push(n[`grid-${e}-${String(t)}`])})),[n.root,t&&n.container,i&&n.item,c&&n.zeroMinWidth,...u,"row"!==o&&n[`direction-xs-${String(o)}`],"wrap"!==s&&n[`wrap-xs-${String(s)}`],...l]}})((({ownerState:e})=>(0,o.c)({boxSizing:"border-box"},e.container&&{display:"flex",flexWrap:"wrap",width:"100%"},e.item&&{margin:0},e.zeroMinWidth&&{minWidth:0},"wrap"!==e.wrap&&{flexWrap:e.wrap})),(function({theme:e,ownerState:n}){const r=(0,p.Ws)({values:n.direction,breakpoints:e.breakpoints.values});return(0,p.ls)({theme:e},r,(e=>{const n={flexDirection:e};return 0===e.indexOf("column")&&(n[`& > .${$.item}`]={maxWidth:"none"}),n}))}),(function({theme:e,ownerState:n}){const{container:r,rowSpacing:t}=n;let o={};if(r&&0!==t){const n=(0,p.Ws)({values:t,breakpoints:e.breakpoints.values});let r;"object"==typeof n&&(r=T({breakpoints:e.breakpoints.values,values:n})),o=(0,p.ls)({theme:e},n,((n,t)=>{var o;const i=e.spacing(n);return"0px"!==i?{marginTop:`-${k(i)}`,[`& > .${$.item}`]:{paddingTop:k(i)}}:null!=(o=r)&&o.includes(t)?{}:{marginTop:0,[`& > .${$.item}`]:{paddingTop:0}}}))}return o}),(function({theme:e,ownerState:n}){const{container:r,columnSpacing:t}=n;let o={};if(r&&0!==t){const n=(0,p.Ws)({values:t,breakpoints:e.breakpoints.values});let r;"object"==typeof n&&(r=T({breakpoints:e.breakpoints.values,values:n})),o=(0,p.ls)({theme:e},n,((n,t)=>{var o;const i=e.spacing(n);return"0px"!==i?{width:`calc(100% + ${k(i)})`,marginLeft:`-${k(i)}`,[`& > .${$.item}`]:{paddingLeft:k(i)}}:null!=(o=r)&&o.includes(t)?{}:{width:"100%",marginLeft:0,[`& > .${$.item}`]:{paddingLeft:0}}}))}return o}),(function({theme:e,ownerState:n}){let r;return e.breakpoints.keys.reduce(((t,i)=>{let a={};if(n[i]&&(r=n[i]),!r)return t;if(!0===r)a={flexBasis:0,flexGrow:1,maxWidth:"100%"};else if("auto"===r)a={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"};else{const s=(0,p.Ws)({values:n.columns,breakpoints:e.breakpoints.values}),c="object"==typeof s?s[i]:s;if(null==c)return t;const u=Math.round(r/c*1e8)/1e6+"%";let l={};if(n.container&&n.item&&0!==n.columnSpacing){const r=e.spacing(n.columnSpacing);if("0px"!==r){const e=`calc(${u} + ${k(r)})`;l={flexBasis:e,maxWidth:e}}}a=(0,o.c)({flexBasis:u,flexGrow:0,maxWidth:u},l)}return 0===e.breakpoints.values[i]?Object.assign(t,a):t[e.breakpoints.up(i)]=a,t}),{})})),j=i.forwardRef((function(e,n){const r=(0,d.c)({props:e,name:"MuiGrid"}),{breakpoints:a}=(0,b.c)(),s=(0,u.c)(r),{className:p,columns:m,columnSpacing:f,component:g="div",container:h=!1,direction:x="row",item:O=!1,rowSpacing:$,spacing:k=0,wrap:T="wrap",zeroMinWidth:j=!1}=s,M=(0,t.c)(s,S),N=$||k,z=f||k,G=i.useContext(w),E=h?m||12:G,C={},B=(0,o.c)({},M);a.keys.forEach((e=>{null!=M[e]&&(C[e]=M[e],delete B[e])}));const L=(0,o.c)({},s,{columns:E,container:h,direction:x,item:O,rowSpacing:N,columnSpacing:z,wrap:T,zeroMinWidth:j,spacing:k},C,{breakpoints:a.keys}),R=(e=>{const{classes:n,container:r,direction:t,item:o,spacing:i,wrap:a,zeroMinWidth:s,breakpoints:c}=e;let p=[];r&&(p=function(e,n){if(!e||e<=0)return[];if("string"==typeof e&&!Number.isNaN(Number(e))||"number"==typeof e)return[`spacing-xs-${String(e)}`];const r=[];return n.forEach((n=>{const t=e[n];if(Number(t)>0){const e=`spacing-${n}-${String(t)}`;r.push(e)}})),r}(i,c));const u=[];c.forEach((n=>{const r=e[n];r&&u.push(`grid-${n}-${String(r)}`)}));const m={root:["root",r&&"container",o&&"item",s&&"zeroMinWidth",...p,"row"!==t&&`direction-xs-${String(t)}`,"wrap"!==a&&`wrap-xs-${String(a)}`,...u]};return(0,l.c)(m,y,n)})(L);return(0,v.jsx)(w.Provider,{value:E,children:(0,v.jsx)(W,(0,o.c)({ownerState:L,className:(0,c.c)(R.root,p),as:g,ref:n},B))})}));j.propTypes={children:s().node,classes:s().object,className:s().string,columns:s().oneOfType([s().arrayOf(s().number),s().number,s().object]),columnSpacing:s().oneOfType([s().arrayOf(s().oneOfType([s().number,s().string])),s().number,s().object,s().string]),component:s().elementType,container:s().bool,direction:s().oneOfType([s().oneOf(["column-reverse","column","row-reverse","row"]),s().arrayOf(s().oneOf(["column-reverse","column","row-reverse","row"])),s().object]),item:s().bool,lg:s().oneOfType([s().oneOf(["auto"]),s().number,s().bool]),md:s().oneOfType([s().oneOf(["auto"]),s().number,s().bool]),rowSpacing:s().oneOfType([s().arrayOf(s().oneOfType([s().number,s().string])),s().number,s().object,s().string]),sm:s().oneOfType([s().oneOf(["auto"]),s().number,s().bool]),spacing:s().oneOfType([s().arrayOf(s().oneOfType([s().number,s().string])),s().number,s().object,s().string]),sx:s().oneOfType([s().arrayOf(s().oneOfType([s().func,s().object,s().bool])),s().func,s().object]),wrap:s().oneOf(["nowrap","wrap-reverse","wrap"]),xl:s().oneOfType([s().oneOf(["auto"]),s().number,s().bool]),xs:s().oneOfType([s().oneOf(["auto"]),s().number,s().bool]),zeroMinWidth:s().bool};{const e=(0,m.c)("Grid",j);j.propTypes=(0,o.c)({},j.propTypes,{direction:e("container"),lg:e("item"),md:e("item"),sm:e("item"),spacing:e("container"),wrap:e("container"),xs:e("item"),zeroMinWidth:e("item")})}const M=j}}]);