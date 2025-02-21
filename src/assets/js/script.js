document.addEventListener('DOMContentLoaded', () => {
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