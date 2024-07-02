const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/proveedoresController.js');

router.get('/', proveedoresController.consultarAll);
router.post('/', proveedoresController.ingresar);

router.route('/:id_proveedor')
    .get(proveedoresController.consultarById)
    .put(proveedoresController.actualizar)
    .delete(proveedoresController.borrar);


module.exports = router;
