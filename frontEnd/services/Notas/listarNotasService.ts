import api from '../../src/utils/apiConector'

export async function carregarNotas() {
  try {
    const res = await api.get('/notas/');
    return res.data;
  } catch (error) {
    console.error(error); 
    throw error; 
  }
}
