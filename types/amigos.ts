export interface AmigoSchema {
  _id: { "$oid": string };
  nombre: string;
  password: string;
  creadoPor: { "$oid": string };
}
