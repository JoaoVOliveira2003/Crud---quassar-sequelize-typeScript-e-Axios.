import api from '../../src/utils/apiConector'

export async function countRadarFinalizadasPrioridades() {
 try{
   const res = await api.get('/notas/countRadarPrioridades');
   return res.data;
  } catch (error) {
    console.error(error); 
    throw error; 
  }  
}