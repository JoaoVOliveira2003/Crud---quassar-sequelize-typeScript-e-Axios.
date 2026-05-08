import type { formularioPesquisaNotaInterface } from '../../interfaces/formularioPesquisaNotaInterface';
import api from 'src/utils/apiConector';

export async function buscarNotasFiltrados(filtros: formularioPesquisaNotaInterface) {
  try {
    const res = await api.post('/notas/filtroNotas/', filtros);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
