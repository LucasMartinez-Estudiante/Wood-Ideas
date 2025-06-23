const cuentaCarritoElement = document.getElementById("cuenta-carrito");
const keyLocalstorage = "cursos";

/** Toma un objeto producto o un objeto con al menos un ID y lo agrega al carrito */
function agregarAlCarrito(producto) {
	// Reviso si el producto está en el carrito.
	let memoria = JSON.parse(localStorage.getItem(keyLocalstorage));
	let cantidadProductoFinal;
	// Si no hay localstorage lo creo
	if (!memoria || memoria.length === 0) {
		const nuevoProducto = getNuevoProductoParaMemoria(producto)
		localStorage.setItem(keyLocalstorage, JSON.stringify([nuevoProducto]));
		actualizarNumeroCarrito();
		cantidadProductoFinal = 1;
	}
	else {
		// Si hay localstorage me fijo si el artículo ya está ahí
		const indiceProducto = memoria.findIndex(curso => curso.id === producto.id)
		const nuevaMemoria = memoria;
		// Si el producto no está en el carrito lo agrego
		if (indiceProducto === -1) {
			const nuevoProducto = getNuevoProductoParaMemoria(producto);
			nuevaMemoria.push(nuevoProducto);
			cantidadProductoFinal = 1;
			
			
		} else {
			// Si el producto ya está en el carrito, no hago nada
			console.log("El curso ya está en el carrito");
			
			/*------------------------------- Animación carrito compra ------------------------------*/
			const iconoCarritoNav = document.getElementById("carrito-compra-icon");
			if (iconoCarritoNav) {
				iconoCarritoNav.classList.add("highlight-cart");
				
				// Remover la clase al terminar la animación para que pueda repetirse
				iconoCarritoNav.addEventListener("animationend", () => {
					iconoCarritoNav.classList.remove("highlight-cart");
				}, { once: true });
			}
			/*---------------------------------------------------------------------------------------*/
			
			return false; // Producto ya existe
		}
		
		localStorage.setItem(keyLocalstorage, JSON.stringify(nuevaMemoria));
		actualizarNumeroCarrito();
		return cantidadProductoFinal;
	}
}

/** Resta una unidad de un producto del carrito */
function restarAlCarrito(producto) {
	let memoria = JSON.parse(localStorage.getItem(keyLocalstorage));
	if (!memoria) return console.warn("Error restando al carrito: Carrito no encontrado en memoria")
		let cantidadProductoFinal = 0;
	// Busca dentro del array de memoria el índice que coincida, utilizando una función flecha para comparar
	const indiceProducto = memoria.findIndex(curso => curso.id === producto.id)
	let nuevaMemoria = memoria;
	nuevaMemoria[indiceProducto].cantidad--;
	cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
	if (cantidadProductoFinal === 0) {
		nuevaMemoria.splice(indiceProducto, 1)
	};
	localStorage.setItem(keyLocalstorage, JSON.stringify(nuevaMemoria));
	actualizarNumeroCarrito();
	return cantidadProductoFinal;
}

/** Agrega cantidad a un objeto producto */
function getNuevoProductoParaMemoria(producto) {
	const nuevoProducto = producto;
	nuevoProducto.cantidad = 1;
	/*------------------- Notificación producto añadido al carrito compra -------------------*/
	const notificacion = document.getElementById("notificacion-carrito");
	if (notificacion) {
		notificacion.classList.remove("escondido");
		notificacion.classList.add("notificacion");
	}
	notificacion.addEventListener("animationend", () => {
		notificacion.classList.remove("notificacion");
		notificacion.classList.add("escondido");
	})
	/*---------------------------------------------------------------------------------------*/
	return nuevoProducto;
}

/** Actualiza el número del carrito del header */
function actualizarNumeroCarrito() {
	let cuenta = 0;
	const memoria = JSON.parse(localStorage.getItem(keyLocalstorage));
	if (memoria && memoria.length > 0) {
		cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0)
		return cuentaCarritoElement.innerText = cuenta;
	}
	cuentaCarritoElement.innerText = 0;
}

/** Reinicia el carrito */
function reiniciarCarrito() {
	localStorage.removeItem(keyLocalstorage);
	actualizarNumeroCarrito();
}

// Esperar a que el DOM esté completamente cargado antes de actualizar el carrito
document.addEventListener('DOMContentLoaded', function() {
	actualizarNumeroCarrito();
});


/** Marca los productos del carrito como comprados y limpia el carrito */
function comprarProductos() {
	const carrito = JSON.parse(localStorage.getItem(keyLocalstorage)) || [];

	// Obtener los productos ya comprados o iniciar con []
	let comprados = JSON.parse(localStorage.getItem("productosComprados")) || [];

	// Evitar duplicados (basado en ID)
	const idsComprados = comprados.map(producto => producto.id);
	const nuevosComprados = carrito.filter(producto => !idsComprados.includes(producto.id));

	comprados = comprados.concat(nuevosComprados);
	localStorage.setItem("productosComprados", JSON.stringify(comprados));

	// Vaciar el carrito
	reiniciarCarrito();
}