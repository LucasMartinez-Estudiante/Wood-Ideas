const contenedorTarjetas = document.getElementById("carrito-container");
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const mensajeCompradoElement = document.getElementById("mensaje-comprado"); //aaaaaaaaaaaaaaaaaaa
const totalesContainer = document.getElementById("totales");

/** Crea las tarjetas de productos teniendo en cuenta lo guardado en localstorage */
function crearTarjetasProductosCarrito() {
    contenedorTarjetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem(keyLocalstorage));
    /** Si existe al menos 1 producto */
    if (productos && productos.length > 0) {
        productos.forEach((producto) => {
            const nuevoCurso = document.createElement("div");
            nuevoCurso.classList = "carrito-producto-container";
            nuevoCurso.innerHTML = `
                <img src="./img/productos/${producto.id}.png" alt="Imagen curso">
                <div class="carrito-producto-info">
                    <div class="content-top">
                        <h3>${producto.nombre}</h3>
                        <p>${producto.descripcion}</p>
                    </div>
                    <div class="content-bottom">
                        <div class="precio">
                            <i class="fa-duotone fa-solid fa-money-bill"></i>&nbsp;$${producto.precio}
                        </div>
                        <span><p>o<br><a class="boton-remover" id="boton-remover">remover</a></p></span>
                    </div>    
                </div>
            `;
            contenedorTarjetas.appendChild(nuevoCurso);
            /** Remover el curso del carrito */
            nuevoCurso
                .querySelector(".boton-remover")
                .addEventListener("click", (e) => {
                    // const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
                    cantidadElement.innerText = restarAlCarrito(producto);
                    crearTarjetasProductosCarrito();
                    actualizarTotales();
                });
        });
    }
    revisarMensajeVacio();
    actualizarTotales();
    actualizarNumeroCarrito();
}

crearTarjetasProductosCarrito();

/** Actualiza el total de precio y unidades de la página del carrito */
function actualizarTotales() {
    const productos = JSON.parse(localStorage.getItem(keyLocalstorage));
    let cantidad = 0;
    let precio = 0;
    if (productos && productos.length > 0) {
        productos.forEach((producto) => {
            cantidad += producto.cantidad;
            precio += producto.precio * producto.cantidad;
        });
    }
    cantidadElement.innerText = cantidad;
    precioElement.innerText = precio;
    if (precio === 0) {
        reiniciarCarrito();
        revisarMensajeVacio();
    }
}

document.getElementById("reiniciar").addEventListener("click", () => {
    contenedorTarjetas.innerHTML = "";
    reiniciarCarrito();
    revisarMensajeVacio();
});

/** Muestra o esconde el mensaje de que no hay nada en el carrito */
function revisarMensajeVacio() {
    const productos = JSON.parse(localStorage.getItem(keyLocalstorage));
    carritoVacioElement.classList.toggle("escondido", productos);
    totalesContainer.classList.toggle("escondido", !productos);
}


/** Muestra un mensaje de agradecimiento por haber comprado */
function mensajeGracias() {
    carritoVacioElement.classList.add("escondido");
    mensajeCompradoElement.classList.remove("escondido");
}





document.getElementById("comprar").addEventListener("click", () => {
	comprarProductos();
	crearTarjetasProductosCarrito(); // Refrescar
    mensajeGracias();
});
