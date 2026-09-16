const canvas = document.getElementById("juego");
const ctx = canvas.getContext("2d");

const puntosTexto = document.getElementById("puntos");
const tiempoTexto = document.getElementById("tiempo");
const mensaje = document.getElementById("mensaje");

let jugador = {
    x: 50,
    y: 150,
    tamaño: 30,
    velocidad: 10
};

let objetivo = {
    x: 400,
    y: 200,
    tamaño: 25
};

let puntos = 0;
let tiempo = 10;
let juegoActivo = true;
let reloj;


// =========================
// DIBUJAR JUGADOR
// =========================

function dibujarJugador() {

    ctx.fillStyle = "blue";

    ctx.fillRect(
        jugador.x,
        jugador.y,
        jugador.tamaño,
        jugador.tamaño
    );

}


// =========================
// DIBUJAR OBJETIVO
// =========================

function dibujarObjetivo() {

    ctx.fillStyle = "red";

    ctx.beginPath();

    ctx.arc(
        objetivo.x,
        objetivo.y,
        objetivo.tamaño,
        0,
        Math.PI * 2
    );

    ctx.fill();

}


// =========================
// LIMPIAR CANVAS
// =========================

function limpiarCanva() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}


// =========================
// DIBUJAR TODO
// =========================

function dibujar() {

    limpiarCanva();

    dibujarJugador();

    dibujarObjetivo();

}


// =========================
// MOVER IZQUIERDA
// =========================

function moverIzquierda() {

    if (!juegoActivo) {
        return;
    }

    jugador.x = jugador.x - jugador.velocidad;

    if (jugador.x < 0) {
        jugador.x = 0;
    }

    dibujar();

    detectarColision();

}


// =========================
// MOVER DERECHA
// =========================

function moverDerecha() {

    if (!juegoActivo) {
        return;
    }

    jugador.x = jugador.x + jugador.velocidad;

    if (jugador.x + jugador.tamaño > canvas.width) {
        jugador.x = canvas.width - jugador.tamaño;
    }

    dibujar();

    detectarColision();

}


// =========================
// MOVER ARRIBA
// =========================

function moverArriba() {

    if (!juegoActivo) {
        return;
    }

    jugador.y = jugador.y - jugador.velocidad;

    if (jugador.y < 0) {
        jugador.y = 0;
    }

    dibujar();

    detectarColision();

}


// =========================
// MOVER ABAJO
// =========================

function moverAbajo() {

    if (!juegoActivo) {
        return;
    }

    jugador.y = jugador.y + jugador.velocidad;

    if (jugador.y + jugador.tamaño > canvas.height) {
        jugador.y = canvas.height - jugador.tamaño;
    }

    dibujar();

    detectarColision();

}


// =========================
// DETECTAR COLISION
// =========================

function detectarColision() {

    if (
        jugador.x < objetivo.x + objetivo.tamaño &&
        jugador.x + jugador.tamaño > objetivo.x - objetivo.tamaño &&
        jugador.y < objetivo.y + objetivo.tamaño &&
        jugador.y + jugador.tamaño > objetivo.y - objetivo.tamaño
    ) {

        puntos = puntos + 1;

        puntosTexto.textContent = puntos;


        // =========================
        // GANADOR
        // =========================

        if (puntos >= 6) {

            alert("¡GANADOR!");

            juegoActivo = false;

            clearInterval(reloj);

            mensaje.textContent = "🎉 ¡GANASTE! Puntuación: " + puntos;

            return;
        }


        // Nueva posición del objetivo

        objetivo.x = generarAleatorio(
            25,
            canvas.width - 25
        );

        objetivo.y = generarAleatorio(
            25,
            canvas.height - 25
        );

        dibujar();

    }

}


// =========================
// RESTAR TIEMPO
// =========================

function restarTiempo() {

    if (!juegoActivo) {
        return;
    }

    tiempo = tiempo - 1;

    tiempoTexto.textContent = tiempo;


    // =========================
    // GAME OVER
    // =========================

    if (tiempo <= 0) {

        juegoActivo = false;

        clearInterval(reloj);

        alert("GAME OVER");

        mensaje.textContent =
            "💀 GAME OVER - Puntuación: " + puntos;

    }

}


// =========================
// INICIAR JUEGO
// =========================

function iniciar() {

    dibujar();

    reloj = setInterval(
        restarTiempo,
        1000
    );

}


// =========================
// REINICIAR
// =========================

function reiniciar() {

    // Detener reloj anterior

    clearInterval(reloj);


    // Restaurar variables

    puntos = 0;

    tiempo = 10;

    juegoActivo = true;


    // Restaurar jugador

    jugador.x = 50;

    jugador.y = 150;


    // Generar objetivo nuevamente

    objetivo.x = generarAleatorio(
        25,
        canvas.width - 25
    );

    objetivo.y = generarAleatorio(
        25,
        canvas.height - 25
    );


    // Actualizar pantalla

    puntosTexto.textContent = puntos;

    tiempoTexto.textContent = tiempo;

    mensaje.textContent = "";


    // Dibujar

    dibujar();


    // Volver a iniciar contador

    reloj = setInterval(
        restarTiempo,
        1000
    );

}


// =========================
// TECLADO
// =========================

document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowUp") {
        moverArriba();
    }

    if (event.key === "ArrowDown") {
        moverAbajo();
    }

    if (event.key === "ArrowLeft") {
        moverIzquierda();
    }

    if (event.key === "ArrowRight") {
        moverDerecha();
    }

});


// =========================
// INICIAR
// =========================

iniciar();