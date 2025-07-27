// Se definen e inicializan variables
let numeroSecreto = 0;
let intentos = 0;
let numeroUsuario = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
const maximosIntentos = 3;

function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
}

function verificarIntento() {
  numeroUsuario = parseInt(document.getElementById("numero-usuario").value);

  if (isNaN(numeroUsuario)) {
    asignarTextoElemento("p", "Por favor ingresa un número válido.");
    return;
  }

  if (numeroUsuario === numeroSecreto) {
    asignarTextoElemento(
      "p",
      `🎉 ¡Acertaste el número en ${intentos} ${
        intentos > 1 ? "intentos" : "intento"
      }!`
    );
    document.getElementById("reiniciar").removeAttribute("disabled");
    deshabilitarInput();
  } else {
    if (numeroUsuario > numeroSecreto) {
      asignarTextoElemento(
        "p",
        `❌ El número secreto es menor que ${numeroUsuario}`
      );
    } else {
      asignarTextoElemento(
        "p",
        `❌ El número secreto es mayor que ${numeroUsuario}`
      );
    }

    intentos++;

    if (intentos > maximosIntentos) {
      asignarTextoElemento(
        "p",
        `🚫 Has alcanzado el máximo de ${maximosIntentos} intentos. El número secreto era ${numeroSecreto}.`
      );
      document.getElementById("reiniciar").removeAttribute("disabled");
      deshabilitarInput();
    }

    limpiarCaja();
  }
}

function limpiarCaja() {
  document.querySelector("#numero-usuario").value = "";
}

function deshabilitarInput() {
  document.querySelector("#numero-usuario").setAttribute("disabled", "true");
  document.querySelector("button").setAttribute("disabled", "true"); // Asumiendo que hay un solo botón de "Intentar"
}

function habilitarInput() {
  document.querySelector("#numero-usuario").removeAttribute("disabled");
  document.querySelector("button").removeAttribute("disabled");
}

function generarNumeroSecreto() {
  let numeroGenerado = parseInt(Math.random() * numeroMaximo + 1);

  if (listaNumerosSorteados.length == numeroMaximo) {
    asignarTextoElemento("p", "🎲 Ya se sortearon todos los números posibles.");
    return;
  }

  if (listaNumerosSorteados.includes(numeroGenerado)) {
    return generarNumeroSecreto();
  } else {
    listaNumerosSorteados.push(numeroGenerado);
    return numeroGenerado;
  }
}

function configuracionInicial() {
  asignarTextoElemento("h1", "🎯 Juego del número secreto");
  asignarTextoElemento("p", `Ingrese un número del 1 al ${numeroMaximo}`);
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;
  limpiarCaja();
  habilitarInput();
  document.getElementById("reiniciar").setAttribute("disabled", "true");
}

function reiniciarJuego() {
  configuracionInicial();
}

configuracionInicial();
