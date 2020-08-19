import { Application, Router } from "https://deno.land/x/oak/mod.ts";

import router from "./routes/index.routes.ts";
import conectarDB from "./db/index.ts";

interface ApplicationState {
  userId: string;
}

const app = new Application<ApplicationState>();
conectarDB();

app.use(router.routes());
app.use(router.allowedMethods()); //viene de koa-router y nos permite usar los verbos http como si estuvieramos en express o sea app.get("/", () => {})

console.log(`servidor en el puerto 3000`);
await app.listen({ port: 3000 });
