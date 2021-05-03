import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();

import { dbConnection } from "./database/config";

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio Público
app.use(express.static("./src/public"));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/event"));

// Escuchar peticiones
app.listen(process.env.PORT || 4000, () => {
	console.log(`Servidor corriendo en puerto ${process.env.PORT || 4000}`);
});
