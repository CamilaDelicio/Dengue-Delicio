// controllers/pacienteController.js
import pool from '../server.js'; // Importa el pool de conexión a la base de datos

const pacienteController = {
    getAllPacientes: (req, res) => {
        pool.query("SELECT * FROM Paciente", (err, pacientes) => {
            if (err) {
                res.json(err);
                return;
            }
            
            res.render("paciente", { data: pacientes }); 

            
        });
    },
    save: (req, res) => {
        const data = req.body;
        data.fecha = new Date(); 
    
        pool.query("INSERT INTO Paciente SET ?", [data], (err, result) => {
            if (err) {
                console.error("Error al guardar paciente:", err);
                req.flash("error", "Error al guardar paciente"); 
                return res.redirect("/paciente");
            }
    
            console.log("Paciente guardado correctamente:", result);
            req.flash('success', 'Paciente guardado exitosamente');
    
            // Asegúrate de que el mensaje se ha establecido
            console.log("Mensaje de éxito:", req.flash('success'));
            res.redirect("/listado"); 
        });
    },
    edit: (req, res) =>  {
        const dni = req.params.dni;
        pool.query("SELECT * FROM Paciente WHERE dni = ?", [dni], (err, Paciente) => {
            const paciente = Paciente[0]; 
            res.render("editar", { data: paciente });
        });
    },
    actualizar: (req, res) => {
        const dni = req.params.dni;
        const data = req.body; 
        
        pool.query("UPDATE Paciente SET ? WHERE dni = ?", [data, dni], (err, resultado) => {
            res.redirect("/listado"); 
        });
    },
    eliminar: (req, res) => {
        const dni = req.params.dni; 
        pool.query("DELETE FROM Paciente WHERE dni = ?", [dni], (err, result) => {
            if (err) {
                console.error('Error al eliminar paciente:', err);
                req.flash('error', 'Error al eliminar paciente');
                return res.redirect("/listado"); // Redirigir si hay un error
            } else {
                req.flash('success', 'Paciente eliminado correctamente');
                res.redirect("/listado"); // Redirigir a la lista después de eliminar
            }
        });
    },
    buscarDNI: (req, res) => {
        const dni = req.body.dni;

        if (!dni) {
            // Si el DNI no es enviado, no mostramos ningún mensaje
            return res.render("buscarDNI", { mensaje: null, error: null });
        }

        pool.query("SELECT * FROM Paciente WHERE dni = ?", [dni], (err, pacientes) => {
            if (err) {
                console.error('Error al buscar paciente por DNI:', err);
                res.render("buscarDNI", { error: "Ocurrió un error al buscar el paciente por DNI", mensaje:null });
            } else if (pacientes.length === 0) {
                res.render("buscarDNI", { mensaje: "No se encontró ningún paciente con ese DNI", error: null });
            } else {
                console.log("Pacientes encontrados:", pacientes);
                res.render("listado", { data: pacientes });
            }
        });
    },    
    getListado: (req, res) => {
        const successMessage = req.flash('success');
        const errorMessage = req.flash('error');
        pool.query("SELECT * FROM Paciente ORDER BY fecha DESC", (err, pacientes) => {
            if (err) {
                console.error("Error al obtener la lista de pacientes:", err);
                res.render("listado", { error: "Error al obtener la lista de pacientes" });
                return;
            }
            res.render("listado", { data: pacientes, messages: { success: successMessage, error: errorMessage } });
        });
    }
};

export default pacienteController;
