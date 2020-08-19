import Usuario from "../models/usuario.ts";
import { UsuarioSchema } from "../types/usuario.ts";

import { Context } from "https://deno.land/x/oak/mod.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";

const login = async ({ request, response }: Context) => {
  const body = await request.body().value;
  const usuarioEncontrado = await Usuario.findOne({ nombre: body.nombre });

  const password = body.password;
  const passwordDB = usuarioEncontrado?.password;

  if (!usuarioEncontrado || passwordDB !== password) {
    response.status = 400;
    response.body = {
      exito: false,
      mensaje: "Usuario no encontrado",
    };
  } else {
    const payload: Payload = {
      iss: `${body.nombre}`,
      exp: setExpiration(new Date().getTime() + 60 * 60 * 1000),
    };
    const header: Jose = {
      alg: "HS256",
      typ: "JWT",
    };
    const token = await makeJwt({ header, payload, key: "unsecretazo" });
    response.status = 200;
    response.body = { token };
  }
};

const crearUsuario = async (
  { request, response }: { request: any; response: any },
) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      exito: false,
      mensaje: "No ingresaste datos",
    };
  } else {
    const { value } = request.body();
    const { nombre, password } = await value;
    const id = await Usuario.insertOne({
      nombre,
      password,
    });
    response.status = 201;
    response.body = {
      exito: true,
      mensaje: "Usuario creado correctamente",
      id,
    };
  }
};

const verUsuarios = async (
  { response, state }: { response: any; state: any },
) => {
  console.log(state.userName);
  const usuarios: Array<UsuarioSchema> = await Usuario.find();
  response.body = {
    exito: true,
    data: usuarios,
  };
};

const modificarUsuario = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const { nombre, password } = await request.body().value;
  const { id } = params as { id: string };
  const usuarioEncontrado = await Usuario.updateOne(
    { _id: { "$oid": id } },
    { $set: { nombre, password } },
  );

  response.status = 200;
  response.body = {
    exito: true,
    mensaje: "Usuario modificado correctamente",
    usuarioEncontrado,
  };
};

const eliminarUsuario = async (
  { params, response }: { params: { id: string }; response: any },
) => {
  const { id } = params as { id: string };
  const usuarioEncontrado = await Usuario.deleteOne(
    { _id: { "$oid": id } },
  );

  response.status = 200;
  response.body = {
    exito: true,
    mensaje: "Usuario borrado correctamente",
    usuarioEncontrado,
  };
};

const traerUnUsuario = async (
  { params, response }: { params: { id: string }; response: any },
) => {
  const { id } = params as { id: string };
  const usuarioEncontrado = await Usuario.findOne(
    { _id: { "$oid": id } },
  );

  response.status = 200;
  response.body = {
    exito: true,
    mensaje: "Usuario encontrado correctamente",
    usuarioEncontrado,
  };
};

export {
  crearUsuario,
  verUsuarios,
  modificarUsuario,
  eliminarUsuario,
  traerUnUsuario,
  login,
};
