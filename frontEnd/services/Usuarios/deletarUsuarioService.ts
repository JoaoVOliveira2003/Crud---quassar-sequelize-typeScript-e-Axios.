import api from '../../src/utils/apiConector'

export async function deletarUsuario(id: number) {
  try {
  const retorno = await api.delete(`/usuario/deletarUsuario/${id}`);
return retorno;  
} catch (error) {
    console.error('Erro ao deletar usuário:', error);
    throw error;
  }
}