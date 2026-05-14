// eslint-disable-next-line 
type FuncaoRegra = (valor: unknown) => true | string;
type RegrasObjeto = Record<string, FuncaoRegra[]>;

export const regrasNotas: RegrasObjeto = {
  desc_nota: [
    (valor) => !!valor || 'Texto da nota é obrigatório',
    (valor) => typeof valor === 'string' && valor.length >= 3 || 'Texto inválido',
  ],
  titulo_nota: [
    (valor) => !!valor || 'Titulo da nota é obrigatório',
    (valor) => typeof valor === 'string' && valor.length >= 3 || 'Texto inválido',
  ],
  id_tipo_nota: [
    (valor) => !!valor || 'Preencha o tipo de usuario',
    (valor) => typeof valor === 'number' && valor > 0 || 'Valor inválido',
  ],
    id_usuario: [
    (valor) => !!valor || 'Insira o responsavel da nota',
    (valor) => typeof valor === 'number' && valor > 0 || 'Valor inválido',
  ],
  finalizada_nota: [
    (valor) => !!valor || 'Escreva o estado da nota',
    (valor) => typeof valor === 'boolean' || 'Valor invalidao',
  ],
    prioridade: [
    (valor) => !!valor || 'Preencha a prioridade',
    (valor) => typeof valor === 'number' && valor > 0 || 'Valor inválido',
  ],
};