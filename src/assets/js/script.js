document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById("text");
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
});