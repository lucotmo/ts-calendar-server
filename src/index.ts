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

app.get("/", (req: any, res: any) => res.send("Home page"));

// Escuchar peticiones
app.listen(process.env.PORT || 3000, () => {
	console.log(`Servidor corriendo en puerto ${process.env.PORT || 3000}`);
});
