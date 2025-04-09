function X(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a}var k={exports:{}},r={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var D;function Y(){if(D)return r;D=1;var a=Symbol.for("react.element"),V=Symbol.for("react.portal"),A=Symbol.for("react.fragment"),F=Symbol.for("react.strict_mode"),U=Symbol.for("react.profiler"),L=Symbol.for("react.provider"),M=Symbol.for("react.context"),N=Symbol.for("react.forward_ref"),z=Symbol.for("react.suspense"),B=Symbol.for("react.memo"),H=Symbol.for("react.lazy"),w=Symbol.iterator;function W(e){return e===null||typeof e!="object"?null:(e=w&&e[w]||e["@@iterator"],typeof e=="function"?e:null)}var $={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},b=Object.assign,C={};function y(e,t,n){this.props=e,this.context=t,this.refs=C,this.updater=n||$}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function j(){}j.prototype=y.prototype;function v(e,t,n){this.props=e,this.context=t,this.refs=C,this.updater=n||$}var m=v.prototype=new j;m.constructor=v,b(m,y.prototype),m.isPureReactComponent=!0;var O=Array.isArray,x=Object.prototype.hasOwnProperty,S={current:null},g={key:!0,ref:!0,__self:!0,__source:!0};function P(e,t,n){var o,u={},i=null,s=null;if(t!=null)for(o in t.ref!==void 0&&(s=t.ref),t.key!==void 0&&(i=""+t.key),t)x.call(t,o)&&!g.hasOwnProperty(o)&&(u[o]=t[o]);var f=arguments.length-2;if(f===1)u.children=n;else if(1<f){for(var c=Array(f),p=0;p<f;p++)c[p]=arguments[p+2];u.children=c}if(e&&e.defaultProps)for(o in f=e.defaultProps,f)u[o]===void 0&&(u[o]=f[o]);return{$$typeof:a,type:e,key:i,ref:s,props:u,_owner:S.current}}function G(e,t){return{$$typeof:a,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function R(e){return typeof e=="object"&&e!==null&&e.$$typeof===a}function J(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var I=/\/+/g;function E(e,t){return typeof e=="object"&&e!==null&&e.key!=null?J(""+e.key):t.toString(36)}function d(e,t,n,o,u){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(i){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case a:case V:s=!0}}if(s)return s=e,u=u(s),e=o===""?"."+E(s,0):o,O(u)?(n="",e!=null&&(n=e.replace(I,"$&/")+"/"),d(u,t,n,"",function(p){return p})):u!=null&&(R(u)&&(u=G(u,n+(!u.key||s&&s.key===u.key?"":(""+u.key).replace(I,"$&/")+"/")+e)),t.push(u)),1;if(s=0,o=o===""?".":o+":",O(e))for(var f=0;f<e.length;f++){i=e[f];var c=o+E(i,f);s+=d(i,t,n,c,u)}else if(c=W(e),typeof c=="function")for(e=c.call(e),f=0;!(i=e.next()).done;)i=i.value,c=o+E(i,f++),s+=d(i,t,n,c,u);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return s}function _(e,t,n){if(e==null)return e;var o=[],u=0;return d(e,o,"","",function(i){return t.call(n,i,u++)}),o}function K(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var l={current:null},h={transition:null},Q={ReactCurrentDispatcher:l,ReactCurrentBatchConfig:h,ReactCurrentOwner:S};function q(){throw Error("act(...) is not supported in production builds of React.")}return r.Children={map:_,forEach:function(e,t,n){_(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return _(e,function(){t++}),t},toArray:function(e){return _(e,function(t){return t})||[]},only:function(e){if(!R(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},r.Component=y,r.Fragment=A,r.Profiler=U,r.PureComponent=v,r.StrictMode=F,r.Suspense=z,r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Q,r.act=q,r.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var o=b({},e.props),u=e.key,i=e.ref,s=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,s=S.current),t.key!==void 0&&(u=""+t.key),e.type&&e.type.defaultProps)var f=e.type.defaultProps;for(c in t)x.call(t,c)&&!g.hasOwnProperty(c)&&(o[c]=t[c]===void 0&&f!==void 0?f[c]:t[c])}var c=arguments.length-2;if(c===1)o.children=n;else if(1<c){f=Array(c);for(var p=0;p<c;p++)f[p]=arguments[p+2];o.children=f}return{$$typeof:a,type:e.type,key:u,ref:i,props:o,_owner:s}},r.createContext=function(e){return e={$$typeof:M,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:L,_context:e},e.Consumer=e},r.createElement=P,r.createFactory=function(e){var t=P.bind(null,e);return t.type=e,t},r.createRef=function(){return{current:null}},r.forwardRef=function(e){return{$$typeof:N,render:e}},r.isValidElement=R,r.lazy=function(e){return{$$typeof:H,_payload:{_status:-1,_result:e},_init:K}},r.memo=function(e,t){return{$$typeof:B,type:e,compare:t===void 0?null:t}},r.startTransition=function(e){var t=h.transition;h.transition={};try{e()}finally{h.transition=t}},r.unstable_act=q,r.useCallback=function(e,t){return l.current.useCallback(e,t)},r.useContext=function(e){return l.current.useContext(e)},r.useDebugValue=function(){},r.useDeferredValue=function(e){return l.current.useDeferredValue(e)},r.useEffect=function(e,t){return l.current.useEffect(e,t)},r.useId=function(){return l.current.useId()},r.useImperativeHandle=function(e,t,n){return l.current.useImperativeHandle(e,t,n)},r.useInsertionEffect=function(e,t){return l.current.useInsertionEffect(e,t)},r.useLayoutEffect=function(e,t){return l.current.useLayoutEffect(e,t)},r.useMemo=function(e,t){return l.current.useMemo(e,t)},r.useReducer=function(e,t,n){return l.current.useReducer(e,t,n)},r.useRef=function(e){return l.current.useRef(e)},r.useState=function(e){return l.current.useState(e)},r.useSyncExternalStore=function(e,t,n){return l.current.useSyncExternalStore(e,t,n)},r.useTransition=function(){return l.current.useTransition()},r.version="18.3.1",r}var T;function Z(){return T||(T=1,k.exports=Y()),k.exports}var ee=Z();const te=X(ee);export{te as R,Z as a,ee as r};
