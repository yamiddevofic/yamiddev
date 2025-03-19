import{j as e}from"./jsx-runtime.CyXy1Ci3.js";import{r as o}from"./index.CaZlGE7t.js";import{A as u}from"./index.aXJrWIvq.js";import{m as p}from"./proxy.C0t47S8p.js";const a=[{title:"Marvyshopmarket",description:"Marvy Shopmarket es una aplicación web diseñada para ayudar a las tiendas de barrio a gestionar eficientemente la información de sus ventas, productos, suministros y proveedores.",techStack:["React","Tailwind","Python","Flask"],image:["/images/marvyshopmarket.png","/images/marvyshopmarket-2.png"],time:"En desarrollo",url:"https://github.com/yamiddevofic/marvyshopmarket"},{title:"Fino App",description:"Fino App es una aplicación móvil que permite a los usuarios gestionar sus finanzas personales de manera sencilla y eficiente.",techStack:["Flutter","Dart","Hive"],image:["/images/finoapp.jpg","/images/finoapp-2.jpg"],time:"En desarrollo",url:"https://github.com/yamiddevofic/fino_app"},{title:"Portafolio web profesional",description:"Portafolio es una aplicación web que permite a los usuarios gestionar sus finanzas personales de manera sencilla y eficiente.",techStack:["Astro","React","Tailwind"],image:["/images/portfolio.jpg","/images/portfolio-2.jpg"],time:"En desarrollo",url:"https://github.com/yamiddevofic/yamiddev"}],f=()=>{const[t,l]=o.useState(0),[n,c]=o.useState(!1),d=o.useCallback(r=>{l(r)},[]),m=o.useCallback(()=>{l(r=>r===0?a.length-1:r-1)},[]),i=o.useCallback(()=>{l(r=>(r+1)%a.length)},[]);return o.useEffect(()=>{if(n)return;const r=setInterval(()=>{i()},5e3);return()=>clearInterval(r)},[n,i]),e.jsxs("div",{className:"relative w-full max-w-8xl mx-auto py-12 px-4 overflow-hidden flex flex-col items-center justify-center",children:[e.jsx("h2",{className:"text-4xl md:text-5xl font-bold text-center pb-8 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500 pt-5 pb-5",children:"Proyectos"}),e.jsxs("div",{className:"relative w-full max-w-4xl mx-auto rounded-xl  overflow-hidden border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900",onMouseEnter:()=>c(!0),onMouseLeave:()=>c(!1),children:[a.length>1&&e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,className:"absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors","aria-label":"Proyecto anterior",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 19l-7-7 7-7"})})}),e.jsx("button",{onClick:i,className:"absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors","aria-label":"Proyecto siguiente",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})})]}),e.jsx(u,{mode:"wait",children:e.jsxs(p.div,{initial:{opacity:0,x:100},animate:{opacity:1,x:0},exit:{opacity:0,x:-100},transition:{duration:.5},className:"w-full h-auto flex flex-col rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 cursor-pointer",onClick:()=>window.open(a[t].url,"_blank"),children:[e.jsxs("div",{className:"relative w-full h-64 overflow-hidden",children:[e.jsx("img",{src:a[t].image[0],alt:a[t].title,className:"w-full h-full object-cover dark:hidden",style:{backgroundPosition:"center"}}),e.jsx("img",{src:a[t].image[1],alt:a[t].title,className:"w-full h-full object-cover dark:block",style:{backgroundPosition:"center"}})]}),e.jsxs("div",{className:"flex flex-col justify-between p-6",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-xl md:text-2xl font-bold line-clamp-1",children:a[t].title}),e.jsx("p",{className:"mt-2 text-gray-600 dark:text-gray-300 text-sm md:text-base line-clamp-2 md:line-clamp-3",children:a[t].description})]}),e.jsxs("div",{children:[e.jsx("p",{className:"mt-2 text-gray-500 text-xs md:text-sm",children:a[t].time==="En desarrollo"?"En desarrollo":"Duración: "+a[t].time}),e.jsx("div",{className:"mt-2 flex flex-wrap gap-1",children:a[t].techStack.map((r,s)=>e.jsx("span",{className:"inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 text-xs rounded-full whitespace-nowrap",children:r},s))})]})]})]},a[t].title)})]}),a.length>1&&e.jsx("div",{className:"flex mt-4 space-x-3 justify-center",children:a.map((r,s)=>e.jsx("button",{onClick:()=>d(s),className:`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${t===s?"bg-blue-600 scale-125":"bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"}`,"aria-label":`Ir al proyecto ${s+1}`},s))})]})};export{f as default};
