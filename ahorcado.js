const ingresoDeLetra = document.querySelector(".ingresoDeLetra");
const intentosFallidos = document.querySelector(".intentosFallidos");
const ultimoResultado = document.querySelector(".ultimoResultado");
const botonIngresoLetra = document.querySelector(".enviarIngresoDeLetra");
const muestraPalabra = document.querySelector(".palabra");
const descripcionPalabra = document.querySelector(".descripcion-palabra")
const palabras = ["perro", "gato", "elefante", "jirafa", "tigre", "leon", "loro", "mono", "cocodrilo", "rinoceronte"];
const descripcionesPalabras = [
	"Es un animal doméstico de compañía que suele ser leal y juguetón.",
	"Es un felino que suele ser independiente y tiene la capacidad de maullar.",
	"Es un mamífero de gran tamaño con una trompa larga y colmillos.",
	"Es un animal herbívoro con un cuello largo y manchas en su pelaje.",
	"Es un felino grande y poderoso, conocido por sus rayas distintivas.",
	'Es un felino conocido como el "rey de la selva" por su fuerza y majestuosidad.',
	"Es un ave tropical colorida que puede imitar sonidos y palabras.",
	"Es un primate inteligente que vive en selvas y suele utilizar herramientas.",
	"Es un reptil grande y semiacuático con mandíbulas fuertes y dientes afilados.",
	"Es un mamífero herbívoro con un tamaño grande y un cuerno en su nariz.",
];

let numeroAleatorio = Math.floor(Math.random() * palabras.length);
let palabraSeleccionadaAleatoria = palabras[numeroAleatorio];
let descripcionActual = descripcionesPalabras[numeroAleatorio];

descripcionPalabra.textContent = descripcionActual

let intentos = 5 + palabraSeleccionadaAleatoria.length;

let letrasAdivinadas = [];

muestraPalabra.textContent = "La palabra tiene " + palabraSeleccionadaAleatoria.length + " letras.";

function mostrarPalabraPagina() {
	let mostrarPalabra = "";

	for (let i = 0; i < palabraSeleccionadaAleatoria.length; i++) {
		let letra = palabraSeleccionadaAleatoria[i];
		if (letrasAdivinadas.includes(letra)) {
			mostrarPalabra += letra;
		} else {
			mostrarPalabra += "_ ";
		}
		muestraPalabra.textContent = mostrarPalabra;
	}
}

console.log(palabraSeleccionadaAleatoria);
function controlarLetra() {
	let letraIngresada = ingresoDeLetra.value.toLowerCase();

	if (!ingresoDeLetra.value || !isNaN(ingresoDeLetra.value)) {
		alert("Ingrese una letra !");
		ingresoDeLetra.value = "";
		ingresoDeLetra.focus();
		return;
	}

	if (letrasAdivinadas.includes(letraIngresada)) {
		ultimoResultado.textContent = "Ya ingresaste esa letra !";
		ingresoDeLetra.value = "";
		ingresoDeLetra.focus();
		return;
	}

	for (let i = 0; i < palabraSeleccionadaAleatoria.length; i++) {
		if (palabraSeleccionadaAleatoria[i].includes(letraIngresada)) {
			ultimoResultado.innerHTML = "Correcto! La letra <strong style='font-weight: bold; color: #B2597A;'>" + letraIngresada + "</strong> esta en la palabra.";
			letrasAdivinadas.push(letraIngresada);
		} else {
			ultimoResultado.innerHTML = "Incorrecto!";
		}
	}

	if (palabraSeleccionadaAleatoria.includes(letraIngresada)) {
		ultimoResultado.innerHTML = "Correcto! La letra <strong style='font-weight: bold; color: #B2597A;'>" + letraIngresada + "</strong> esta en la palabra.";
	} else {
		ultimoResultado.innerHTML = "Incorrecto !";
	}

	if (letrasAdivinadas.length == palabraSeleccionadaAleatoria.length) {
		ultimoResultado.textContent = "BIEN ! adivinaste la palabra";
		finDelJuego();
	}

	mostrarPalabraPagina();
	intentos--;
	intentosFallidos.innerHTML = "Actualmente tenes <strong style='font-weight: bold; color: #B2597A;'>" + intentos + "</strong> intentos.";

	// console.log("letras en palabra: " + palabraSeleccionadaAleatoria.length)
	// console.log("letras adivinadas: " + letrasAdivinadas.length)
	// console.log(letrasAdivinadas)
	let calculoIntentos = palabraSeleccionadaAleatoria.length - letrasAdivinadas.length;
	// console.log("calculo intentos: " + calculoIntentos)
	// console.log("intentos: " + intentos)
	// console.log("tengo pocos intentos ? " + (calculoIntentos > intentos))

	if (calculoIntentos > intentos) {
		finDelJuego();
		alert("Los intentos no son suficientes para adivinar la palabra !");
	}

	// if (intentos === 0) {
	// ultimoResultado.textContent = "Se te terminaron los intentos";
	// finDelJuego();
	// }

	ingresoDeLetra.value = "";
	ingresoDeLetra.focus();
}

function finDelJuego() {
	intentosFallidos.innerHTML = "Perdiste ! la palabra era <strong style='font-weight: bold; color: #B2597A;'>" + palabraSeleccionadaAleatoria + "</strong>.";
	// ultimoResultado.textContent = "";
	ingresoDeLetra.disabled = true;
	botonIngresoLetra.disabled = true;
	btnResetear = document.createElement("button");
	btnResetear.textContent = "Resetear";
	btnResetear.setAttribute("id", "resetear");
	botonIngresoLetra.replaceWith(btnResetear);
	btnResetear.addEventListener("click", resetearJuego);
}

function resetearJuego() {
	numeroAleatorio = Math.floor(Math.random() * palabras.length);
	palabraSeleccionadaAleatoria = palabras[numeroAleatorio];
    descripcionActual = descripcionesPalabras[numeroAleatorio];
    descripcionPalabra.textContent = descripcionActual;
	intentos = 5 + palabraSeleccionadaAleatoria.length;
	btnResetear.replaceWith(botonIngresoLetra);
	ingresoDeLetra.disabled = false;
	botonIngresoLetra.disabled = false;
	ingresoDeLetra.focus();
	letrasAdivinadas = [];
	muestraPalabra.textContent = "La palabra tiene " + palabraSeleccionadaAleatoria.length + " letras.";
	ultimoResultado.textContent = "";
	intentosFallidos.innerHTML = "Actualmente tenes <strong style='font-weight: bold; color: #B2597A;'>" + intentos + "</strong> intentos.";
}

ingresoDeLetra.focus();
botonIngresoLetra.addEventListener("click", controlarLetra);
