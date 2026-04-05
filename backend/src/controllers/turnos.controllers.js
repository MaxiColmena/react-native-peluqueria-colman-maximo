import Turno from '../models/turno.model.js';

export const getTurnos = async (req, res) => {
  try {
    const { nombre, estado } = req.query;
    const filtro = {};
    if (nombre) filtro.nombre = { $regex: nombre, $options: 'i' };
    if (estado) filtro.estado = estado;

    const turnos = await Turno.find(filtro).sort({ fecha: 1, hora: 1 });
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los turnos' });
  }
};

export const getTurnoById = async (req, res) => {
  try {
    const turno = await Turno.findById(req.params.id);
    if (!turno) return res.status(404).json({ error: 'Turno no encontrado' });
    res.json(turno);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el turno' });
  }
};

export const createTurno = async (req, res) => {
  try {
    const { nombre, servicio, fecha, hora } = req.body;
    const nuevoTurno = new Turno({ nombre, servicio, fecha, hora });
    await nuevoTurno.save();
    res.status(201).json(nuevoTurno);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el turno' });
  }
};

export const updateTurno = async (req, res) => {
  try {
    const turno = await Turno.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!turno) return res.status(404).json({ error: 'Turno no encontrado' });
    res.json(turno);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el turno' });
  }
};

export const deleteTurno = async (req, res) => {
  try {
    const turno = await Turno.findByIdAndDelete(req.params.id);
    if (!turno) return res.status(404).json({ error: 'Turno no encontrado' });
    res.json({ mensaje: 'Turno eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el turno' });
  }
};