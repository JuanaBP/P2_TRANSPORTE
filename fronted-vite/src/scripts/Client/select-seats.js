const cantidadPasajeros = parseInt(localStorage.getItem("pasajeros")) || 1;
const mapaAsientos = document.getElementById("mapaAsientos");
const confirmarBtn = document.getElementById("confirmarBtn");
const indicadorPasajero = document.getElementById("indicadorPasajero");

let seleccionados = [];

function crearAsientos(total = 40) {
  for (let i = 1; i <= total; i++) {
    const btn = document.createElement("button");
    btn.className = "seat btn btn-outline-secondary btn-sm";
    btn.textContent = i;
    btn.value = i;
    btn.style.minWidth = "40px";

    btn.addEventListener("click", () => {
      if (btn.classList.contains("occupied")) return;

      if (btn.classList.contains("selected")) {
        btn.classList.remove("selected", "btn-success");
        btn.classList.add("btn-outline-secondary");
        seleccionados = seleccionados.filter(n => n !== i);
      } else {
        if (seleccionados.length < cantidadPasajeros) {
          btn.classList.add("selected", "btn-success");
          btn.classList.remove("btn-outline-secondary");
          seleccionados.push(i);
        }
      }

      actualizarIndicador();
    });

    mapaAsientos.appendChild(btn);
  }
}

function actualizarIndicador() {
  indicadorPasajero.innerHTML = `
    <span class="badge bg-info text-dark">
      Pasajeros seleccionados: ${seleccionados.length} / ${cantidadPasajeros}
    </span>
  `;
  confirmarBtn.disabled = seleccionados.length !== cantidadPasajeros;
}

crearAsientos(); // Inicializa los 40 asientos
actualizarIndicador();

// Confirmar selección y continuar al pago
confirmarBtn.addEventListener("click", () => {
  if (seleccionados.length !== cantidadPasajeros) return;

  localStorage.setItem("asientosSeleccionados", JSON.stringify(seleccionados));
  window.location.href = "/src/components/Client/payment.html";
});
