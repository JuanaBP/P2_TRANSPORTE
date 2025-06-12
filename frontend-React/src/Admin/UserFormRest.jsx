import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

// GraphQL Query para obtener usuarios
const GET_USERS = gql`
  query {
    obtenerUsuarios {
      id
      nombre
      email
      rol
    }
  }
`;

export default function UserFormRest() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', email: '', password: '', rol_id: '2' });
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(null);

  // Obtener usuarios vía GraphQL
  const { data, loading: loadingUsers, error: errorUsers, refetch } = useQuery(GET_USERS);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    setErrorSubmit(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_REST_API}/crearuser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Error al crear usuario');
      }
      
      setForm({ nombre: '', email: '', password: '', rol_id: '2' });
      refetch();
    } catch (err) {
      setErrorSubmit(err.message);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="container py-4">
    
      <div className="card shadow-sm mb-5">
        <div className="card-body">
          <h3 className="card-title mb-4">🧑‍💼 Nuevo Usuario</h3>
          {errorSubmit && <div className="alert alert-danger p-2">{errorSubmit}</div>}
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-12 col-md-4">
              <input
                name="nombre"
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 col-md-4">
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 col-md-3">
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 col-md-1 d-grid">
              <button type="submit" className="btn btn-primary w-100" disabled={loadingSubmit}>
                {loadingSubmit ? 'Guardando...' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      </div>

   
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title mb-4">👥 Usuarios Registrados</h3>
          {loadingUsers ? (
            <div className="d-flex justify-content-center my-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Cargando usuarios...</span>
              </div>
            </div>
          ) : errorUsers ? (
            <div className="alert alert-danger p-2">Error cargando: {errorUsers.message}</div>
          ) : data.obtenerUsuarios.length === 0 ? (
            <p>No hay usuarios registrados.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                  </tr>
                </thead>
                <tbody>
                  {data.obtenerUsuarios.map((u) => (
                    <tr key={u.id}>
                      <td>{u.nombre}</td>
                      <td>{u.email}</td>
                      <td>{u.rol}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
