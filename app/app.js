// ************ Requerimientos ************
const express = require("express");
//const cors = require("cors");
const db = require("./models");

// generar la app express
const app = express();
/*
// utilizo middlewares de cors, seteando el origen en puerto 8081
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
*/
// ************ Body-parsers ************
// parsea solicitudes del tipo application/json
app.use(express.json());

// parsea solicitudes del tipo application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// lo mismo que hacer el requerimiento inicial, asignarlo a una constante y pasarle el objeto app de express.
// SI O SI después del parseo, sino voy a estar horas dando vueltas con errores al hacer un POST. DIOS.
require("./routes/albumRoutes")(app);
require("./routes/artistRoutes")(app);
require("./routes/genreRoutes")(app);
require("./routes/songRoutes")(app);

// seteo de ruta GET en directorio root para testeo
app.get("/", (req, res) => {
  res.json({ message: "Hola mundo" });
});

// seteo de puerto de servidor para escuchar solicitudes
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {  
    console.log(`---> Para acceder al SERVIDOR REMOTO, ctrl + click en https://dh-crud.herokuapp.com/`);
    console.log(`... o ...`);
    console.log(`---> Para acceder al SERVIDOR LOCAL, ctrl + click en http://localhost:${PORT}`);
});

/*
// DEV: elminación y creación de base de datos
db.connection.sync({ force: true }).then(() => {
  console.log("Recreación completa de base de datos.");
});
*/
