const pasajerosContainer = document.getElementById("pasajerosContainer");
const form = document.getElementById("pasajerosForm");

const cantidad = parseInt(localStorage.getItem("pasajeros")) || 1;

// Generar formularios dinámicos para cada pasajero
for (let i = 0; i < cantidad; i++) {
  const pasajeroHTML = `
    <div class="col-md-12 border rounded p-3 bg-white shadow-sm">
      <h5 class="mb-3">Pasajero ${i + 1} ${i === 0 ? '(Principal)' : ''}</h5>

      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Nombre</label>
          <input type="text" class="form-control" name="nombre${i}" required />
        </div>

        <div class="col-md-6">
          <label class="form-label">Apellido</label>
          <input type="text" class="form-control" name="apellido${i}" required />
        </div>

        <div class="col-md-6">
          <label class="form-label">Nro. de Identidad</label>
          <input type="text" class="form-control" name="ci${i}" required />
        </div>

        <div class="col-md-6">
          <label class="form-label">Fecha de nacimiento</label>
          <input type="date" class="form-control" name="nacimiento${i}" required />
        </div>

        <div class="col-md-6">
          <label class="form-label">Género</label>
          <select name="genero${i}" class="form-select" required>
            <option value="">Seleccione</option>
            <option value="Mujer">Mujer</option>
            <option value="Hombre">Hombre</option>
          </select>
        </div>

        ${i === 0 ? `
        <div class="col-md-6">
          <label class="form-label">Correo electrónico</label>
          <input type="email" class="form-control" name="correo" required />
        </div>
        <div class="col-md-6">
          <label class="form-label">Teléfono</label>
          <input type="tel" class="form-control" name="telefono" required />
        </div>
        ` : ""}
      </div>
    </div>
  `;
  pasajerosContainer.insertAdjacentHTML("beforeend", pasajeroHTML);
}

// Manejar envío del formulario
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const datosPasajeros = [];

  for (let i = 0; i < cantidad; i++) {
    const datos = {
      nombre: document.querySelector(`[name="nombre${i}"]`).value.trim(),
      apellido: document.querySelector(`[name="apellido${i}"]`).value.trim(),
      ci: document.querySelector(`[name="ci${i}"]`).value.trim(),
      nacimiento: document.querySelector(`[name="nacimiento${i}"]`).value,
      genero: document.querySelector(`[name="genero${i}"]`).value,
    };

    if (i === 0) {
      datos.correo = document.querySelector(`[name="correo"]`).value.trim();
      datos.telefono = document.querySelector(`[name="telefono"]`).value.trim();
    }

    datosPasajeros.push(datos);
  }

  localStorage.setItem("pasajerosData", JSON.stringify(datosPasajeros));
  window.location.href = "/src/components/Client/select-seats.html";
});
