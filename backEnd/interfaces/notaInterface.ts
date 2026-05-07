export interface NotaInterface {
  id_nota?: number;
  desc_nota?: string;
  id_tipo_nota?: number;
  id_hex_cor?: number;
  id_usuario?:number
  finalizada_nota?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
