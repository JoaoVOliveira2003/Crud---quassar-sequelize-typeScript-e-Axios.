import { EstadoQuery } from "../schema/estado-schema";

export async function getEstado(estadoQuery = new EstadoQuery()) {
  const  estados = await estadoQuery.getEstado();
  return estados;
}