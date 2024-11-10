// controllers/pacienteController.js
import pool from '../server.js'; // Importa el pool de conexión a la base de datos

const pacienteController = {
    getAllPacientes: (req, res) => {
        pool.query("SELECT * FROM Paciente", (err, pacientes) => {
            if (err) {
                res.json(err);
                return;
            }
            
            res.render("pacientes", { data: pacientes }); // Renderiza la vista y pasa los datos de los pacientes.ejs
            
        });
    },
    save: (req, res) => {
        console.log(req.body);
        const data = req.body;
        data.fecha = new Date(); 
    
        pool.query("INSERT INTO Paciente SET ?", [data], (err, result) => {
            if (err) {
                console.error("Error al guardar paciente:", err);
                req.flash("error", "Error al guardar paciente"); 
                return res.redirect("/pacientes");
            }
    
            console.log("Paciente guardado correctamente:", result);
            req.flash("success", 'Paciente guardado exitosamente');
    
            // Asegúrate de que el mensaje se ha establecido
            console.log("Mensaje de éxito:", req.flash('success')); // Debugging
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
        const dni = req.params.dni; // Usar req.params para obtener el DNI desde la URL
        pool.query("DELETE FROM Paciente WHERE dni = ?", [dni], (err, result) => {
            if (err) {
                console.error('Error al eliminar paciente:', err);
                req.flash('error', 'Error al eliminar paciente');
                return res.redirect("/listado"); // Redirigir si hay un error
            } else {
                console.log('Paciente eliminado correctamente', result);
                req.flash('success', 'Paciente eliminado correctamente');
                res.redirect("/listado"); // Redirigir a la lista después de eliminar
            }
        });
    },
    buscarDNI: (req, res) => {
        const dni = req.body.dni;
        pool.query("SELECT * FROM Paciente WHERE dni = ?", [dni], (err, pacientes) => {
            if (err) {
                console.error('Error al buscar paciente por DNI:', err);
                res.render("buscarDNI", { error: "Ocurrió un error al buscar el paciente por DNI" });
            } else if (pacientes.length === 0) {
                res.render("buscarDNI", { error: "No se encontró ningún paciente con ese DNI" });
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
