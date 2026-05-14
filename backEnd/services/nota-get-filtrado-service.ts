import { notaQuery } from "../schema/notas-schema";
import { formularioPesquisaNotaInterface  } from "../interfaces/formularioPesquisaNotaInterface";


export async function getTodasNotasFiltradas(
  filtros: formularioPesquisaNotaInterface,
  nota_query: notaQuery = new notaQuery(),
) {
  const notas = await nota_query.getNotasFiltradas(filtros);
  return notas;
}