"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[248],{8136:(e,t,n)=>{n.d(t,{c:()=>m});var o=n(1504),r=n(3268),a=n.n(r),i=n(1600),l=n(723),c=n(4528),s=n(4304),d=n(2720),u=n(7624);function p(e){return e.substring(2).toLowerCase()}function f(e){const{children:t,disableReactTree:n=!1,mouseEvent:r="onClick",onClickAway:a,touchEvent:s="onTouchEnd"}=e,d=o.useRef(!1),f=o.useRef(null),m=o.useRef(!1),v=o.useRef(!1);o.useEffect((()=>(setTimeout((()=>{m.current=!0}),0),()=>{m.current=!1})),[]);const h=(0,i.c)(t.ref,f),g=(0,l.c)((e=>{const t=v.current;v.current=!1;const o=(0,c.c)(f.current);if(!m.current||!f.current||"clientX"in e&&function(e,t){return t.documentElement.clientWidth<e.clientX||t.documentElement.clientHeight<e.clientY}(e,o))return;if(d.current)return void(d.current=!1);let r;r=e.composedPath?e.composedPath().indexOf(f.current)>-1:!o.documentElement.contains(e.target)||f.current.contains(e.target),r||!n&&t||a(e)})),y=e=>n=>{v.current=!0;const o=t.props[e];o&&o(n)},b={ref:h};return!1!==s&&(b[s]=y(s)),o.useEffect((()=>{if(!1!==s){const e=p(s),t=(0,c.c)(f.current),n=()=>{d.current=!0};return t.addEventListener(e,g),t.addEventListener("touchmove",n),()=>{t.removeEventListener(e,g),t.removeEventListener("touchmove",n)}}}),[g,s]),!1!==r&&(b[r]=y(r)),o.useEffect((()=>{if(!1!==r){const e=p(r),t=(0,c.c)(f.current);return t.addEventListener(e,g),()=>{t.removeEventListener(e,g)}}}),[g,r]),(0,u.jsx)(o.Fragment,{children:o.cloneElement(t,b)})}f.propTypes={children:s.c.isRequired,disableReactTree:a().bool,mouseEvent:a().oneOf(["onClick","onMouseDown","onMouseUp","onPointerDown","onPointerUp",!1]),onClickAway:a().func.isRequired,touchEvent:a().oneOf(["onTouchEnd","onTouchStart",!1])},f.propTypes=(0,d.c)(f.propTypes);const m=f},9180:(e,t,n)=>{n.d(t,{c:()=>a});var o=n(5072),r=n(7400);function a(e,t,n){return void 0===e||(0,r.c)(e)?t:(0,o.c)({},t,{ownerState:(0,o.c)({},t.ownerState,n)})}},8316:(e,t,n)=>{function o(e,t=[]){if(void 0===e)return{};const n={};return Object.keys(e).filter((n=>n.match(/^on[A-Z]/)&&"function"==typeof e[n]&&!t.includes(n))).forEach((t=>{n[t]=e[t]})),n}n.d(t,{c:()=>o})},7400:(e,t,n)=>{function o(e){return"string"==typeof e}n.d(t,{c:()=>o})},692:(e,t,n)=>{function o(e,t){return"function"==typeof e?e(t):e}n.d(t,{c:()=>o})},1916:(e,t,n)=>{n.d(t,{c:()=>p});var o=n(5072),r=n(5656),a=n(1600),i=n(9180),l=n(4971),c=n(8316);function s(e){if(void 0===e)return{};const t={};return Object.keys(e).filter((t=>!(t.match(/^on[A-Z]/)&&"function"==typeof e[t]))).forEach((n=>{t[n]=e[n]})),t}var d=n(692);const u=["elementType","externalSlotProps","ownerState"];function p(e){var t;const{elementType:n,externalSlotProps:p,ownerState:f}=e,m=(0,r.c)(e,u),v=(0,d.c)(p,f),{props:h,internalRef:g}=function(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:a,className:i}=e;if(!t){const e=(0,l.c)(null==a?void 0:a.className,null==r?void 0:r.className,i,null==n?void 0:n.className),t=(0,o.c)({},null==n?void 0:n.style,null==a?void 0:a.style,null==r?void 0:r.style),c=(0,o.c)({},n,a,r);return e.length>0&&(c.className=e),Object.keys(t).length>0&&(c.style=t),{props:c,internalRef:void 0}}const d=(0,c.c)((0,o.c)({},a,r)),u=s(r),p=s(a),f=t(d),m=(0,l.c)(null==f?void 0:f.className,null==n?void 0:n.className,i,null==a?void 0:a.className,null==r?void 0:r.className),v=(0,o.c)({},null==f?void 0:f.style,null==n?void 0:n.style,null==a?void 0:a.style,null==r?void 0:r.style),h=(0,o.c)({},f,n,p,u);return m.length>0&&(h.className=m),Object.keys(v).length>0&&(h.style=v),{props:h,internalRef:f.ref}}((0,o.c)({},m,{externalSlotProps:v})),y=(0,a.c)(g,null==v?void 0:v.ref,null==(t=e.additionalProps)?void 0:t.ref);return(0,i.c)(n,(0,o.c)({},h,{ref:y}),f)}},5104:(e,t,n)=>{n.d(t,{c:()=>b});var o=n(5072),r=n(5656),a=n(1504),i=n(3268),l=n.n(i),c=n(4304),s=n(4220),d=n(2592),u=n(7840),p=n(9584),f=n(7624);const m=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function v(e){return`scale(${e}, ${e**2})`}const h={entering:{opacity:1,transform:v(1)},entered:{opacity:1,transform:"none"}},g="undefined"!=typeof navigator&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),y=a.forwardRef((function(e,t){const{addEndListener:n,appear:i=!0,children:l,easing:c,in:y,onEnter:b,onEntered:E,onEntering:w,onExit:x,onExited:R,onExiting:T,style:N,timeout:S="auto",TransitionComponent:C=s.cp}=e,O=(0,r.c)(e,m),k=a.useRef(),$=a.useRef(),j=(0,d.c)(),M=a.useRef(null),P=(0,p.c)(M,l.ref,t),_=e=>t=>{if(e){const n=M.current;void 0===t?e(n):e(n,t)}},z=_(w),B=_(((e,t)=>{(0,u.E)(e);const{duration:n,delay:o,easing:r}=(0,u.M)({style:N,timeout:S,easing:c},{mode:"enter"});let a;"auto"===S?(a=j.transitions.getAutoHeightDuration(e.clientHeight),$.current=a):a=n,e.style.transition=[j.transitions.create("opacity",{duration:a,delay:o}),j.transitions.create("transform",{duration:g?a:.666*a,delay:o,easing:r})].join(","),b&&b(e,t)})),I=_(E),W=_(T),L=_((e=>{const{duration:t,delay:n,easing:o}=(0,u.M)({style:N,timeout:S,easing:c},{mode:"exit"});let r;"auto"===S?(r=j.transitions.getAutoHeightDuration(e.clientHeight),$.current=r):r=t,e.style.transition=[j.transitions.create("opacity",{duration:r,delay:n}),j.transitions.create("transform",{duration:g?r:.666*r,delay:g?n:n||.333*r,easing:o})].join(","),e.style.opacity=0,e.style.transform=v(.75),x&&x(e)})),q=_(R);return a.useEffect((()=>()=>{clearTimeout(k.current)}),[]),(0,f.jsx)(C,(0,o.c)({appear:i,in:y,nodeRef:M,onEnter:B,onEntered:I,onEntering:z,onExit:L,onExited:q,onExiting:W,addEndListener:e=>{"auto"===S&&(k.current=setTimeout(e,$.current||0)),n&&n(M.current,e)},timeout:"auto"===S?null:S},O,{children:(e,t)=>a.cloneElement(l,(0,o.c)({style:(0,o.c)({opacity:0,transform:v(.75),visibility:"exited"!==e||y?void 0:"hidden"},h[e],N,l.props.style),ref:P},t))}))}));y.propTypes={addEndListener:l().func,appear:l().bool,children:c.c.isRequired,easing:l().oneOfType([l().shape({enter:l().string,exit:l().string}),l().string]),in:l().bool,onEnter:l().func,onEntered:l().func,onEntering:l().func,onExit:l().func,onExited:l().func,onExiting:l().func,style:l().object,timeout:l().oneOfType([l().oneOf(["auto"]),l().number,l().shape({appear:l().number,enter:l().number,exit:l().number})])},y.muiSupportAuto=!0;const b=y},3562:(e,t,n)=>{n.d(t,{c:()=>T});var o=n(5656),r=n(5072),a=n(1504),i=n(3268),l=n.n(i),c=n(4971),s=n(4048),d=n(5664),u=n(7728),p=n(6940),f=n(440),m=n(9832),v=n(3068),h=n(7100),g=n(1272);function y(e){return(0,g.c)("MuiIconButton",e)}const b=(0,h.c)("MuiIconButton",["root","disabled","colorInherit","colorPrimary","colorSecondary","colorError","colorInfo","colorSuccess","colorWarning","edgeStart","edgeEnd","sizeSmall","sizeMedium","sizeLarge"]);var E=n(7624);const w=["edge","children","className","color","disabled","disableFocusRipple","size"],x=(0,p.cp)(m.c,{name:"MuiIconButton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,"default"!==n.color&&t[`color${(0,v.c)(n.color)}`],n.edge&&t[`edge${(0,v.c)(n.edge)}`],t[`size${(0,v.c)(n.size)}`]]}})((({theme:e,ownerState:t})=>(0,r.c)({textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:8,borderRadius:"50%",overflow:"visible",color:(e.vars||e).palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest})},!t.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,u.W4)(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"start"===t.edge&&{marginLeft:"small"===t.size?-3:-12},"end"===t.edge&&{marginRight:"small"===t.size?-3:-12})),(({theme:e,ownerState:t})=>{var n;const o=null==(n=(e.vars||e).palette)?void 0:n[t.color];return(0,r.c)({},"inherit"===t.color&&{color:"inherit"},"inherit"!==t.color&&"default"!==t.color&&(0,r.c)({color:null==o?void 0:o.main},!t.disableRipple&&{"&:hover":(0,r.c)({},o&&{backgroundColor:e.vars?`rgba(${o.mainChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,u.W4)(o.main,e.palette.action.hoverOpacity)},{"@media (hover: none)":{backgroundColor:"transparent"}})}),"small"===t.size&&{padding:5,fontSize:e.typography.pxToRem(18)},"large"===t.size&&{padding:12,fontSize:e.typography.pxToRem(28)},{[`&.${b.disabled}`]:{backgroundColor:"transparent",color:(e.vars||e).palette.action.disabled}})})),R=a.forwardRef((function(e,t){const n=(0,f.c)({props:e,name:"MuiIconButton"}),{edge:a=!1,children:i,className:l,color:s="default",disabled:u=!1,disableFocusRipple:p=!1,size:m="medium"}=n,h=(0,o.c)(n,w),g=(0,r.c)({},n,{edge:a,color:s,disabled:u,disableFocusRipple:p,size:m}),b=(e=>{const{classes:t,disabled:n,color:o,edge:r,size:a}=e,i={root:["root",n&&"disabled","default"!==o&&`color${(0,v.c)(o)}`,r&&`edge${(0,v.c)(r)}`,`size${(0,v.c)(a)}`]};return(0,d.c)(i,y,t)})(g);return(0,E.jsx)(x,(0,r.c)({className:(0,c.c)(b.root,l),centerRipple:!0,focusRipple:!p,disabled:u,ref:t,ownerState:g},h,{children:i}))}));R.propTypes={children:(0,s.c)(l().node,(e=>a.Children.toArray(e.children).some((e=>a.isValidElement(e)&&e.props.onClick))?new Error(["MUI: You are providing an onClick event listener to a child of a button element.","Prefer applying it to the IconButton directly.","This guarantees that the whole <button> will be responsive to click events."].join("\n")):null)),classes:l().object,className:l().string,color:l().oneOfType([l().oneOf(["inherit","default","primary","secondary","error","info","success","warning"]),l().string]),disabled:l().bool,disableFocusRipple:l().bool,disableRipple:l().bool,edge:l().oneOf(["end","start",!1]),size:l().oneOfType([l().oneOf(["small","medium","large"]),l().string]),sx:l().oneOfType([l().arrayOf(l().oneOfType([l().func,l().object,l().bool])),l().func,l().object])};const T=R},6968:(e,t,n)=>{n.d(t,{c:()=>T});var o=n(5656),r=n(5072),a=n(1504),i=n(3268),l=n.n(i),c=n(4971),s=n(4048),d=n(2752),u=n(5664),p=n(7728),f=n(6940);const m=e=>{let t;return t=e<1?5.11916*e**2:4.5*Math.log(e+1)+2,(t/100).toFixed(2)};var v=n(440),h=n(2592),g=n(7100),y=n(1272);function b(e){return(0,y.c)("MuiPaper",e)}(0,g.c)("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);var E=n(7624);const w=["className","component","elevation","square","variant"],x=(0,f.cp)("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,"elevation"===n.variant&&t[`elevation${n.elevation}`]]}})((({theme:e,ownerState:t})=>{var n;return(0,r.c)({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},"outlined"===t.variant&&{border:`1px solid ${(e.vars||e).palette.divider}`},"elevation"===t.variant&&(0,r.c)({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&"dark"===e.palette.mode&&{backgroundImage:`linear-gradient(${(0,p.W4)("#fff",m(t.elevation))}, ${(0,p.W4)("#fff",m(t.elevation))})`},e.vars&&{backgroundImage:null==(n=e.vars.overlays)?void 0:n[t.elevation]}))})),R=a.forwardRef((function(e,t){const n=(0,v.c)({props:e,name:"MuiPaper"}),{className:a,component:i="div",elevation:l=1,square:s=!1,variant:d="elevation"}=n,p=(0,o.c)(n,w),f=(0,r.c)({},n,{component:i,elevation:l,square:s,variant:d}),m=(e=>{const{square:t,elevation:n,variant:o,classes:r}=e,a={root:["root",o,!t&&"rounded","elevation"===o&&`elevation${n}`]};return(0,u.c)(a,b,r)})(f);return void 0===(0,h.c)().shadows[l]&&console.error([`MUI: The elevation provided <Paper elevation={${l}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${l}]\` is defined.`].join("\n")),(0,E.jsx)(x,(0,r.c)({as:i,ownerState:f,className:(0,c.c)(m.root,a),ref:t},p))}));R.propTypes={children:l().node,classes:l().object,className:l().string,component:l().elementType,elevation:(0,s.c)(d.c,(e=>{const{elevation:t,variant:n}=e;return t>0&&"outlined"===n?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null})),square:l().bool,sx:l().oneOfType([l().arrayOf(l().oneOfType([l().func,l().object,l().bool])),l().func,l().object]),variant:l().oneOfType([l().oneOf(["elevation","outlined"]),l().string])};const T=R},8857:(e,t,n)=>{n.d(t,{c:()=>R});var o=n(5656),r=n(5072),a=n(1504),i=n(3268),l=n.n(i),c=n(4971),s=n(4088),d=n(5664),u=n(6940),p=n(440),f=n(3068),m=n(7100),v=n(1272);function h(e){return(0,v.c)("MuiTypography",e)}(0,m.c)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);var g=n(7624);const y=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],b=(0,u.cp)("span",{name:"MuiTypography",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.variant&&t[n.variant],"inherit"!==n.align&&t[`align${(0,f.c)(n.align)}`],n.noWrap&&t.noWrap,n.gutterBottom&&t.gutterBottom,n.paragraph&&t.paragraph]}})((({theme:e,ownerState:t})=>(0,r.c)({margin:0},t.variant&&e.typography[t.variant],"inherit"!==t.align&&{textAlign:t.align},t.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},t.gutterBottom&&{marginBottom:"0.35em"},t.paragraph&&{marginBottom:16}))),E={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},w={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},x=a.forwardRef((function(e,t){const n=(0,p.c)({props:e,name:"MuiTypography"}),a=(e=>w[e]||e)(n.color),i=(0,s.c)((0,r.c)({},n,{color:a})),{align:l="inherit",className:u,component:m,gutterBottom:v=!1,noWrap:x=!1,paragraph:R=!1,variant:T="body1",variantMapping:N=E}=i,S=(0,o.c)(i,y),C=(0,r.c)({},i,{align:l,color:a,className:u,component:m,gutterBottom:v,noWrap:x,paragraph:R,variant:T,variantMapping:N}),O=m||(R?"p":N[T]||E[T])||"span",k=(e=>{const{align:t,gutterBottom:n,noWrap:o,paragraph:r,variant:a,classes:i}=e,l={root:["root",a,"inherit"!==e.align&&`align${(0,f.c)(t)}`,n&&"gutterBottom",o&&"noWrap",r&&"paragraph"]};return(0,d.c)(l,h,i)})(C);return(0,g.jsx)(b,(0,r.c)({as:O,ref:t,ownerState:C,className:(0,c.c)(k.root,u)},S))}));x.propTypes={align:l().oneOf(["center","inherit","justify","left","right"]),children:l().node,classes:l().object,className:l().string,component:l().elementType,gutterBottom:l().bool,noWrap:l().bool,paragraph:l().bool,sx:l().oneOfType([l().arrayOf(l().oneOfType([l().func,l().object,l().bool])),l().func,l().object]),variant:l().oneOfType([l().oneOf(["body1","body2","button","caption","h1","h2","h3","h4","h5","h6","inherit","overline","subtitle1","subtitle2"]),l().string]),variantMapping:l().object};const R=x},2696:(e,t,n)=>{n.d(t,{c:()=>a}),n(1504);var o=n(5944),r=n(7624);const a=(0,o.c)((0,r.jsx)("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close")},4304:(e,t,n)=>{n.d(t,{c:()=>c});var o=n(3268),r=n.n(o),a=n(4048);function i(e,t,n,o,r){const a=e[t],i=r||t;if(null==a||"undefined"==typeof window)return null;let l;const c=a.type;return"function"!=typeof c||function(e){const{prototype:t={}}=e;return Boolean(t.isReactComponent)}(c)||(l="Did you accidentally use a plain function component for an element instead?"),void 0!==l?new Error(`Invalid ${o} \`${i}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const l=(0,a.c)(r().element,i);l.isRequired=(0,a.c)(r().element.isRequired,i);const c=l},2720:(e,t,n)=>{n.d(t,{c:()=>r});const o="exact-prop: ​";function r(e){return{...e,[o]:t=>{const n=Object.keys(t).filter((t=>!e.hasOwnProperty(t)));return n.length>0?new Error(`The following props are not supported: ${n.map((e=>`\`${e}\``)).join(", ")}. Please remove them.`):null}}}},2752:(e,t,n)=>{n.d(t,{c:()=>l});const o=Number.isInteger||function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e};function r(e,t,n,r){const a=e[t];if(null==a||!o(a)){const e=function(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return null===e?"null":e.constructor.name;default:return t}}(a);return new RangeError(`Invalid ${r} \`${t}\` of type \`${e}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function a(e,t,...n){return void 0===e[t]?null:r(e,t,...n)}function i(){return null}a.isRequired=r,i.isRequired=i;const l=a},9870:(e,t,n)=>{n.r(t),n.d(t,{default:()=>b});var o=n(1504),r=n(6968),a=n(3083),i=n(8604),l=n(8388),c=n(4024),s=n(5466),d=n(1940),u=n(6060),p=n(3628),f=n(7668),m=n(6931),v=n(9440);(0,u.c)(d.c)((()=>({margin:"15px 15px",backgroundColor:p.c[500],"&:hover":{backgroundColor:p.c[700]}}))),(0,u.c)(d.c)((({theme:e})=>({margin:"15px 15px",backgroundColor:m.c[500],"&:hover":{backgroundColor:m.c[700]}})));const h=(0,u.c)(v.o)((()=>({"& .highlight":{backgroundColor:f.c[300],"&:hover":{backgroundColor:f.c[400]}}}))),g=(0,o.lazy)((()=>Promise.all([n.e(5156),n.e(4896),n.e(124)]).then(n.bind(n,124))));function y(){return o.createElement(a.q,null,o.createElement(i.S,null),o.createElement(l.e,null),o.createElement(c.a,null),o.createElement(s.Wc,null))}function b({employerID:e,privilege:t,refreshRecord:n,setRefreshRecord:a}){const[i,l]=(0,o.useState)([]),[c,s]=(0,o.useState)(null),[u,p]=(0,o.useState)([]),[f,m]=(0,o.useState)(!1),[v,b]=(0,o.useState)(!1);async function E(e){t.employee_r&&await fetch("/user_manage/employee/list/get/?employer_id="+e,{method:"GET",headers:{"Content-Type":"application/json"}}).then((e=>{e.ok&&e.json().then((e=>{const t=e.data;l(t);const n=t.map((e=>w(e)));p(n)}))}))}const w=e=>{for(let t in e)null===e[t]&&(e[t]="");return{id:e.uid,user:e.user,name:`${e.first_name} ${e.last_name}`,type:e.type,email:e.email,cell_phone:e.cell_phone,pesticide_applicator_no:e.pesticide_applicator_no,pesticide_expire_date:e.pesticide_expire_date,added_by:e.added_by}},x=[{field:"user",headerName:"Employee User",width:150,renderCell:e=>o.createElement(d.c,{variant:"text",onClick:()=>{return t=i.find((t=>t.uid===e.row.id)),s(t),void b(!0);var t}},e.row.user)},{field:"name",headerName:"Name",width:200},{field:"type",headerName:"Type",width:150},{field:"email",headerName:"Email",width:250},{field:"cell_phone",headerName:"Cell Phone",width:150},{field:"pesticide_applicator_no",headerName:"Pesticide Certification I.D.",width:300},{field:"pesticide_expire_date",headerName:"Pesticide Certification Expire Date",width:300},{field:"added_by",headerName:"Added By",width:250}];(0,o.useEffect)((()=>{(async()=>{await Promise.all([E(e)])})(),m(!0)}),[]),(0,o.useEffect)((()=>{f&&E(e)}),[n]);const R={privilege:t,employerID:e,refreshRecord:n,setRefreshRecord:a,settingFormOpen:v,setSettingFormOpen:b,selectedEmployee:c};return o.createElement("div",null,o.createElement(r.c,{style:{height:900}},o.createElement(h,{columns:x,rows:u,disableRowSelectionOnClick:!0,disableClickEdit:!0,rowSelection:!1,getRowClassName:e=>e.id===(null==c?void 0:c.uid)?"highlight":null,slots:{toolbar:y},localeText:{noRowsLabel:t.employee_r?"No rows":"You don't have the privilege to access this data"}})),o.createElement(g,R))}}}]);