///routers/paciente.js
import express from "express"; 
import pacienteController from "../controllers/pacienteController.js";
const router = express.Router(); 
router.get("/pacientes", pacienteController.getAllPacientes)
router.get("/listado", pacienteController.getListado)
router.post("/agregar", pacienteController.save)
router.get('/editar/:dni', pacienteController.edit);
router.post('/editar/:dni', pacienteController.actualizar);
router.get('/eliminar/:dni', pacienteController.eliminar);
router.get("/buscarDNI", pacienteController.buscarDNI);
router.post("/buscarDNI", pacienteController.buscarDNI);


export default router; //exportando el router para que pueda ser importado