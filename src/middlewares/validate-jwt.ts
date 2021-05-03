import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const validateJWT: RequestHandler = (
	req: Request,
	res: Response,
	next
) => {
	try {
		const token = req.header("x-token");

		if (!token) {
			return res.status(401).json({
				ok: false,
				msg: "No hay token en la petición",
			});
		}

		// @ts-ignore
		const { uid } = jwt.verify(token, process.env.JWT_KEY);
		// @ts-ignore
		req.uid = uid;

		next();
	} catch (e) {
		return res.status(401).json({
			ok: false,
			msg: "Token no es válido",
		});
	}
};
