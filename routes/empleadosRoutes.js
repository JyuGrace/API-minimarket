const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleadosController.js');

router.get('/', empleadosController.consultarAll);
router.post('/', empleadosController.ingresar);
//router.post('/', empleadosController.consultarByUserPass);

router.route('/:id_empleado')
    .get(empleadosController.consultarById)
    .put(empleadosController.actualizar)
    .delete(empleadosController.borrar);


module.exports = router;
