"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3448],{7640:(e,t,o)=>{o.d(t,{c:()=>j});var n=o(5656),r=o(5072),a=o(1504),i=o(3268),l=o.n(i),c=o(4971),s=o(5664),p=o(7728),f=o(5944),d=o(7624);const u=(0,f.c)((0,d.jsx)("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel");var m=o(9584),h=o(3160),v=o(3068),b=o(9832),y=o(440),g=o(6940),x=o(7100),O=o(1272);function w(e){return(0,O.c)("MuiChip",e)}const C=(0,x.c)("MuiChip",["root","sizeSmall","sizeMedium","colorError","colorInfo","colorPrimary","colorSecondary","colorSuccess","colorWarning","disabled","clickable","clickableColorPrimary","clickableColorSecondary","deletable","deletableColorPrimary","deletableColorSecondary","outlined","filled","outlinedPrimary","outlinedSecondary","filledPrimary","filledSecondary","avatar","avatarSmall","avatarMedium","avatarColorPrimary","avatarColorSecondary","icon","iconSmall","iconMedium","iconColorPrimary","iconColorSecondary","label","labelSmall","labelMedium","deleteIcon","deleteIconSmall","deleteIconMedium","deleteIconColorPrimary","deleteIconColorSecondary","deleteIconOutlinedColorPrimary","deleteIconOutlinedColorSecondary","deleteIconFilledColorPrimary","deleteIconFilledColorSecondary","focusVisible"]),k=["avatar","className","clickable","color","component","deleteIcon","disabled","icon","label","onClick","onDelete","onKeyDown","onKeyUp","size","variant","tabIndex","skipFocusWhenDisabled"],$=(0,g.cp)("div",{name:"MuiChip",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e,{color:n,iconColor:r,clickable:a,onDelete:i,size:l,variant:c}=o;return[{[`& .${C.avatar}`]:t.avatar},{[`& .${C.avatar}`]:t[`avatar${(0,v.c)(l)}`]},{[`& .${C.avatar}`]:t[`avatarColor${(0,v.c)(n)}`]},{[`& .${C.icon}`]:t.icon},{[`& .${C.icon}`]:t[`icon${(0,v.c)(l)}`]},{[`& .${C.icon}`]:t[`iconColor${(0,v.c)(r)}`]},{[`& .${C.deleteIcon}`]:t.deleteIcon},{[`& .${C.deleteIcon}`]:t[`deleteIcon${(0,v.c)(l)}`]},{[`& .${C.deleteIcon}`]:t[`deleteIconColor${(0,v.c)(n)}`]},{[`& .${C.deleteIcon}`]:t[`deleteIcon${(0,v.c)(c)}Color${(0,v.c)(n)}`]},t.root,t[`size${(0,v.c)(l)}`],t[`color${(0,v.c)(n)}`],a&&t.clickable,a&&"default"!==n&&t[`clickableColor${(0,v.c)(n)})`],i&&t.deletable,i&&"default"!==n&&t[`deletableColor${(0,v.c)(n)}`],t[c],t[`${c}${(0,v.c)(n)}`]]}})((({theme:e,ownerState:t})=>{const o="light"===e.palette.mode?e.palette.grey[700]:e.palette.grey[300];return(0,r.c)({maxWidth:"100%",fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(13),display:"inline-flex",alignItems:"center",justifyContent:"center",height:32,color:(e.vars||e).palette.text.primary,backgroundColor:(e.vars||e).palette.action.selected,borderRadius:16,whiteSpace:"nowrap",transition:e.transitions.create(["background-color","box-shadow"]),cursor:"default",outline:0,textDecoration:"none",border:0,padding:0,verticalAlign:"middle",boxSizing:"border-box",[`&.${C.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity,pointerEvents:"none"},[`& .${C.avatar}`]:{marginLeft:5,marginRight:-6,width:24,height:24,color:e.vars?e.vars.palette.Chip.defaultAvatarColor:o,fontSize:e.typography.pxToRem(12)},[`& .${C.avatarColorPrimary}`]:{color:(e.vars||e).palette.primary.contrastText,backgroundColor:(e.vars||e).palette.primary.dark},[`& .${C.avatarColorSecondary}`]:{color:(e.vars||e).palette.secondary.contrastText,backgroundColor:(e.vars||e).palette.secondary.dark},[`& .${C.avatarSmall}`]:{marginLeft:4,marginRight:-4,width:18,height:18,fontSize:e.typography.pxToRem(10)},[`& .${C.icon}`]:(0,r.c)({marginLeft:5,marginRight:-6},"small"===t.size&&{fontSize:18,marginLeft:4,marginRight:-4},t.iconColor===t.color&&(0,r.c)({color:e.vars?e.vars.palette.Chip.defaultIconColor:o},"default"!==t.color&&{color:"inherit"})),[`& .${C.deleteIcon}`]:(0,r.c)({WebkitTapHighlightColor:"transparent",color:e.vars?`rgba(${e.vars.palette.text.primaryChannel} / 0.26)`:(0,p.W4)(e.palette.text.primary,.26),fontSize:22,cursor:"pointer",margin:"0 5px 0 -6px","&:hover":{color:e.vars?`rgba(${e.vars.palette.text.primaryChannel} / 0.4)`:(0,p.W4)(e.palette.text.primary,.4)}},"small"===t.size&&{fontSize:16,marginRight:4,marginLeft:-4},"default"!==t.color&&{color:e.vars?`rgba(${e.vars.palette[t.color].contrastTextChannel} / 0.7)`:(0,p.W4)(e.palette[t.color].contrastText,.7),"&:hover, &:active":{color:(e.vars||e).palette[t.color].contrastText}})},"small"===t.size&&{height:24},"default"!==t.color&&{backgroundColor:(e.vars||e).palette[t.color].main,color:(e.vars||e).palette[t.color].contrastText},t.onDelete&&{[`&.${C.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:(0,p.W4)(e.palette.action.selected,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},t.onDelete&&"default"!==t.color&&{[`&.${C.focusVisible}`]:{backgroundColor:(e.vars||e).palette[t.color].dark}})}),(({theme:e,ownerState:t})=>(0,r.c)({},t.clickable&&{userSelect:"none",WebkitTapHighlightColor:"transparent",cursor:"pointer","&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:(0,p.W4)(e.palette.action.selected,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity)},[`&.${C.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:(0,p.W4)(e.palette.action.selected,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)},"&:active":{boxShadow:(e.vars||e).shadows[1]}},t.clickable&&"default"!==t.color&&{[`&:hover, &.${C.focusVisible}`]:{backgroundColor:(e.vars||e).palette[t.color].dark}})),(({theme:e,ownerState:t})=>(0,r.c)({},"outlined"===t.variant&&{backgroundColor:"transparent",border:e.vars?`1px solid ${e.vars.palette.Chip.defaultBorder}`:`1px solid ${"light"===e.palette.mode?e.palette.grey[400]:e.palette.grey[700]}`,[`&.${C.clickable}:hover`]:{backgroundColor:(e.vars||e).palette.action.hover},[`&.${C.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`& .${C.avatar}`]:{marginLeft:4},[`& .${C.avatarSmall}`]:{marginLeft:2},[`& .${C.icon}`]:{marginLeft:4},[`& .${C.iconSmall}`]:{marginLeft:2},[`& .${C.deleteIcon}`]:{marginRight:5},[`& .${C.deleteIconSmall}`]:{marginRight:3}},"outlined"===t.variant&&"default"!==t.color&&{color:(e.vars||e).palette[t.color].main,border:`1px solid ${e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / 0.7)`:(0,p.W4)(e.palette[t.color].main,.7)}`,[`&.${C.clickable}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,p.W4)(e.palette[t.color].main,e.palette.action.hoverOpacity)},[`&.${C.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.focusOpacity})`:(0,p.W4)(e.palette[t.color].main,e.palette.action.focusOpacity)},[`& .${C.deleteIcon}`]:{color:e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / 0.7)`:(0,p.W4)(e.palette[t.color].main,.7),"&:hover, &:active":{color:(e.vars||e).palette[t.color].main}}}))),T=(0,g.cp)("span",{name:"MuiChip",slot:"Label",overridesResolver:(e,t)=>{const{ownerState:o}=e,{size:n}=o;return[t.label,t[`label${(0,v.c)(n)}`]]}})((({ownerState:e})=>(0,r.c)({overflow:"hidden",textOverflow:"ellipsis",paddingLeft:12,paddingRight:12,whiteSpace:"nowrap"},"small"===e.size&&{paddingLeft:8,paddingRight:8})));function E(e){return"Backspace"===e.key||"Delete"===e.key}const P=a.forwardRef((function(e,t){const o=(0,y.c)({props:e,name:"MuiChip"}),{avatar:i,className:l,clickable:p,color:f="default",component:h,deleteIcon:g,disabled:x=!1,icon:O,label:C,onClick:P,onDelete:j,onKeyDown:R,onKeyUp:S,size:M="medium",variant:I="filled",tabIndex:D,skipFocusWhenDisabled:W=!1}=o,L=(0,n.c)(o,k),A=a.useRef(null),z=(0,m.c)(A,t),B=e=>{e.stopPropagation(),j&&j(e)},V=!(!1===p||!P)||p,H=V||j?b.c:h||"div",N=(0,r.c)({},o,{component:H,disabled:x,size:M,color:f,iconColor:a.isValidElement(O)&&O.props.color||f,onDelete:!!j,clickable:V,variant:I}),q=(e=>{const{classes:t,disabled:o,size:n,color:r,iconColor:a,onDelete:i,clickable:l,variant:c}=e,p={root:["root",c,o&&"disabled",`size${(0,v.c)(n)}`,`color${(0,v.c)(r)}`,l&&"clickable",l&&`clickableColor${(0,v.c)(r)}`,i&&"deletable",i&&`deletableColor${(0,v.c)(r)}`,`${c}${(0,v.c)(r)}`],label:["label",`label${(0,v.c)(n)}`],avatar:["avatar",`avatar${(0,v.c)(n)}`,`avatarColor${(0,v.c)(r)}`],icon:["icon",`icon${(0,v.c)(n)}`,`iconColor${(0,v.c)(a)}`],deleteIcon:["deleteIcon",`deleteIcon${(0,v.c)(n)}`,`deleteIconColor${(0,v.c)(r)}`,`deleteIcon${(0,v.c)(c)}Color${(0,v.c)(r)}`]};return(0,s.c)(p,w,t)})(N),U=H===b.c?(0,r.c)({component:h||"div",focusVisibleClassName:q.focusVisible},j&&{disableRipple:!0}):{};let F=null;j&&(F=g&&a.isValidElement(g)?a.cloneElement(g,{className:(0,c.c)(g.props.className,q.deleteIcon),onClick:B}):(0,d.jsx)(u,{className:(0,c.c)(q.deleteIcon),onClick:B}));let K=null;i&&a.isValidElement(i)&&(K=a.cloneElement(i,{className:(0,c.c)(q.avatar,i.props.className)}));let _=null;return O&&a.isValidElement(O)&&(_=a.cloneElement(O,{className:(0,c.c)(q.icon,O.props.className)})),K&&_&&console.error("MUI: The Chip component can not handle the avatar and the icon prop at the same time. Pick one."),(0,d.jsxs)($,(0,r.c)({as:H,className:(0,c.c)(q.root,l),disabled:!(!V||!x)||void 0,onClick:P,onKeyDown:e=>{e.currentTarget===e.target&&E(e)&&e.preventDefault(),R&&R(e)},onKeyUp:e=>{e.currentTarget===e.target&&(j&&E(e)?j(e):"Escape"===e.key&&A.current&&A.current.blur()),S&&S(e)},ref:z,tabIndex:W&&x?-1:D,ownerState:N},U,L,{children:[K||_,(0,d.jsx)(T,{className:(0,c.c)(q.label),ownerState:N,children:C}),F]}))}));P.propTypes={avatar:l().element,children:h.c,classes:l().object,className:l().string,clickable:l().bool,color:l().oneOfType([l().oneOf(["default","primary","secondary","error","info","success","warning"]),l().string]),component:l().elementType,deleteIcon:l().element,disabled:l().bool,icon:l().element,label:l().node,onClick:l().func,onDelete:l().func,onKeyDown:l().func,onKeyUp:l().func,size:l().oneOfType([l().oneOf(["medium","small"]),l().string]),skipFocusWhenDisabled:l().bool,sx:l().oneOfType([l().arrayOf(l().oneOfType([l().func,l().object,l().bool])),l().func,l().object]),tabIndex:l().number,variant:l().oneOfType([l().oneOf(["filled","outlined"]),l().string])};const j=P},292:(e,t,o)=>{o.d(t,{c:()=>qe});var n=o(5072),r=o(5656),a=o(1504),i=o(1600),l=o(4260),c=o(4528),s=o(4048),p=o(6463),f=o(8696);function d(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function u(e){return e instanceof d(e).Element||e instanceof Element}function m(e){return e instanceof d(e).HTMLElement||e instanceof HTMLElement}function h(e){return"undefined"!=typeof ShadowRoot&&(e instanceof d(e).ShadowRoot||e instanceof ShadowRoot)}var v=Math.max,b=Math.min,y=Math.round;function g(){var e=navigator.userAgentData;return null!=e&&e.brands&&Array.isArray(e.brands)?e.brands.map((function(e){return e.brand+"/"+e.version})).join(" "):navigator.userAgent}function x(){return!/^((?!chrome|android).)*safari/i.test(g())}function O(e,t,o){void 0===t&&(t=!1),void 0===o&&(o=!1);var n=e.getBoundingClientRect(),r=1,a=1;t&&m(e)&&(r=e.offsetWidth>0&&y(n.width)/e.offsetWidth||1,a=e.offsetHeight>0&&y(n.height)/e.offsetHeight||1);var i=(u(e)?d(e):window).visualViewport,l=!x()&&o,c=(n.left+(l&&i?i.offsetLeft:0))/r,s=(n.top+(l&&i?i.offsetTop:0))/a,p=n.width/r,f=n.height/a;return{width:p,height:f,top:s,right:c+p,bottom:s+f,left:c,x:c,y:s}}function w(e){var t=d(e);return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function C(e){return e?(e.nodeName||"").toLowerCase():null}function k(e){return((u(e)?e.ownerDocument:e.document)||window.document).documentElement}function $(e){return O(k(e)).left+w(e).scrollLeft}function T(e){return d(e).getComputedStyle(e)}function E(e){var t=T(e),o=t.overflow,n=t.overflowX,r=t.overflowY;return/auto|scroll|overlay|hidden/.test(o+r+n)}function P(e,t,o){void 0===o&&(o=!1);var n,r,a=m(t),i=m(t)&&function(e){var t=e.getBoundingClientRect(),o=y(t.width)/e.offsetWidth||1,n=y(t.height)/e.offsetHeight||1;return 1!==o||1!==n}(t),l=k(t),c=O(e,i,o),s={scrollLeft:0,scrollTop:0},p={x:0,y:0};return(a||!a&&!o)&&(("body"!==C(t)||E(l))&&(s=(n=t)!==d(n)&&m(n)?{scrollLeft:(r=n).scrollLeft,scrollTop:r.scrollTop}:w(n)),m(t)?((p=O(t,!0)).x+=t.clientLeft,p.y+=t.clientTop):l&&(p.x=$(l))),{x:c.left+s.scrollLeft-p.x,y:c.top+s.scrollTop-p.y,width:c.width,height:c.height}}function j(e){var t=O(e),o=e.offsetWidth,n=e.offsetHeight;return Math.abs(t.width-o)<=1&&(o=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:e.offsetLeft,y:e.offsetTop,width:o,height:n}}function R(e){return"html"===C(e)?e:e.assignedSlot||e.parentNode||(h(e)?e.host:null)||k(e)}function S(e){return["html","body","#document"].indexOf(C(e))>=0?e.ownerDocument.body:m(e)&&E(e)?e:S(R(e))}function M(e,t){var o;void 0===t&&(t=[]);var n=S(e),r=n===(null==(o=e.ownerDocument)?void 0:o.body),a=d(n),i=r?[a].concat(a.visualViewport||[],E(n)?n:[]):n,l=t.concat(i);return r?l:l.concat(M(R(i)))}function I(e){return["table","td","th"].indexOf(C(e))>=0}function D(e){return m(e)&&"fixed"!==T(e).position?e.offsetParent:null}function W(e){for(var t=d(e),o=D(e);o&&I(o)&&"static"===T(o).position;)o=D(o);return o&&("html"===C(o)||"body"===C(o)&&"static"===T(o).position)?t:o||function(e){var t=/firefox/i.test(g());if(/Trident/i.test(g())&&m(e)&&"fixed"===T(e).position)return null;var o=R(e);for(h(o)&&(o=o.host);m(o)&&["html","body"].indexOf(C(o))<0;){var n=T(o);if("none"!==n.transform||"none"!==n.perspective||"paint"===n.contain||-1!==["transform","perspective"].indexOf(n.willChange)||t&&"filter"===n.willChange||t&&n.filter&&"none"!==n.filter)return o;o=o.parentNode}return null}(e)||t}var L="top",A="bottom",z="right",B="left",V="auto",H=[L,A,z,B],N="start",q="end",U="viewport",F="popper",K=H.reduce((function(e,t){return e.concat([t+"-"+N,t+"-"+q])}),[]),_=[].concat(H,[V]).reduce((function(e,t){return e.concat([t,t+"-"+N,t+"-"+q])}),[]),X=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function Y(e){var t=new Map,o=new Set,n=[];function r(e){o.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!o.has(e)){var n=t.get(e);n&&r(n)}})),n.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){o.has(e.name)||r(e)})),n}var G={placement:"bottom",modifiers:[],strategy:"absolute"};function J(){for(var e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function Q(e){void 0===e&&(e={});var t=e,o=t.defaultModifiers,n=void 0===o?[]:o,r=t.defaultOptions,a=void 0===r?G:r;return function(e,t,o){void 0===o&&(o=a);var r,i,l={placement:"bottom",orderedModifiers:[],options:Object.assign({},G,a),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},c=[],s=!1,p={state:l,setOptions:function(o){var r="function"==typeof o?o(l.options):o;f(),l.options=Object.assign({},a,l.options,r),l.scrollParents={reference:u(e)?M(e):e.contextElement?M(e.contextElement):[],popper:M(t)};var i,s,d=function(e){var t=Y(e);return X.reduce((function(e,o){return e.concat(t.filter((function(e){return e.phase===o})))}),[])}((i=[].concat(n,l.options.modifiers),s=i.reduce((function(e,t){var o=e[t.name];return e[t.name]=o?Object.assign({},o,t,{options:Object.assign({},o.options,t.options),data:Object.assign({},o.data,t.data)}):t,e}),{}),Object.keys(s).map((function(e){return s[e]}))));return l.orderedModifiers=d.filter((function(e){return e.enabled})),l.orderedModifiers.forEach((function(e){var t=e.name,o=e.options,n=void 0===o?{}:o,r=e.effect;if("function"==typeof r){var a=r({state:l,name:t,instance:p,options:n});c.push(a||function(){})}})),p.update()},forceUpdate:function(){if(!s){var e=l.elements,t=e.reference,o=e.popper;if(J(t,o)){l.rects={reference:P(t,W(o),"fixed"===l.options.strategy),popper:j(o)},l.reset=!1,l.placement=l.options.placement,l.orderedModifiers.forEach((function(e){return l.modifiersData[e.name]=Object.assign({},e.data)}));for(var n=0;n<l.orderedModifiers.length;n++)if(!0!==l.reset){var r=l.orderedModifiers[n],a=r.fn,i=r.options,c=void 0===i?{}:i,f=r.name;"function"==typeof a&&(l=a({state:l,options:c,name:f,instance:p})||l)}else l.reset=!1,n=-1}}},update:(r=function(){return new Promise((function(e){p.forceUpdate(),e(l)}))},function(){return i||(i=new Promise((function(e){Promise.resolve().then((function(){i=void 0,e(r())}))}))),i}),destroy:function(){f(),s=!0}};if(!J(e,t))return p;function f(){c.forEach((function(e){return e()})),c=[]}return p.setOptions(o).then((function(e){!s&&o.onFirstUpdate&&o.onFirstUpdate(e)})),p}}var Z={passive:!0};function ee(e){return e.split("-")[0]}function te(e){return e.split("-")[1]}function oe(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function ne(e){var t,o=e.reference,n=e.element,r=e.placement,a=r?ee(r):null,i=r?te(r):null,l=o.x+o.width/2-n.width/2,c=o.y+o.height/2-n.height/2;switch(a){case L:t={x:l,y:o.y-n.height};break;case A:t={x:l,y:o.y+o.height};break;case z:t={x:o.x+o.width,y:c};break;case B:t={x:o.x-n.width,y:c};break;default:t={x:o.x,y:o.y}}var s=a?oe(a):null;if(null!=s){var p="y"===s?"height":"width";switch(i){case N:t[s]=t[s]-(o[p]/2-n[p]/2);break;case q:t[s]=t[s]+(o[p]/2-n[p]/2)}}return t}var re={top:"auto",right:"auto",bottom:"auto",left:"auto"};function ae(e){var t,o=e.popper,n=e.popperRect,r=e.placement,a=e.variation,i=e.offsets,l=e.position,c=e.gpuAcceleration,s=e.adaptive,p=e.roundOffsets,f=e.isFixed,u=i.x,m=void 0===u?0:u,h=i.y,v=void 0===h?0:h,b="function"==typeof p?p({x:m,y:v}):{x:m,y:v};m=b.x,v=b.y;var g=i.hasOwnProperty("x"),x=i.hasOwnProperty("y"),O=B,w=L,C=window;if(s){var $=W(o),E="clientHeight",P="clientWidth";$===d(o)&&"static"!==T($=k(o)).position&&"absolute"===l&&(E="scrollHeight",P="scrollWidth"),(r===L||(r===B||r===z)&&a===q)&&(w=A,v-=(f&&$===C&&C.visualViewport?C.visualViewport.height:$[E])-n.height,v*=c?1:-1),r!==B&&(r!==L&&r!==A||a!==q)||(O=z,m-=(f&&$===C&&C.visualViewport?C.visualViewport.width:$[P])-n.width,m*=c?1:-1)}var j,R=Object.assign({position:l},s&&re),S=!0===p?function(e,t){var o=e.x,n=e.y,r=t.devicePixelRatio||1;return{x:y(o*r)/r||0,y:y(n*r)/r||0}}({x:m,y:v},d(o)):{x:m,y:v};return m=S.x,v=S.y,c?Object.assign({},R,((j={})[w]=x?"0":"",j[O]=g?"0":"",j.transform=(C.devicePixelRatio||1)<=1?"translate("+m+"px, "+v+"px)":"translate3d("+m+"px, "+v+"px, 0)",j)):Object.assign({},R,((t={})[w]=x?v+"px":"",t[O]=g?m+"px":"",t.transform="",t))}var ie={left:"right",right:"left",bottom:"top",top:"bottom"};function le(e){return e.replace(/left|right|bottom|top/g,(function(e){return ie[e]}))}var ce={start:"end",end:"start"};function se(e){return e.replace(/start|end/g,(function(e){return ce[e]}))}function pe(e,t){var o=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(o&&h(o)){var n=t;do{if(n&&e.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function fe(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function de(e,t,o){return t===U?fe(function(e,t){var o=d(e),n=k(e),r=o.visualViewport,a=n.clientWidth,i=n.clientHeight,l=0,c=0;if(r){a=r.width,i=r.height;var s=x();(s||!s&&"fixed"===t)&&(l=r.offsetLeft,c=r.offsetTop)}return{width:a,height:i,x:l+$(e),y:c}}(e,o)):u(t)?function(e,t){var o=O(e,!1,"fixed"===t);return o.top=o.top+e.clientTop,o.left=o.left+e.clientLeft,o.bottom=o.top+e.clientHeight,o.right=o.left+e.clientWidth,o.width=e.clientWidth,o.height=e.clientHeight,o.x=o.left,o.y=o.top,o}(t,o):fe(function(e){var t,o=k(e),n=w(e),r=null==(t=e.ownerDocument)?void 0:t.body,a=v(o.scrollWidth,o.clientWidth,r?r.scrollWidth:0,r?r.clientWidth:0),i=v(o.scrollHeight,o.clientHeight,r?r.scrollHeight:0,r?r.clientHeight:0),l=-n.scrollLeft+$(e),c=-n.scrollTop;return"rtl"===T(r||o).direction&&(l+=v(o.clientWidth,r?r.clientWidth:0)-a),{width:a,height:i,x:l,y:c}}(k(e)))}function ue(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function me(e,t){return t.reduce((function(t,o){return t[o]=e,t}),{})}function he(e,t){void 0===t&&(t={});var o=t,n=o.placement,r=void 0===n?e.placement:n,a=o.strategy,i=void 0===a?e.strategy:a,l=o.boundary,c=void 0===l?"clippingParents":l,s=o.rootBoundary,p=void 0===s?U:s,f=o.elementContext,d=void 0===f?F:f,h=o.altBoundary,y=void 0!==h&&h,g=o.padding,x=void 0===g?0:g,w=ue("number"!=typeof x?x:me(x,H)),$=d===F?"reference":F,E=e.rects.popper,P=e.elements[y?$:d],j=function(e,t,o,n){var r="clippingParents"===t?function(e){var t=M(R(e)),o=["absolute","fixed"].indexOf(T(e).position)>=0&&m(e)?W(e):e;return u(o)?t.filter((function(e){return u(e)&&pe(e,o)&&"body"!==C(e)})):[]}(e):[].concat(t),a=[].concat(r,[o]),i=a[0],l=a.reduce((function(t,o){var r=de(e,o,n);return t.top=v(r.top,t.top),t.right=b(r.right,t.right),t.bottom=b(r.bottom,t.bottom),t.left=v(r.left,t.left),t}),de(e,i,n));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}(u(P)?P:P.contextElement||k(e.elements.popper),c,p,i),S=O(e.elements.reference),I=ne({reference:S,element:E,strategy:"absolute",placement:r}),D=fe(Object.assign({},E,I)),B=d===F?D:S,V={top:j.top-B.top+w.top,bottom:B.bottom-j.bottom+w.bottom,left:j.left-B.left+w.left,right:B.right-j.right+w.right},N=e.modifiersData.offset;if(d===F&&N){var q=N[r];Object.keys(V).forEach((function(e){var t=[z,A].indexOf(e)>=0?1:-1,o=[L,A].indexOf(e)>=0?"y":"x";V[e]+=q[o]*t}))}return V}function ve(e,t,o){return v(e,b(t,o))}function be(e,t,o){return void 0===o&&(o={x:0,y:0}),{top:e.top-t.height-o.y,right:e.right-t.width+o.x,bottom:e.bottom-t.height+o.y,left:e.left-t.width-o.x}}function ye(e){return[L,z,A,B].some((function(t){return e[t]>=0}))}var ge=Q({defaultModifiers:[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,o=e.instance,n=e.options,r=n.scroll,a=void 0===r||r,i=n.resize,l=void 0===i||i,c=d(t.elements.popper),s=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&s.forEach((function(e){e.addEventListener("scroll",o.update,Z)})),l&&c.addEventListener("resize",o.update,Z),function(){a&&s.forEach((function(e){e.removeEventListener("scroll",o.update,Z)})),l&&c.removeEventListener("resize",o.update,Z)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,o=e.name;t.modifiersData[o]=ne({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,o=e.options,n=o.gpuAcceleration,r=void 0===n||n,a=o.adaptive,i=void 0===a||a,l=o.roundOffsets,c=void 0===l||l,s={placement:ee(t.placement),variation:te(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:r,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,ae(Object.assign({},s,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:i,roundOffsets:c})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,ae(Object.assign({},s,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},{name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var o=t.styles[e]||{},n=t.attributes[e]||{},r=t.elements[e];m(r)&&C(r)&&(Object.assign(r.style,o),Object.keys(n).forEach((function(e){var t=n[e];!1===t?r.removeAttribute(e):r.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,o={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,o.popper),t.styles=o,t.elements.arrow&&Object.assign(t.elements.arrow.style,o.arrow),function(){Object.keys(t.elements).forEach((function(e){var n=t.elements[e],r=t.attributes[e]||{},a=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:o[e]).reduce((function(e,t){return e[t]="",e}),{});m(n)&&C(n)&&(Object.assign(n.style,a),Object.keys(r).forEach((function(e){n.removeAttribute(e)})))}))}},requires:["computeStyles"]},{name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,o=e.options,n=e.name,r=o.offset,a=void 0===r?[0,0]:r,i=_.reduce((function(e,o){return e[o]=function(e,t,o){var n=ee(e),r=[B,L].indexOf(n)>=0?-1:1,a="function"==typeof o?o(Object.assign({},t,{placement:e})):o,i=a[0],l=a[1];return i=i||0,l=(l||0)*r,[B,z].indexOf(n)>=0?{x:l,y:i}:{x:i,y:l}}(o,t.rects,a),e}),{}),l=i[t.placement],c=l.x,s=l.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=s),t.modifiersData[n]=i}},{name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,o=e.options,n=e.name;if(!t.modifiersData[n]._skip){for(var r=o.mainAxis,a=void 0===r||r,i=o.altAxis,l=void 0===i||i,c=o.fallbackPlacements,s=o.padding,p=o.boundary,f=o.rootBoundary,d=o.altBoundary,u=o.flipVariations,m=void 0===u||u,h=o.allowedAutoPlacements,v=t.options.placement,b=ee(v),y=c||(b!==v&&m?function(e){if(ee(e)===V)return[];var t=le(e);return[se(e),t,se(t)]}(v):[le(v)]),g=[v].concat(y).reduce((function(e,o){return e.concat(ee(o)===V?function(e,t){void 0===t&&(t={});var o=t,n=o.placement,r=o.boundary,a=o.rootBoundary,i=o.padding,l=o.flipVariations,c=o.allowedAutoPlacements,s=void 0===c?_:c,p=te(n),f=p?l?K:K.filter((function(e){return te(e)===p})):H,d=f.filter((function(e){return s.indexOf(e)>=0}));0===d.length&&(d=f);var u=d.reduce((function(t,o){return t[o]=he(e,{placement:o,boundary:r,rootBoundary:a,padding:i})[ee(o)],t}),{});return Object.keys(u).sort((function(e,t){return u[e]-u[t]}))}(t,{placement:o,boundary:p,rootBoundary:f,padding:s,flipVariations:m,allowedAutoPlacements:h}):o)}),[]),x=t.rects.reference,O=t.rects.popper,w=new Map,C=!0,k=g[0],$=0;$<g.length;$++){var T=g[$],E=ee(T),P=te(T)===N,j=[L,A].indexOf(E)>=0,R=j?"width":"height",S=he(t,{placement:T,boundary:p,rootBoundary:f,altBoundary:d,padding:s}),M=j?P?z:B:P?A:L;x[R]>O[R]&&(M=le(M));var I=le(M),D=[];if(a&&D.push(S[E]<=0),l&&D.push(S[M]<=0,S[I]<=0),D.every((function(e){return e}))){k=T,C=!1;break}w.set(T,D)}if(C)for(var W=function(e){var t=g.find((function(t){var o=w.get(t);if(o)return o.slice(0,e).every((function(e){return e}))}));if(t)return k=t,"break"},q=m?3:1;q>0&&"break"!==W(q);q--);t.placement!==k&&(t.modifiersData[n]._skip=!0,t.placement=k,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}},{name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,o=e.options,n=e.name,r=o.mainAxis,a=void 0===r||r,i=o.altAxis,l=void 0!==i&&i,c=o.boundary,s=o.rootBoundary,p=o.altBoundary,f=o.padding,d=o.tether,u=void 0===d||d,m=o.tetherOffset,h=void 0===m?0:m,y=he(t,{boundary:c,rootBoundary:s,padding:f,altBoundary:p}),g=ee(t.placement),x=te(t.placement),O=!x,w=oe(g),C="x"===w?"y":"x",k=t.modifiersData.popperOffsets,$=t.rects.reference,T=t.rects.popper,E="function"==typeof h?h(Object.assign({},t.rects,{placement:t.placement})):h,P="number"==typeof E?{mainAxis:E,altAxis:E}:Object.assign({mainAxis:0,altAxis:0},E),R=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,S={x:0,y:0};if(k){if(a){var M,I="y"===w?L:B,D="y"===w?A:z,V="y"===w?"height":"width",H=k[w],q=H+y[I],U=H-y[D],F=u?-T[V]/2:0,K=x===N?$[V]:T[V],_=x===N?-T[V]:-$[V],X=t.elements.arrow,Y=u&&X?j(X):{width:0,height:0},G=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},J=G[I],Q=G[D],Z=ve(0,$[V],Y[V]),ne=O?$[V]/2-F-Z-J-P.mainAxis:K-Z-J-P.mainAxis,re=O?-$[V]/2+F+Z+Q+P.mainAxis:_+Z+Q+P.mainAxis,ae=t.elements.arrow&&W(t.elements.arrow),ie=ae?"y"===w?ae.clientTop||0:ae.clientLeft||0:0,le=null!=(M=null==R?void 0:R[w])?M:0,ce=H+re-le,se=ve(u?b(q,H+ne-le-ie):q,H,u?v(U,ce):U);k[w]=se,S[w]=se-H}if(l){var pe,fe="x"===w?L:B,de="x"===w?A:z,ue=k[C],me="y"===C?"height":"width",be=ue+y[fe],ye=ue-y[de],ge=-1!==[L,B].indexOf(g),xe=null!=(pe=null==R?void 0:R[C])?pe:0,Oe=ge?be:ue-$[me]-T[me]-xe+P.altAxis,we=ge?ue+$[me]+T[me]-xe-P.altAxis:ye,Ce=u&&ge?function(e,t,o){var n=ve(e,t,o);return n>o?o:n}(Oe,ue,we):ve(u?Oe:be,ue,u?we:ye);k[C]=Ce,S[C]=Ce-ue}t.modifiersData[n]=S}},requiresIfExists:["offset"]},{name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,o=e.state,n=e.name,r=e.options,a=o.elements.arrow,i=o.modifiersData.popperOffsets,l=ee(o.placement),c=oe(l),s=[B,z].indexOf(l)>=0?"height":"width";if(a&&i){var p=function(e,t){return ue("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:me(e,H))}(r.padding,o),f=j(a),d="y"===c?L:B,u="y"===c?A:z,m=o.rects.reference[s]+o.rects.reference[c]-i[c]-o.rects.popper[s],h=i[c]-o.rects.reference[c],v=W(a),b=v?"y"===c?v.clientHeight||0:v.clientWidth||0:0,y=m/2-h/2,g=p[d],x=b-f[s]-p[u],O=b/2-f[s]/2+y,w=ve(g,O,x),C=c;o.modifiersData[n]=((t={})[C]=w,t.centerOffset=w-O,t)}},effect:function(e){var t=e.state,o=e.options.element,n=void 0===o?"[data-popper-arrow]":o;null!=n&&("string"!=typeof n||(n=t.elements.popper.querySelector(n)))&&pe(t.elements.popper,n)&&(t.elements.arrow=n)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]},{name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,o=e.name,n=t.rects.reference,r=t.rects.popper,a=t.modifiersData.preventOverflow,i=he(t,{elementContext:"reference"}),l=he(t,{altBoundary:!0}),c=be(i,n),s=be(l,r,a),p=ye(c),f=ye(s);t.modifiersData[o]={referenceClippingOffsets:c,popperEscapeOffsets:s,isReferenceHidden:p,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":f})}}]}),xe=o(3268),Oe=o.n(xe),we=o(5664),Ce=o(4196),ke=o(1272);function $e(e){return(0,ke.c)("MuiPopper",e)}(0,o(7100).c)("MuiPopper",["root"]);var Te=o(1916),Ee=o(1032),Pe=o(7624);const je=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Re=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Se(e){return"function"==typeof e?e():e}function Me(e){return void 0!==e.nodeType}const Ie={},De=a.forwardRef((function(e,t){var o;const{anchorEl:c,children:s,direction:p,disablePortal:f,modifiers:d,open:u,placement:m,popperOptions:h,popperRef:v,slotProps:b={},slots:y={},TransitionProps:g}=e,x=(0,r.c)(e,je),O=a.useRef(null),w=(0,i.c)(O,t),C=a.useRef(null),k=(0,i.c)(C,v),$=a.useRef(k);(0,l.c)((()=>{$.current=k}),[k]),a.useImperativeHandle(v,(()=>C.current),[]);const T=function(e,t){if("ltr"===t)return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}(m,p),[E,P]=a.useState(T),[j,R]=a.useState(Se(c));a.useEffect((()=>{C.current&&C.current.forceUpdate()})),a.useEffect((()=>{c&&R(Se(c))}),[c]),(0,l.c)((()=>{if(!j||!u)return;if(j&&Me(j)&&1===j.nodeType){const e=j.getBoundingClientRect();0===e.top&&0===e.left&&0===e.right&&0===e.bottom&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join("\n"))}let e=[{name:"preventOverflow",options:{altBoundary:f}},{name:"flip",options:{altBoundary:f}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:e})=>{P(e.placement)}}];null!=d&&(e=e.concat(d)),h&&null!=h.modifiers&&(e=e.concat(h.modifiers));const t=ge(j,O.current,(0,n.c)({placement:T},h,{modifiers:e}));return $.current(t),()=>{t.destroy(),$.current(null)}}),[j,f,d,u,h,T]);const S={placement:E};null!==g&&(S.TransitionProps=g);const M=(0,we.c)({root:["root"]},(0,Ee.k)($e)),I=null!=(o=y.root)?o:"div",D=(0,Te.c)({elementType:I,externalSlotProps:b.root,externalForwardedProps:x,additionalProps:{role:"tooltip",ref:w},ownerState:e,className:M.root});return(0,Pe.jsx)(I,(0,n.c)({},D,{children:"function"==typeof s?s(S):s}))})),We=a.forwardRef((function(e,t){const{anchorEl:o,children:i,container:l,direction:s="ltr",disablePortal:p=!1,keepMounted:f=!1,modifiers:d,open:u,placement:m="bottom",popperOptions:h=Ie,popperRef:v,style:b,transition:y=!1,slotProps:g={},slots:x={}}=e,O=(0,r.c)(e,Re),[w,C]=a.useState(!0);if(!f&&!u&&(!y||w))return null;let k;if(l)k=l;else if(o){const e=Se(o);k=e&&Me(e)?(0,c.c)(e).body:(0,c.c)(null).body}const $=u||!f||y&&!w?void 0:"none",T=y?{in:u,onEnter:()=>{C(!1)},onExited:()=>{C(!0)}}:void 0;return(0,Pe.jsx)(Ce.c,{disablePortal:p,container:k,children:(0,Pe.jsx)(De,(0,n.c)({anchorEl:o,direction:s,disablePortal:p,modifiers:d,ref:t,open:y?!w:u,placement:m,popperOptions:h,popperRef:v,slotProps:g,slots:x},O,{style:(0,n.c)({position:"fixed",top:0,left:0,display:$},b),TransitionProps:T,children:i}))})}));We.propTypes={anchorEl:(0,s.c)(Oe().oneOfType([p.c,Oe().object,Oe().func]),(e=>{if(e.open){const t=Se(e.anchorEl);if(t&&Me(t)&&1===t.nodeType){const e=t.getBoundingClientRect();if(0===e.top&&0===e.left&&0===e.right&&0===e.bottom)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join("\n"))}else if(!t||"function"!=typeof t.getBoundingClientRect||!Me(t)&&null!=t.contextElement&&1!==t.contextElement.nodeType)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join("\n"))}return null})),children:Oe().oneOfType([Oe().node,Oe().func]),container:Oe().oneOfType([p.c,Oe().func]),direction:Oe().oneOf(["ltr","rtl"]),disablePortal:Oe().bool,keepMounted:Oe().bool,modifiers:Oe().arrayOf(Oe().shape({data:Oe().object,effect:Oe().func,enabled:Oe().bool,fn:Oe().func,name:Oe().any,options:Oe().object,phase:Oe().oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:Oe().arrayOf(Oe().string),requiresIfExists:Oe().arrayOf(Oe().string)})),open:Oe().bool.isRequired,placement:Oe().oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:Oe().shape({modifiers:Oe().array,onFirstUpdate:Oe().func,placement:Oe().oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:Oe().oneOf(["absolute","fixed"])}),popperRef:f.c,slotProps:Oe().shape({root:Oe().oneOfType([Oe().func,Oe().object])}),slots:Oe().shape({root:Oe().elementType}),transition:Oe().bool};const Le=We;var Ae=o(7348),ze=o(6940),Be=o(440);const Ve=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],He=(0,ze.cp)(Le,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ne=a.forwardRef((function(e,t){var o;const a=(0,Ae.c)(),i=(0,Be.c)({props:e,name:"MuiPopper"}),{anchorEl:l,component:c,components:s,componentsProps:p,container:f,disablePortal:d,keepMounted:u,modifiers:m,open:h,placement:v,popperOptions:b,popperRef:y,transition:g,slots:x,slotProps:O}=i,w=(0,r.c)(i,Ve),C=null!=(o=null==x?void 0:x.root)?o:null==s?void 0:s.Root,k=(0,n.c)({anchorEl:l,container:f,disablePortal:d,keepMounted:u,modifiers:m,open:h,placement:v,popperOptions:b,popperRef:y,transition:g},w);return(0,Pe.jsx)(He,(0,n.c)({as:c,direction:null==a?void 0:a.direction,slots:{root:C},slotProps:null!=O?O:p},k,{ref:t}))}));Ne.propTypes={anchorEl:Oe().oneOfType([p.c,Oe().object,Oe().func]),children:Oe().oneOfType([Oe().node,Oe().func]),component:Oe().elementType,components:Oe().shape({Root:Oe().elementType}),componentsProps:Oe().shape({root:Oe().oneOfType([Oe().func,Oe().object])}),container:Oe().oneOfType([p.c,Oe().func]),disablePortal:Oe().bool,keepMounted:Oe().bool,modifiers:Oe().arrayOf(Oe().shape({data:Oe().object,effect:Oe().func,enabled:Oe().bool,fn:Oe().func,name:Oe().any,options:Oe().object,phase:Oe().oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:Oe().arrayOf(Oe().string),requiresIfExists:Oe().arrayOf(Oe().string)})),open:Oe().bool.isRequired,placement:Oe().oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:Oe().shape({modifiers:Oe().array,onFirstUpdate:Oe().func,placement:Oe().oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:Oe().oneOf(["absolute","fixed"])}),popperRef:f.c,slotProps:Oe().shape({root:Oe().oneOfType([Oe().func,Oe().object])}),slots:Oe().shape({root:Oe().elementType}),sx:Oe().oneOfType([Oe().arrayOf(Oe().oneOfType([Oe().func,Oe().object,Oe().bool])),Oe().func,Oe().object]),transition:Oe().bool};const qe=Ne}}]);