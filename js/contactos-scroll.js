/* Al presionar un botón, realiza un scroll suave hacia la sección */
document.querySelectorAll('a.scroll-suave').forEach(enlace => {
    enlace.addEventListener('click', function(e) {
        e.preventDefault();
        const id = this.getAttribute('href');
        const destino = document.querySelector(id);
        if (destino) {
            destino.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});