import{j as e}from"./jsx-runtime.CyXy1Ci3.js";import{r as o}from"./index.CaZlGE7t.js";const m=()=>{const[a,i]=o.useState(!1);o.useEffect(()=>{setTimeout(()=>i(!0),100)},[]);const r=(t,s)=>{t.preventDefault();const l=document.getElementById(s);l&&l.scrollIntoView({behavior:"smooth"})};return e.jsx("main",{id:"home",className:"w-full min-h-screen flex flex-col items-center justify-center text-gray-900 dark:text-white bg-white dark:bg-[linear-gradient(to_top,#0e1335_0%,#030617_50%,#0e1335_100%)]  p-8 sm:p-12 lg:p-16 relative overflow-hidden",children:e.jsxs("div",{className:`w-full max-w-3xl md:max-w-4xl lg:max-w-5xl text-center space-y-6 md:space-y-10 lg:space-y-12 transition-all duration-700 ${a?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`,children:[e.jsx("h1",{className:"text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 dark:from-cyan-400 dark:via-blue-500 dark:to-cyan-400",children:"Yamid Dev Oficial"}),e.jsx("p",{className:`w-full max-w-2xl lg:max-w-3xl text-[clamp(1rem,2vw,1.5rem)] text-gray-700 dark:text-gray-300 font-light mx-auto transition-opacity duration-500 ${a?"opacity-100":"opacity-0"}`,children:"Desarrollo experiencias digitales fluidas y modernas."}),e.jsxs("div",{className:`flex flex-col items-center sm:flex-row gap-4 md:gap-6 lg:gap-8 justify-center mt-6 md:mt-10 transition-opacity duration-500 ${a?"opacity-100":"opacity-0"}`,children:[e.jsx("a",{href:"#projects",className:"px-3 py-3 text-lg rounded-full bg-transparent border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 w-[85%] md:w-[90%] lg:w-auto text-center",onClick:t=>r(t,"projects"),children:"Descubre mi trabajo 🚀"}),e.jsx("a",{href:"#contact",className:"px-3 py-3 text-lg rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30 w-[85%] md:w-[90%] lg:w-auto text-center",onClick:t=>r(t,"contact"),children:"Hablemos de tu proyecto ✨"})]})]})})};export{m as default};
