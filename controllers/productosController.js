const db = require('../db/conexion.js');

class ProductosController{
    constructor(){

    }

    consultarAll(req, res){
        try {
            db.query(`SELECT * FROM producto`, [], (error, rows)=>{
                if (error){
                    res.status(500).send(error);
                }
                res.status(200).json(rows);
            })
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    consultarById(req, res){
        const {id_producto} = req.params;
        try {
            db.query(`SELECT * FROM producto WHERE id_producto = ?;`, [id_producto], (error, rows)=>{
                if (error){
                    res.status(500).send(error);
                }
                if(rows.length != 0){
                    res.status(200).json(rows[0]);
                } else {
                    res.send("producto no encontrado");
                }
                
            })
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    ingresar(req, res){
        try {
            const { nombre, stock, precio, descripcion, id_proveedor, id_categoria } = req.body;
            db.query(`INSERT INTO producto (nombre, stock, precio, descripcion, id_proveedor, id_categoria) VALUES (?,?,?,?,?,?);`, [nombre, stock, precio, descripcion, id_proveedor, id_categoria], (error, rows)=>{
                if(error){
                    res.status(400).send(error.message);
                }
                else{
                    res.status(201).json({id_producto: rows.insertId, "mensaje":"producto registrado de manera exitosa" });
                }
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    actualizar(req, res){
        const {id_producto} = req.params;
        try {
            const { nombre, stock, precio, descripcion, id_proveedor, id_categoria } = req.body;
            db.query(`UPDATE producto SET nombre=?, stock=?, precio=?, descripcion=?, id_proveedor=?, id_categoria=? WHERE id_producto=?`, [nombre, stock, precio, descripcion, id_proveedor, id_categoria, id_producto], (error, rows) =>{
                if(error){
                    res.status(400).send(error);
                }
                if(rows.affectedRows == 1){
                res.status(201).json({mensaje:'Producto Actualizado con Exito!'});
            }
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    borrar(req, res){
        const {id_producto} = req.params;
        try {
            db.query(`DELETE FROM producto WHERE id_producto=?`, [id_producto], (error, rows) =>{
                if(error){
                    res.status(400).send(error);
                }
                if(rows.affectedRows == 1){
                res.status(201).json({mensaje:'Producto Eliminado con Exito!'});
            }
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

}

module.exports = new ProductosController();

