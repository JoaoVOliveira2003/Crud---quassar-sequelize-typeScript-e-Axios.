import type { loginInterface } from '../../interfaces/loginInterface';
import api from '../../src/utils/apiConector'
import  { AxiosError } from 'axios';


export async function login(usuario: loginInterface) {
  try {
    const res = await api.post('/login/realizarLogin', { usuario });
    return res.data;
  }  catch (error) {
  if (error instanceof AxiosError) {
    alert(error.response?.data?.erro || 'Senha ou Email incorreto');
  } else {
    alert('Erro inesperado');
  }
}


}
