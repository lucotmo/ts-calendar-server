/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import { validateJWT } from "../middlewares/validate-jwt";
import { createUser, loginUser, renewToken } from "../controllers/auth";

const router = Router();

router.post(
	"/new",
	[
		// middlewares
		check("name", "El nombre es obligatorio").not().isEmpty(),
		check("email", "El email es obligatorio").isEmail(),
		check("password", "El password debe de ser de 6 caracteres").isLength({
			min: 6,
		}),
		validateFields,
	],
	createUser
);

router.post(
	"/",
	[
		check("email", "El email es obligatorio").isEmail(),
		check("password", "El password debe de ser de 6 caracteres").isLength({
			min: 6,
		}),
		validateFields,
	],
	loginUser
);

router.get("/renew", validateJWT, renewToken);

module.exports = router;
