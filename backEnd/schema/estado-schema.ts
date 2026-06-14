import { DataTypes } from "sequelize";
import { conecta } from "../config/conecta";

export const EstadoSchema = conecta.define("Estado", {
  cod_estado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  desc_estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cod_pais: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

(EstadoSchema as any).associate = function (schema: any) {
   this.hasMany(schema.CidadeSchema, {
    foreignKey: "cod_cidade",
  });
};

export class EstadoQuery {
  schema() {
    return EstadoSchema;
  }

  async getEstado() {
    return await EstadoSchema.findAll();
  }

  async getEstadosIdPais(id: number) {
    return await EstadoSchema.findAll({ where: { cod_pais: id } });
  }
}
