/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
import { Router } from "express";
import { createUser, loginUser, renewToken } from "../controllers/auth";

const router = Router();

router.post("/new", createUser);

router.post("/", loginUser);

router.get("/renew", renewToken);

module.exports = router;
