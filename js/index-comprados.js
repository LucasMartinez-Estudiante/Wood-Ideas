const contenedorTarjetas = document.getElementById("products-container");
const mensajeNoHayNada = document.getElementById("no-hay-nada");

function crearTarjetasProductosInicio(productos) {
    
    const comprados = JSON.parse(localStorage.getItem("productosComprados")) || [];
    const idsComprados = comprados.map(p => p.id);
    const productosFiltrados = productos.filter(p => idsComprados.includes(p.id)) // Solo incluir comprados

    productosFiltrados.forEach(producto => {
        const nuevoCurso = document.createElement("div");
        nuevoCurso.classList = "comprado-producto-container";
        nuevoCurso.innerHTML = `
        <img src="./img/productos/${producto.id}.png">
        <div class="comprado-producto-info">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
        </div>
        <a href="./${producto.id}.html">
            <div class="comprado-acceso"><i class="fa-solid fa-right-to-bracket"></i></div>
        </a>
        `
        contenedorTarjetas.appendChild(nuevoCurso);
    });
    /** Si no hay ningún producto disponible muestra un mensaje */
    if (productosFiltrados.length === 0){
        mensajeNoHayNada.classList.remove("escondido");
    }
}


// Esperar a que el DOM esté completamente cargado antes de crear las tarjetas de los productos
document.addEventListener('DOMContentLoaded', function () {
    crearTarjetasProductosInicio(cursos);
});