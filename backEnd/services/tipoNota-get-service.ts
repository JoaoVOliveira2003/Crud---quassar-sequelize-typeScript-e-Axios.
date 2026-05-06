import { TipoNotaQuery } from "../schema/tipoNota-schema";

export async function getTodosTiposNota(
  tipoNotaQuery_query = new TipoNotaQuery(),
) {
  const tipoUsuario = await tipoNotaQuery_query.getTodosTiposNota();
  return tipoUsuario;
}
