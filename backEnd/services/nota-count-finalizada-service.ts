import { notaQuery } from "../schema/notas-schema";

export async function countFinalizadaNotas(
   nota_query: notaQuery = new notaQuery(),
) {
   const count = await nota_query.getCountFinalizadaNotas()
   return count
}
