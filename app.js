// Se defienen e inicializan variables
let numeroSecreto = 0;
let intentos = 0;
let numeroUsuario = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

function verificarIntento() {
  numeroUsuario = parseInt(document.getElementById("numero-usuario").value);
  console.log(numeroSecreto);
  console.log(intentos);
  if (numeroUsuario === numeroSecreto) {
    asignarTextoElemento(
      "p",
      `Acertaste el número en ${intentos} ${
        intentos > 1 ? "intentos" : "intento"
      }`
    );
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (numeroUsuario > numeroSecreto) {
      asignarTextoElemento(
        "p",
        `El número secreto es menor que ${numeroUsuario}`
      );
    } else {
      asignarTextoElemento(
        "p",
        `El número secreto es mayor que ${numeroUsuario}`
      );
    }
    intentos++;
    limpiarCaja();
  }
  return;
}

function limpiarCaja() {
  document.querySelector("#numero-usuario").value = "";
}

function generarNumeroSecreto() {
  let numeroGenerado = parseInt(Math.random() * numeroMaximo + 1);

  console.log(numeroGenerado);
  console.log(listaNumerosSorteados);

  if (listaNumerosSorteados.length == numeroMaximo) {
    asignarTextoElemento("p", "Ya se sortearon todos los números");
  } else {
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      return generarNumeroSecreto();
    } else {
      listaNumerosSorteados.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

function configuracionInicial() {
  asignarTextoElemento("h1", "Juego del número secreto");
  asignarTextoElemento("p", `Ingrese un número del 1 al ${numeroMaximo}`);
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;
}

function reiniciarJuego() {
  limpiarCaja();
  configuracionInicial();
  document.querySelector("#reiniciar").setAttribute("disabled", "true");
}

configuracionInicial();
