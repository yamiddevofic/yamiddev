import React, { useState } from 'react';
import { Github } from '../atoms/icons/Github';
import { Linkedin } from '../atoms/icons/Linkedin';
import X from '../atoms/icons/X';
import { Instagram } from '../atoms/icons/Instagram';
import { TitleSection } from '../atoms/TitleSection';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

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
    <motion.section 
    initial="hidden"
    whileInView="visible"
    transition={{ delay: 0.2 }}
    variants={fadeInUp}
    id="contact" className="w-full py-8 px-4 bg-gray-50 dark:bg-slate-950 relative rounded-tl-lg rounded-tr-lg border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center">
      <div className="w-full">
        
        <TitleSection title="Contacto"/>
        
        
        <div className="grid place-items-center">
          {/* Formulario de contacto */}
          <motion.div 
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.2 }}
          variants={fadeInUp}
          className="w-full md:w-[60%] my-4 bg-white dark:bg-gray-900 rounded-sm shadow-lg p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-opacity-50 dark:bg-opacity-50  transform transition duration-300 hover:scale-[1.02]">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Envíame un mensaje
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Tu nombre"
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Asunto del mensaje"
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none"
                  placeholder="Tu mensaje aquí..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-sm font-semibold bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white transition-all duration-300 transform hover:scale-[1.02] focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : 'Enviar mensaje'}
              </button>
              
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-500/50 rounded-sm text-green-600 dark:text-green-400 text-center animate-fadeIn">
                  <p className="font-medium">¡Mensaje enviado con éxito!</p>
                  <p className="text-sm mt-1">Me pondré en contacto pronto.</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-500/50 rounded-sm text-red-600 dark:text-red-400 text-center animate-fadeIn">
                  <p className="font-medium">Hubo un error al enviar el mensaje</p>
                  <p className="text-sm mt-1">Por favor, intenta de nuevo.</p>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactForm;