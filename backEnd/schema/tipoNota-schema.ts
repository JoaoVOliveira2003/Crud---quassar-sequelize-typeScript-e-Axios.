import { DataTypes } from "sequelize";
import { conecta } from "../config/conecta";

export const TipoNotaSchema = conecta.define(
  "Tipo_nota",
  {
    id_tipo_nota: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    desc_tipo_nota: { type: DataTypes.STRING(), allowNull: false },
    id_hex_Cor: { type: DataTypes.STRING(), allowNull: false },
  },
  {
    tableName: "Tipo_nota",
  },
);

(TipoNotaSchema as any).associate = function (schema: any) {
  this.hasMany(schema.TipoUsuarioSchema, {
    foreignKey: "id_tipo_usuario",
    as: "usuarios_nota",
  });
};

export class TipoNotaQuery {
  schema() {
    return TipoNotaSchema;
  }

  async getTodosTiposNota() {
    return await TipoNotaSchema.findAll();
  }
}
