import { atualizarUsuarioService } from '../../services/usuario-atualizar-service'
import { conecta } from "../../config/conecta";
import '../../app'
import "dotenv/config"
import CryptoJS from "crypto-js";

describe("Testar a atualização de usuario", () => {
   let usuario: any;

   beforeEach(() => {
      usuario = {
         nome: "João",
         dataDeNascimento: "1990-01-01",
         peso: 1,
         altura: 1,
         id_tipo_usuario: 2,
         endereco: {
            rua: "Rua A",
            numero: 123,
            cod_cidade: 1,
         },
         login: {
            email: "joao@email.com",
            senha: "senha123",
         },
      };
   });

   afterAll(async () => {
      await conecta.close();
   });

   it("Deve atualizar um cadastro de usuario, endereco e login", async () => {
      const resultado = await atualizarUsuarioService(290, usuario);
      expect(resultado).toEqual({ mensagem: "Usuario e endereco atualizado" });
   });

   it("Deve lançar erro se validação errar", async () => {
      usuario.endereco.rua = '';
      await expect(atualizarUsuarioService(290, usuario)).rejects.toThrow();
   });

   it("Deve criptografar a senha antes de salvar", async () => {
      const cryptoSpy = jest.spyOn(CryptoJS, 'HmacSHA256')
         .mockReturnValue({ toString: () => "hash_mocado" } as any);

      await atualizarUsuarioService(290, usuario);

      expect(cryptoSpy).toHaveBeenCalledWith("senha123", process.env.CRYPTO_SECRET);

      cryptoSpy.mockRestore();
   });
});