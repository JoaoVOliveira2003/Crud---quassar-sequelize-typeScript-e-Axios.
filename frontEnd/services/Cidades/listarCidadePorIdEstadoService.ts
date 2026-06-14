import api from "src/utils/apiConector";

export async function listarCidadePorIdEstado(id:number) {
   try{
      const res = await api.get(`/cidade/cidadePorIdEstado/${id}`);
      return res.data;
   }
   catch(error){
      alert('Erro ao carregar cidades: ' + error);
   }
}