import { CidadeQuery } from "../schema/cidade-shema";

export async function getCidadePorIdEstado(
   id:number,
   cidadeQuery = new CidadeQuery()
){
   const  cidades = await cidadeQuery.getCidadeIdEstado(id);
   return cidades;
}