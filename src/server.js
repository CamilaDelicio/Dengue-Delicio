import express from "express";
import { Router } from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { createPool } from "mysql2";
import session from 'express-session';
import connectFlash from 'connect-flash';
import pacienteRouter from "./routers/pacientes.js"; //importar ruta/paciente
import authRouter from "./routers/auth.js"; 


const app = express(); //creamos una constante y llamamos a express
const __dirname = path.dirname(fileURLToPath(import.meta.url));


app.set("port", process.env.PORT || 4000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use('/css', express.static(path.join(__dirname, "../css")));
app.use('/assets', express.static(path.join(__dirname, "../assets")));

app.use(morgan("dev"));

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "marizza5895",
    port: 3306,
    database: "nodecrud"
});


//middwere
app.use(express.urlencoded({ extended: false }));//entiende todos los datos del formulario
app.use(express.json());
const router = Router();
app.use(session({
    secret: 'programacion2',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));
app.use(connectFlash()); 
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});


// Rutas
app.use("/", authRouter); // Usar el router de autenticación
app.use("/", pacienteRouter); // Usar el router de paciente

router.get('/vista',(req, res) => {
    const data = pool.query('SELECT * FROM Paciente')
    res.render('pacientes', {data: data})
})






// Definir rutas adicionales si es necesario
app.get('/', (req, res) => {
    res.render("login")
});
app.get('/editar', (req, res) => {
    res.render("editar");
});
app.get('/buscarDNI', (req, res) => {
    res.render("buscarDNI");
});
app.get("/listado", (req, res) => {
    pool.query("SELECT * FROM Paciente ORDER BY fecha DESC", (err, pacientes) => {
        if (err) {
            console.error("Error al obtener la lista de pacientes:", err);
            res.render("listado", { error: "Error al obtener la lista de pacientes" });
            return;
        }
        res.render("listado", { data: pacientes, success: req.flash('success'), error: req.flash('error') });
    });
});
app.get('/mapeo', (req, res) => {
    pool.query('SELECT grupo, COUNT(*) AS total FROM Paciente GROUP BY grupo', (err, results) => {
        if (err) throw err;
        console.log(results);
        res.render('mapeo', { gruposJSON: JSON.stringify(results) }); 
    });
});
app.listen(4000, () => {
    console.log('Servidor en puerto 4000');
});
export default pool;