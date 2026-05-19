import { UsuarioQuery } from "../schema/usuario-schema.ts";

export async function getTiposUsuarios(
  usuario_query: UsuarioQuery = new UsuarioQuery(),
) {
  const usuarios = await usuario_query.getCountTiposUsuarios();
  return usuarios;
}
