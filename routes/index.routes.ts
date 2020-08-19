import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  crearUsuario,
  verUsuarios,
  traerUnUsuario,
  eliminarUsuario,
  modificarUsuario,
  login,
} from "../controllers/usuario.controller.ts";

import validarToken from "../auth/auth.ts";

const router = new Router();

router.get("/", validarToken, verUsuarios);
router.get("/:id", validarToken, traerUnUsuario);
router.put("/:id", validarToken, modificarUsuario);
router.delete("/:id", validarToken, eliminarUsuario);

router.post("/login", login);
router.post("/", crearUsuario);

export default router;
