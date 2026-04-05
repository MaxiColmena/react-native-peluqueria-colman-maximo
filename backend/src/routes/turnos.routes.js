import { Router } from 'express';
import { 
  getTurnos, 
  getTurnoById, 
  createTurno, 
  updateTurno, 
  deleteTurno 
} from '../controllers/turnos.controllers.js';
import { validarTurno } from '../middlewares/validar.turno.js';

const router = Router();

router.get('/', getTurnos);
router.get('/:id', getTurnoById);
router.post('/', validarTurno, createTurno);
router.put('/:id', validarTurno, updateTurno);
router.delete('/:id', deleteTurno);

export default router;