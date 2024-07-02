const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController.js');

router.get('/', clientesController.consultarAll);
router.post('/', clientesController.ingresar);
router.post('/:cedula', clientesController.consultarByCedula);

router.route('/:id_cliente')
    .get(clientesController.consultarById)
    .put(clientesController.actualizar)
    .delete(clientesController.borrar);


module.exports = router;
