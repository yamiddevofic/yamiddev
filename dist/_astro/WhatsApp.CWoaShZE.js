import{j as f}from"./jsx-runtime.CyXy1Ci3.js";import{R as i}from"./index.CaZlGE7t.js";var d={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},m=i.createContext&&i.createContext(d),h=["attr","size","title"];function v(e,t){if(e==null)return{};var r=O(e,t),n,a;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function O(e,t){if(e==null)return{};var r={};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){if(t.indexOf(n)>=0)continue;r[n]=e[n]}return r}function c(){return c=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},c.apply(this,arguments)}function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?p(Object(r),!0).forEach(function(n){y(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function y(e,t,r){return t=j(t),t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function j(e){var t=w(e,"string");return typeof t=="symbol"?t:t+""}function w(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function b(e){return e&&e.map((t,r)=>i.createElement(t.tag,u({key:r},t.attr),b(t.child)))}function x(e){return t=>i.createElement(P,c({attr:u({},e.attr)},t),b(e.child))}function P(e){var t=r=>{var{attr:n,size:a,title:o}=e,g=v(e,h),s=a||r.size||"1em",l;return r.className&&(l=r.className),e.className&&(l=(l?l+" ":"")+e.className),i.createElement("svg",c({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},r.attr,n,g,{className:l,style:u(u({color:e.color||r.color},r.style),e.style),height:s,width:s,xmlns:"http://www.w3.org/2000/svg"}),o&&i.createElement("title",null,o),e.children)};return m!==void 0?i.createElement(m.Consumer,null,r=>t(r)):t(d)}function E(e){return x({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"},child:[]}]})(e)}function C(){return f.jsx("a",{href:"https://wa.me/573124673850?text=Hola%20Yamid,%20estoy%20interesado%20en%20tu%20trabajo",target:"_blank",rel:"noopener noreferrer",className:"bg-green-500 fixed bottom-12 p-3 right-7 text-white font-semibold text-[1.3rem] rounded-full shadow-lg w-auto h-auto flex items-center justify-center hover:shadow-xl transition-shadow duration-200 border border-green z-50 hover:animate-grow",title:"Haz clic para contactarme por WhatsApp",children:f.jsx(E,{className:"text-3xl"})})}export{C as default};
