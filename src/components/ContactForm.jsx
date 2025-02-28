import React, { useState } from 'react';
import { Github } from './icons/Github';
import { Linkedin } from './icons/Linkedin';
import { Twitter } from './icons/Twitter';
import { Instagram } from './icons/Instagram';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Aquí iría tu lógica para enviar el formulario
      // Por ejemplo, usando fetch para enviar a una API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulación
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Resetear el estado después de 3 segundos
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      setSubmitStatus('error');
      // Resetear el estado después de 3 segundos
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full min-h-screen py-16 px-4 md:px-8 flex items-center justify-center bg-none"> 
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 
          text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600
          dark:from-blue-500 dark:to-emerald-500">
          Contacto
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          {/* Formulario de contacto */}
          <div className="bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-50 
            backdrop-blur-lg p-6 rounded-xl shadow-lg dark:shadow-2xl 
            border border-gray-200 dark:border-gray-700
            transition-colors duration-300">
            <h3 className="text-2xl font-semibold mb-6 
              text-gray-800 dark:text-white
              transition-colors duration-300">
              Envíame un mensaje
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium 
                  text-gray-700 dark:text-gray-300 
                  transition-colors duration-300 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 
                    bg-gray-100 dark:bg-gray-700 
                    bg-opacity-70 dark:bg-opacity-50 
                    border border-gray-300 dark:border-gray-600 
                    rounded-lg focus:outline-none focus:ring-2 
                    focus:ring-blue-500 
                    text-gray-800 dark:text-gray-100
                    transition-colors duration-300"
                  placeholder="Tu nombre"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium 
                  text-gray-700 dark:text-gray-300
                  transition-colors duration-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 
                    bg-gray-100 dark:bg-gray-700 
                    bg-opacity-70 dark:bg-opacity-50 
                    border border-gray-300 dark:border-gray-600 
                    rounded-lg focus:outline-none focus:ring-2 
                    focus:ring-blue-500 
                    text-gray-800 dark:text-gray-100
                    transition-colors duration-300"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium 
                  text-gray-700 dark:text-gray-300
                  transition-colors duration-300 mb-1">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 
                    bg-gray-100 dark:bg-gray-700 
                    bg-opacity-70 dark:bg-opacity-50 
                    border border-gray-300 dark:border-gray-600 
                    rounded-lg focus:outline-none focus:ring-2 
                    focus:ring-blue-500 
                    text-gray-800 dark:text-gray-100
                    transition-colors duration-300"
                  placeholder="Asunto del mensaje"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium 
                  text-gray-700 dark:text-gray-300
                  transition-colors duration-300 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 
                    bg-gray-100 dark:bg-gray-700 
                    bg-opacity-70 dark:bg-opacity-50 
                    border border-gray-300 dark:border-gray-600 
                    rounded-lg focus:outline-none focus:ring-2 
                    focus:ring-blue-500 
                    text-gray-800 dark:text-gray-100
                    transition-colors duration-300 resize-none"
                  placeholder="Tu mensaje aquí..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-lg font-medium 
                  transition-all duration-300 
                  bg-gradient-to-r from-blue-500 to-emerald-500 
                  hover:from-blue-600 hover:to-emerald-600 
                  text-white flex items-center justify-center"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : 'Enviar mensaje'}
              </button>
              
              {submitStatus === 'success' && (
                <div className="mt-4 p-3 
                  bg-green-100 dark:bg-green-500 dark:bg-opacity-20 
                  border border-green-500 
                  rounded-lg 
                  text-green-600 dark:text-green-400 
                  text-center
                  transition-colors duration-300">
                  ¡Mensaje enviado con éxito! Me pondré en contacto pronto.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mt-4 p-3 
                  bg-red-100 dark:bg-red-500 dark:bg-opacity-20 
                  border border-red-500 
                  rounded-lg 
                  text-red-600 dark:text-red-400 
                  text-center
                  transition-colors duration-300">
                  Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.
                </div>
              )}
            </form>
          </div>
          
          {/* Información de contacto y redes sociales */}
          <div className="flex flex-col justify-between">
            <div className="bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-50 
              backdrop-blur-lg p-6 rounded-xl 
              shadow-lg dark:shadow-2xl 
              border border-gray-200 dark:border-gray-700
              mb-6 transition-colors duration-300">
              <h3 className="text-2xl font-semibold mb-6 
                text-gray-800 dark:text-white
                transition-colors duration-300">
                Información de contacto
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-500 dark:bg-opacity-20 p-3 rounded-lg
                    transition-colors duration-300">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium 
                      text-gray-700 dark:text-gray-300
                      transition-colors duration-300">
                      Email
                    </h4>
                    <a href="mailto:contact@yamid.dev" className="text-blue-600 dark:text-blue-400 
                      hover:text-blue-700 dark:hover:text-blue-300 
                      transition-colors duration-300">
                      contact@yamid.dev
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 dark:bg-emerald-500 dark:bg-opacity-20 p-3 rounded-lg
                    transition-colors duration-300">
                    <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium 
                      text-gray-700 dark:text-gray-300
                      transition-colors duration-300">
                      Ubicación
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400
                      transition-colors duration-300">
                      Colombia
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-50 
              backdrop-blur-lg p-6 rounded-xl 
              shadow-lg dark:shadow-2xl 
              border border-gray-200 dark:border-gray-700
              transition-colors duration-300">
              <h3 className="text-2xl font-semibold mb-6 
                text-gray-800 dark:text-white
                transition-colors duration-300">
                Sígueme en redes
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="https://github.com/yamiddevofic" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 
                    bg-gray-200 bg-opacity-70 
                    dark:bg-gray-700 dark:bg-opacity-50 
                    rounded-lg 
                    hover:bg-gray-300 dark:hover:bg-gray-600 
                    transition-colors duration-300"
                >
                  <div className="text-4xl mb-2 
                    text-gray-700 dark:text-gray-200
                    transition-colors duration-300">
                    <Github />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300
                    transition-colors duration-300">
                    GitHub
                  </span>
                </a>
                
                <a 
                  href="https://linkedin.com/in/yamiddev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 
                    bg-gray-200 bg-opacity-70 
                    dark:bg-gray-700 dark:bg-opacity-50 
                    rounded-lg 
                    hover:bg-gray-300 dark:hover:bg-gray-600 
                    transition-colors duration-300"
                >
                  <div className="text-4xl mb-2 
                    text-gray-700 dark:text-gray-200
                    transition-colors duration-300">
                    <Linkedin />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300
                    transition-colors duration-300">
                    LinkedIn
                  </span>
                </a>
                
                <a 
                  href="https://twitter.com/yamiddev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 
                    bg-gray-200 bg-opacity-70 
                    dark:bg-gray-700 dark:bg-opacity-50 
                    rounded-lg 
                    hover:bg-gray-300 dark:hover:bg-gray-600 
                    transition-colors duration-300"
                >
                  <div className="text-4xl mb-2 
                    text-gray-700 dark:text-gray-200
                    transition-colors duration-300">
                    <Twitter />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300
                    transition-colors duration-300">
                    Twitter
                  </span>
                </a>
                
                <a 
                  href="https://instagram.com/yamiddevofic" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 
                    bg-gray-200 bg-opacity-70 
                    dark:bg-gray-700 dark:bg-opacity-50 
                    rounded-lg 
                    hover:bg-gray-300 dark:hover:bg-gray-600 
                    transition-colors duration-300"
                >
                  <div className="text-4xl mb-2 
                    text-gray-700 dark:text-gray-200
                    transition-colors duration-300">
                    <Instagram />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300
                    transition-colors duration-300">
                    Instagram
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
