import { notaQuery } from "../schema/notas-schema";

export async function countPrioridadesNotas(
   nota_query: notaQuery = new notaQuery(),
) {
   const count = await nota_query.getCountPrioridadeNotas()
   return count
}
