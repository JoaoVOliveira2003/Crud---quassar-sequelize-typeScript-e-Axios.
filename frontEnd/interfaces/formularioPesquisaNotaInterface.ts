export interface formularioPesquisaNotaInterface {
  desc_nota: string;
  finalizada_nota: boolean | null; // ← adicione "| null"
  id_tipo_nota: number | null;
  id_usuario: number | null; 
}