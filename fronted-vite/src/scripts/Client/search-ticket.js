import client from '../../Apollo/apolloClient.js';
import { gql } from '@apollo/client/core';
import { CREATE_TICKET, CREATE_PAYMENT } from '../../graphQL/mutations.js';
import { SEARCH_TICKETS, PARSE_NLP } from '../../graphQL/queries.js';


/*
// GraphQL query para buscar salidas
const SEARCH_TICKETS = gql`
  query ($origin: String!, $destination: String!, $date: String!) {
    searchTickets(origin: $origin, destination: $destination, date: $date) {
      id
      origin
      destination
      departureTime
      arrivalTime
      price
      company
    }
  }
`; */

const resultsDiv = document.getElementById("results");

// Manejo de búsqueda por lenguaje natural
document.getElementById("nlpForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = document.getElementById("nlpInput").value;
  resultsDiv.innerHTML = "Procesando búsqueda...";

  try {
    // Llamada al microservicio NLP
    const response = await fetch("http://localhost:5001/parse-text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const { origin, destination, date } = await response.json();
    await buscarTickets(origin, destination, date);
  } catch (err) {
    resultsDiv.innerHTML = `<p class="text-danger">Error NLP: ${err.message}</p>`;
  }
});

// Manejo de búsqueda por formulario
document.getElementById("formularioBusqueda").addEventListener("submit", async (e) => {
  e.preventDefault();

  const origin = document.getElementById("origen").value;
  const destination = document.getElementById("destino").value;
  const date = document.getElementById("fecha").value;

  if (!origin || !destination || !date) {
    resultsDiv.innerHTML = `<p class="text-danger">Por favor completa todos los campos</p>`;
    return;
  }

  await buscarTickets(origin, destination, date);
});

// Función reutilizable para consultar tickets y mostrarlos
async function buscarTickets(origin, destination, date) {
  resultsDiv.innerHTML = "🔎 Buscando salidas disponibles...";

  try {
    const result = await client.query({
      query: SEARCH_TICKETS,
      variables: { origin, destination, date }
    });

    const trips = result.data.searchTickets;

    if (!trips.length) {
      resultsDiv.innerHTML = "<p class='text-warning'>No se encontraron salidas para esa búsqueda.</p>";
      return;
    }

    resultsDiv.innerHTML = trips.map(t => `
      <div class="card mb-3 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${t.origin} → ${t.destination}</h5>
          <p class="card-text">${t.departureTime} ➝ ${t.arrivalTime}</p>
          <p class="card-text">Empresa: <strong>${t.company}</strong></p>
          <p class="card-text">Precio: <strong>Bs ${t.price}</strong></p>
          <button class="btn btn-primary">Seleccionar</button>
        </div>
      </div>
    `).join("");

  } catch (err) {
    resultsDiv.innerHTML = `<p class="text-danger">Error al consultar tickets: ${err.message}</p>`;
  }
}
