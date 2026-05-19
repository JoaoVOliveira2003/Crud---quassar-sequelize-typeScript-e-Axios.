import api from '../../src/utils/apiConector'

export async function countPrioridadeNota() {
 try{
   const res = await api.get('/notas/countPrioridades');
   return res.data;
  } catch (error) {
    console.error(error); 
    throw error; 
  }  
}