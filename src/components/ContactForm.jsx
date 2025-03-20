import React, { useState } from 'react';
import { Github } from './icons/Github';
import { Linkedin } from './icons/Linkedin';
import X from './icons/X';
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
      const response = await fetch('https://yamid.dev/send_email.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });
  
      const result = await response.json();
      
      if (result.status === 'success') {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };
  

  return (
    <section id="contact" className="w-full pt-[10%] md:pt-[3%] pb-[7%] px-4 bg-none">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center pb-8 pt-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500 js-show-on-scroll">
          Contacto
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulario de contacto */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-5 border border-gray-200 dark:border-gray-700 js-show-on-scroll">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Envíame un mensaje
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-800 dark:text-gray-100"
                  placeholder="Tu nombre"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-800 dark:text-gray-100"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-800 dark:text-gray-100"
                  placeholder="Asunto del mensaje"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-800 dark:text-gray-100 resize-none"
                  placeholder="Tu mensaje aquí..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 rounded font-medium bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white flex items-center justify-center"
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
                <div className="mt-3 p-2 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 border border-green-500 rounded text-green-600 dark:text-green-400 text-center text-sm">
                  ¡Mensaje enviado con éxito! Me pondré en contacto pronto.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mt-3 p-2 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 border border-red-500 rounded text-red-600 dark:text-red-400 text-center text-sm">
                  Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.
                </div>
              )}
            </form>
          </div>
          
          <div className="flex flex-col space-y-6 row-span-3 js-show-on-scroll">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-5 border border-gray-200 dark:border-gray-700 h-auto">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Información de contacto
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-2 rounded-md">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </h4>
                    <a href="mailto:contact@yamid.dev" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                      contact@yamid.dev
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-emerald-50 dark:bg-emerald-900 dark:bg-opacity-20 p-2 rounded-md">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ubicación
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Colombia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;