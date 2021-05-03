import jwt from "jsonwebtoken";

export const generateJWT = (uid: string, name: string) => {
	return new Promise((resolve, reject) => {
		const payload = { uid, name };

		//@ts-ignore
		jwt.sign(
			payload,
			process.env.JWT_KEY,
			{
				expiresIn: "2h",
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject("No se pudo generar el token");
				}
				resolve(token);
			}
		);
	});
};
