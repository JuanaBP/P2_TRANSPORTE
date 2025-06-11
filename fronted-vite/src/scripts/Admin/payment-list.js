import client from '/src/Apollo/apolloClient.js';
import { GET_PAYMENTS } from '/src/graphQL/queries.js';

const container = document.getElementById("payment-content");

client.query({ query: GET_PAYMENTS })
  .then(result => {
    const payments = result.data.getPayments;

    if (payments.length === 0) {
      container.innerHTML = "<p class='text-muted'>No hay pagos registrados.</p>";
      return;
    }

    const table = document.createElement("table");
    table.className = "table table-striped table-bordered table-hover mt-3";

    table.innerHTML = `
      <thead class="table-dark text-center">
        <tr>
          <th>Pasajero</th>
          <th>Monto</th>
          <th>Método</th>
          <th>Estado</th>
          <th>Confirmación</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        ${payments.map(p => `
          <tr>
            <td>${p.passengerName}</td>
            <td>${p.amount.toFixed(2)} Bs</td>
            <td>${p.method}</td>
            <td>${p.status}</td>
            <td>${p.confirmationCode}</td>
            <td>${new Date(p.timestamp).toLocaleString()}</td>
          </tr>
        `).join("")}
      </tbody>
    `;

    container.innerHTML = "";
    container.appendChild(table);
  })
  .catch(err => {
    container.innerHTML = `<div class="alert alert-danger">error al cargar pagos: ${err.message}</div>`;
  });
