import api from '../../src/utils/apiConector'

export async function deletarNota(id: number) {
  try {
    await api.delete(`/notas/deletarNota/${id}`);
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    throw error;
  }
}