import { TipoUsuarioQuery } from "../schema/tipoUsuario-schema";

export async function getTodosTiposUsuario(
  tipoUsuarioQuery_query = new TipoUsuarioQuery(),
) {
  const tipoUsuario = await tipoUsuarioQuery_query.getTodosTiposUsuario();
  return tipoUsuario;
}
