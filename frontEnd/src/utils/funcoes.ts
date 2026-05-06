import type { Router } from 'vue-router'
import {realizarLogout} from '../../services/Login/realizarLogout'

export async function logout(router: Router) {
  localStorage.removeItem('dados_usuario')
  await realizarLogout();
  router.push('/login')
}