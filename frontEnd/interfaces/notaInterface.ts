export interface NotaInterface {
  id_nota?: number;
  desc_nota?: string;
  titulo_nota?:string;
  id_tipo_nota?: number;
  id_usuario?: number;
  id_hex_Cor?: number;
  finalizada_nota: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  usuario?: {
    id: number;
    nome: string;
  };
}
