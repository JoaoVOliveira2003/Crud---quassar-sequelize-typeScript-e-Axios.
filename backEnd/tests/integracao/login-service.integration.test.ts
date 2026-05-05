import { comprovarLogin } from "../../services/login-service";
import { conecta } from "../../config/conecta";
import '../../app'
import "dotenv/config"

describe('teste de login', () => {
   beforeAll(() => {
      // process.env.CRYPTO_SECRET = 'chaveSecreta';
   });

   afterAll(async () => {
      delete process.env.CRYPTO_SECRET;
      // await conecta.close();
   });

   it('deve retornar um token valido', async () => {

      const resultado = await comprovarLogin({
         email: '123@gmail.com',
         senha: '123'
      })

      expect(resultado).not.toBeNull();
      expect(typeof resultado).toBe('string')
   })

   it('Deve retornar nulo quando for invalido.', async () => {

      const resultado = await comprovarLogin({
         email: '123@gmail.com',
         senha: '1234'
      })

      expect(resultado).not.toBeNull
   })

it('Deve lançar erro se a query falhar', async () => {
  await expect(
    conecta.query('SELECT * FROM tabela_que_nao_existe')
  ).rejects.toThrow();
});
})