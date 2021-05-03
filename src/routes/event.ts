/*
    Event Routes
    /api/events
*/
import { Router } from "express";

import {
	createEvent,
	updateEvent,
	getEvents,
	deleteEvent,
} from "../controllers/event";

const router = Router();

// Obtener eventos
router.get("/", getEvents);

// Crear un nuevo evento
router.post("/", createEvent);

// Actualizar Evento
router.put("/:id", updateEvent);

// Borrar evento
router.delete("/:id", deleteEvent);

module.exports = router;
