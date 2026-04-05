import mongoose from 'mongoose';

const turnoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  servicio: { type: String, required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmado', 'cancelado'],
    default: 'pendiente'
  }
}, { timestamps: true });

export default mongoose.model('Turno', turnoSchema);