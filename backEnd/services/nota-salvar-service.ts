import { notaQuery } from "../schema/notas-schema";
import { NotaInterface } from "../interfaces/notaInterface";

export async function salvarNota(
   nota:NotaInterface,
   nota_query: notaQuery = new notaQuery(),
) {
   const notaSalva = await nota_query.criarNota(nota)
   return notaSalva;
}