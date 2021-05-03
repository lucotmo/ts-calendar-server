import { Request, Response, RequestHandler } from "express";

export const createUser: RequestHandler = async (
	req: Request,
	res: Response
) => {
	res.json({
		msg: "Crear usuario",
	});
};

export const loginUser: RequestHandler = async (
	req: Request,
	res: Response
) => {
	res.json({
		msg: "login",
	});
};

export const renewToken: RequestHandler = async (
	req: Request,
	res: Response
) => {
	res.json({
		msg: "revalidar token",
	});
};
