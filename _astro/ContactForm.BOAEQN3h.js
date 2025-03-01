import{j as e}from"./jsx-runtime.CyXy1Ci3.js";import{r as s}from"./index.CaZlGE7t.js";const u=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"})}),b=()=>e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}),e.jsx("rect",{x:"2",y:"9",width:"4",height:"12"}),e.jsx("circle",{cx:"4",cy:"4",r:"2"})]}),h=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"})}),y=()=>e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"2",y:"2",width:"20",height:"20",rx:"5",ry:"5"}),e.jsx("path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"}),e.jsx("line",{x1:"17.5",y1:"6.5",x2:"17.51",y2:"6.5"})]}),j=()=>{const[r,i]=s.useState({name:"",email:"",subject:"",message:""}),[d,l]=s.useState(!1),[c,t]=s.useState(null),a=o=>{const{name:n,value:x}=o.target;i(m=>({...m,[n]:x}))},g=async o=>{o.preventDefault(),l(!0);try{await new Promise(n=>setTimeout(n,1e3)),t("success"),i({name:"",email:"",subject:"",message:""}),setTimeout(()=>t(null),3e3)}catch{t("error"),setTimeout(()=>t(null),3e3)}finally{l(!1)}};return e.jsx("section",{id:"contact",className:"w-full min-h-screen py-16 px-4 md:px-8 flex items-center justify-center bg-none",children:e.jsxs("div",{className:"container max-w-6xl mx-auto",children:[e.jsx("h2",{className:`text-4xl md:text-5xl font-bold text-center mb-8 
          text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600
          dark:from-blue-500 dark:to-emerald-500`,children:"Contacto"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-12 mt-12",children:[e.jsxs("div",{className:`bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-50 
            backdrop-blur-lg p-6 rounded-xl shadow-lg dark:shadow-2xl 
            border border-gray-200 dark:border-gray-700
            transition-colors duration-300`,children:[e.jsx("h3",{className:`text-2xl font-semibold mb-6 
              text-gray-800 dark:text-white
              transition-colors duration-300`,children:"Envíame un mensaje"}),e.jsxs("form",{onSubmit:g,className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"name",className:`block text-sm font-medium 
                  text-gray-700 dark:text-gray-300 
                  transition-colors duration-300 mb-1`,children:"Nombre"}),e.jsx("input",{type:"text",id:"name",name:"name",value:r.name,onChange:a,required:!0,className:`w-full px-4 py-3 
                    bg-gray-100 dark:bg-gray-700 
                    bg-opacity-70 dark:bg-opacity-50 
                    border border-gray-300 dark:border-gray-600 
                    rounded-lg focus:outline-none focus:ring-2 
                    focus:ring-blue-500 
                    text-gray-800 dark:text-gray-100
                    transition-colors duration-300`,placeholder:"Tu nombre"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:`block text-sm font-medium 
                  text-gray-700 dark:text-gray-300
                  transition-colors duration-300 mb-1`,children:"Email"}),e.jsx("input",{type:"email",id:"email",name:"email",value:r.email,onChange:a,required:!0,className:`w-full px-4 py-3 
                    bg-gray-100 dark:bg-gray-700 
                    bg-opacity-70 dark:bg-opacity-50 
                    border border-gray-300 dark:border-gray-600 
                    rounded-lg focus:outline-none focus:ring-2 
                    focus:ring-blue-500 
                    text-gray-800 dark:text-gray-100
                    transition-colors duration-300`,placeholder:"tu@email.com"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"subject",className:`block text-sm font-medium 
                  text-gray-700 dark:text-gray-300
                  transition-colors duration-300 mb-1`,children:"Asunto"}),e.jsx("input",{type:"text",id:"subject",name:"subject",value:r.subject,onChange:a,required:!0,className:`w-full px-4 py-3 
                    bg-gray-100 dark:bg-gray-700 
                    bg-opacity-70 dark:bg-opacity-50 
                    border border-gray-300 dark:border-gray-600 
                    rounded-lg focus:outline-none focus:ring-2 
                    focus:ring-blue-500 
                    text-gray-800 dark:text-gray-100
                    transition-colors duration-300`,placeholder:"Asunto del mensaje"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"message",className:`block text-sm font-medium 
                  text-gray-700 dark:text-gray-300
                  transition-colors duration-300 mb-1`,children:"Mensaje"}),e.jsx("textarea",{id:"message",name:"message",value:r.message,onChange:a,required:!0,rows:5,className:`w-full px-4 py-3 
                    bg-gray-100 dark:bg-gray-700 
                    bg-opacity-70 dark:bg-opacity-50 
                    border border-gray-300 dark:border-gray-600 
                    rounded-lg focus:outline-none focus:ring-2 
                    focus:ring-blue-500 
                    text-gray-800 dark:text-gray-100
                    transition-colors duration-300 resize-none`,placeholder:"Tu mensaje aquí..."})]}),e.jsx("button",{type:"submit",disabled:d,className:`w-full py-3 px-6 rounded-lg font-medium 
                  transition-all duration-300 
                  bg-gradient-to-r from-blue-500 to-emerald-500 
                  hover:from-blue-600 hover:to-emerald-600 
                  text-white flex items-center justify-center`,children:d?e.jsxs("span",{className:"flex items-center",children:[e.jsxs("svg",{className:"animate-spin -ml-1 mr-2 h-4 w-4 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Enviando..."]}):"Enviar mensaje"}),c==="success"&&e.jsx("div",{className:`mt-4 p-3 
                  bg-green-100 dark:bg-green-500 dark:bg-opacity-20 
                  border border-green-500 
                  rounded-lg 
                  text-green-600 dark:text-green-400 
                  text-center
                  transition-colors duration-300`,children:"¡Mensaje enviado con éxito! Me pondré en contacto pronto."}),c==="error"&&e.jsx("div",{className:`mt-4 p-3 
                  bg-red-100 dark:bg-red-500 dark:bg-opacity-20 
                  border border-red-500 
                  rounded-lg 
                  text-red-600 dark:text-red-400 
                  text-center
                  transition-colors duration-300`,children:"Hubo un error al enviar el mensaje. Por favor, intenta de nuevo."})]})]}),e.jsxs("div",{className:"flex flex-col justify-between",children:[e.jsxs("div",{className:`bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-50 
              backdrop-blur-lg p-6 rounded-xl 
              shadow-lg dark:shadow-2xl 
              border border-gray-200 dark:border-gray-700
              mb-6 transition-colors duration-300`,children:[e.jsx("h3",{className:`text-2xl font-semibold mb-6 
                text-gray-800 dark:text-white
                transition-colors duration-300`,children:"Información de contacto"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-start space-x-4",children:[e.jsx("div",{className:`bg-blue-100 dark:bg-blue-500 dark:bg-opacity-20 p-3 rounded-lg
                    transition-colors duration-300`,children:e.jsx("svg",{className:"w-6 h-6 text-blue-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"})})}),e.jsxs("div",{children:[e.jsx("h4",{className:`text-lg font-medium 
                      text-gray-700 dark:text-gray-300
                      transition-colors duration-300`,children:"Email"}),e.jsx("a",{href:"mailto:contact@yamid.dev",className:`text-blue-600 dark:text-blue-400 
                      hover:text-blue-700 dark:hover:text-blue-300 
                      transition-colors duration-300`,children:"contact@yamid.dev"})]})]}),e.jsxs("div",{className:"flex items-start space-x-4",children:[e.jsx("div",{className:`bg-emerald-100 dark:bg-emerald-500 dark:bg-opacity-20 p-3 rounded-lg
                    transition-colors duration-300`,children:e.jsxs("svg",{className:"w-6 h-6 text-emerald-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"}),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M15 11a3 3 0 11-6 0 3 3 0 016 0z"})]})}),e.jsxs("div",{children:[e.jsx("h4",{className:`text-lg font-medium 
                      text-gray-700 dark:text-gray-300
                      transition-colors duration-300`,children:"Ubicación"}),e.jsx("p",{className:`text-gray-600 dark:text-gray-400
                      transition-colors duration-300`,children:"Colombia"})]})]})]})]}),e.jsxs("div",{className:`bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-50 
              backdrop-blur-lg p-6 rounded-xl 
              shadow-lg dark:shadow-2xl 
              border border-gray-200 dark:border-gray-700
              transition-colors duration-300`,children:[e.jsx("h3",{className:`text-2xl font-semibold mb-6 
                text-gray-800 dark:text-white
                transition-colors duration-300`,children:"Sígueme en redes"}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("a",{href:"https://github.com/yamiddevofic",target:"_blank",rel:"noopener noreferrer",className:`flex flex-col items-center p-4 
                    bg-gray-200 bg-opacity-70 
                    dark:bg-gray-700 dark:bg-opacity-50 
                    rounded-lg 
                    hover:bg-gray-300 dark:hover:bg-gray-600 
                    transition-colors duration-300`,children:[e.jsx("div",{className:`text-4xl mb-2 
                    text-gray-700 dark:text-gray-200
                    transition-colors duration-300`,children:e.jsx(u,{})}),e.jsx("span",{className:`text-gray-700 dark:text-gray-300
                    transition-colors duration-300`,children:"GitHub"})]}),e.jsxs("a",{href:"https://linkedin.com/in/yamiddev",target:"_blank",rel:"noopener noreferrer",className:`flex flex-col items-center p-4 
                    bg-gray-200 bg-opacity-70 
                    dark:bg-gray-700 dark:bg-opacity-50 
                    rounded-lg 
                    hover:bg-gray-300 dark:hover:bg-gray-600 
                    transition-colors duration-300`,children:[e.jsx("div",{className:`text-4xl mb-2 
                    text-gray-700 dark:text-gray-200
                    transition-colors duration-300`,children:e.jsx(b,{})}),e.jsx("span",{className:`text-gray-700 dark:text-gray-300
                    transition-colors duration-300`,children:"LinkedIn"})]}),e.jsxs("a",{href:"https://twitter.com/yamiddev",target:"_blank",rel:"noopener noreferrer",className:`flex flex-col items-center p-4 
                    bg-gray-200 bg-opacity-70 
                    dark:bg-gray-700 dark:bg-opacity-50 
                    rounded-lg 
                    hover:bg-gray-300 dark:hover:bg-gray-600 
                    transition-colors duration-300`,children:[e.jsx("div",{className:`text-4xl mb-2 
                    text-gray-700 dark:text-gray-200
                    transition-colors duration-300`,children:e.jsx(h,{})}),e.jsx("span",{className:`text-gray-700 dark:text-gray-300
                    transition-colors duration-300`,children:"Twitter"})]}),e.jsxs("a",{href:"https://instagram.com/yamiddevofic",target:"_blank",rel:"noopener noreferrer",className:`flex flex-col items-center p-4 
                    bg-gray-200 bg-opacity-70 
                    dark:bg-gray-700 dark:bg-opacity-50 
                    rounded-lg 
                    hover:bg-gray-300 dark:hover:bg-gray-600 
                    transition-colors duration-300`,children:[e.jsx("div",{className:`text-4xl mb-2 
                    text-gray-700 dark:text-gray-200
                    transition-colors duration-300`,children:e.jsx(y,{})}),e.jsx("span",{className:`text-gray-700 dark:text-gray-300
                    transition-colors duration-300`,children:"Instagram"})]})]})]})]})]})]})})};export{j as default};
