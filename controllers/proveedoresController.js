const db = require('../db/conexion.js');

class ProveedoresController{
    constructor(){

    }

    consultarAll(req, res){
        try {
            db.query(`SELECT * FROM proveedor`, [], (error, rows)=>{
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
        const {id_proveedor} = req.params;
        try {
            db.query(`SELECT * FROM proveedor WHERE id_proveedor = ?;`, [id_proveedor], (error, rows)=>{
                if (error){
                    res.status(500).send(error);
                }
                if(rows.length != 0){
                    res.status(200).json(rows[0]);
                } else {
                    res.send("proveedor no encontrado");
                }
                
            })
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    
    ingresar(req, res){
        try {
            const { nombre, apellido, nombre_empresa, email, telefono} = req.body;
            db.query(`INSERT INTO proveedor (nombre, apellido, nombre_empresa, email, telefono) VALUES (?,?,?,?,?);`, [nombre, apellido, nombre_empresa, email, telefono], (error, rows)=>{
                if(error){
                    res.status(400).send(error.message);
                }
                else{
                    res.status(201).json({id_proveedor: rows.insertId, "mensaje":"proveedor registrado de manera exitosa" });
                }
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    actualizar(req, res){
        const {id_proveedor} = req.params;
        try {
            const { nombre, apellido, nombre_empresa, email, telefono } = req.body;
            db.query(`UPDATE proveedor SET nombre=?, apellido=?, nombre_empresa=?, email=?, telefono=? WHERE id_proveedor=?`, [nombre, apellido, nombre_empresa, email, telefono, id_proveedor], (error, rows) =>{
                if(error){
                    res.status(400).send(error);
                }
                if(rows.affectedRows == 1){
                res.status(201).json({mensaje:'Registro Actualizado con Exito!'});
            }
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    borrar(req, res){
        const {id_proveedor} = req.params;
        try {
            db.query(`DELETE FROM proveedor WHERE id_proveedor=?`, [id_proveedor], (error, rows) =>{
                if(error){
                    res.status(400).send(error);
                }
                if(rows.affectedRows == 1){
                res.status(201).json({mensaje:'Registro Eliminado con Exito!'});
            }
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

}

module.exports = new ProveedoresController();

