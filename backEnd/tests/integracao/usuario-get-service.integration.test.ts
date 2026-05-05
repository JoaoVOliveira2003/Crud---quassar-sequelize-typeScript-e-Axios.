import { getTodosUsuarios } from "../../services/usuario-get-service";
import { conecta } from "../../config/conecta";
import '../../app'

describe('get de usuario fitrado', () => {
   afterAll(async () => {
      await conecta.close()
   });

   it('Deve listar todos usuarios', async () => {
      const usuarios = await getTodosUsuarios() as any[];
      expect(usuarios.length).toBeGreaterThan(0)
   })

})
