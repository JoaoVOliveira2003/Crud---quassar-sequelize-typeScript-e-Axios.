import api from '../../src/utils/apiConector'

export async function countFinalizadaNota() {
 try{
   const res = await api.get('/notas/countTiposFinalizada');
   return res.data;
  } catch (error) {
    console.error(error); 
    throw error; 
  }  
}