import api from '../../src/utils/apiConector'
import type {NotaInterface} from '../../interfaces/notaInterface'

export async function atualizarNotaService(nota: NotaInterface) {
  try {
    await api.put(`/notas/editarNota/${nota.id_nota}`, nota)
  } catch (error) {
    console.error('Erro ao atualizar nota:', error)
    throw error
  }
}