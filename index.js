const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require("cors");
require("dotenv").config();

// crear el servidor de express
const app = express();

// BBDD
dbConnection();

// CORS
app.use(cors());

// directorio publico
app.use( express.static("public") );

// Lectura y parseo del body
app.use( express.json() );

// rutas
app.use("/api/auth", require("./Routes/auth") );
app.use("/api/events", require("./Routes/events") );


// escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Server running in port ${ process.env.PORT }`);
} );
