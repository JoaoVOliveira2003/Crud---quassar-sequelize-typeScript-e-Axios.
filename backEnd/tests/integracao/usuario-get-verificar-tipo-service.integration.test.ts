import { getVerificarTipoUsuario } from "../../services/usuario-get-verificar-tipo-service"
import { conecta } from "../../config/conecta";
import '../../app'

describe('Verificar se o tipo do usuario no token é igual ao do banco', () => {
   const dados = {
      id_usuario: 320,
      id_tipo_usuario: 1
   }

   afterEach(() => {
      // conecta.close()
   })

   it('Deve retornar true se o usuario for do tipo correto', async () => {
      const resultado = await getVerificarTipoUsuario(dados);
      expect(resultado).toBe(true);
   });

   it('Deve retornar false se o usuario não for do tipo correto', async () => {
      const dadosErrados = {
         id_usuario: 320,
         id_tipo_usuario: 2
      };
      const resultado = await getVerificarTipoUsuario(dadosErrados);
      expect(resultado).toBe(false);
   });

   it('Deve lançar erro se o banco falhar', async () => {
      await conecta.close();
      await expect(getVerificarTipoUsuario(dados)).rejects.toThrow();
   });
})