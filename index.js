const express = require('express');
const cors = require('cors');
const clientesRoutes = require('./routes/clientesRoutes.js');
const empleadosRoutes = require('./routes/empleadosRoutes.js');
const proveedoresRoutes = require('./routes/proveedoresRoutes.js');
const productosRoutes = require('./routes/productosRoutes.js');

/*creates an instance of the Express application and assigns it to the variable app. This line is essential for setting up the Express application and enabling it to handle HTTP requests*/
const app = express();

//para que reciba las respuestas en formato json
app.use(express.json());
//para seguridad
app.use(cors());

//pasamos las rutas al servidor
app.use("/cliente", clientesRoutes);
app.use("/empleado", empleadosRoutes);
app.use("/proveedor", proveedoresRoutes);
app.use("/producto", productosRoutes);

//configuramos el puerto desde el cual escuchara el servidor
app.listen(7000, ()=>{
    console.log('servidor activo');
});
