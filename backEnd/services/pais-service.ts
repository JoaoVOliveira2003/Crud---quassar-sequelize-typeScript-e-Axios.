import {PaisQuery} from "../schema/pais-schema"

export async function getPais(paisQuery = new PaisQuery()) {
  const  paises = await paisQuery.getTodasPais();
  return paises;
}