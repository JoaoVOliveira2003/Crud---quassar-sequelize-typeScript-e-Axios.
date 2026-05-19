import { notaQuery } from "../schema/notas-schema";

export async function countRadarPrioridadesFinalizadaNotas(
   nota_query: notaQuery = new notaQuery(),
) {
   const count = await nota_query.getRadarPrioridadeFinalizacao()
   return count
}
