import { DataTypes } from "sequelize";
import { conecta } from "../config/conecta";

export const PaisSchema = conecta.define("Paises", {
  cod_pais: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  desc_pais: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

(PaisSchema as any).associate = function (schema: any) {
   this.hasMany(schema.CidadeSchema, {
    foreignKey: "cod_cidade",
  });
};

export class PaisQuery {
  schema() {
    return PaisSchema;
  }

  async getTodasPais() {
    return await PaisSchema.findAll();
  }

}
