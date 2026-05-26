import axios from 'axios'
import { getRouter } from '../router/index'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRoute = error.config?.url?.includes('/login/realizarLogin');

    if (error.response?.status === 401 && !isLoginRoute) {
      const router = getRouter();
      router.push('/login');
    }

    return Promise.reject(error)
  }
)

export default api