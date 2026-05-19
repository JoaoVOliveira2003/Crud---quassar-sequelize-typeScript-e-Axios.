import api from '../../src/utils/apiConector'

export async function countTipoUsuario() {
 try{
   const res = await api.get('/usuario/countTiposUsuario');
   return res.data;
  } catch (error) {
    console.error(error); 
    throw error; 
  }  
}