import { UsuarioQuery } from "../schema/usuario-schema.ts";

export async function getUsuariosIdNome(
  usuario_query: UsuarioQuery = new UsuarioQuery(),
) {
  const usuarios = await usuario_query.getIdNomeUsuario();
  return usuarios;
}
