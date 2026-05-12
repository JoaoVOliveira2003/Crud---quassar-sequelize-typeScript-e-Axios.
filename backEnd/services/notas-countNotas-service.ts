import { notaQuery } from "../schema/notas-schema";

export async function countNotas(
   id: number,
   nota_query: notaQuery = new notaQuery(),
) {
   const notaSalva = await nota_query.countNotas(id)
   return notaSalva
}
