import { Op, fn, col } from "sequelize";

import { UsuarioSchema } from "./usuario-schema";
import { LoginSchema } from "./login-schema";
import { EnderecoSchema } from "./endereco-schema";
import { CidadeSchema } from "./cidade-shema";
import { TipoUsuarioSchema } from "./tipoUsuario-schema";
import { NotaSchema } from "./notas-schema";

export class TUTORIALDASQUERYS {

   // SELECT * FROM usuarios;
   async selectTudoFrom() {
      return await UsuarioSchema.findAll();
   }

   // SELECT * FROM usuarios WHERE ativo = true;
   async whereSimples() {
      return await UsuarioSchema.findAll({ where: { ativo: true } });
   }

   // SELECT * FROM usuarios ORDER BY id DESC;
   async orderBy() {
      return await UsuarioSchema.findAll({ order: [["id", "DESC"]] });
   }

   // SELECT id, nome, email FROM usuarios;
   async atributosEspecificos() {
      return await UsuarioSchema.findAll({ attributes: ["id", "nome", "email"] });
   }

   // SELECT * FROM usuarios u INNER JOIN logins l ON l.usuario_id = u.id;
   async innerJoin() {
      return await UsuarioSchema.findAll({
         include: [{ model: LoginSchema, as: "login", required: true }]
      });
   }

   // SELECT * FROM usuarios u LEFT JOIN logins l ON l.usuario_id = u.id;
   async leftJoin() {
      return await UsuarioSchema.findAll({
         include: [{ model: LoginSchema, as: "login", required: false }]
      });
   }

   // SELECT u.nome, l.email FROM usuarios u INNER JOIN logins l ON l.usuario_id = u.id;
   async joinComAtributos() {
      return await UsuarioSchema.findAll({
         attributes: ["nome"],
         include: [{ model: LoginSchema, as: "login", attributes: ["email"], required: true }]
      });
   }

   // SELECT * FROM usuarios u INNER JOIN enderecos e ON e.usuario_id = u.id INNER JOIN cidades c ON c.id = e.cidade_id;
   async joinDentroDeJoin() {
      return await UsuarioSchema.findAll({
         include: [{
            model: EnderecoSchema,
            as: "endereco",
            required: true,
            include: [{ model: CidadeSchema, as: "cidade", required: true }]
         }]
      });
   }

   // SELECT * FROM usuarios u INNER JOIN logins l ON l.usuario_id = u.id WHERE l.email LIKE '%gmail%';
   async whereDentroDoInclude() {
      return await UsuarioSchema.findAll({
         include: [{
            model: LoginSchema,
            as: "login",
            required: true,
            where: { email: { [Op.like]: "%gmail%" } }
         }]
      });
   }

   // SELECT COUNT(*) FROM usuarios;
   async count() {
      return await UsuarioSchema.count();
   }

   // SELECT prioridade, COUNT(*) FROM notas GROUP BY prioridade;
   async groupBy() {
      return await NotaSchema.findAll({
         attributes: ["prioridade", [fn("COUNT", col("id")), "quantidade"]],
         group: ["prioridade"]
      });
   }

   // SELECT t.nome, COUNT(u.id) FROM usuarios u INNER JOIN tipos_usuario t ON t.id = u.tipo_usuario_id GROUP BY t.nome;
   async groupByComJoin() {
      return await UsuarioSchema.findAll({
         attributes: [[fn("COUNT", col("UsuarioSchema.id")), "quantidade"]],
         include: [{
            model: TipoUsuarioSchema,
            as: "tipoUsuario",
            attributes: ["nome"],
            required: true
         }],
         group: ["tipoUsuario.id"]
      });
   }

   // SELECT * FROM usuarios LIMIT 10;
   async limit() {
      return await UsuarioSchema.findAll({ limit: 10 });
   }

   // SELECT * FROM usuarios LIMIT 10 OFFSET 20;
   async limitOffset() {
      return await UsuarioSchema.findAll({ limit: 10, offset: 20 });
   }

   // SELECT * FROM usuarios WHERE nome LIKE '%joao%';
   async like() {
      return await UsuarioSchema.findAll({
         where: { nome: { [Op.like]: "%joao%" } }
      });
   }

   // SELECT * FROM usuarios WHERE idade > 18;
   async maiorQue() {
      return await UsuarioSchema.findAll({
         where: { idade: { [Op.gt]: 18 } }
      });
   }

   // SELECT * FROM usuarios WHERE idade >= 18;
   async maiorOuIgual() {
      return await UsuarioSchema.findAll({
         where: { idade: { [Op.gte]: 18 } }
      });
   }

   // SELECT * FROM usuarios WHERE idade < 18;
   async menorQue() {
      return await UsuarioSchema.findAll({
         where: { idade: { [Op.lt]: 18 } }
      });
   }

   // SELECT * FROM usuarios WHERE idade <= 18;
   async menorOuIgual() {
      return await UsuarioSchema.findAll({
         where: { idade: { [Op.lte]: 18 } }
      });
   }

   // INSERT INTO usuarios (nome, email, idade, ativo) VALUES (...);
   async insert() {
      return await UsuarioSchema.create({
         nome: "João",
         email: "joao@gmail.com",
         idade: 20,
         ativo: true
      });
   }

   // UPDATE usuarios SET nome = 'Pedro' WHERE id = 1;
   async updateSimples() {
      return await UsuarioSchema.update(
         { nome: "Pedro" },
         { where: { id: 1 } }
      );
   }

   // UPDATE usuarios SET ativo = false WHERE idade < 18;
   async updateComCondicao() {
      return await UsuarioSchema.update(
         { ativo: false },
         { where: { idade: { [Op.lt]: 18 } } }
      );
   }

   // DELETE FROM usuarios WHERE id = 1;


   // SELECT * FROM usuarios WHERE id IN (1,2,3);
   async in() {
      return await UsuarioSchema.findAll({
         where: { id: { [Op.in]: [1, 2, 3] } }
      });
   }

   // SELECT * FROM usuarios WHERE idade BETWEEN 18 AND 30;
   async between() {
      return await UsuarioSchema.findAll({
         where: { idade: { [Op.between]: [18, 30] } }
      });
   }

   // SELECT * FROM usuarios WHERE ativo = true AND idade >= 18;
   async and() {
      return await UsuarioSchema.findAll({
         where: {
            ativo: true,
            idade: { [Op.gte]: 18 }
         }
      });
   }

   // SELECT * FROM usuarios WHERE nome LIKE '%joao%' OR email LIKE '%gmail%';
   async or() {
      return await UsuarioSchema.findAll({
         where: {
            [Op.or]: [
               { nome: { [Op.like]: "%joao%" } },
               { email: { [Op.like]: "%gmail%" } }
            ]
         }
      });
   }

   // SELECT * FROM usuarios WHERE deleted_at IS NULL;
   async isNull() {
      return await UsuarioSchema.findAll({
         where: { deleted_at: null }
      });
   }

   // INSERT INTO usuarios (nome, email, idade, ativo) VALUES ('João', 'joao@gmail.com', 20, true);
   async insertSimples() {
      return await UsuarioSchema.create({
         nome: "João",
         email: "joao@gmail.com",
         idade: 20,
         ativo: true
      });
   }

   // INSERT INTO usuarios (...) VALUES (...), (...);
   async bulkInsert() {
      return await UsuarioSchema.bulkCreate([
         {
            nome: "João",
            email: "joao@gmail.com",
            idade: 20,
            ativo: true
         },
         {
            nome: "Maria",
            email: "maria@gmail.com",
            idade: 25,
            ativo: false
         }
      ]);
   }

   // INSERT INTO usuarios SET nome = 'Carlos';
   async insertMinimo() {
      return await UsuarioSchema.create({
         nome: "Carlos"
      });
   }

   // INSERT INTO notas (titulo, prioridade) VALUES ('Aprender Sequelize', 'ALTA');
   async insertNota() {
      return await NotaSchema.create({
         titulo: "Aprender Sequelize",
         prioridade: "ALTA"
      });
   }

   // UPDATE usuarios SET email = 'novoemail@gmail.com', idade = 30 WHERE id = 2;
   async updateMultiplosCampos() {
      return await UsuarioSchema.update(
         {
            email: "novoemail@gmail.com",
            idade: 30
         },
         {
            where: { id: 2 }
         }
      );
   }

   // UPDATE usuarios SET ativo = true;
   async updateTodos() {
      return await UsuarioSchema.update(
         { ativo: true },
         { where: {} }
      );
   }

   // UPDATE notas SET prioridade = 'BAIXA' WHERE prioridade = 'ALTA';
   async updatePrioridadeNotas() {
      return await NotaSchema.update(
         { prioridade: "BAIXA" },
         { where: { prioridade: "ALTA" } }
      );
   }

   // DELETE FROM usuarios WHERE id = 1;
   async deleteSimples() {
      return await UsuarioSchema.destroy({
         where: { id: 1 }
      });
   }

   // DELETE FROM usuarios WHERE ativo = false;
   async deleteComCondicao() {
      return await UsuarioSchema.destroy({
         where: { ativo: false }
      });
   }

   // DELETE FROM usuarios WHERE idade < 18;
   async deleteMenoresDeIdade() {
      return await UsuarioSchema.destroy({
         where: {
            idade: {
               [Op.lt]: 18
            }
         }
      });
   }

   // DELETE FROM notas WHERE prioridade = 'BAIXA';
   async deleteNotasBaixaPrioridade() {
      return await NotaSchema.destroy({
         where: {
            prioridade: "BAIXA"
         }
      });
   }

   // DELETE FROM usuarios WHERE nome LIKE '%teste%';
   async deleteLike() {
      return await UsuarioSchema.destroy({
         where: {
            nome: {
               [Op.like]: "%teste%"
            }
         }
      }); 
   }
}