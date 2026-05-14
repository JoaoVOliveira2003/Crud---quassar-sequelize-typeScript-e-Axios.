import { DataTypes } from "sequelize";
import { conecta } from "../config/conecta";
import { Op } from "sequelize";
import { NotaInterface } from "../interfaces/notaInterface";
import { formularioPesquisaNotaInterface } from "../interfaces/formularioPesquisaNotaInterface";
import { UsuarioSchema } from "./usuario-schema";


export const NotaSchema = conecta.define("Usuario_notas", {
  id_nota: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  titulo_nota:{type: DataTypes.TEXT, allowNull: false},
  desc_nota: { type: DataTypes.TEXT, allowNull: false },
  id_tipo_nota: { type: DataTypes.INTEGER, allowNull: false },
  finalizada_nota: { type: DataTypes.BOOLEAN, allowNull: false },
  id_usuario: { type: DataTypes.INTEGER, allowNull: false },
});

(NotaSchema as any).associate = function (schema: any) {
  this.belongsTo(schema.UsuarioSchema, {
    foreignKey: "id_usuario",
    as: "usuario"
  });

  this.belongsTo(schema.TipoNotaSchema, {
    foreignKey: "id_tipo_nota",
  });
};

export class notaQuery {
  schema() {
    return NotaSchema;
  }

  async getTodasNotas() {
    try {
      return await NotaSchema.findAll({
        include: [
          {
            model: UsuarioSchema,
            as: "usuario",
            attributes: ["id", "nome"],
          }
        ],
        order: [["id_nota", "DESC"]],
      });
    } catch (error) {
      throw error;
    }
  }

  async criarNota(dadosNota: NotaInterface) {
    try {
      console.log('--------');
      console.log(dadosNota);
      console.log('--------');
      
      return await NotaSchema.create(dadosNota as any)
    } catch (error) {
      return error;
    }
  }

  async deletarNota(id: number) {
    try {
      const resultado = await NotaSchema.destroy({
        where: { id_nota: id }
      });

      return resultado;
    } catch (error) {
      throw error;
    }
  }

  async atualizarNota(id: number, nota: NotaInterface) {
    try {
      const [linhasAfetadas] = await NotaSchema.update(nota, { where: { id_nota: id }, });
      return linhasAfetadas;
    } catch (error) {
      throw error;
    }
  }

  async getNotasFiltradas(filtros: formularioPesquisaNotaInterface) {
    try {
      const where: any = {};

      if (filtros.id_usuario) {
        where.id_usuario = filtros.id_usuario;
      }

      if(filtros.titulo_nota){
        where.titulo_nota = {[Op.iLike]: `%${filtros.titulo_nota}%`};
      }

      if (filtros.desc_nota) {
        where.desc_nota = {[Op.iLike]: `%${filtros.desc_nota}%`};
      }

      if (filtros.id_tipo_nota) {
        where.id_tipo_nota = filtros.id_tipo_nota;
      }

      if (filtros.finalizada_nota !== null) {
        if (filtros.finalizada_nota === true) {
          where.finalizada_nota = true;
        } else if (filtros.finalizada_nota === false) {
          where.finalizada_nota = false;
        } else {
          where.finalizada_nota = null;
        }
      }

      return await NotaSchema.findAll({
        include: [
          {
            model: UsuarioSchema,
            as: "usuario",
            attributes: ["id", "nome"]
          }
        ],
        where,
        order: [["id_nota", "DESC"]],
      });

    } catch (error) {
      throw error;
    }
  }

  async countNotas(id: number) {
    try {
      return await NotaSchema.count({
        where: { id_usuario: id }
      });
    } catch (error) {
      throw error;
    }
  }
}
