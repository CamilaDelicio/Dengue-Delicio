import bcrypt from 'bcryptjs';
import pool from '../server.js'; 

const authController = {
    getRegister: (req, res) => {
        res.render('auth/register'); 
    },
    postRegister: async (req, res) => {
        const { username, name, lastname, email, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await pool.execute('INSERT INTO usuarios (username, name, lastname, email, password) VALUES (?, ?, ?, ?, ?)', [username, name, lastname, email, hashedPassword]);
            res.render('auth/login', {
                messages: {
                    success: '¡Cuenta creada con éxito!'
                }})
             } catch (error) {
            console.error('Error al registrar usuario:', error);
            req.flash("error", 'Error al registrar usuario');
            res.redirect('/register');
        }
    },
    getLogin: (req, res) => {
        const messages = req.flash('success');  // Obtener el mensaje de éxito si existe
        res.render('auth/login', { messages });
    },
    postLogin: async (req, res) => {
        const { username, password } = req.body;
        try {
            const result = await pool.promise().execute('SELECT * FROM usuarios WHERE username = ?', [username]);
            console.log('Resultado completo:', result);  
            const rows = result[0]; 
            console.log('Filas:', rows); 
        
            if (!Array.isArray(rows) || rows.length === 0) {
                req.flash("error", 'Usuario no encontrado');
                return res.redirect('/login');
            }
        
            const user = rows[0];
            console.log('Usuario encontrado:', user);
        
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log('Contraseña válida:', isPasswordValid);  

            if (!isPasswordValid) {
            req.flash("error", 'Contraseña incorrecta');
            return res.redirect('/login');
}
        
            req.session.userId = user.id;
            req.flash("success", 'Inicio de sesión exitoso');
            return res.redirect('/pacientes');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            req.flash("error", 'Error al iniciar sesión');
            res.redirect('/login');
        }
    }
    };

export default authController;
