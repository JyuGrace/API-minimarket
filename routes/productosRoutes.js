const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController.js');

router.get('/', productosController.consultarAll);
router.post('/', productosController.ingresar);

router.route('/:id_producto')
    .get(productosController.consultarById)
    .put(productosController.actualizar)
    .delete(productosController.borrar);


module.exports = router;