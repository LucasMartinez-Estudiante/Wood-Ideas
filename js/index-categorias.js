const contenedorTarjetas = document.getElementById("products-container");
const mensajeNoHayNada = document.getElementById("no-hay-nada");

function crearTarjetasProductosInicio(productos) {
    
    const tipo = document.getElementById("categoria").innerText.toLowerCase();
    let productosFiltrados = productos.filter(p => p.tipo === tipo); // Filtra por categoría/tipo

    const comprados = JSON.parse(localStorage.getItem("productosComprados")) || [];
    const idsComprados = comprados.map(p => p.id);
    productosFiltrados = productosFiltrados.filter(p => !idsComprados.includes(p.id)) // Excluir comprados

    productosFiltrados.forEach(producto => {
        const nuevoCurso = document.createElement("div");
        nuevoCurso.classList = "card-container";
        nuevoCurso.innerHTML = `
        <div class="card">
            <div class="front">
                <div class="card-img-container">
                    <img src="./img/productos/${producto.id}.png">
                </div>
                <h3>${producto.nombre}</h3>
                <p>${producto.tipo}</p>
            </div>
            <div class="back">
                <div class="back-text">
                    <h3>En este curso</h3>
                    <p>${producto.descripcion}</p>
                </div>
                <div class="price">
                    <i class="fa-duotone fa-solid fa-money-bill"></i>&nbsp;$${producto.precio}
                </div>
                <button>Agregar al carrito&nbsp;<i class="fa-solid fa-cart-shopping"></i></button>
            </div>
        </div>
        `
        contenedorTarjetas.appendChild(nuevoCurso);
        // Cada vez que se presiona el botón añade el producto al carrito (quería probar ByTagName)
        nuevoCurso.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(producto));
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