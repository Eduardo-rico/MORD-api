import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import { Context } from "https://deno.land/x/oak/mod.ts";

const validarToken = async (
  { request, response, state }: Context,
  next: any,
) => {
  const jwtToken: string = request.headers.get("authorization")
    ? request.headers.get("authorization")!
    : "";

  if (!jwtToken) {
    response.body = { mensaje: "No estás autorizado" };
    response.status = 401;
    return;
  }

  const token = await validateJwt(
    { jwt: jwtToken, key: "unsecretazo", algorithm: "HS256" },
  );

  if (!token.isValid) {
    response.body = { mensaje: "No estás autorizado" };
    response.status = 401;
    return;
  } else {
    const userNameFromToken = token.payload! as PayloadObject;
    state.userName = userNameFromToken.iss;
    await next();
  }
};

interface PayloadObject {
  iss?: string;
  exp?: number;
}

export default validarToken;
