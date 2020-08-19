import { MongoClient } from "https://deno.land/x/mongo@v0.10.1/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
const env = config();

const client = new MongoClient();
client.connectWithUri(env.MONGO_URL);

const conectarDB = () => {
  const db = client.database("test");
  return db;
};

export default conectarDB;
