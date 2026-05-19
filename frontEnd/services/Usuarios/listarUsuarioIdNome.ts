import api from '../../src/utils/apiConector'

export async function carregarUsuariosIdNome() {
  try {
    const res = await api.get('/usuario/usuariosIdNome');
    return res.data;
  } catch (error) {
    console.error(error); 
    throw error; 
  }
}
