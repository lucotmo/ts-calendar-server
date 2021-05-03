import { Request, Response, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { generateJWT } from "../helpers/jwt";

export const createUser: RequestHandler = async (
	req: Request,
	res: Response
) => {
	const { email, password } = req.body;
	try {
		let user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({
				ok: false,
				msg: "El usuario ya existe",
			});
		}

		user = new User(req.body);

		// Encriptar contraseña
		const salt = bcrypt.genSaltSync();
		//@ts-ignore
		user.password = bcrypt.hashSync(password, salt);

		await user.save();

		// Generar JWT
		//@ts-ignore
		const token = await generateJWT(user.id, user.name);

		res.status(201).json({
			ok: true,
			uid: user.id,
			//@ts-ignore
			name: user.name,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Por favor hable con el administrador",
		});
	}
};

export const loginUser: RequestHandler = async (
	req: Request,
	res: Response
) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({
				ok: false,
				msg: "El usuario no existe con ese email",
			});
		}

		// Confirmar los passwords
		//@ts-ignore
		const validPassword = bcrypt.compareSync(password, user.password);

		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: "Password incorrecto",
			});
		}

		// Generar JWT
		//@ts-ignore
		const token = await generateJWT(user.id, user.name);
		res.json({
			ok: true,
			uid: user.id,
			//@ts-ignore
			name: user.name,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Por favor hable con el administrador",
		});
	}
};

export const renewToken: RequestHandler = async (
	req: Request,
	res: Response
) => {
	const { uid, name }: any = req;

	// Generar JWT
	const token = await generateJWT(uid, name);

	res.json({
		ok: true,
		token,
	});
};
