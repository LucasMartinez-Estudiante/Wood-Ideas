function validar() {    
    let esValido = true;
    let objeto;
    
        
    /**----------------------------------------------------------------------------------------------------------
            Checkea el NOMBRE
    */
    objeto = document.getElementById('nombre');

    // Checkea que el usuario haya ingresado un nombre y que este tenga una estructura válida
    if (!(objeto.value.trim() === "") && (esNombreValido(objeto.value))){
        objeto.classList.add("input-correcto"); // Aplica un borde verde (correcto)
    }
    else{
        esValido = false;
        objeto.classList.add("input-error") // Aplica un borde rojo (error)
    }


    /**----------------------------------------------------------------------------------------------------------
            Checkea el APELLIDO
    */
    objeto = document.getElementById('apellido');

    // Checkea que el usuario haya ingresado un apellido y que este tenga una estructura válida
    if (!(objeto.value.trim() === "") && (esNombreValido(objeto.value))){
        objeto.classList.add("input-correcto"); // Aplica un borde verde (correcto)        
    }
    else{
        esValido = false;
        objeto.classList.add("input-error") // Aplica un borde rojo (error)
    }


    /**----------------------------------------------------------------------------------------------------------
            Checkea el E-MAIL        
    */
    objeto = document.getElementById('email');

    // Checkea que el usuario haya ingresado un e-mail y que este tenga una estructura válida
    if (!(objeto.value.trim() === "") && (esEmailValido(objeto.value))){
        objeto.classList.add("input-correcto"); // Aplica un borde verde (correcto)
    }
    else{
        esValido = false;
        objeto.classList.add("input-error") // Aplica un borde rojo (error)
    }


    /**----------------------------------------------------------------------------------------------------------
            Checkea la FECHA        
    */
    const dia = document.getElementById('dia');
    const mes = document.getElementById('mes');
    const anio = document.getElementById('anio');
    const arrayFecha = [dia, mes, anio];

    let numerosFechaValido = true; // Bandera que permite evitar la creación del objeto Date si uno de los valores introducidos no es un número entero positivo

    // Checkea cada valor numérico ingresado en fecha
    for (let i=0; i<3; i++){
        objeto = arrayFecha[i];

        // Checkea que el usuario haya ingresado un valor y que este sea numérico entero positivo
        if (!(objeto.value.trim() === "") && (esNumeroEnteroPositivo(objeto.value))){
            objeto.classList.add("input-correcto"); // Aplica un borde verde (correcto)

        }
        else{
            numerosFechaValido = false;
            esValido = false;
            objeto.classList.add("input-error") // Aplica un borde rojo (error)
        }
    }
    // Si los valores numéricos dia, mes y anio son enteros positivos
    if (numerosFechaValido){

        // Checkea que sea una fecha válida
        if (!(esFechaValida(dia.value, mes.value, anio.value))){
            dia.style.borderColor="#ff2e00"; // Aplica un borde rojo (error)
            mes.style.borderColor="#ff2e00"; // Aplica un borde rojo (error)
            anio.style.borderColor="#ff2e00"; // Aplica un borde rojo (error)
            esValido = false;
        }
    }


    /**----------------------------------------------------------------------------------------------------------
            Checkea números DECIMALES        
    */
    objeto = document.getElementById("largo");
    if (!(objeto.value.trim() === "") && (esNumeroDecimalMayorOIgualACero(objeto.value))){
        objeto.classList.add("input-correcto"); // Aplica un borde verde (correcto)
    }
    else{
        esValido = false;
        objeto.classList.add("input-error") // Aplica un borde rojo (error)
        objeto.placeholder = "cero?";
    }
    objeto = document.getElementById("ancho");
    if (!(objeto.value.trim() === "") && (esNumeroDecimalMayorOIgualACero(objeto.value))){
        objeto.classList.add("input-correcto"); // Aplica un borde verde (correcto)
    }
    else{
        esValido = false;
        objeto.classList.add("input-error") // Aplica un borde rojo (error)
        objeto.placeholder = "cero?";
    }
    return esValido;
}


// Revisa localStorage al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("formularioCompletado") === "true"){
        const formularioContainer = document.getElementById("formulario-container");
        const mensajeCorrecto = document.getElementById("mensaje-correcto");
        const formularioEnviado = document.getElementById("mensaje-formulario-enviado");
        formularioContainer.classList.add("escondido");
        mensajeCorrecto.classList.add("escondido");
        formularioEnviado.classList.remove("escondido");
    }
});



// Evento para validar el formulario al dar click en submit
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (event) {
    event.preventDefault(); // Siempre evita el envío automático

    // Enviar mensajes
    if (validar()) {
        const formularioContainer = document.getElementById("formulario-container");
        const mensajeCorrecto = document.getElementById("mensaje-correcto");
        formularioContainer.classList.add("escondido");
        mensajeCorrecto.classList.remove("escondido");

        // Se lo guarda en localStorage
        localStorage.setItem("formularioCompletado", "true");
    }
    else{
        const mensaje = document.getElementById("mensaje-error");
        if (mensaje) {
            mensaje.classList.remove("escondido");
            mensaje.classList.add("mensaje");
        }
        mensaje.addEventListener("animationend", () => {
            mensaje.classList.remove("mensaje");
            mensaje.classList.add("escondido");
        })
    }
});







/** Recibe por parámetro un valor y retorna true si es un valor numérico positivo (distinto a cero) o false en caso de no serlo
 * 
 * @param {*} numero
 * @return {boolean}
 */
function esNumeroEnteroPositivo(numero){

    let resultado = false; //Respuesta default

    if (Number.isInteger(Number(numero)) && Number(numero) > 0){
        resultado = true;
    }

    return resultado;
}


/** Recibe por parámetro un valor y retorna true si es un número decimal mayor o igual a cero
 * Retorna false si no es un número válido o si es negativo.
 * 
 * @param {*} numero 
 * @return {boolean}
 */
function esNumeroDecimalMayorOIgualACero(numero) {

    let resultado = false; // Respuesta default
    const valor = Number(numero);

    if (!isNaN(valor) && valor >= 0) {
        resultado = true;
    }

    return resultado;
}


/** Recibe por parámetro valores dia, mes y anio (representan día, mes y año)
 * y devuelve un valor booleano true si forman una fecha válida, o false si no
 * 
 * @param {*} dia
 * @param {*} mes
 * @param {*} anio
 * @returns {boolean}
 */
function esFechaValida(dia, mes, anio) {

    // Crea un objeto Date (fecha)
    // no es necesario validar si es valor numérico o positivo, el objeto Date corrige automáticamente fechas inválidas (años bisiestos y no)
    const fecha = new Date(anio ,mes-1, dia); //Es necesario el -1 porque JS guarda meses de 0 a 11

    let resultado = false; //Respuesta default

    // Compara la fecha creada en el objeto Date
    // si este no tuvo que corregirla, la comparación con los valores ingresados dará True
    if (fecha.getFullYear() == anio && fecha.getMonth()+1 == mes && fecha.getDate() == dia){ //Mes +1 por corrección a manipulación previa
        resultado = true;
    }

    return resultado;
}


/** Recibe por parámetro un valor y retorna true si es un e-mail válido o false si no lo es
 * 
 * @param {*} email
 * @return {boolean}
 */
function esEmailValido(email){

    const notacionCorrecta = /^(?!.*\.\.)[a-zA-Z0-9ñÑ.]+@[a-zA-Z_.-]+\.[a-zA-Z]{2,}$/; //Expresión regular (REGEX)
    /**
     *      ?!          es negación, no permite coincidir si aparece lo siquiente
     *      *           es un cuantificador 1 o más
     *      \.          es la forma de escribir "un punto" como caracter, en ese caso evita escribir 2 puntos seguidos (no es permitido en EMails)
     * [a-zA-Z0-9ñÑ.]   permite coincidir si aparecen esos caracteres (no incluye _ ni - como el otro)
     *      @           es literalmente el caracter arroba
     *     {2,}         es un cuantificador para [a-zA-Z] que coincide solo si hay 2 de estos caracteres o más
     */

    let respuesta = false; //Respuesta default

    // Si el EMail coincide con la estructura REGEX planteada
    if (notacionCorrecta.test(email)){
        respuesta = true;
    }

    return respuesta;
}


/** Recibe por parámetro un nombre o apellido y retorna true si es válido o false si no lo es
 *
 * @param {*} nombre
 * @return {boolean}
 */
function esNombreValido(nombre){

    const notacionCorrecta = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\ ]+$/; //Expresión regular (REGEX)

    let respuesta = false; //Respuesta default

    // Si el nombre coincide con la estructura REGEX planteada
    if (notacionCorrecta.test(nombre)){
        respuesta = true;
    }

    return respuesta;
}
