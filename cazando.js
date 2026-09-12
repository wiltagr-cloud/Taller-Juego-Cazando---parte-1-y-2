const canvas = document.getElementById("juego");
const ctx = canvas.getContext("2d");

const puntosTexto = document.getElementById("puntos");
const tiempoTexto = document.getElementById("tiempo");
const mensaje = document.getElementById("mensaje");


let jugador = {
    x: 50,
    y: 150,
    tamaño: 30,
    velocidad: 20
};


let objetivo = {
    x: 400,
    y: 200,
    tamaño: 25
};

let puntos = 0;
let tiempo = 10;
let juegoActivo = true;


function dibujarJugador() {
    ctx.fillStyle = "blue";
    ctx.fillRect(
        jugador.x,
        jugador.y,
        jugador.tamaño,
        jugador.tamaño
    );
}


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


function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dibujarJugador();
    dibujarObjetivo();
}


function mover(direccion) {

    if (!juegoActivo) {
        return;
    }

    if (direccion === "arriba") {
        jugador.y -= jugador.velocidad;
    }

    if (direccion === "abajo") {
        jugador.y += jugador.velocidad;
    }

    if (direccion === "izquierda") {
        jugador.x -= jugador.velocidad;
    }

    if (direccion === "derecha") {
        jugador.x += jugador.velocidad;
    }

    // Evitar salir del canvas

    if (jugador.x < 0) {
        jugador.x = 0;
    }

    if (jugador.y < 0) {
        jugador.y = 0;
    }

    if (jugador.x + jugador.tamaño > canvas.width) {
        jugador.x = canvas.width - jugador.tamaño;
    }

    if (jugador.y + jugador.tamaño > canvas.height) {
        jugador.y = canvas.height - jugador.tamaño;
    }

    comprobarCaza();

    dibujar();
}


function comprobarCaza() {

    const distanciaX =
        jugador.x + jugador.tamaño / 2 - objetivo.x;

    const distanciaY =
        jugador.y + jugador.tamaño / 2 - objetivo.y;

    const distancia =
        Math.sqrt(
            distanciaX * distanciaX +
            distanciaY * distanciaY
        );

    if (distancia < jugador.tamaño / 2 + objetivo.tamaño) {

        puntos++;

        puntosTexto.textContent = puntos;

        // Nueva posición del objetivo
        objetivo.x =
            Math.random() * (canvas.width - 50) + 25;

        objetivo.y =
            Math.random() * (canvas.height - 50) + 25;
    }
}


// Temporizador
const reloj = setInterval(function () {

    if (!juegoActivo) {
        return;
    }

    tiempo--;

    tiempoTexto.textContent = tiempo;

    if (tiempo <= 0) {

        juegoActivo = false;

        clearInterval(reloj);

        mensaje.textContent =
            "⏰ ¡Tiempo terminado! Puntuación: " + puntos;

    }

}, 1000);


// Control con teclado
document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowUp") {
        mover("arriba");
    }

    if (event.key === "ArrowDown") {
        mover("abajo");
    }

    if (event.key === "ArrowLeft") {
        mover("izquierda");
    }

    if (event.key === "ArrowRight") {
        mover("derecha");
    }

});


// Dibujar el juego al comenzar
dibujar();
