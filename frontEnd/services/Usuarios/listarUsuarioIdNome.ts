import api from '../../src/utils/apiConector'

export async function carregarUsuariosIdNome() {
  try {
    const res = await api.get('/usuariosIdNome');
    return res.data;
  } catch (error) {
    console.error(error); 
    throw error; 
  }
}
