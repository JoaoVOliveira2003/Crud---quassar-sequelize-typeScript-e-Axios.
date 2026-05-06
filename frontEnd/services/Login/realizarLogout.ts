import api from "../../src/utils/apiConector";

export async function realizarLogout() {
  try {
    const res = await api.post('/login/logout');
    return res.data;
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    throw error;
  }   
}