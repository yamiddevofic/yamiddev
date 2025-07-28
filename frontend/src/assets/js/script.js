document.addEventListener('DOMContentLoaded', () => {
    initTypeEffect();
    initSectionSlide(['projects']);
    initScrollAnimations();
  });
  
  // Efecto de tipeo
  function initTypeEffect() {
    const el = document.getElementById("text");
    if (!el) return;
  
    const text = 'Desarrollador JavaScript & Creador de Contenido';
    let index = 0;
  
    (function type() {
      if (index < text.length) {
        el.innerHTML += text[index++];
        setTimeout(type, Math.random() * 200 + 50);
      } else {
        el.style.borderRight = "none";
      }
    })();
  }
  
  // Abrir/cerrar secciones
  function initSectionSlide(sections) {
    sections.forEach(section => {
      const panel = document.getElementById(`slide-${section}`);
      const openBtns = document.querySelectorAll(`#btn-${section}, #${section}`);
      const closeBtn = document.getElementById(`cerrar-${section}`);
  
      if (!panel || !closeBtn) return;
  
      openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          panel.style.transform = 'translateX(-100%)';
        });
      });
  
      closeBtn.addEventListener('click', () => {
        panel.style.transform = 'translateX(0)';
      });
    });
  }
  