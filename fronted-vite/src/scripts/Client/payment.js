import client from '/src/Apollo/apolloClient.js';
import { CREATE_TICKET, CREATE_PAYMENT } from '/src/graphQL/mutations.js';

const resumenDiv = document.getElementById("resumenCompra");
const estadoPago = document.getElementById("estadoPago");
const confirmarBtn = document.getElementById("confirmarPagoBtn");

const salida = JSON.parse(localStorage.getItem("salidaSeleccionada"));
const pasajeros = JSON.parse(localStorage.getItem("pasajerosData"));
const asientos = JSON.parse(localStorage.getItem("asientosSeleccionados"));

// Validación
if (!salida || !pasajeros || !asientos || pasajeros.length !== asientos.length) {
  resumenDiv.innerHTML = `<div class="alert alert-danger">Datos incompletos para procesar el pago.</div>`;
  confirmarBtn.disabled = true;
  throw new Error("Datos incompletos");
}

const total = salida.price * pasajeros.length;

// Mostrar resumen
resumenDiv.innerHTML = `
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Ruta: ${salida.origin} → ${salida.destination}</h5>
      <p class="card-text">Empresa: ${salida.company}</p>
      <p class="card-text">Fecha: ${salida.departureTime}</p>
      <p class="card-text">Precio por pasajero: <strong>Bs ${salida.price}</strong></p>
      <p class="card-text">Total a pagar: <strong class="text-success">Bs ${total}</strong></p>
    </div>
  </div>

  <h5 class="mt-4">👥 Pasajeros:</h5>
  <ul class="list-group mt-2">
    ${pasajeros.map((p, i) => `
      <li class="list-group-item">
        ${p.nombre} ${p.apellido} - CI: ${p.ci} - Asiento: ${asientos[i]}
      </li>
    `).join("")}
  </ul>
`;

// Evento de confirmación
confirmarBtn.addEventListener("click", async () => {
  estadoPago.innerHTML = `<div class="alert alert-info">💬 Procesando compra...</div>`;

  try {
    // Crear tickets (uno por pasajero)
    for (let i = 0; i < pasajeros.length; i++) {
      await client.mutate({
        mutation: CREATE_TICKET,
        variables: {
          origin: salida.origin,
          destination: salida.destination,
          passengerName: pasajeros[i].nombre,
          passengerApellido: pasajeros[i].apellido,
          seatNumber: asientos[i],
          date: salida.departureTime,
          price: salida.price
        }
      });
    }

    // Crear un solo pago total
    const pago = await client.mutate({
      mutation: CREATE_PAYMENT,
      variables: {
        passengerName: pasajeros[0].nombre, // titular del pago
        amount: total,
        method: "Efectivo" // puedes hacerlo dinámico más adelante
      }
    });

    const p = pago.data.createPayment;

    estadoPago.innerHTML = `
      <div class="alert alert-success">
        Compra realizada con éxito.<br/>
        Código de confirmación: <strong>${p.confirmationCode}</strong><br/>
        Monto pagado: <strong>Bs ${total}</strong><br/>
        Estado: ${p.status}
      </div>
    `;

    confirmarBtn.disabled = true;
    localStorage.clear();

  } catch (err) {
    estadoPago.innerHTML = `<div class="alert alert-danger"> Error: ${err.message}</div>`;
  }
});
