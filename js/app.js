/**
 * Lógica principal de la aplicación.
 * Manejo de pestañas e inicialización.
 */
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    // Cargar datos iniciales (Usuarios por defecto)
    Usuarios.fetchAll();
});

function initTabs() {
    const tabs = document.querySelectorAll('.nav__tab');
    const sections = document.querySelectorAll('.section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            // Actualizar botones de navegación
            tabs.forEach(t => t.classList.remove('nav__tab--active'));
            tab.classList.add('nav__tab--active');

            // Actualizar secciones visibles
            sections.forEach(s => {
                s.style.display = 'none';
                s.classList.remove('section--active');
            });

            const activeSection = document.getElementById(`section-${targetTab}`);
            activeSection.style.display = 'block';
            setTimeout(() => activeSection.classList.add('section--active'), 10);

            // Cargar datos de la pestaña activa
            loadTabData(targetTab);
        });
    });
}

function loadTabData(tab) {
    switch(tab) {
        case 'usuarios': Usuarios.fetchAll(); break;
        case 'libros': Libros.fetchAll(); break;
        case 'prestamos': Prestamos.fetchAll(); break;
    }
}
