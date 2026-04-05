export const validarTurno = (req, res, next) => {
  const { nombre, servicio, fecha, hora } = req.body;

  if (!nombre || !servicio || !fecha || !hora) {
    return res.status(400).json({ 
      error: 'Todos los campos son obligatorios: nombre, servicio, fecha y hora' 
    });
  }

  if (nombre.trim() === '' || servicio.trim() === '') {
    return res.status(400).json({ 
      error: 'Los campos no pueden estar vacíos' 
    });
  }

  next();
};