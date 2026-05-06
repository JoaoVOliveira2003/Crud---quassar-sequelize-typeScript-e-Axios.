import { notaQuery } from "../schema/notas-schema";
import { NotaInterface } from "../interfaces/notaInterface";

export async function atualizarNotaService(
  id: number,
  nota: NotaInterface,
  nota_query: notaQuery = new notaQuery(),
){
   const retorno = await nota_query.atualizarNota(id, nota);
   return retorno;
}