const db = require('../db/conexion.js');

class EmpleadosController{
    constructor(){

    }

    consultarAll(req, res){
        try {
            db.query(`SELECT * FROM empleado`, [], (error, rows)=>{
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
        const {id_empleado} = req.params;
        try {
            db.query(`SELECT * FROM empleado WHERE id_empleado = ?;`, [id_empleado], (error, rows)=>{
                if (error){
                    res.status(500).send(error);
                }
                if(rows.length != 0){
                    res.status(200).json(rows[0]);
                } else {
                    res.send("empleado no encontrado");
                }
                
            })
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    ingresar(req, res){
        try {
            const { nombre, apellido, cedula, usuario, password, email, telefono, direccion, fecha_registro, id_usuario } = req.body;
            db.query(`INSERT INTO empleado (nombre, apellido, cedula, usuario, password, email, telefono, direccion, fecha_registro, id_usuario) VALUES (?,?,?,?,?,?,?,?,?,?);`, [nombre, apellido, cedula, usuario, password, email, telefono, direccion, fecha_registro, id_usuario], (error, rows)=>{
                if(error){
                    res.status(400).send(error.message);
                }
                else{
                    res.status(201).json({id_empleado: rows.insertId, "mensaje":"empleado registrado de manera exitosa" });
                }
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    actualizar(req, res){
        const {id_empleado} = req.params;
        try {
            const { nombre, apellido, cedula, usuario, password, email, telefono, direccion, fecha_registro, id_usuario } = req.body;
            db.query(`UPDATE empleado SET nombre=?, apellido=?, cedula=?, usuario=?, password=?, email=?, telefono=?, direccion=?, fecha_registro=?, id_usuario=? WHERE id_empleado=?`, [nombre, apellido, cedula, usuario, password, email, telefono, direccion, fecha_registro, id_usuario, id_empleado], (error, rows) =>{
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
        const {id_empleado} = req.params;
        try {
            db.query(`DELETE FROM empleado WHERE id_empleado=?`, [id_empleado], (error, rows) =>{
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

module.exports = new EmpleadosController();

