const db = require('../db/conexion.js');

class ClientesController{
    constructor(){

    }

    consultarAll(req, res){
        try {
            db.query(`SELECT * FROM cliente`, [], (error, rows)=>{
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
        const {id_cliente} = req.params;
        try {
            db.query(`SELECT * FROM cliente WHERE id_cliente = ?;`, [id_cliente], (error, rows)=>{
                if (error){
                    res.status(500).send(error);
                }
                if(rows.length != 0){
                    res.status(200).json(rows[0]);
                } else {
                    res.send("Cliente no encontrado");
                }
                
            })
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    consultarByCedula(req, res){
        const {cedula} = req.params;
        try {
            db.query(`SELECT * FROM cliente WHERE cedula = ?;`, [cedula], (error, rows)=>{
                if (error){
                    res.status(500).send(error);
                }
                if(rows.length != 0){
                    res.status(200).json(rows[0]);
                } else {
                    res.send("Cliente no encontrado");
                }
            })
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    ingresar(req, res){
        try {
            const { nombre, apellido, cedula, email, telefono, direccion } = req.body;
            db.query(`INSERT INTO cliente (nombre, apellido, cedula, email, telefono, direccion) VALUES (?,?,?,?,?,?);`, [nombre, apellido, cedula, email, telefono, direccion], (error, rows)=>{
                if(error){
                    res.status(400).send(error.message);
                }
                else{
                    res.status(201).json({id_cliente: rows.insertId, "mensaje":"Cliente registrado de manera exitosa" });
                }
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    actualizar(req, res){
        const {id_cliente} = req.params;
        try {
            const { nombre, apellido, cedula, email, telefono, direccion } = req.body;
            db.query(`UPDATE cliente SET nombre=?, apellido=?, cedula=?, email=?, telefono=?, direccion=? WHERE id_cliente=?`, [nombre, apellido, cedula, email, telefono, direccion, id_cliente], (error, rows) =>{
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
        const {id_cliente} = req.params;
        try {
            db.query(`DELETE FROM cliente WHERE id_cliente=?`, [id_cliente], (error, rows) =>{
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

module.exports = new ClientesController();

