let fraseSeleccionadaIndex = null;
let emparejamientosDelJugador = [null, null, null, null, null];
let respuestaCorrectaPorImagen = [];
let frasesMarcadas = [false, false, false, false, false]; // para marcar solo una vez

fetch('https://thesimpsonsquoteapi.glitch.me/quotes?count=5')
  .then(response => response.json())
  .then(listaDeFrasesOriginal => {
    listaDeFrasesOriginal.forEach((fraseObjeto, posicionFrase) => {
      const divFrase = document.getElementById(`frase${posicionFrase + 1}`);
      divFrase.innerText = fraseObjeto.quote;
      divFrase.onclick = () => {
        fraseSeleccionada = posicionFrase;
        document.querySelectorAll('.frase').forEach((f, i) => {
          if (!frasesMarcadas[i]) f.style.backgroundColor = '';
        });
        if (!frasesMarcadas[posicionFrase]) {
          divFrase.style.backgroundColor = 'yellow';
        }
      };
    });

    const listaMezclada = [...listaDeFrasesOriginal];
    for (let i = listaMezclada.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [listaMezclada[i], listaMezclada[j]] = [listaMezclada[j], listaMezclada[i]];
    }

    respuestaCorrectaPorImagen = listaMezclada.map(
      imagen => listaDeFrasesOriginal.indexOf(imagen)
    );

    listaMezclada.forEach((fraseConImagen, posicionImagen) => {
      const divImagen = document.getElementById(`imagen${posicionImagen + 1}`);
      divImagen.innerHTML = `<img src="${fraseConImagen.image}" cursor:pointer;">`;

      divImagen.onclick = () => {
        if (fraseSeleccionada === null) {
          alert("Primero hacé clic en una frase.");
          return;
        }
        emparejamientosDelJugador[posicionImagen] = fraseSeleccionada;
        divImagen.style.backgroundColor = "#d4ffd4";

        const divFraseMarcada = document.getElementById(`frase${fraseSeleccionada + 1}`);
        if (!frasesMarcadas[fraseSeleccionada]) {
          divFraseMarcada.style.backgroundColor = "#d4ffd4";
          frasesMarcadas[fraseSeleccionada] = true;
        }

        fraseSeleccionada= null;
      };
    });
  });

document.getElementById("verResultado").onclick = () => {
  let cantidadCorrectas = 0;

  for (let posicion = 0; posicion < 5; posicion++) {
    if (emparejamientosDelJugador[posicion] === respuestaCorrectaPorImagen[posicion]) {
      cantidadCorrectas++;
    }
  }

  if (cantidadCorrectas === 5) {
    alert("5/5");
  } else {
    alert(`Acertaste ${cantidadCorrectas}/ 5 `);
  }
};
