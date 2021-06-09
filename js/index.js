import { getPersonajes, mataPersonajes } from "./funciones.js";

const botonCargar = document.querySelector(".cargar-personajes");
const botonMatar = document.querySelector(".matar-familia");
const listadoPersonajes = document.querySelector(".personajes");
const inputFamilia = document.querySelector(".input-familia");
const mensajeError = document.querySelector(".mensaje");

let personajes = [];

botonCargar.addEventListener("click", async () => {
  personajes = await getPersonajes();
  pintaPersonajes(personajes);
});

const limpiarPersonajes = () => {
  for (const nuevoPersonaje of listadoPersonajes.querySelectorAll(
    ".nuevo-personaje"
  )) {
    nuevoPersonaje.remove();
  }
};

const pintaPersonajes = (personajes) => {
  limpiarPersonajes();
  for (const personaje of personajes) {
    const { nombre, familia, vivo } = personaje;
    const nuevoPersonaje = listadoPersonajes
      .querySelector(".personaje-dummy")
      .cloneNode(true);
    nuevoPersonaje.classList.remove("personaje-dummy");
    nuevoPersonaje.classList.add("nuevo-personaje");

    nuevoPersonaje.querySelector(".nombre").textContent = `${nombre} `;
    nuevoPersonaje.querySelector(".familia").textContent = familia;
    nuevoPersonaje.querySelector(".estado").textContent = vivo
      ? "Vivo"
      : "Muerto";
    listadoPersonajes.append(nuevoPersonaje);
  }
};

botonMatar.addEventListener("click", async (e) => {
  try {
    const personajes = await mataPersonajes(inputFamilia.value);
    pintaPersonajes(personajes);
  } catch (error) {
    mensajeError.textContent = error.message;
  }
});
