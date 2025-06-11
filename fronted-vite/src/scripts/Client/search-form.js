import client from '/src/Apollo/apolloClient.js';
import { SEARCH_TICKETS, PARSE_NLP } from '/src/graphQL/queries.js';

const resultadoSalidas = document.getElementById("resultadoSalidas");
const manualForm = document.getElementById("manualForm");
const nlpForm = document.getElementById("nlpForm");
const nlpInput = document.getElementById("nlpInput");

//Búsqueda por lenguaje natural
nlpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  resultadoSalidas.innerHTML = `<div class="alert alert-info">Procesando búsqueda en lenguaje natural...</div>`;

  try {
    const { data } = await client.query({
      query: PARSE_NLP,
      variables: { text: nlpInput.value }
    });

    const { origin, destination, date, passengers } = data.parseNaturalText;
    localStorage.setItem("pasajeros", passengers);
    await buscarSalidas(origin, destination, date);

  } catch (err) {
    resultadoSalidas.innerHTML = `<div class="alert alert-danger">Error NLP: ${err.message}</div>`;
  }
});

// Búsqueda tradicional por formulario
manualForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const origin = document.getElementById("origen").value;
  const destination = document.getElementById("destino").value;
  const date = document.getElementById("fecha").value;
  const pasajeros = document.getElementById("pasajeros").value;

  localStorage.setItem("pasajeros", pasajeros);
  await buscarSalidas(origin, destination, date);
});

// Función reutilizable para buscar y mostrar salidas
async function buscarSalidas(origin, destination, date) {
  resultadoSalidas.innerHTML = `<div class="alert alert-info">Buscando salidas disponibles...</div>`;

  try {
    const { data } = await client.query({
      query: SEARCH_TICKETS,
      variables: { origin, destination, date }
    });

    const salidas = data.searchTickets;

    if (!salidas.length) {
      resultadoSalidas.innerHTML = `<div class="alert alert-warning">No se encontraron salidas disponibles para los criterios seleccionados.</div>`;
      return;
    }

    resultadoSalidas.innerHTML = salidas.map(s => `
      <div class="card mb-3 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${s.origin} → ${s.destination}</h5>
          <p class="card-text">${s.departureTime} → ${s.arrivalTime}</p>
          <p class="card-text">Empresa: <strong>${s.company}</strong></p>
          <p class="card-text">Precio: <strong>Bs ${s.price}</strong></p>
          <button class="btn btn-primary" onclick='seleccionarSalida(${JSON.stringify(s).replace(/'/g, "\\'")})'>Seleccionar</button>
        </div>
      </div>
    `).join("");

  } catch (err) {
    resultadoSalidas.innerHTML = `<div class="alert alert-danger">Error al buscar tickets: ${err.message}</div>`;
  }
}

// ✅ Guardar salida seleccionada y redirigir
window.seleccionarSalida = function (salida) {
  localStorage.setItem("salidaSeleccionada", JSON.stringify(salida));
  window.location.href = "/src/components/Client/select-passengers.html";
};
