import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:3001/turnos';

function App() {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [turnoEditando, setTurnoEditando] = useState(null);
  const [form, setForm] = useState({
    nombre: '', servicio: '', fecha: '', hora: '', estado: 'pendiente'
  });

  const fetchTurnos = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (busqueda) params.append('nombre', busqueda);
      if (filtroEstado) params.append('estado', filtroEstado);
      const res = await fetch(`${API_URL}?${params}`);
      const data = await res.json();
      setTurnos(data);
      setError(null);
    } catch (err) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurnos();
  }, [busqueda, filtroEstado]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = turnoEditando ? 'PUT' : 'POST';
      const url = turnoEditando ? `${API_URL}/${turnoEditando._id}` : API_URL;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Error al guardar');
      setForm({ nombre: '', servicio: '', fecha: '', hora: '', estado: 'pendiente' });
      setTurnoEditando(null);
      fetchTurnos();
    } catch (err) {
      setError('Error al guardar el turno');
    }
  };

  const handleEditar = (turno) => {
    setTurnoEditando(turno);
    setForm({
      nombre: turno.nombre,
      servicio: turno.servicio,
      fecha: turno.fecha,
      hora: turno.hora,
      estado: turno.estado
    });
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminár este turno?')) return;
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTurnos();
  };

  const cancelarEdicion = () => {
    setTurnoEditando(null);
    setForm({ nombre: '', servicio: '', fecha: '', hora: '', estado: 'pendiente' });
  };

  return (
    <div className="app">
      <header className="header">
        <h1>✂️ Peluquería - Gestión de Turnos</h1>
      </header>

      <main className="container">
        {/* Formulario */}
        <section className="card">
          <h2>{turnoEditando ? '✏️ Editar Turno' : '➕ Nuevo Turno'}</h2>
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              placeholder="Nombre del cliente"
              value={form.nombre}
              onChange={e => setForm({...form, nombre: e.target.value})}
              required
            />
            <select
              value={form.servicio}
              onChange={e => setForm({...form, servicio: e.target.value})}
              required
            >
              <option value="">Seleccionar servicio</option>
              <option value="Corte">Corte</option>
              <option value="Barba">Barba</option>
              <option value="Corte y Barba">Corte y Barba</option>
              <option value="Coloración">Coloración</option>
              <option value="Keratina">Keratina</option>
            </select>
            <input
              type="date"
              value={form.fecha}
              onChange={e => setForm({...form, fecha: e.target.value})}
              required
            />
            <input
              type="time"
              value={form.hora}
              onChange={e => setForm({...form, hora: e.target.value})}
              required
            />
            {turnoEditando && (
              <select
                value={form.estado}
                onChange={e => setForm({...form, estado: e.target.value})}
              >
                <option value="pendiente">Pendiente</option>
                <option value="confirmado">Confirmado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            )}
            <div className="form-buttons">
              <button type="submit" className="btn-primary">
                {turnoEditando ? 'Guardar cambios' : 'Agregar turno'}
              </button>
              {turnoEditando && (
                <button type="button" onClick={cancelarEdicion} className="btn-secondary">
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Filtros */}
        <section className="card">
          <h2>🔍 Buscar y Filtrar</h2>
          <div className="filtros">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
            <select
              value={filtroEstado}
              onChange={e => setFiltroEstado(e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="confirmado">Confirmado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </section>

        {/* Lista */}
        <section className="card">
          <h2>📋 Turnos ({turnos.length})</h2>
          {loading && <p className="loading">Cargando...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && turnos.length === 0 && (
            <p className="empty">No hay turnos registrados</p>
          )}
          <div className="lista">
            {turnos.map(turno => (
              <div key={turno._id} className={`turno-item estado-${turno.estado}`}>
                <div className="turno-info">
                  <h3>{turno.nombre}</h3>
                  <p>✂️ {turno.servicio}</p>
                  <p>📅 {turno.fecha} — ⏰ {turno.hora}</p>
                  <span className={`badge ${turno.estado}`}>{turno.estado}</span>
                </div>
                <div className="turno-acciones">
                  <button onClick={() => handleEditar(turno)} className="btn-editar">
                    Editar
                  </button>
                  <button onClick={() => handleEliminar(turno._id)} className="btn-eliminar">
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;