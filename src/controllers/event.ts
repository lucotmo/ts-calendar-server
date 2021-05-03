import { Request, Response, RequestHandler } from "express";

export const getEvents: RequestHandler = async (
	req: Request,
	res: Response
) => {
	res.json({
		msg: "Obtener eventos",
	});
};

export const createEvent: RequestHandler = async (
	req: Request,
	res: Response
) => {
	res.json({
		msg: "crear Evento",
	});
};

export const updateEvent: RequestHandler = async (
	req: Request,
	res: Response
) => {
	res.json({
		msg: "actualizar evento",
	});
};

export const deleteEvent: RequestHandler = async (
	req: Request,
	res: Response
) => {
	res.json({
		msg: "eliminar evento",
	});
};
