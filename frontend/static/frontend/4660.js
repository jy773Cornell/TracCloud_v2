"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4660],{6856:(e,t,o)=>{o.d(t,{K:()=>u,c:()=>b});var n=o(5072),r=o(1504),a=o(5536),l=o(6244),i=o(1004),s=o(723),c=o(7180);function p(e){return void 0!==e.normalize?e.normalize("NFD").replace(/[\u0300-\u036f]/g,""):e}function u(e={}){const{ignoreAccents:t=!0,ignoreCase:o=!0,limit:n,matchFrom:r="any",stringify:a,trim:l=!1}=e;return(e,{inputValue:i,getOptionLabel:s})=>{let c=l?i.trim():i;o&&(c=c.toLowerCase()),t&&(c=p(c));const u=c?e.filter((e=>{let n=(a||s)(e);return o&&(n=n.toLowerCase()),t&&(n=p(n)),"start"===r?0===n.indexOf(c):n.indexOf(c)>-1})):e;return"number"==typeof n?u.slice(0,n):u}}function d(e,t){for(let o=0;o<e.length;o+=1)if(t(e[o]))return o;return-1}const g=u(),f=5,h=e=>{var t;return null!==e.current&&(null==(t=e.current.parentElement)?void 0:t.contains(document.activeElement))};function b(e){const{unstable_isActiveElementInListbox:t=h,unstable_classNamePrefix:o="Mui",autoComplete:p=!1,autoHighlight:u=!1,autoSelect:b=!1,blurOnSelect:m=!1,clearOnBlur:v=!e.freeSolo,clearOnEscape:x=!1,componentName:y="useAutocomplete",defaultValue:O=(e.multiple?[]:null),disableClearable:I=!1,disableCloseOnSelect:$=!1,disabled:S,disabledItemsFocusable:C=!1,disableListWrap:T=!1,filterOptions:w=g,filterSelectedOptions:P=!1,freeSolo:k=!1,getOptionDisabled:L,getOptionLabel:A=(e=>{var t;return null!=(t=e.label)?t:e}),groupBy:R,handleHomeEndKeys:M=!e.freeSolo,id:N,includeInputInList:j=!1,inputValue:E,isOptionEqualToValue:D=((e,t)=>e===t),multiple:z=!1,onChange:H,onClose:V,onHighlightChange:F,onInputChange:W,onOpen:B,open:U,openOnFocus:q=!1,options:G,readOnly:K=!1,selectOnFocus:J=!e.freeSolo,value:Y}=e,_=(0,a.c)(N);let X=A;X=e=>{const t=A(e);if("string"!=typeof t){{const o=void 0===t?"undefined":`${typeof t} (${t})`;console.error(`MUI: The \`getOptionLabel\` method of ${y} returned ${o} instead of a string for ${JSON.stringify(e)}.`)}return String(t)}return t};const Q=r.useRef(!1),Z=r.useRef(!0),ee=r.useRef(null),te=r.useRef(null),[oe,ne]=r.useState(null),[re,ae]=r.useState(-1),le=u?0:-1,ie=r.useRef(le),[se,ce]=(0,l.c)({controlled:Y,default:O,name:y}),[pe,ue]=(0,l.c)({controlled:E,default:"",name:y,state:"inputValue"}),[de,ge]=r.useState(!1),fe=r.useCallback(((e,t)=>{if(!(z?se.length<t.length:null!==t)&&!v)return;let o;if(z)o="";else if(null==t)o="";else{const e=X(t);o="string"==typeof e?e:""}pe!==o&&(ue(o),W&&W(e,o,"reset"))}),[X,pe,z,W,ue,v,se]),[he,be]=(0,l.c)({controlled:U,default:!1,name:y,state:"open"}),[me,ve]=r.useState(!0),xe=!z&&null!=se&&pe===X(se),ye=he&&!K,Oe=ye?w(G.filter((e=>!P||!(z?se:[se]).some((t=>null!==t&&D(e,t))))),{inputValue:xe&&me?"":pe,getOptionLabel:X}):[],Ie=(0,i.c)({filteredOptions:Oe,value:se});r.useEffect((()=>{const e=se!==Ie.value;de&&!e||k&&!e||fe(null,se)}),[se,fe,de,Ie.value,k]);const $e=he&&Oe.length>0&&!K;if(null!==se&&!k&&G.length>0){const e=(z?se:[se]).filter((e=>!G.some((t=>D(t,e)))));e.length>0&&console.warn([`MUI: The value provided to ${y} is invalid.`,`None of the options match with \`${e.length>1?JSON.stringify(e):JSON.stringify(e[0])}\`.`,"You can use the `isOptionEqualToValue` prop to customize the equality test."].join("\n"))}const Se=(0,s.c)((e=>{-1===e?ee.current.focus():oe.querySelector(`[data-tag-index="${e}"]`).focus()}));r.useEffect((()=>{z&&re>se.length-1&&(ae(-1),Se(-1))}),[se,z,re,Se]);const Ce=(0,s.c)((({event:e,index:t,reason:n="auto"})=>{if(ie.current=t,-1===t?ee.current.removeAttribute("aria-activedescendant"):ee.current.setAttribute("aria-activedescendant",`${_}-option-${t}`),F&&F(e,-1===t?null:Oe[t],n),!te.current)return;const r=te.current.querySelector(`[role="option"].${o}-focused`);r&&(r.classList.remove(`${o}-focused`),r.classList.remove(`${o}-focusVisible`));let a=te.current;if("listbox"!==te.current.getAttribute("role")&&(a=te.current.parentElement.querySelector('[role="listbox"]')),!a)return;if(-1===t)return void(a.scrollTop=0);const l=te.current.querySelector(`[data-option-index="${t}"]`);if(l&&(l.classList.add(`${o}-focused`),"keyboard"===n&&l.classList.add(`${o}-focusVisible`),a.scrollHeight>a.clientHeight&&"mouse"!==n)){const e=l,t=a.clientHeight+a.scrollTop,o=e.offsetTop+e.offsetHeight;o>t?a.scrollTop=o-a.clientHeight:e.offsetTop-e.offsetHeight*(R?1.3:0)<a.scrollTop&&(a.scrollTop=e.offsetTop-e.offsetHeight*(R?1.3:0))}})),Te=(0,s.c)((({event:e,diff:t,direction:o="next",reason:n="auto"})=>{if(!ye)return;const r=function(e,t){if(!te.current||-1===e)return-1;let o=e;for(;;){if("next"===t&&o===Oe.length||"previous"===t&&-1===o)return-1;const e=te.current.querySelector(`[data-option-index="${o}"]`),n=!C&&(!e||e.disabled||"true"===e.getAttribute("aria-disabled"));if(!(e&&!e.hasAttribute("tabindex")||n))return o;o+="next"===t?1:-1}}((()=>{const e=Oe.length-1;if("reset"===t)return le;if("start"===t)return 0;if("end"===t)return e;const o=ie.current+t;return o<0?-1===o&&j?-1:T&&-1!==ie.current||Math.abs(t)>1?0:e:o>e?o===e+1&&j?-1:T||Math.abs(t)>1?e:0:o})(),o);if(Ce({index:r,reason:n,event:e}),p&&"reset"!==t)if(-1===r)ee.current.value=pe;else{const e=X(Oe[r]);ee.current.value=e,0===e.toLowerCase().indexOf(pe.toLowerCase())&&pe.length>0&&ee.current.setSelectionRange(pe.length,e.length)}})),we=r.useCallback((()=>{if(!ye)return;if((()=>{if(-1!==ie.current&&Ie.filteredOptions&&Ie.filteredOptions.length!==Oe.length&&(z?se.length===Ie.value.length&&Ie.value.every(((e,t)=>X(se[t])===X(e))):(e=Ie.value,t=se,(e?X(e):"")===(t?X(t):"")))){const e=Ie.filteredOptions[ie.current];if(e&&Oe.some((t=>X(t)===X(e))))return!0}var e,t;return!1})())return;const e=z?se[0]:se;if(0!==Oe.length&&null!=e){if(te.current)if(null==e)ie.current>=Oe.length-1?Ce({index:Oe.length-1}):Ce({index:ie.current});else{const t=Oe[ie.current];if(z&&t&&-1!==d(se,(e=>D(t,e))))return;const o=d(Oe,(t=>D(t,e)));-1===o?Te({diff:"reset"}):Ce({index:o})}}else Te({diff:"reset"})}),[Oe.length,!z&&se,P,Te,Ce,ye,pe,z]),Pe=(0,s.c)((e=>{(0,c.c)(te,e),e&&we()}));r.useEffect((()=>{ee.current&&"INPUT"===ee.current.nodeName||(ee.current&&"TEXTAREA"===ee.current.nodeName?console.warn([`A textarea element was provided to ${y} where input was expected.`,"This is not a supported scenario but it may work under certain conditions.","A textarea keyboard navigation may conflict with Autocomplete controls (e.g. enter and arrow keys).","Make sure to test keyboard navigation and add custom event handlers if necessary."].join("\n")):console.error([`MUI: Unable to find the input element. It was resolved to ${ee.current} while an HTMLInputElement was expected.`,`Instead, ${y} expects an input element.`,"","useAutocomplete"===y?"Make sure you have bound getInputProps correctly and that the normal ref/effect resolutions order is guaranteed.":"Make sure you have customized the input component correctly."].join("\n")))}),[y]),r.useEffect((()=>{we()}),[we]);const ke=e=>{he||(be(!0),ve(!0),B&&B(e))},Le=(e,t)=>{he&&(be(!1),V&&V(e,t))},Ae=(e,t,o,n)=>{if(z){if(se.length===t.length&&se.every(((e,o)=>e===t[o])))return}else if(se===t)return;H&&H(e,t,o,n),ce(t)},Re=r.useRef(!1),Me=(e,t,o="selectOption",n="options")=>{let r=o,a=t;if(z){a=Array.isArray(se)?se.slice():[];{const e=a.filter((e=>D(t,e)));e.length>1&&console.error([`MUI: The \`isOptionEqualToValue\` method of ${y} does not handle the arguments correctly.`,`The component expects a single value to match a given option but found ${e.length} matches.`].join("\n"))}const e=d(a,(e=>D(t,e)));-1===e?a.push(t):"freeSolo"!==n&&(a.splice(e,1),r="removeOption")}fe(e,a),Ae(e,a,r,{option:t}),$||e&&(e.ctrlKey||e.metaKey)||Le(e,r),(!0===m||"touch"===m&&Re.current||"mouse"===m&&!Re.current)&&ee.current.blur()},Ne=(e,t)=>{if(!z)return;""===pe&&Le(e,"toggleInput");let o=re;-1===re?""===pe&&"previous"===t&&(o=se.length-1):(o+="next"===t?1:-1,o<0&&(o=0),o===se.length&&(o=-1)),o=function(e,t){if(-1===e)return-1;let o=e;for(;;){if("next"===t&&o===se.length||"previous"===t&&-1===o)return-1;const e=oe.querySelector(`[data-tag-index="${o}"]`);if(e&&e.hasAttribute("tabindex")&&!e.disabled&&"true"!==e.getAttribute("aria-disabled"))return o;o+="next"===t?1:-1}}(o,t),ae(o),Se(o)},je=e=>{Q.current=!0,ue(""),W&&W(e,"","clear"),Ae(e,z?[]:null,"clear")},Ee=e=>t=>{if(e.onKeyDown&&e.onKeyDown(t),!t.defaultMuiPrevented&&(-1!==re&&-1===["ArrowLeft","ArrowRight"].indexOf(t.key)&&(ae(-1),Se(-1)),229!==t.which))switch(t.key){case"Home":ye&&M&&(t.preventDefault(),Te({diff:"start",direction:"next",reason:"keyboard",event:t}));break;case"End":ye&&M&&(t.preventDefault(),Te({diff:"end",direction:"previous",reason:"keyboard",event:t}));break;case"PageUp":t.preventDefault(),Te({diff:-f,direction:"previous",reason:"keyboard",event:t}),ke(t);break;case"PageDown":t.preventDefault(),Te({diff:f,direction:"next",reason:"keyboard",event:t}),ke(t);break;case"ArrowDown":t.preventDefault(),Te({diff:1,direction:"next",reason:"keyboard",event:t}),ke(t);break;case"ArrowUp":t.preventDefault(),Te({diff:-1,direction:"previous",reason:"keyboard",event:t}),ke(t);break;case"ArrowLeft":Ne(t,"previous");break;case"ArrowRight":Ne(t,"next");break;case"Enter":if(-1!==ie.current&&ye){const e=Oe[ie.current],o=!!L&&L(e);if(t.preventDefault(),o)return;Me(t,e,"selectOption"),p&&ee.current.setSelectionRange(ee.current.value.length,ee.current.value.length)}else k&&""!==pe&&!1===xe&&(z&&t.preventDefault(),Me(t,pe,"createOption","freeSolo"));break;case"Escape":ye?(t.preventDefault(),t.stopPropagation(),Le(t,"escape")):x&&(""!==pe||z&&se.length>0)&&(t.preventDefault(),t.stopPropagation(),je(t));break;case"Backspace":if(z&&!K&&""===pe&&se.length>0){const e=-1===re?se.length-1:re,o=se.slice();o.splice(e,1),Ae(t,o,"removeOption",{option:se[e]})}break;case"Delete":if(z&&!K&&""===pe&&se.length>0&&-1!==re){const e=re,o=se.slice();o.splice(e,1),Ae(t,o,"removeOption",{option:se[e]})}}},De=e=>{ge(!0),q&&!Q.current&&ke(e)},ze=e=>{t(te)?ee.current.focus():(ge(!1),Z.current=!0,Q.current=!1,b&&-1!==ie.current&&ye?Me(e,Oe[ie.current],"blur"):b&&k&&""!==pe?Me(e,pe,"blur","freeSolo"):v&&fe(e,se),Le(e,"blur"))},He=e=>{const t=e.target.value;pe!==t&&(ue(t),ve(!1),W&&W(e,t,"input")),""===t?I||z||Ae(e,null,"clear"):ke(e)},Ve=e=>{const t=Number(e.currentTarget.getAttribute("data-option-index"));ie.current!==t&&Ce({event:e,index:t,reason:"mouse"})},Fe=e=>{Ce({event:e,index:Number(e.currentTarget.getAttribute("data-option-index")),reason:"touch"}),Re.current=!0},We=e=>{const t=Number(e.currentTarget.getAttribute("data-option-index"));Me(e,Oe[t],"selectOption"),Re.current=!1},Be=e=>t=>{const o=se.slice();o.splice(e,1),Ae(t,o,"removeOption",{option:se[e]})},Ue=e=>{he?Le(e,"toggleInput"):ke(e)},qe=e=>{e.currentTarget.contains(e.target)&&e.target.getAttribute("id")!==_&&e.preventDefault()},Ge=e=>{e.currentTarget.contains(e.target)&&(ee.current.focus(),J&&Z.current&&ee.current.selectionEnd-ee.current.selectionStart==0&&ee.current.select(),Z.current=!1)},Ke=e=>{""!==pe&&he||Ue(e)};let Je=k&&pe.length>0;Je=Je||(z?se.length>0:null!==se);let Ye=Oe;if(R){const e=new Map;let t=!1;Ye=Oe.reduce(((o,n,r)=>{const a=R(n);return o.length>0&&o[o.length-1].group===a?o[o.length-1].options.push(n):(e.get(a)&&!t&&(console.warn(`MUI: The options provided combined with the \`groupBy\` method of ${y} returns duplicated headers.`,"You can solve the issue by sorting the options with the output of `groupBy`."),t=!0),e.set(a,!0),o.push({key:r,index:r,group:a,options:[n]})),o}),[])}return S&&de&&ze(),{getRootProps:(e={})=>(0,n.c)({"aria-owns":$e?`${_}-listbox`:null},e,{onKeyDown:Ee(e),onMouseDown:qe,onClick:Ge}),getInputLabelProps:()=>({id:`${_}-label`,htmlFor:_}),getInputProps:()=>({id:_,value:pe,onBlur:ze,onFocus:De,onChange:He,onMouseDown:Ke,"aria-activedescendant":ye?"":null,"aria-autocomplete":p?"both":"list","aria-controls":$e?`${_}-listbox`:void 0,"aria-expanded":$e,autoComplete:"off",ref:ee,autoCapitalize:"none",spellCheck:"false",role:"combobox",disabled:S}),getClearProps:()=>({tabIndex:-1,onClick:je}),getPopupIndicatorProps:()=>({tabIndex:-1,onClick:Ue}),getTagProps:({index:e})=>(0,n.c)({key:e,"data-tag-index":e,tabIndex:-1},!K&&{onDelete:Be(e)}),getListboxProps:()=>({role:"listbox",id:`${_}-listbox`,"aria-labelledby":`${_}-label`,ref:Pe,onMouseDown:e=>{e.preventDefault()}}),getOptionProps:({index:e,option:t})=>{const o=(z?se:[se]).some((e=>null!=e&&D(t,e))),n=!!L&&L(t);return{key:X(t),tabIndex:-1,role:"option",id:`${_}-option-${e}`,onMouseMove:Ve,onClick:We,onTouchStart:Fe,"data-option-index":e,"aria-disabled":n,"aria-selected":o}},id:_,inputValue:pe,value:se,dirty:Je,expanded:ye&&oe,popupOpen:ye,focused:de||-1!==re,anchorEl:oe,setAnchorEl:ne,focusedTag:re,groupedOptions:Ye}}},4660:(e,t,o)=>{o.d(t,{c:()=>ee});var n=o(5656),r=o(5072),a=o(1504),l=o(3268),i=o.n(l),s=o(4971),c=o(4048),p=o(2752),u=o(5664),d=o(6856),g=o(7728),f=o(292),h=o(6940),b=o(440),m=o(3068),v=o(7100),x=o(1272);function y(e){return(0,x.c)("MuiListSubheader",e)}(0,v.c)("MuiListSubheader",["root","colorPrimary","colorInherit","gutters","inset","sticky"]);var O=o(7624);const I=["className","color","component","disableGutters","disableSticky","inset"],$=(0,h.cp)("li",{name:"MuiListSubheader",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,"default"!==o.color&&t[`color${(0,m.c)(o.color)}`],!o.disableGutters&&t.gutters,o.inset&&t.inset,!o.disableSticky&&t.sticky]}})((({theme:e,ownerState:t})=>(0,r.c)({boxSizing:"border-box",lineHeight:"48px",listStyle:"none",color:(e.vars||e).palette.text.secondary,fontFamily:e.typography.fontFamily,fontWeight:e.typography.fontWeightMedium,fontSize:e.typography.pxToRem(14)},"primary"===t.color&&{color:(e.vars||e).palette.primary.main},"inherit"===t.color&&{color:"inherit"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.inset&&{paddingLeft:72},!t.disableSticky&&{position:"sticky",top:0,zIndex:1,backgroundColor:(e.vars||e).palette.background.paper}))),S=a.forwardRef((function(e,t){const o=(0,b.c)({props:e,name:"MuiListSubheader"}),{className:a,color:l="default",component:i="li",disableGutters:c=!1,disableSticky:p=!1,inset:d=!1}=o,g=(0,n.c)(o,I),f=(0,r.c)({},o,{color:l,component:i,disableGutters:c,disableSticky:p,inset:d}),h=(e=>{const{classes:t,color:o,disableGutters:n,inset:r,disableSticky:a}=e,l={root:["root","default"!==o&&`color${(0,m.c)(o)}`,!n&&"gutters",r&&"inset",!a&&"sticky"]};return(0,u.c)(l,y,t)})(f);return(0,O.jsx)($,(0,r.c)({as:i,className:(0,s.c)(h.root,a),ref:t,ownerState:f},g))}));S.muiSkipListHighlight=!0,S.propTypes={children:i().node,classes:i().object,className:i().string,color:i().oneOf(["default","inherit","primary"]),component:i().elementType,disableGutters:i().bool,disableSticky:i().bool,inset:i().bool,sx:i().oneOfType([i().arrayOf(i().oneOfType([i().func,i().object,i().bool])),i().func,i().object])};const C=S;var T=o(6968),w=o(3562),P=o(7640),k=o(8960),L=o(6408),A=o(1872),R=o(7048),M=o(2696),N=o(6464);function j(e){return(0,x.c)("MuiAutocomplete",e)}const E=(0,v.c)("MuiAutocomplete",["root","expanded","fullWidth","focused","focusVisible","tag","tagSizeSmall","tagSizeMedium","hasPopupIcon","hasClearIcon","inputRoot","input","inputFocused","endAdornment","clearIndicator","popupIndicator","popupIndicatorOpen","popper","popperDisablePortal","paper","listbox","loading","noOptions","option","groupLabel","groupUl"]);var D,z,H=o(9584);const V=["autoComplete","autoHighlight","autoSelect","blurOnSelect","ChipProps","className","clearIcon","clearOnBlur","clearOnEscape","clearText","closeText","componentsProps","defaultValue","disableClearable","disableCloseOnSelect","disabled","disabledItemsFocusable","disableListWrap","disablePortal","filterOptions","filterSelectedOptions","forcePopupIcon","freeSolo","fullWidth","getLimitTagsText","getOptionDisabled","getOptionLabel","isOptionEqualToValue","groupBy","handleHomeEndKeys","id","includeInputInList","inputValue","limitTags","ListboxComponent","ListboxProps","loading","loadingText","multiple","noOptionsText","onChange","onClose","onHighlightChange","onInputChange","onOpen","open","openOnFocus","openText","options","PaperComponent","PopperComponent","popupIcon","readOnly","renderGroup","renderInput","renderOption","renderTags","selectOnFocus","size","slotProps","value"],F=["ref"],W=(0,h.cp)("div",{name:"MuiAutocomplete",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e,{fullWidth:n,hasClearIcon:r,hasPopupIcon:a,inputFocused:l,size:i}=o;return[{[`& .${E.tag}`]:t.tag},{[`& .${E.tag}`]:t[`tagSize${(0,m.c)(i)}`]},{[`& .${E.inputRoot}`]:t.inputRoot},{[`& .${E.input}`]:t.input},{[`& .${E.input}`]:l&&t.inputFocused},t.root,n&&t.fullWidth,a&&t.hasPopupIcon,r&&t.hasClearIcon]}})((({ownerState:e})=>(0,r.c)({[`&.${E.focused} .${E.clearIndicator}`]:{visibility:"visible"},"@media (pointer: fine)":{[`&:hover .${E.clearIndicator}`]:{visibility:"visible"}}},e.fullWidth&&{width:"100%"},{[`& .${E.tag}`]:(0,r.c)({margin:3,maxWidth:"calc(100% - 6px)"},"small"===e.size&&{margin:2,maxWidth:"calc(100% - 4px)"}),[`& .${E.inputRoot}`]:{flexWrap:"wrap",[`.${E.hasPopupIcon}&, .${E.hasClearIcon}&`]:{paddingRight:30},[`.${E.hasPopupIcon}.${E.hasClearIcon}&`]:{paddingRight:56},[`& .${E.input}`]:{width:0,minWidth:30}},[`& .${k.c.root}`]:{paddingBottom:1,"& .MuiInput-input":{padding:"4px 4px 4px 0px"}},[`& .${k.c.root}.${L.c.sizeSmall}`]:{[`& .${k.c.input}`]:{padding:"2px 4px 3px 0"}},[`& .${A.c.root}`]:{padding:9,[`.${E.hasPopupIcon}&, .${E.hasClearIcon}&`]:{paddingRight:39},[`.${E.hasPopupIcon}.${E.hasClearIcon}&`]:{paddingRight:65},[`& .${E.input}`]:{padding:"7.5px 4px 7.5px 5px"},[`& .${E.endAdornment}`]:{right:9}},[`& .${A.c.root}.${L.c.sizeSmall}`]:{paddingTop:6,paddingBottom:6,paddingLeft:6,[`& .${E.input}`]:{padding:"2.5px 4px 2.5px 8px"}},[`& .${R.c.root}`]:{paddingTop:19,paddingLeft:8,[`.${E.hasPopupIcon}&, .${E.hasClearIcon}&`]:{paddingRight:39},[`.${E.hasPopupIcon}.${E.hasClearIcon}&`]:{paddingRight:65},[`& .${R.c.input}`]:{padding:"7px 4px"},[`& .${E.endAdornment}`]:{right:9}},[`& .${R.c.root}.${L.c.sizeSmall}`]:{paddingBottom:1,[`& .${R.c.input}`]:{padding:"2.5px 4px"}},[`& .${L.c.hiddenLabel}`]:{paddingTop:8},[`& .${R.c.root}.${L.c.hiddenLabel}`]:{paddingTop:0,paddingBottom:0,[`& .${E.input}`]:{paddingTop:16,paddingBottom:17}},[`& .${R.c.root}.${L.c.hiddenLabel}.${L.c.sizeSmall}`]:{[`& .${E.input}`]:{paddingTop:8,paddingBottom:9}},[`& .${E.input}`]:(0,r.c)({flexGrow:1,textOverflow:"ellipsis",opacity:0},e.inputFocused&&{opacity:1})}))),B=(0,h.cp)("div",{name:"MuiAutocomplete",slot:"EndAdornment",overridesResolver:(e,t)=>t.endAdornment})({position:"absolute",right:0,top:"calc(50% - 14px)"}),U=(0,h.cp)(w.c,{name:"MuiAutocomplete",slot:"ClearIndicator",overridesResolver:(e,t)=>t.clearIndicator})({marginRight:-2,padding:4,visibility:"hidden"}),q=(0,h.cp)(w.c,{name:"MuiAutocomplete",slot:"PopupIndicator",overridesResolver:({ownerState:e},t)=>(0,r.c)({},t.popupIndicator,e.popupOpen&&t.popupIndicatorOpen)})((({ownerState:e})=>(0,r.c)({padding:2,marginRight:-2},e.popupOpen&&{transform:"rotate(180deg)"}))),G=(0,h.cp)(f.c,{name:"MuiAutocomplete",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[{[`& .${E.option}`]:t.option},t.popper,o.disablePortal&&t.popperDisablePortal]}})((({theme:e,ownerState:t})=>(0,r.c)({zIndex:(e.vars||e).zIndex.modal},t.disablePortal&&{position:"absolute"}))),K=(0,h.cp)(T.c,{name:"MuiAutocomplete",slot:"Paper",overridesResolver:(e,t)=>t.paper})((({theme:e})=>(0,r.c)({},e.typography.body1,{overflow:"auto"}))),J=(0,h.cp)("div",{name:"MuiAutocomplete",slot:"Loading",overridesResolver:(e,t)=>t.loading})((({theme:e})=>({color:(e.vars||e).palette.text.secondary,padding:"14px 16px"}))),Y=(0,h.cp)("div",{name:"MuiAutocomplete",slot:"NoOptions",overridesResolver:(e,t)=>t.noOptions})((({theme:e})=>({color:(e.vars||e).palette.text.secondary,padding:"14px 16px"}))),_=(0,h.cp)("div",{name:"MuiAutocomplete",slot:"Listbox",overridesResolver:(e,t)=>t.listbox})((({theme:e})=>({listStyle:"none",margin:0,padding:"8px 0",maxHeight:"40vh",overflow:"auto",position:"relative",[`& .${E.option}`]:{minHeight:48,display:"flex",overflow:"hidden",justifyContent:"flex-start",alignItems:"center",cursor:"pointer",paddingTop:6,boxSizing:"border-box",outline:"0",WebkitTapHighlightColor:"transparent",paddingBottom:6,paddingLeft:16,paddingRight:16,[e.breakpoints.up("sm")]:{minHeight:"auto"},[`&.${E.focused}`]:{backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},'&[aria-disabled="true"]':{opacity:(e.vars||e).palette.action.disabledOpacity,pointerEvents:"none"},[`&.${E.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},'&[aria-selected="true"]':{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,g.W4)(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${E.focused}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:(0,g.W4)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:(e.vars||e).palette.action.selected}},[`&.${E.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:(0,g.W4)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}}}}))),X=(0,h.cp)(C,{name:"MuiAutocomplete",slot:"GroupLabel",overridesResolver:(e,t)=>t.groupLabel})((({theme:e})=>({backgroundColor:(e.vars||e).palette.background.paper,top:-8}))),Q=(0,h.cp)("ul",{name:"MuiAutocomplete",slot:"GroupUl",overridesResolver:(e,t)=>t.groupUl})({padding:0,[`& .${E.option}`]:{paddingLeft:24}}),Z=a.forwardRef((function(e,t){var o,l,i,c;const p=(0,b.c)({props:e,name:"MuiAutocomplete"}),{autoComplete:g=!1,autoHighlight:h=!1,autoSelect:v=!1,blurOnSelect:x=!1,ChipProps:y,className:I,clearIcon:$=D||(D=(0,O.jsx)(M.c,{fontSize:"small"})),clearOnBlur:S=!p.freeSolo,clearOnEscape:C=!1,clearText:w="Clear",closeText:k="Close",componentsProps:L={},defaultValue:A=(p.multiple?[]:null),disableClearable:R=!1,disableCloseOnSelect:E=!1,disabled:Z=!1,disabledItemsFocusable:ee=!1,disableListWrap:te=!1,disablePortal:oe=!1,filterSelectedOptions:ne=!1,forcePopupIcon:re="auto",freeSolo:ae=!1,fullWidth:le=!1,getLimitTagsText:ie=(e=>`+${e}`),getOptionLabel:se=(e=>{var t;return null!=(t=e.label)?t:e}),groupBy:ce,handleHomeEndKeys:pe=!p.freeSolo,includeInputInList:ue=!1,limitTags:de=-1,ListboxComponent:ge="ul",ListboxProps:fe,loading:he=!1,loadingText:be="Loading…",multiple:me=!1,noOptionsText:ve="No options",openOnFocus:xe=!1,openText:ye="Open",PaperComponent:Oe=T.c,PopperComponent:Ie=f.c,popupIcon:$e=z||(z=(0,O.jsx)(N.c,{})),readOnly:Se=!1,renderGroup:Ce,renderInput:Te,renderOption:we,renderTags:Pe,selectOnFocus:ke=!p.freeSolo,size:Le="medium",slotProps:Ae={}}=p,Re=(0,n.c)(p,V),{getRootProps:Me,getInputProps:Ne,getInputLabelProps:je,getPopupIndicatorProps:Ee,getClearProps:De,getTagProps:ze,getListboxProps:He,getOptionProps:Ve,value:Fe,dirty:We,expanded:Be,id:Ue,popupOpen:qe,focused:Ge,focusedTag:Ke,anchorEl:Je,setAnchorEl:Ye,inputValue:_e,groupedOptions:Xe}=(0,d.c)((0,r.c)({},p,{componentName:"Autocomplete"})),Qe=!R&&!Z&&We&&!Se,Ze=(!ae||!0===re)&&!1!==re,{onMouseDown:et}=Ne(),{ref:tt}=null!=fe?fe:{},ot=He(),{ref:nt}=ot,rt=(0,n.c)(ot,F),at=(0,H.c)(nt,tt),lt=(0,r.c)({},p,{disablePortal:oe,expanded:Be,focused:Ge,fullWidth:le,hasClearIcon:Qe,hasPopupIcon:Ze,inputFocused:-1===Ke,popupOpen:qe,size:Le}),it=(e=>{const{classes:t,disablePortal:o,expanded:n,focused:r,fullWidth:a,hasClearIcon:l,hasPopupIcon:i,inputFocused:s,popupOpen:c,size:p}=e,d={root:["root",n&&"expanded",r&&"focused",a&&"fullWidth",l&&"hasClearIcon",i&&"hasPopupIcon"],inputRoot:["inputRoot"],input:["input",s&&"inputFocused"],tag:["tag",`tagSize${(0,m.c)(p)}`],endAdornment:["endAdornment"],clearIndicator:["clearIndicator"],popupIndicator:["popupIndicator",c&&"popupIndicatorOpen"],popper:["popper",o&&"popperDisablePortal"],paper:["paper"],listbox:["listbox"],loading:["loading"],noOptions:["noOptions"],option:["option"],groupLabel:["groupLabel"],groupUl:["groupUl"]};return(0,u.c)(d,j,t)})(lt);let st;if(me&&Fe.length>0){const e=e=>(0,r.c)({className:it.tag,disabled:Z},ze(e));st=Pe?Pe(Fe,e,lt):Fe.map(((t,o)=>(0,O.jsx)(P.c,(0,r.c)({label:se(t),size:Le},e({index:o}),y))))}if(de>-1&&Array.isArray(st)){const e=st.length-de;!Ge&&e>0&&(st=st.splice(0,de),st.push((0,O.jsx)("span",{className:it.tag,children:ie(e)},st.length)))}const ct=Ce||(e=>(0,O.jsxs)("li",{children:[(0,O.jsx)(X,{className:it.groupLabel,ownerState:lt,component:"div",children:e.group}),(0,O.jsx)(Q,{className:it.groupUl,ownerState:lt,children:e.children})]},e.key)),pt=we||((e,t)=>(0,O.jsx)("li",(0,r.c)({},e,{children:se(t)}))),ut=(e,t)=>{const o=Ve({option:e,index:t});return pt((0,r.c)({},o,{className:it.option}),e,{selected:o["aria-selected"],index:t,inputValue:_e})},dt=null!=(o=Ae.clearIndicator)?o:L.clearIndicator,gt=null!=(l=Ae.paper)?l:L.paper,ft=null!=(i=Ae.popper)?i:L.popper,ht=null!=(c=Ae.popupIndicator)?c:L.popupIndicator;return(0,O.jsxs)(a.Fragment,{children:[(0,O.jsx)(W,(0,r.c)({ref:t,className:(0,s.c)(it.root,I),ownerState:lt},Me(Re),{children:Te({id:Ue,disabled:Z,fullWidth:!0,size:"small"===Le?"small":void 0,InputLabelProps:je(),InputProps:(0,r.c)({ref:Ye,className:it.inputRoot,startAdornment:st,onClick:e=>{e.target===e.currentTarget&&et(e)}},(Qe||Ze)&&{endAdornment:(0,O.jsxs)(B,{className:it.endAdornment,ownerState:lt,children:[Qe?(0,O.jsx)(U,(0,r.c)({},De(),{"aria-label":w,title:w,ownerState:lt},dt,{className:(0,s.c)(it.clearIndicator,null==dt?void 0:dt.className),children:$})):null,Ze?(0,O.jsx)(q,(0,r.c)({},Ee(),{disabled:Z,"aria-label":qe?k:ye,title:qe?k:ye,ownerState:lt},ht,{className:(0,s.c)(it.popupIndicator,null==ht?void 0:ht.className),children:$e})):null]})}),inputProps:(0,r.c)({className:it.input,disabled:Z,readOnly:Se},Ne())})})),Je?(0,O.jsx)(G,(0,r.c)({as:Ie,disablePortal:oe,style:{width:Je?Je.clientWidth:null},ownerState:lt,role:"presentation",anchorEl:Je,open:qe},ft,{className:(0,s.c)(it.popper,null==ft?void 0:ft.className),children:(0,O.jsxs)(K,(0,r.c)({ownerState:lt,as:Oe},gt,{className:(0,s.c)(it.paper,null==gt?void 0:gt.className),children:[he&&0===Xe.length?(0,O.jsx)(J,{className:it.loading,ownerState:lt,children:be}):null,0!==Xe.length||ae||he?null:(0,O.jsx)(Y,{className:it.noOptions,ownerState:lt,role:"presentation",onMouseDown:e=>{e.preventDefault()},children:ve}),Xe.length>0?(0,O.jsx)(_,(0,r.c)({as:ge,className:it.listbox,ownerState:lt},rt,fe,{ref:at,children:Xe.map(((e,t)=>ce?ct({key:e.key,group:e.group,children:e.options.map(((t,o)=>ut(t,e.index+o)))}):ut(e,t)))})):null]}))})):null]})}));Z.propTypes={autoComplete:i().bool,autoHighlight:i().bool,autoSelect:i().bool,blurOnSelect:i().oneOfType([i().oneOf(["mouse","touch"]),i().bool]),ChipProps:i().object,classes:i().object,className:i().string,clearIcon:i().node,clearOnBlur:i().bool,clearOnEscape:i().bool,clearText:i().string,closeText:i().string,componentsProps:i().shape({clearIndicator:i().object,paper:i().object,popper:i().object,popupIndicator:i().object}),defaultValue:(0,c.c)(i().any,(e=>e.multiple&&void 0!==e.defaultValue&&!Array.isArray(e.defaultValue)?new Error(["MUI: The Autocomplete expects the `defaultValue` prop to be an array when `multiple={true}` or undefined.",`However, ${e.defaultValue} was provided.`].join("\n")):null)),disableClearable:i().bool,disableCloseOnSelect:i().bool,disabled:i().bool,disabledItemsFocusable:i().bool,disableListWrap:i().bool,disablePortal:i().bool,filterOptions:i().func,filterSelectedOptions:i().bool,forcePopupIcon:i().oneOfType([i().oneOf(["auto"]),i().bool]),freeSolo:i().bool,fullWidth:i().bool,getLimitTagsText:i().func,getOptionDisabled:i().func,getOptionLabel:i().func,groupBy:i().func,handleHomeEndKeys:i().bool,id:i().string,includeInputInList:i().bool,inputValue:i().string,isOptionEqualToValue:i().func,limitTags:p.c,ListboxComponent:i().elementType,ListboxProps:i().object,loading:i().bool,loadingText:i().node,multiple:i().bool,noOptionsText:i().node,onChange:i().func,onClose:i().func,onHighlightChange:i().func,onInputChange:i().func,onOpen:i().func,open:i().bool,openOnFocus:i().bool,openText:i().string,options:i().array.isRequired,PaperComponent:i().elementType,PopperComponent:i().elementType,popupIcon:i().node,readOnly:i().bool,renderGroup:i().func,renderInput:i().func.isRequired,renderOption:i().func,renderTags:i().func,selectOnFocus:i().bool,size:i().oneOfType([i().oneOf(["small","medium"]),i().string]),slotProps:i().shape({clearIndicator:i().object,paper:i().object,popper:i().object,popupIndicator:i().object}),sx:i().oneOfType([i().arrayOf(i().oneOfType([i().func,i().object,i().bool])),i().func,i().object]),value:(0,c.c)(i().any,(e=>e.multiple&&void 0!==e.value&&!Array.isArray(e.value)?new Error(["MUI: The Autocomplete expects the `value` prop to be an array when `multiple={true}` or undefined.",`However, ${e.value} was provided.`].join("\n")):null))};const ee=Z},1004:(e,t,o)=>{o.d(t,{c:()=>r});var n=o(1504);const r=e=>{const t=n.useRef({});return n.useEffect((()=>{t.current=e})),t.current}}}]);