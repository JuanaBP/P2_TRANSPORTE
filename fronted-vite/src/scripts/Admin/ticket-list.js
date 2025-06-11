import client from '/src/Apollo/apolloClient.js';
import { GET_TICKETS } from '/src/graphQL/queries.js';

const container = document.getElementById("ticket-content");

client.query({ query: GET_TICKETS })
  .then(result => {
    const tickets = result.data.getTickets;

    if (tickets.length === 0) {
      container.innerHTML = "<p class='text-muted'>No hay boletos registrados.</p>";
      return;
    }

    const table = document.createElement("table");
    table.className = "table table-bordered table-striped table-hover mt-4";

    table.innerHTML = `
      <thead class="table-dark text-center">
        <tr>
          <th>Pasajero</th>
          <th>Origen</th>
          <th>Destino</th>
          <th>Fecha</th>
          <th>Asiento</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        ${tickets.map(t => `
          <tr>
            <td>${t.passengerName} ${t.passengerApellido}</td>
            <td>${t.origin}</td>
            <td>${t.destination}</td>
            <td>${new Date(t.date).toLocaleDateString()}</td>
            <td>${t.seatNumber}</td>
            <td>${t.price.toFixed(2)} Bs</td>
          </tr>
        `).join("")}
      </tbody>
    `;

    container.innerHTML = "";
    container.appendChild(table);
  })
  .catch(err => {
    container.innerHTML = `<div class="alert alert-danger">Error al cargar tickets: ${err.message}</div>`;
  });

