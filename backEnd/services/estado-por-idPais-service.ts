import { EstadoQuery } from "../schema/estado-schema";

export async function getEstadoPorIdPais(id:number, estadoQuery = new EstadoQuery()) {
   const estados = await estadoQuery.getEstadosIdPais(id)
   return estados;
}