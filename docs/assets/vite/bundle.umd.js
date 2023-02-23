(function(b){typeof define=="function"&&define.amd?define(b):b()})(function(){"use strict";var Fi=Object.defineProperty;var qi=(b,N,$)=>N in b?Fi(b,N,{enumerable:!0,configurable:!0,writable:!0,value:$}):b[N]=$;var ut=(b,N,$)=>(qi(b,typeof N!="symbol"?N+"":N,$),$);const b="";var N={value:()=>{}};function $(){for(var t=0,n=arguments.length,e={},r;t<n;++t){if(!(r=arguments[t]+"")||r in e||/[\s.]/.test(r))throw new Error("illegal type: "+r);e[r]=[]}return new G(e)}function G(t){this._=t}function _n(t,n){return t.trim().split(/^|\s+/).map(function(e){var r="",i=e.indexOf(".");if(i>=0&&(r=e.slice(i+1),e=e.slice(0,i)),e&&!n.hasOwnProperty(e))throw new Error("unknown type: "+e);return{type:e,name:r}})}G.prototype=$.prototype={constructor:G,on:function(t,n){var e=this._,r=_n(t+"",e),i,o=-1,s=r.length;if(arguments.length<2){for(;++o<s;)if((i=(t=r[o]).type)&&(i=gn(e[i],t.name)))return i;return}if(n!=null&&typeof n!="function")throw new Error("invalid callback: "+n);for(;++o<s;)if(i=(t=r[o]).type)e[i]=kt(e[i],t.name,n);else if(n==null)for(i in e)e[i]=kt(e[i],t.name,null);return this},copy:function(){var t={},n=this._;for(var e in n)t[e]=n[e].slice();return new G(t)},call:function(t,n){if((i=arguments.length-2)>0)for(var e=new Array(i),r=0,i,o;r<i;++r)e[r]=arguments[r+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(o=this._[t],r=0,i=o.length;r<i;++r)o[r].value.apply(n,e)},apply:function(t,n,e){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var r=this._[t],i=0,o=r.length;i<o;++i)r[i].value.apply(n,e)}};function gn(t,n){for(var e=0,r=t.length,i;e<r;++e)if((i=t[e]).name===n)return i.value}function kt(t,n,e){for(var r=0,i=t.length;r<i;++r)if(t[r].name===n){t[r]=N,t=t.slice(0,r).concat(t.slice(r+1));break}return e!=null&&t.push({name:n,value:e}),t}var lt="http://www.w3.org/1999/xhtml";const $t={svg:"http://www.w3.org/2000/svg",xhtml:lt,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function U(t){var n=t+="",e=n.indexOf(":");return e>=0&&(n=t.slice(0,e))!=="xmlns"&&(t=t.slice(e+1)),$t.hasOwnProperty(n)?{space:$t[n],local:t}:t}function yn(t){return function(){var n=this.ownerDocument,e=this.namespaceURI;return e===lt&&n.documentElement.namespaceURI===lt?n.createElement(t):n.createElementNS(e,t)}}function wn(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function St(t){var n=U(t);return(n.local?wn:yn)(n)}function xn(){}function ft(t){return t==null?xn:function(){return this.querySelector(t)}}function vn(t){typeof t!="function"&&(t=ft(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o=n[i],s=o.length,a=r[i]=new Array(s),u,l,f=0;f<s;++f)(u=o[f])&&(l=t.call(u,u.__data__,f,o))&&("__data__"in u&&(l.__data__=u.__data__),a[f]=l);return new y(r,this._parents)}function mn(t){return t==null?[]:Array.isArray(t)?t:Array.from(t)}function bn(){return[]}function Et(t){return t==null?bn:function(){return this.querySelectorAll(t)}}function Nn(t){return function(){return mn(t.apply(this,arguments))}}function An(t){typeof t=="function"?t=Nn(t):t=Et(t);for(var n=this._groups,e=n.length,r=[],i=[],o=0;o<e;++o)for(var s=n[o],a=s.length,u,l=0;l<a;++l)(u=s[l])&&(r.push(t.call(u,u.__data__,l,s)),i.push(u));return new y(r,i)}function Ct(t){return function(){return this.matches(t)}}function Tt(t){return function(n){return n.matches(t)}}var kn=Array.prototype.find;function $n(t){return function(){return kn.call(this.children,t)}}function Sn(){return this.firstElementChild}function En(t){return this.select(t==null?Sn:$n(typeof t=="function"?t:Tt(t)))}var Cn=Array.prototype.filter;function Tn(){return Array.from(this.children)}function Mn(t){return function(){return Cn.call(this.children,t)}}function Rn(t){return this.selectAll(t==null?Tn:Mn(typeof t=="function"?t:Tt(t)))}function In(t){typeof t!="function"&&(t=Ct(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o=n[i],s=o.length,a=r[i]=[],u,l=0;l<s;++l)(u=o[l])&&t.call(u,u.__data__,l,o)&&a.push(u);return new y(r,this._parents)}function Mt(t){return new Array(t.length)}function Fn(){return new y(this._enter||this._groups.map(Mt),this._parents)}function K(t,n){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=n}K.prototype={constructor:K,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,n){return this._parent.insertBefore(t,n)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};function qn(t){return function(){return t}}function Hn(t,n,e,r,i,o){for(var s=0,a,u=n.length,l=o.length;s<l;++s)(a=n[s])?(a.__data__=o[s],r[s]=a):e[s]=new K(t,o[s]);for(;s<u;++s)(a=n[s])&&(i[s]=a)}function Dn(t,n,e,r,i,o,s){var a,u,l=new Map,f=n.length,c=o.length,h=new Array(f),d;for(a=0;a<f;++a)(u=n[a])&&(h[a]=d=s.call(u,u.__data__,a,n)+"",l.has(d)?i[a]=u:l.set(d,u));for(a=0;a<c;++a)d=s.call(t,o[a],a,o)+"",(u=l.get(d))?(r[a]=u,u.__data__=o[a],l.delete(d)):e[a]=new K(t,o[a]);for(a=0;a<f;++a)(u=n[a])&&l.get(h[a])===u&&(i[a]=u)}function Xn(t){return t.__data__}function On(t,n){if(!arguments.length)return Array.from(this,Xn);var e=n?Dn:Hn,r=this._parents,i=this._groups;typeof t!="function"&&(t=qn(t));for(var o=i.length,s=new Array(o),a=new Array(o),u=new Array(o),l=0;l<o;++l){var f=r[l],c=i[l],h=c.length,d=Ln(t.call(f,f&&f.__data__,l,r)),p=d.length,_=a[l]=new Array(p),M=s[l]=new Array(p),Ii=u[l]=new Array(h);e(f,c,_,M,Ii,d,n);for(var z=0,at=0,dn,pn;z<p;++z)if(dn=_[z]){for(z>=at&&(at=z+1);!(pn=M[at])&&++at<p;);dn._next=pn||null}}return s=new y(s,r),s._enter=a,s._exit=u,s}function Ln(t){return typeof t=="object"&&"length"in t?t:Array.from(t)}function Pn(){return new y(this._exit||this._groups.map(Mt),this._parents)}function Vn(t,n,e){var r=this.enter(),i=this,o=this.exit();return typeof t=="function"?(r=t(r),r&&(r=r.selection())):r=r.append(t+""),n!=null&&(i=n(i),i&&(i=i.selection())),e==null?o.remove():e(o),r&&i?r.merge(i).order():i}function Yn(t){for(var n=t.selection?t.selection():t,e=this._groups,r=n._groups,i=e.length,o=r.length,s=Math.min(i,o),a=new Array(i),u=0;u<s;++u)for(var l=e[u],f=r[u],c=l.length,h=a[u]=new Array(c),d,p=0;p<c;++p)(d=l[p]||f[p])&&(h[p]=d);for(;u<i;++u)a[u]=e[u];return new y(a,this._parents)}function Bn(){for(var t=this._groups,n=-1,e=t.length;++n<e;)for(var r=t[n],i=r.length-1,o=r[i],s;--i>=0;)(s=r[i])&&(o&&s.compareDocumentPosition(o)^4&&o.parentNode.insertBefore(s,o),o=s);return this}function zn(t){t||(t=Gn);function n(c,h){return c&&h?t(c.__data__,h.__data__):!c-!h}for(var e=this._groups,r=e.length,i=new Array(r),o=0;o<r;++o){for(var s=e[o],a=s.length,u=i[o]=new Array(a),l,f=0;f<a;++f)(l=s[f])&&(u[f]=l);u.sort(n)}return new y(i,this._parents).order()}function Gn(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}function Un(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this}function Kn(){return Array.from(this)}function Wn(){for(var t=this._groups,n=0,e=t.length;n<e;++n)for(var r=t[n],i=0,o=r.length;i<o;++i){var s=r[i];if(s)return s}return null}function Jn(){let t=0;for(const n of this)++t;return t}function Qn(){return!this.node()}function Zn(t){for(var n=this._groups,e=0,r=n.length;e<r;++e)for(var i=n[e],o=0,s=i.length,a;o<s;++o)(a=i[o])&&t.call(a,a.__data__,o,i);return this}function jn(t){return function(){this.removeAttribute(t)}}function te(t){return function(){this.removeAttributeNS(t.space,t.local)}}function ne(t,n){return function(){this.setAttribute(t,n)}}function ee(t,n){return function(){this.setAttributeNS(t.space,t.local,n)}}function re(t,n){return function(){var e=n.apply(this,arguments);e==null?this.removeAttribute(t):this.setAttribute(t,e)}}function ie(t,n){return function(){var e=n.apply(this,arguments);e==null?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,e)}}function oe(t,n){var e=U(t);if(arguments.length<2){var r=this.node();return e.local?r.getAttributeNS(e.space,e.local):r.getAttribute(e)}return this.each((n==null?e.local?te:jn:typeof n=="function"?e.local?ie:re:e.local?ee:ne)(e,n))}function Rt(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView}function se(t){return function(){this.style.removeProperty(t)}}function ae(t,n,e){return function(){this.style.setProperty(t,n,e)}}function ue(t,n,e){return function(){var r=n.apply(this,arguments);r==null?this.style.removeProperty(t):this.style.setProperty(t,r,e)}}function le(t,n,e){return arguments.length>1?this.each((n==null?se:typeof n=="function"?ue:ae)(t,n,e??"")):R(this.node(),t)}function R(t,n){return t.style.getPropertyValue(n)||Rt(t).getComputedStyle(t,null).getPropertyValue(n)}function fe(t){return function(){delete this[t]}}function ce(t,n){return function(){this[t]=n}}function he(t,n){return function(){var e=n.apply(this,arguments);e==null?delete this[t]:this[t]=e}}function de(t,n){return arguments.length>1?this.each((n==null?fe:typeof n=="function"?he:ce)(t,n)):this.node()[t]}function It(t){return t.trim().split(/^|\s+/)}function ct(t){return t.classList||new Ft(t)}function Ft(t){this._node=t,this._names=It(t.getAttribute("class")||"")}Ft.prototype={add:function(t){var n=this._names.indexOf(t);n<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var n=this._names.indexOf(t);n>=0&&(this._names.splice(n,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};function qt(t,n){for(var e=ct(t),r=-1,i=n.length;++r<i;)e.add(n[r])}function Ht(t,n){for(var e=ct(t),r=-1,i=n.length;++r<i;)e.remove(n[r])}function pe(t){return function(){qt(this,t)}}function _e(t){return function(){Ht(this,t)}}function ge(t,n){return function(){(n.apply(this,arguments)?qt:Ht)(this,t)}}function ye(t,n){var e=It(t+"");if(arguments.length<2){for(var r=ct(this.node()),i=-1,o=e.length;++i<o;)if(!r.contains(e[i]))return!1;return!0}return this.each((typeof n=="function"?ge:n?pe:_e)(e,n))}function we(){this.textContent=""}function xe(t){return function(){this.textContent=t}}function ve(t){return function(){var n=t.apply(this,arguments);this.textContent=n??""}}function me(t){return arguments.length?this.each(t==null?we:(typeof t=="function"?ve:xe)(t)):this.node().textContent}function be(){this.innerHTML=""}function Ne(t){return function(){this.innerHTML=t}}function Ae(t){return function(){var n=t.apply(this,arguments);this.innerHTML=n??""}}function ke(t){return arguments.length?this.each(t==null?be:(typeof t=="function"?Ae:Ne)(t)):this.node().innerHTML}function $e(){this.nextSibling&&this.parentNode.appendChild(this)}function Se(){return this.each($e)}function Ee(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Ce(){return this.each(Ee)}function Te(t){var n=typeof t=="function"?t:St(t);return this.select(function(){return this.appendChild(n.apply(this,arguments))})}function Me(){return null}function Re(t,n){var e=typeof t=="function"?t:St(t),r=n==null?Me:typeof n=="function"?n:ft(n);return this.select(function(){return this.insertBefore(e.apply(this,arguments),r.apply(this,arguments)||null)})}function Ie(){var t=this.parentNode;t&&t.removeChild(this)}function Fe(){return this.each(Ie)}function qe(){var t=this.cloneNode(!1),n=this.parentNode;return n?n.insertBefore(t,this.nextSibling):t}function He(){var t=this.cloneNode(!0),n=this.parentNode;return n?n.insertBefore(t,this.nextSibling):t}function De(t){return this.select(t?He:qe)}function Xe(t){return arguments.length?this.property("__data__",t):this.node().__data__}function Oe(t){return function(n){t.call(this,n,this.__data__)}}function Le(t){return t.trim().split(/^|\s+/).map(function(n){var e="",r=n.indexOf(".");return r>=0&&(e=n.slice(r+1),n=n.slice(0,r)),{type:n,name:e}})}function Pe(t){return function(){var n=this.__on;if(n){for(var e=0,r=-1,i=n.length,o;e<i;++e)o=n[e],(!t.type||o.type===t.type)&&o.name===t.name?this.removeEventListener(o.type,o.listener,o.options):n[++r]=o;++r?n.length=r:delete this.__on}}}function Ve(t,n,e){return function(){var r=this.__on,i,o=Oe(n);if(r){for(var s=0,a=r.length;s<a;++s)if((i=r[s]).type===t.type&&i.name===t.name){this.removeEventListener(i.type,i.listener,i.options),this.addEventListener(i.type,i.listener=o,i.options=e),i.value=n;return}}this.addEventListener(t.type,o,e),i={type:t.type,name:t.name,value:n,listener:o,options:e},r?r.push(i):this.__on=[i]}}function Ye(t,n,e){var r=Le(t+""),i,o=r.length,s;if(arguments.length<2){var a=this.node().__on;if(a){for(var u=0,l=a.length,f;u<l;++u)for(i=0,f=a[u];i<o;++i)if((s=r[i]).type===f.type&&s.name===f.name)return f.value}return}for(a=n?Ve:Pe,i=0;i<o;++i)this.each(a(r[i],n,e));return this}function Dt(t,n,e){var r=Rt(t),i=r.CustomEvent;typeof i=="function"?i=new i(n,e):(i=r.document.createEvent("Event"),e?(i.initEvent(n,e.bubbles,e.cancelable),i.detail=e.detail):i.initEvent(n,!1,!1)),t.dispatchEvent(i)}function Be(t,n){return function(){return Dt(this,t,n)}}function ze(t,n){return function(){return Dt(this,t,n.apply(this,arguments))}}function Ge(t,n){return this.each((typeof n=="function"?ze:Be)(t,n))}function*Ue(){for(var t=this._groups,n=0,e=t.length;n<e;++n)for(var r=t[n],i=0,o=r.length,s;i<o;++i)(s=r[i])&&(yield s)}var Xt=[null];function y(t,n){this._groups=t,this._parents=n}function q(){return new y([[document.documentElement]],Xt)}function Ke(){return this}y.prototype=q.prototype={constructor:y,select:vn,selectAll:An,selectChild:En,selectChildren:Rn,filter:In,data:On,enter:Fn,exit:Pn,join:Vn,merge:Yn,selection:Ke,order:Bn,sort:zn,call:Un,nodes:Kn,node:Wn,size:Jn,empty:Qn,each:Zn,attr:oe,style:le,property:de,classed:ye,text:me,html:ke,raise:Se,lower:Ce,append:Te,insert:Re,remove:Fe,clone:De,datum:Xe,on:Ye,dispatch:Ge,[Symbol.iterator]:Ue};function We(t){return typeof t=="string"?new y([[document.querySelector(t)]],[document.documentElement]):new y([[t]],Xt)}function ht(t,n,e){t.prototype=n.prototype=e,e.constructor=t}function Ot(t,n){var e=Object.create(t.prototype);for(var r in n)e[r]=n[r];return e}function H(){}var D=.7,W=1/D,I="\\s*([+-]?\\d+)\\s*",X="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",v="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Je=/^#([0-9a-f]{3,8})$/,Qe=new RegExp(`^rgb\\(${I},${I},${I}\\)$`),Ze=new RegExp(`^rgb\\(${v},${v},${v}\\)$`),je=new RegExp(`^rgba\\(${I},${I},${I},${X}\\)$`),tr=new RegExp(`^rgba\\(${v},${v},${v},${X}\\)$`),nr=new RegExp(`^hsl\\(${X},${v},${v}\\)$`),er=new RegExp(`^hsla\\(${X},${v},${v},${X}\\)$`),Lt={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};ht(H,O,{copy(t){return Object.assign(new this.constructor,this,t)},displayable(){return this.rgb().displayable()},hex:Pt,formatHex:Pt,formatHex8:rr,formatHsl:ir,formatRgb:Vt,toString:Vt});function Pt(){return this.rgb().formatHex()}function rr(){return this.rgb().formatHex8()}function ir(){return Ut(this).formatHsl()}function Vt(){return this.rgb().formatRgb()}function O(t){var n,e;return t=(t+"").trim().toLowerCase(),(n=Je.exec(t))?(e=n[1].length,n=parseInt(n[1],16),e===6?Yt(n):e===3?new g(n>>8&15|n>>4&240,n>>4&15|n&240,(n&15)<<4|n&15,1):e===8?J(n>>24&255,n>>16&255,n>>8&255,(n&255)/255):e===4?J(n>>12&15|n>>8&240,n>>8&15|n>>4&240,n>>4&15|n&240,((n&15)<<4|n&15)/255):null):(n=Qe.exec(t))?new g(n[1],n[2],n[3],1):(n=Ze.exec(t))?new g(n[1]*255/100,n[2]*255/100,n[3]*255/100,1):(n=je.exec(t))?J(n[1],n[2],n[3],n[4]):(n=tr.exec(t))?J(n[1]*255/100,n[2]*255/100,n[3]*255/100,n[4]):(n=nr.exec(t))?Gt(n[1],n[2]/100,n[3]/100,1):(n=er.exec(t))?Gt(n[1],n[2]/100,n[3]/100,n[4]):Lt.hasOwnProperty(t)?Yt(Lt[t]):t==="transparent"?new g(NaN,NaN,NaN,0):null}function Yt(t){return new g(t>>16&255,t>>8&255,t&255,1)}function J(t,n,e,r){return r<=0&&(t=n=e=NaN),new g(t,n,e,r)}function or(t){return t instanceof H||(t=O(t)),t?(t=t.rgb(),new g(t.r,t.g,t.b,t.opacity)):new g}function dt(t,n,e,r){return arguments.length===1?or(t):new g(t,n,e,r??1)}function g(t,n,e,r){this.r=+t,this.g=+n,this.b=+e,this.opacity=+r}ht(g,dt,Ot(H,{brighter(t){return t=t==null?W:Math.pow(W,t),new g(this.r*t,this.g*t,this.b*t,this.opacity)},darker(t){return t=t==null?D:Math.pow(D,t),new g(this.r*t,this.g*t,this.b*t,this.opacity)},rgb(){return this},clamp(){return new g(E(this.r),E(this.g),E(this.b),Q(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Bt,formatHex:Bt,formatHex8:sr,formatRgb:zt,toString:zt}));function Bt(){return`#${C(this.r)}${C(this.g)}${C(this.b)}`}function sr(){return`#${C(this.r)}${C(this.g)}${C(this.b)}${C((isNaN(this.opacity)?1:this.opacity)*255)}`}function zt(){const t=Q(this.opacity);return`${t===1?"rgb(":"rgba("}${E(this.r)}, ${E(this.g)}, ${E(this.b)}${t===1?")":`, ${t})`}`}function Q(t){return isNaN(t)?1:Math.max(0,Math.min(1,t))}function E(t){return Math.max(0,Math.min(255,Math.round(t)||0))}function C(t){return t=E(t),(t<16?"0":"")+t.toString(16)}function Gt(t,n,e,r){return r<=0?t=n=e=NaN:e<=0||e>=1?t=n=NaN:n<=0&&(t=NaN),new w(t,n,e,r)}function Ut(t){if(t instanceof w)return new w(t.h,t.s,t.l,t.opacity);if(t instanceof H||(t=O(t)),!t)return new w;if(t instanceof w)return t;t=t.rgb();var n=t.r/255,e=t.g/255,r=t.b/255,i=Math.min(n,e,r),o=Math.max(n,e,r),s=NaN,a=o-i,u=(o+i)/2;return a?(n===o?s=(e-r)/a+(e<r)*6:e===o?s=(r-n)/a+2:s=(n-e)/a+4,a/=u<.5?o+i:2-o-i,s*=60):a=u>0&&u<1?0:s,new w(s,a,u,t.opacity)}function ar(t,n,e,r){return arguments.length===1?Ut(t):new w(t,n,e,r??1)}function w(t,n,e,r){this.h=+t,this.s=+n,this.l=+e,this.opacity=+r}ht(w,ar,Ot(H,{brighter(t){return t=t==null?W:Math.pow(W,t),new w(this.h,this.s,this.l*t,this.opacity)},darker(t){return t=t==null?D:Math.pow(D,t),new w(this.h,this.s,this.l*t,this.opacity)},rgb(){var t=this.h%360+(this.h<0)*360,n=isNaN(t)||isNaN(this.s)?0:this.s,e=this.l,r=e+(e<.5?e:1-e)*n,i=2*e-r;return new g(pt(t>=240?t-240:t+120,i,r),pt(t,i,r),pt(t<120?t+240:t-120,i,r),this.opacity)},clamp(){return new w(Kt(this.h),Z(this.s),Z(this.l),Q(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const t=Q(this.opacity);return`${t===1?"hsl(":"hsla("}${Kt(this.h)}, ${Z(this.s)*100}%, ${Z(this.l)*100}%${t===1?")":`, ${t})`}`}}));function Kt(t){return t=(t||0)%360,t<0?t+360:t}function Z(t){return Math.max(0,Math.min(1,t||0))}function pt(t,n,e){return(t<60?n+(e-n)*t/60:t<180?e:t<240?n+(e-n)*(240-t)/60:n)*255}const Wt=t=>()=>t;function ur(t,n){return function(e){return t+e*n}}function lr(t,n,e){return t=Math.pow(t,e),n=Math.pow(n,e)-t,e=1/e,function(r){return Math.pow(t+r*n,e)}}function fr(t){return(t=+t)==1?Jt:function(n,e){return e-n?lr(n,e,t):Wt(isNaN(n)?e:n)}}function Jt(t,n){var e=n-t;return e?ur(t,e):Wt(isNaN(t)?n:t)}const Qt=function t(n){var e=fr(n);function r(i,o){var s=e((i=dt(i)).r,(o=dt(o)).r),a=e(i.g,o.g),u=e(i.b,o.b),l=Jt(i.opacity,o.opacity);return function(f){return i.r=s(f),i.g=a(f),i.b=u(f),i.opacity=l(f),i+""}}return r.gamma=t,r}(1);function S(t,n){return t=+t,n=+n,function(e){return t*(1-e)+n*e}}var _t=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,gt=new RegExp(_t.source,"g");function cr(t){return function(){return t}}function hr(t){return function(n){return t(n)+""}}function dr(t,n){var e=_t.lastIndex=gt.lastIndex=0,r,i,o,s=-1,a=[],u=[];for(t=t+"",n=n+"";(r=_t.exec(t))&&(i=gt.exec(n));)(o=i.index)>e&&(o=n.slice(e,o),a[s]?a[s]+=o:a[++s]=o),(r=r[0])===(i=i[0])?a[s]?a[s]+=i:a[++s]=i:(a[++s]=null,u.push({i:s,x:S(r,i)})),e=gt.lastIndex;return e<n.length&&(o=n.slice(e),a[s]?a[s]+=o:a[++s]=o),a.length<2?u[0]?hr(u[0].x):cr(n):(n=u.length,function(l){for(var f=0,c;f<n;++f)a[(c=u[f]).i]=c.x(l);return a.join("")})}var Zt=180/Math.PI,yt={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function jt(t,n,e,r,i,o){var s,a,u;return(s=Math.sqrt(t*t+n*n))&&(t/=s,n/=s),(u=t*e+n*r)&&(e-=t*u,r-=n*u),(a=Math.sqrt(e*e+r*r))&&(e/=a,r/=a,u/=a),t*r<n*e&&(t=-t,n=-n,u=-u,s=-s),{translateX:i,translateY:o,rotate:Math.atan2(n,t)*Zt,skewX:Math.atan(u)*Zt,scaleX:s,scaleY:a}}var j;function pr(t){const n=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(t+"");return n.isIdentity?yt:jt(n.a,n.b,n.c,n.d,n.e,n.f)}function _r(t){return t==null||(j||(j=document.createElementNS("http://www.w3.org/2000/svg","g")),j.setAttribute("transform",t),!(t=j.transform.baseVal.consolidate()))?yt:(t=t.matrix,jt(t.a,t.b,t.c,t.d,t.e,t.f))}function tn(t,n,e,r){function i(l){return l.length?l.pop()+" ":""}function o(l,f,c,h,d,p){if(l!==c||f!==h){var _=d.push("translate(",null,n,null,e);p.push({i:_-4,x:S(l,c)},{i:_-2,x:S(f,h)})}else(c||h)&&d.push("translate("+c+n+h+e)}function s(l,f,c,h){l!==f?(l-f>180?f+=360:f-l>180&&(l+=360),h.push({i:c.push(i(c)+"rotate(",null,r)-2,x:S(l,f)})):f&&c.push(i(c)+"rotate("+f+r)}function a(l,f,c,h){l!==f?h.push({i:c.push(i(c)+"skewX(",null,r)-2,x:S(l,f)}):f&&c.push(i(c)+"skewX("+f+r)}function u(l,f,c,h,d,p){if(l!==c||f!==h){var _=d.push(i(d)+"scale(",null,",",null,")");p.push({i:_-4,x:S(l,c)},{i:_-2,x:S(f,h)})}else(c!==1||h!==1)&&d.push(i(d)+"scale("+c+","+h+")")}return function(l,f){var c=[],h=[];return l=t(l),f=t(f),o(l.translateX,l.translateY,f.translateX,f.translateY,c,h),s(l.rotate,f.rotate,c,h),a(l.skewX,f.skewX,c,h),u(l.scaleX,l.scaleY,f.scaleX,f.scaleY,c,h),l=f=null,function(d){for(var p=-1,_=h.length,M;++p<_;)c[(M=h[p]).i]=M.x(d);return c.join("")}}}var gr=tn(pr,"px, ","px)","deg)"),yr=tn(_r,", ",")",")"),F=0,L=0,P=0,nn=1e3,tt,V,nt=0,T=0,et=0,Y=typeof performance=="object"&&performance.now?performance:Date,en=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){setTimeout(t,17)};function wt(){return T||(en(wr),T=Y.now()+et)}function wr(){T=0}function rt(){this._call=this._time=this._next=null}rt.prototype=rn.prototype={constructor:rt,restart:function(t,n,e){if(typeof t!="function")throw new TypeError("callback is not a function");e=(e==null?wt():+e)+(n==null?0:+n),!this._next&&V!==this&&(V?V._next=this:tt=this,V=this),this._call=t,this._time=e,xt()},stop:function(){this._call&&(this._call=null,this._time=1/0,xt())}};function rn(t,n,e){var r=new rt;return r.restart(t,n,e),r}function xr(){wt(),++F;for(var t=tt,n;t;)(n=T-t._time)>=0&&t._call.call(void 0,n),t=t._next;--F}function on(){T=(nt=Y.now())+et,F=L=0;try{xr()}finally{F=0,mr(),T=0}}function vr(){var t=Y.now(),n=t-nt;n>nn&&(et-=n,nt=t)}function mr(){for(var t,n=tt,e,r=1/0;n;)n._call?(r>n._time&&(r=n._time),t=n,n=n._next):(e=n._next,n._next=null,n=t?t._next=e:tt=e);V=t,xt(r)}function xt(t){if(!F){L&&(L=clearTimeout(L));var n=t-T;n>24?(t<1/0&&(L=setTimeout(on,t-Y.now()-et)),P&&(P=clearInterval(P))):(P||(nt=Y.now(),P=setInterval(vr,nn)),F=1,en(on))}}function sn(t,n,e){var r=new rt;return n=n==null?0:+n,r.restart(i=>{r.stop(),t(i+n)},n,e),r}var br=$("start","end","cancel","interrupt"),Nr=[],an=0,un=1,vt=2,it=3,ln=4,mt=5,ot=6;function st(t,n,e,r,i,o){var s=t.__transition;if(!s)t.__transition={};else if(e in s)return;Ar(t,e,{name:n,index:r,group:i,on:br,tween:Nr,time:o.time,delay:o.delay,duration:o.duration,ease:o.ease,timer:null,state:an})}function bt(t,n){var e=x(t,n);if(e.state>an)throw new Error("too late; already scheduled");return e}function m(t,n){var e=x(t,n);if(e.state>it)throw new Error("too late; already running");return e}function x(t,n){var e=t.__transition;if(!e||!(e=e[n]))throw new Error("transition not found");return e}function Ar(t,n,e){var r=t.__transition,i;r[n]=e,e.timer=rn(o,0,e.time);function o(l){e.state=un,e.timer.restart(s,e.delay,e.time),e.delay<=l&&s(l-e.delay)}function s(l){var f,c,h,d;if(e.state!==un)return u();for(f in r)if(d=r[f],d.name===e.name){if(d.state===it)return sn(s);d.state===ln?(d.state=ot,d.timer.stop(),d.on.call("interrupt",t,t.__data__,d.index,d.group),delete r[f]):+f<n&&(d.state=ot,d.timer.stop(),d.on.call("cancel",t,t.__data__,d.index,d.group),delete r[f])}if(sn(function(){e.state===it&&(e.state=ln,e.timer.restart(a,e.delay,e.time),a(l))}),e.state=vt,e.on.call("start",t,t.__data__,e.index,e.group),e.state===vt){for(e.state=it,i=new Array(h=e.tween.length),f=0,c=-1;f<h;++f)(d=e.tween[f].value.call(t,t.__data__,e.index,e.group))&&(i[++c]=d);i.length=c+1}}function a(l){for(var f=l<e.duration?e.ease.call(null,l/e.duration):(e.timer.restart(u),e.state=mt,1),c=-1,h=i.length;++c<h;)i[c].call(t,f);e.state===mt&&(e.on.call("end",t,t.__data__,e.index,e.group),u())}function u(){e.state=ot,e.timer.stop(),delete r[n];for(var l in r)return;delete t.__transition}}function kr(t,n){var e=t.__transition,r,i,o=!0,s;if(e){n=n==null?null:n+"";for(s in e){if((r=e[s]).name!==n){o=!1;continue}i=r.state>vt&&r.state<mt,r.state=ot,r.timer.stop(),r.on.call(i?"interrupt":"cancel",t,t.__data__,r.index,r.group),delete e[s]}o&&delete t.__transition}}function $r(t){return this.each(function(){kr(this,t)})}function Sr(t,n){var e,r;return function(){var i=m(this,t),o=i.tween;if(o!==e){r=e=o;for(var s=0,a=r.length;s<a;++s)if(r[s].name===n){r=r.slice(),r.splice(s,1);break}}i.tween=r}}function Er(t,n,e){var r,i;if(typeof e!="function")throw new Error;return function(){var o=m(this,t),s=o.tween;if(s!==r){i=(r=s).slice();for(var a={name:n,value:e},u=0,l=i.length;u<l;++u)if(i[u].name===n){i[u]=a;break}u===l&&i.push(a)}o.tween=i}}function Cr(t,n){var e=this._id;if(t+="",arguments.length<2){for(var r=x(this.node(),e).tween,i=0,o=r.length,s;i<o;++i)if((s=r[i]).name===t)return s.value;return null}return this.each((n==null?Sr:Er)(e,t,n))}function Nt(t,n,e){var r=t._id;return t.each(function(){var i=m(this,r);(i.value||(i.value={}))[n]=e.apply(this,arguments)}),function(i){return x(i,r).value[n]}}function fn(t,n){var e;return(typeof n=="number"?S:n instanceof O?Qt:(e=O(n))?(n=e,Qt):dr)(t,n)}function Tr(t){return function(){this.removeAttribute(t)}}function Mr(t){return function(){this.removeAttributeNS(t.space,t.local)}}function Rr(t,n,e){var r,i=e+"",o;return function(){var s=this.getAttribute(t);return s===i?null:s===r?o:o=n(r=s,e)}}function Ir(t,n,e){var r,i=e+"",o;return function(){var s=this.getAttributeNS(t.space,t.local);return s===i?null:s===r?o:o=n(r=s,e)}}function Fr(t,n,e){var r,i,o;return function(){var s,a=e(this),u;return a==null?void this.removeAttribute(t):(s=this.getAttribute(t),u=a+"",s===u?null:s===r&&u===i?o:(i=u,o=n(r=s,a)))}}function qr(t,n,e){var r,i,o;return function(){var s,a=e(this),u;return a==null?void this.removeAttributeNS(t.space,t.local):(s=this.getAttributeNS(t.space,t.local),u=a+"",s===u?null:s===r&&u===i?o:(i=u,o=n(r=s,a)))}}function Hr(t,n){var e=U(t),r=e==="transform"?yr:fn;return this.attrTween(t,typeof n=="function"?(e.local?qr:Fr)(e,r,Nt(this,"attr."+t,n)):n==null?(e.local?Mr:Tr)(e):(e.local?Ir:Rr)(e,r,n))}function Dr(t,n){return function(e){this.setAttribute(t,n.call(this,e))}}function Xr(t,n){return function(e){this.setAttributeNS(t.space,t.local,n.call(this,e))}}function Or(t,n){var e,r;function i(){var o=n.apply(this,arguments);return o!==r&&(e=(r=o)&&Xr(t,o)),e}return i._value=n,i}function Lr(t,n){var e,r;function i(){var o=n.apply(this,arguments);return o!==r&&(e=(r=o)&&Dr(t,o)),e}return i._value=n,i}function Pr(t,n){var e="attr."+t;if(arguments.length<2)return(e=this.tween(e))&&e._value;if(n==null)return this.tween(e,null);if(typeof n!="function")throw new Error;var r=U(t);return this.tween(e,(r.local?Or:Lr)(r,n))}function Vr(t,n){return function(){bt(this,t).delay=+n.apply(this,arguments)}}function Yr(t,n){return n=+n,function(){bt(this,t).delay=n}}function Br(t){var n=this._id;return arguments.length?this.each((typeof t=="function"?Vr:Yr)(n,t)):x(this.node(),n).delay}function zr(t,n){return function(){m(this,t).duration=+n.apply(this,arguments)}}function Gr(t,n){return n=+n,function(){m(this,t).duration=n}}function Ur(t){var n=this._id;return arguments.length?this.each((typeof t=="function"?zr:Gr)(n,t)):x(this.node(),n).duration}function Kr(t,n){if(typeof n!="function")throw new Error;return function(){m(this,t).ease=n}}function Wr(t){var n=this._id;return arguments.length?this.each(Kr(n,t)):x(this.node(),n).ease}function Jr(t,n){return function(){var e=n.apply(this,arguments);if(typeof e!="function")throw new Error;m(this,t).ease=e}}function Qr(t){if(typeof t!="function")throw new Error;return this.each(Jr(this._id,t))}function Zr(t){typeof t!="function"&&(t=Ct(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o=n[i],s=o.length,a=r[i]=[],u,l=0;l<s;++l)(u=o[l])&&t.call(u,u.__data__,l,o)&&a.push(u);return new A(r,this._parents,this._name,this._id)}function jr(t){if(t._id!==this._id)throw new Error;for(var n=this._groups,e=t._groups,r=n.length,i=e.length,o=Math.min(r,i),s=new Array(r),a=0;a<o;++a)for(var u=n[a],l=e[a],f=u.length,c=s[a]=new Array(f),h,d=0;d<f;++d)(h=u[d]||l[d])&&(c[d]=h);for(;a<r;++a)s[a]=n[a];return new A(s,this._parents,this._name,this._id)}function ti(t){return(t+"").trim().split(/^|\s+/).every(function(n){var e=n.indexOf(".");return e>=0&&(n=n.slice(0,e)),!n||n==="start"})}function ni(t,n,e){var r,i,o=ti(n)?bt:m;return function(){var s=o(this,t),a=s.on;a!==r&&(i=(r=a).copy()).on(n,e),s.on=i}}function ei(t,n){var e=this._id;return arguments.length<2?x(this.node(),e).on.on(t):this.each(ni(e,t,n))}function ri(t){return function(){var n=this.parentNode;for(var e in this.__transition)if(+e!==t)return;n&&n.removeChild(this)}}function ii(){return this.on("end.remove",ri(this._id))}function oi(t){var n=this._name,e=this._id;typeof t!="function"&&(t=ft(t));for(var r=this._groups,i=r.length,o=new Array(i),s=0;s<i;++s)for(var a=r[s],u=a.length,l=o[s]=new Array(u),f,c,h=0;h<u;++h)(f=a[h])&&(c=t.call(f,f.__data__,h,a))&&("__data__"in f&&(c.__data__=f.__data__),l[h]=c,st(l[h],n,e,h,l,x(f,e)));return new A(o,this._parents,n,e)}function si(t){var n=this._name,e=this._id;typeof t!="function"&&(t=Et(t));for(var r=this._groups,i=r.length,o=[],s=[],a=0;a<i;++a)for(var u=r[a],l=u.length,f,c=0;c<l;++c)if(f=u[c]){for(var h=t.call(f,f.__data__,c,u),d,p=x(f,e),_=0,M=h.length;_<M;++_)(d=h[_])&&st(d,n,e,_,h,p);o.push(h),s.push(f)}return new A(o,s,n,e)}var ai=q.prototype.constructor;function ui(){return new ai(this._groups,this._parents)}function li(t,n){var e,r,i;return function(){var o=R(this,t),s=(this.style.removeProperty(t),R(this,t));return o===s?null:o===e&&s===r?i:i=n(e=o,r=s)}}function cn(t){return function(){this.style.removeProperty(t)}}function fi(t,n,e){var r,i=e+"",o;return function(){var s=R(this,t);return s===i?null:s===r?o:o=n(r=s,e)}}function ci(t,n,e){var r,i,o;return function(){var s=R(this,t),a=e(this),u=a+"";return a==null&&(u=a=(this.style.removeProperty(t),R(this,t))),s===u?null:s===r&&u===i?o:(i=u,o=n(r=s,a))}}function hi(t,n){var e,r,i,o="style."+n,s="end."+o,a;return function(){var u=m(this,t),l=u.on,f=u.value[o]==null?a||(a=cn(n)):void 0;(l!==e||i!==f)&&(r=(e=l).copy()).on(s,i=f),u.on=r}}function di(t,n,e){var r=(t+="")=="transform"?gr:fn;return n==null?this.styleTween(t,li(t,r)).on("end.style."+t,cn(t)):typeof n=="function"?this.styleTween(t,ci(t,r,Nt(this,"style."+t,n))).each(hi(this._id,t)):this.styleTween(t,fi(t,r,n),e).on("end.style."+t,null)}function pi(t,n,e){return function(r){this.style.setProperty(t,n.call(this,r),e)}}function _i(t,n,e){var r,i;function o(){var s=n.apply(this,arguments);return s!==i&&(r=(i=s)&&pi(t,s,e)),r}return o._value=n,o}function gi(t,n,e){var r="style."+(t+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(n==null)return this.tween(r,null);if(typeof n!="function")throw new Error;return this.tween(r,_i(t,n,e??""))}function yi(t){return function(){this.textContent=t}}function wi(t){return function(){var n=t(this);this.textContent=n??""}}function xi(t){return this.tween("text",typeof t=="function"?wi(Nt(this,"text",t)):yi(t==null?"":t+""))}function vi(t){return function(n){this.textContent=t.call(this,n)}}function mi(t){var n,e;function r(){var i=t.apply(this,arguments);return i!==e&&(n=(e=i)&&vi(i)),n}return r._value=t,r}function bi(t){var n="text";if(arguments.length<1)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!="function")throw new Error;return this.tween(n,mi(t))}function Ni(){for(var t=this._name,n=this._id,e=hn(),r=this._groups,i=r.length,o=0;o<i;++o)for(var s=r[o],a=s.length,u,l=0;l<a;++l)if(u=s[l]){var f=x(u,n);st(u,t,e,l,s,{time:f.time+f.delay+f.duration,delay:0,duration:f.duration,ease:f.ease})}return new A(r,this._parents,t,e)}function Ai(){var t,n,e=this,r=e._id,i=e.size();return new Promise(function(o,s){var a={value:s},u={value:function(){--i===0&&o()}};e.each(function(){var l=m(this,r),f=l.on;f!==t&&(n=(t=f).copy(),n._.cancel.push(a),n._.interrupt.push(a),n._.end.push(u)),l.on=n}),i===0&&o()})}var ki=0;function A(t,n,e,r){this._groups=t,this._parents=n,this._name=e,this._id=r}function hn(){return++ki}var k=q.prototype;A.prototype={constructor:A,select:oi,selectAll:si,selectChild:k.selectChild,selectChildren:k.selectChildren,filter:Zr,merge:jr,selection:ui,transition:Ni,call:k.call,nodes:k.nodes,node:k.node,size:k.size,empty:k.empty,each:k.each,on:ei,attr:Hr,attrTween:Pr,style:di,styleTween:gi,text:xi,textTween:bi,remove:ii,tween:Cr,delay:Br,duration:Ur,ease:Wr,easeVarying:Qr,end:Ai,[Symbol.iterator]:k[Symbol.iterator]};const $i=t=>+t;function Si(t){return((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2}var Ei={time:null,delay:0,duration:250,ease:Si};function Ci(t,n){for(var e;!(e=t.__transition)||!(e=e[n]);)if(!(t=t.parentNode))throw new Error(`transition ${n} not found`);return e}function Ti(t){var n,e;t instanceof A?(n=t._id,t=t._name):(n=hn(),(e=Ei).time=wt(),t=t==null?null:t+"");for(var r=this._groups,i=r.length,o=0;o<i;++o)for(var s=r[o],a=s.length,u,l=0;l<a;++l)(u=s[l])&&st(u,t,n,l,s,e||Ci(u,n));return new A(r,this._parents,t,n)}q.prototype.interrupt=$r,q.prototype.transition=Ti;function B(t,n,e){this.k=t,this.x=n,this.y=e}B.prototype={constructor:B,scale:function(t){return t===1?this:new B(this.k*t,this.x,this.y)},translate:function(t,n){return t===0&n===0?this:new B(this.k,this.x+this.k*t,this.y+this.k*n)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}},B.prototype;const At=(t,n)=>{const e=document.querySelector(t);if(e===null)throw new Error("Cannot find selector "+t);if(n!==void 0&&!(e instanceof n))throw new Error(`Selector ${t} not of type ${n}`);return e};class Mi{constructor(n){ut(this,"delayCounter",0);ut(this,"delayIncrement",100);ut(this,"createForm",(n,e,r,i,o)=>{const s={duration:2e3,delay:1e3,...o};this.useTranstion||(s.delay=0,s.duration=0);const a=We(n).append(e);for(const[l,f]of Object.entries(r))a.attr(l,f);const u=a.transition().duration(s.duration).delay(s.delay).ease($i);for(const[l,f]of Object.entries(i))u.attr(l,f)});this.useTranstion=n}getDelay(){return this.delayCounter+=this.delayIncrement,this.delayCounter}initAllSvg(){this.initFitts()}initFitts(){if(!document.querySelector("svg.fitts"))return;const n=At("svg.fitts g.big-target1",SVGGElement);this.createCircle(n,40,50,35),this.createCircle(n,40,50,25),this.createCircle(n,40,50,15),this.createCircle(n,40,50,5);const e=At("svg.fitts g.big-target2",SVGGElement);this.createCircle(e,40,50,35),this.createCircle(e,40,50,25),this.createCircle(e,40,50,15),this.createCircle(e,40,50,5);const r=At("svg.fitts g.small-target",SVGGElement);this.createCircle(r,40,50,5)}createCircle(n,e,r,i){return this.createForm(n,"circle",{cx:e,cy:r,r:0},{r:i},{duration:300,delay:this.getDelay()})}}(()=>{const t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,n=document.body.classList;t?n.add("dark"):n.add("light"),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{const r=e.matches?"dark":"light";console.log("colorScheme: ",r),n.remove("dark"),n.remove("light"),r==="dark"?n.add("dark"):n.add("light")})})(),console.log("window.location: ",window.location);const Ri=window.location.pathname.match(/\/cards\//)!==null;new Mi(Ri).initAllSvg()});
