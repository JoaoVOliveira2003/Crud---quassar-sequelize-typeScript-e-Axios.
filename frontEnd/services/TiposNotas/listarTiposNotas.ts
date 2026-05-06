import api from '../../src/utils/apiConector';

export async function carregarTiposNotas() {
  try {
    const res = await api.get('/tiposNota/');
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
