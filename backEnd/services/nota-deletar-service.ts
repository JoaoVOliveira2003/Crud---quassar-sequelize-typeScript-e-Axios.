import { notaQuery } from "../schema/notas-schema";

export async function deletarNotaService(
  id: number,
  nota_query: notaQuery = new notaQuery(),
) {
  const retorno = await nota_query.deletarNota(id); 
  return retorno;
}
