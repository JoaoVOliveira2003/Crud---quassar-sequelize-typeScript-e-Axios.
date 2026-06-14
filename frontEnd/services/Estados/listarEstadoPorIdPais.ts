import api from "src/utils/apiConector";

export async function listarEstadoPorIdPais(id:number) {
   try{
      const res = await api.get(`/estado/estadoPorIdPais/${id}`);
      return res.data;
   }
   catch(error){
      alert('Erro ao carregar estados: ' + error);
   }
}