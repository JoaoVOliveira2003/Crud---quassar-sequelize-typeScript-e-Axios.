import { boot } from 'quasar/wrappers'
import { AxiosError } from 'axios'

export default boot(({ app }) => {
  app.config.errorHandler = (error) => {
    if (error instanceof AxiosError && error.response?.status === 401) {
      return
    }
    console.error(error)
  }
})