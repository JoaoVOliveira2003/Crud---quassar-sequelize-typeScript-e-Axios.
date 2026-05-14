import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
})

let redirecionando = false

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRoute = error.config?.url?.includes('/login/realizarLogin');

    if (error.response?.status === 401 && !isLoginRoute) {
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
      sessionStorage.clear()

      if (!redirecionando) {
        redirecionando = true
        window.location.href = '/#/login'
      }

      return new Promise(() => {})
    }

    return Promise.reject(error)
  }
)

export default api