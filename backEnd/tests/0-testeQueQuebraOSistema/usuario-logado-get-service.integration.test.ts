import { getDadosUsuarioLogado } from "../../services/usuario-logado-get-service"
import jwt from "jsonwebtoken"

describe('Trazer dados do usuario logado pelo token', () => {

   const tokenValido = jwt.sign(
      { id_usuario: 1, id_tipo_usuario: 2 },
      'segredoSecreto',
      { expiresIn: '1h' }
   );

   it('Deve retornar os dados do usuario quando o token for válido', () => {
      const req = { cookies: { token: tokenValido } };

      const resultado = getDadosUsuarioLogado(req);

      expect(resultado.id_usuario).toBe(1);
      expect(resultado.id_tipo_usuario).toBe(2);
      expect(resultado.tempo_restante).toBeGreaterThan(0);
   });

   it('Deve lançar erro quando não houver token', () => {
      const req = { cookies: {} };

      expect(() => getDadosUsuarioLogado(req)).toThrow('Não autenticado');
   });

   it('Deve lançar erro quando o token for inválido', () => {
      const req = { cookies: { token: 'token_invalido' } };

      expect(() => getDadosUsuarioLogado(req)).toThrow('Token inválido ou expirado');
   });

});