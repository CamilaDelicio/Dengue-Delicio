1-inicializar proyecto npm init --yes
2-instalo dependencias npm install express morgan ejs mysql2 
npm install express morgan ejs mysql2 bcrypt express-session connect-flash express-mysql-session
3-"type":  "module" en package.json para  utilizar import de express
4- src con archivo server.js 
5- levanto servidor  node src/server.js
6- app.set("port", process.env.PORT || 3000); ESTABLECE EL PUERTO DE ESCUCHA
7- app.set("view engine", "ejs"); //le digo que voy a usar ejs como motor de pantalla 
8- app.set("views", path.join(__dirname, "views")) le digo a express donde estan las vistas
9- const app = express();
8- const __dirname= path.dirname(fileURLToPath(import.meta.url));
9- conectar la base de datos con mysql -u root -p 
10- Crear la base de datos (CreateTable)
11- Crear controller
12-Crear rutas
13- crear views 
14- Crear funciones para enrrutar 
15- dev ---> src/server.js
16- npm run dev
