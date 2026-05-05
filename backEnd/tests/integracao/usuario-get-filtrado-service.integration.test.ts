import { getTodosUsuariosFiltrados } from "../../services/usuario-get-filtrado-service";
import { conecta } from "../../config/conecta";
import '../../app'

describe('get de usuario fitrado', () => {
   afterAll(async () => {
      await conecta.close()
   });

   const filtros = {
      nome: "313",
      tipoUsuario: 2
   } as any;

   it('Deve lista de usuarios filtrado', async () => {
      const resultado = await getTodosUsuariosFiltrados(filtros) as any[];
      expect(resultado.length).toBeGreaterThan(0)
   });

})
