import { regrasUsuario } from './regras/usuarios';
import { regrasEndereco } from './regras/enderecos';
import { regrasLogin } from './regras/login';
import { regrasNotas } from './regras/notas';

export const regras = {
  usuario: regrasUsuario,
  endereco: regrasEndereco,
  login: regrasLogin,
  notas:regrasNotas
};