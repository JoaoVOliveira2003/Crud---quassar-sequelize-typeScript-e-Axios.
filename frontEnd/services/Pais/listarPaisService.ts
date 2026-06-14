import api from 'src/utils/apiConector';

export async function listarPaises() {
  try {
    const res = await api.get(`/pais`);
    return res.data;
  } catch (error) {
    alert('Erro ao carregar estados: ' + error);
  }
}
