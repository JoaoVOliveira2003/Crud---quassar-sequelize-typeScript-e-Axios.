import type {NotaInterface} from '../../interfaces/notaInterface'
import api from '../../src/utils/apiConector';

export async function criarNota(nota: NotaInterface) {
  try {

    const res = await api.post('/notas/criarNota', { nota });
    return res.data;

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  }
}