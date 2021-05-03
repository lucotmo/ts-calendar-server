import { Request, Response, RequestHandler } from "express";
import Event from "../models/Event";

export const getEvents: RequestHandler = async (
	req: Request,
	res: Response
) => {
	const event = await Event.find().populate("user", "name");

	res.json({
		ok: true,
		eventos: event,
	});
};

export const createEvent: RequestHandler = async (
	req: Request,
	res: Response
) => {
	const event = new Event(req.body);
	try {
		//@ts-ignore
		event.user = req.uid;

		const savedEvent = await event.save();

		res.json({
			ok: true,
			evento: savedEvent,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador",
		});
	}
};

export const updateEvent: RequestHandler = async (
	req: Request,
	res: Response
) => {
	const eventId = req.params.id;
	//@ts-ignore
	const uid = req.uid;

	try {
		const event = await Event.findById(eventId);

		if (!event) {
			return res.status(404).json({
				ok: false,
				msg: "Evento no existe por ese id",
			});
		}
		//@ts-ignore
		if (event.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: "No tiene privilegio de editar este evento",
			});
		}

		const newEvent = {
			...req.body,
			user: uid,
		};

		const updateEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
			new: true,
		});

		res.json({
			ok: true,
			evento: updateEvent,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador",
		});
	}
};

export const deleteEvent: RequestHandler = async (
	req: Request,
	res: Response
) => {
	const eventId = req.params.id;
	//@ts-ignore
	const uid = req.uid;

	try {
		const event = await Event.findById(eventId);

		if (!event) {
			return res.status(404).json({
				ok: false,
				msg: "Evento no existe por ese id",
			});
		}
		//@ts-ignore
		if (event.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: "No tiene privilegio de eliminar este evento",
			});
		}

		await Event.findByIdAndDelete(eventId);

		res.json({ ok: true });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador",
		});
	}
};
