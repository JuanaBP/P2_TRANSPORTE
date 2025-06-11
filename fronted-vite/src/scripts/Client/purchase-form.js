import { gql } from '@apollo/client';
// Importa Apollo Client

import client from '../../Apollo/apolloClient.js';
import { CREATE_TICKET } from '../../graphQL/mutations.js';

// Elementos del formulario
const form = document.getElementById("ticketForm");
const msg = document.getElementById("responseMsg");

const originInput = document.getElementById("origin");
const destinationInput = document.getElementById("destination");
const priceInput = document.getElementById("price");
const numPasajerosInput = document.getElementById("numPasajeros");
const pasajerosContainer = document.getElementById("pasajerosContainer");

// Tabla de precios por ruta
const preciosPorRuta = {
  "Santa Cruz-La Paz": 220,
  "Santa Cruz-Cochabamba": 180,
  "La Paz-Cochabamba": 150,
  "Cochabamba-La Paz": 150,
  "Cochabamba-Santa Cruz": 180,
  "La Paz-Santa Cruz": 220
};

// Actualiza el precio automáticamente según origen y destino
function actualizarPrecio() {
  const origen = originInput.value.trim();
  const destino = destinationInput.value.trim();
  const clave = `${origen}-${destino}`;
  const precio = preciosPorRuta[clave];

  priceInput.value = precio !== undefined ? precio : '';
}

originInput.addEventListener("change", actualizarPrecio);
destinationInput.addEventListener("change", actualizarPrecio);

// Genera campos por pasajero
numPasajerosInput.addEventListener("change", () => {
  const count = parseInt(numPasajerosInput.value);
  pasajerosContainer.innerHTML = "";

  for (let i = 0; i < count; i++) {
    pasajerosContainer.innerHTML += `
      <div class="col-md-4">
        <label class="form-label">Nombre pasajero ${i + 1}</label>
        <input type="text" class="form-control" name="nombre${i}" required />
      </div>
      <div class="col-md-4">
        <label class="form-label">Apellido pasajero ${i + 1}</label>
        <input type="text" class="form-control" name="apellido${i}" required />
      </div>
      <div class="col-md-4">
        <label class="form-label">N° asiento pasajero ${i + 1}</label>
        <input type="number" class="form-control" name="asiento${i}" min="1" required />
      </div>
    `;
  }
});

// Envío del formulario para múltiples pasajeros
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const origen = originInput.value.trim();
  const destino = destinationInput.value.trim();
  const precio = parseFloat(priceInput.value);
  const fecha = document.getElementById("date").value;
  const count = parseInt(numPasajerosInput.value);

  if (!precio) {
    msg.innerHTML = `<div class="alert alert-danger">Selecciona una ruta válida para calcular el precio.</div>`;
    return;
  }

  const resultados = [];

  for (let i = 0; i < count; i++) {
    const nombre = document.querySelector(`[name="nombre${i}"]`).value;
    const apellido = document.querySelector(`[name="apellido${i}"]`).value;
    const asiento = parseInt(document.querySelector(`[name="asiento${i}"]`).value);

    try {
      const result = await client.mutate({
        mutation: CREATE_TICKET,
        variables: {
          origin: origen,
          destination: destino,
          passengerName: nombre,
          passengerApellido: apellido,
          seatNumber: asiento,
          date: fecha,
          price: precio
        }
      });

      resultados.push(result.data.createTicket);
    } catch (error) {
      msg.innerHTML = `<div class="alert alert-danger">Error al crear ticket ${i + 1}: ${error.message}</div>`;
      return;
    }
  }

  msg.innerHTML = `
    <div class="alert alert-success">
      ✅ ${resultados.length} tickets creados con éxito:
      <div class="row mt-3">
        ${resultados.map(t => `
          <div class="col-md-4 mb-3">
            <div class="border p-2 rounded shadow-sm text-center bg-white">
              <p><strong>${t.passengerName}</strong><br>${t.origin} → ${t.destination}<br>Asiento ${t.seatNumber}</p>
              <img src="${t.qrCode}" alt="QR" class="img-fluid mt-2" style="max-width:150px;" />
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  form.reset();
  pasajerosContainer.innerHTML = "";
  priceInput.value = "";
});
