import { deletarUsuarioService } from '../../services/usuario-deletar-service'
import { conecta } from "../../config/conecta";
import '../../app'

describe("testar a deletação de usuarios", () => {
   
   afterAll(async () => {
      await conecta.close();
   });

   //vc realmente esta apagando aqui.
   /*
      it("Deve apagar o usuario", async () => {
         const resultado = await deletarUsuarioService(16);
         expect(resultado).toEqual({ mensagem: "Usuário deletado com sucesso" });
      });
   */

   it("Deve lançar erro se o banco falhar",async()=>{
   await conecta.close();
   await expect(deletarUsuarioService(1)).rejects.toThrow();
   })

});