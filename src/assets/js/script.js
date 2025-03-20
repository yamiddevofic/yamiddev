document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById("text");
    if (textElement) {
        const text = 'Desarrollador JavaScript & Creador de Contenido';
        let index = 0;

        function typeEffect() {
            if (index < text.length) {
                textElement.innerHTML += text[index];
                index++;
                setTimeout(typeEffect, Math.random() * 200 + 50); // Simula la velocidad de tipeo
            } else {
                textElement.style.borderRight = "none"; // Elimina el cursor al terminar
            }
        }

        setInterval(() => {
            typeEffect();
        }, 450);
    }

    const sections = ['projects'];

    sections.forEach(section => {
    const sectionEl = document.getElementById('slide-projects');
    const openButtons = document.querySelectorAll(`#btn-${section}, #projects`);
    const closeButton = document.getElementById(`cerrar-${section}`);

    if (sectionEl && closeButton) {
        openButtons.forEach(button => {
        button.addEventListener('click', () => {
            sectionEl.style.transform = 'translateX(-100%)';
        });
        });

        closeButton.addEventListener('click', () => {
        sectionEl.style.transform = 'translateX(0)';
        });
    }
    });

    const elements = document.querySelectorAll('.js-show-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // El elemento es visible → animo para "aparecer"
            entry.target.classList.remove('opacity-0', 'animate-fadeOutDown');
            entry.target.classList.add('animate-fadeInUp');
        } else {
            // El elemento salió de la vista → animo para "desaparecer"
            entry.target.classList.remove('animate-fadeInUp');
            entry.target.classList.add('animate-fadeOutDown');
        }
        });
    }, {
        threshold: 0.1 // Ajusta según necesites (0.1 = 10% visible)
    });

    // Observamos cada elemento que tenga la clase .js-show-on-scroll
    elements.forEach(el => {
        // opcional: asegurarnos de que arranquen ocultos
        el.classList.add('opacity-0');
        observer.observe(el);
    });
});