import { notaQuery } from "../schema/notas-schema";

export async function getTodasNotas(
  notaSchema_query: notaQuery = new notaQuery(),
) {
  const notas = await notaSchema_query.getTodasNotas();
  return notas;
}